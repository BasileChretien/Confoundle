import { describe, expect, it } from "vitest";
import { PuzzleData, type YieldData } from "../../puzzles/schema";
import {
  axisFraction,
  differenceOn,
  overlappingRows,
  pairAt,
  relativeExcessOn,
  restrictYield,
  separatedOn,
  separatedRows,
  yieldPairs,
} from "./yield";

const t = (en: string) => ({ en });

/** A synthetic programme, so these tests do not depend on any puzzle's numbers. */
const data: YieldData = {
  type: "yield",
  label: t("A figure"),
  perLabel: t("per 100,000 people"),
  metricLabel: t("Rate"),
  rateNote: t("Published rates."),
  axisMax: 20,
  arms: [
    { id: "screened", label: t("Where it ran") },
    { id: "control", label: t("Where it did not") },
  ],
  rows: [
    { id: "found", label: t("Diagnosed") },
    { id: "advanced", label: t("Diagnosed late") },
    { id: "died", label: t("Died of it") },
  ],
  observations: [
    // Plainly apart: the programme found more.
    { rowId: "found", armId: "screened", rate: 13.4, ciLow: 12.2, ciHigh: 14.6 },
    { rowId: "found", armId: "control", rate: 9.3, ciLow: 8.2, ciHigh: 10.3 },
    // Identical.
    { rowId: "advanced", armId: "screened", rate: 5.0, ciLow: 4.3, ciHigh: 5.7 },
    { rowId: "advanced", armId: "control", rate: 5.0, ciLow: 4.2, ciHigh: 5.8 },
    // Overlapping, and pointing the other way.
    { rowId: "died", armId: "screened", rate: 3.5, ciLow: 2.9, ciHigh: 4.1 },
    { rowId: "died", armId: "control", rate: 3.8, ciLow: 3.1, ciHigh: 4.5 },
  ],
};

describe("the shape validates", () => {
  it("accepts a well-formed figure", () => {
    expect(PuzzleData.safeParse(data).success).toBe(true);
  });

  it("rejects a row that carries only one arm", () => {
    const holed = {
      ...data,
      observations: data.observations.filter(
        (o) => !(o.rowId === "died" && o.armId === "control"),
      ),
    };
    const r = PuzzleData.safeParse(holed);
    expect(r.success).toBe(false);
    if (!r.success)
      expect(r.error.issues.some((i) => /no observation for arm/.test(i.message))).toBe(true);
  });

  it("rejects a rate outside its own interval", () => {
    const wrong = {
      ...data,
      observations: data.observations.map((o) =>
        o.rowId === "found" && o.armId === "screened" ? { ...o, rate: 99 } : o,
      ),
    };
    expect(PuzzleData.safeParse(wrong).success).toBe(false);
  });

  it("rejects an interval that runs past the axis", () => {
    expect(PuzzleData.safeParse({ ...data, axisMax: 14 }).success).toBe(false);
  });

  it("rejects a figure where every row separates, because nothing is left to reveal", () => {
    const allMoved = {
      ...data,
      rows: data.rows.filter((r) => r.id !== "advanced"),
      observations: data.observations
        .filter((o) => o.rowId !== "advanced")
        .map((o) =>
          o.rowId === "died" && o.armId === "control"
            ? { ...o, rate: 12.0, ciLow: 11.0, ciHigh: 13.0 }
            : o,
        ),
    };
    const r = PuzzleData.safeParse(allMoved);
    expect(r.success).toBe(false);
    if (!r.success)
      expect(r.error.issues.some((i) => /every row separates/.test(i.message))).toBe(true);
  });

  it("rejects a figure where no row separates, because there is nothing to set up", () => {
    const nothingMoved = {
      ...data,
      observations: data.observations.map((o) =>
        o.rowId === "found" && o.armId === "screened"
          ? { ...o, rate: 9.5, ciLow: 8.4, ciHigh: 10.5 }
          : o,
      ),
    };
    const r = PuzzleData.safeParse(nothingMoved);
    expect(r.success).toBe(false);
    if (!r.success)
      expect(
        r.error.issues.some((i) => /no row has intervals that clear one another/.test(i.message)),
      ).toBe(true);
  });
});

describe("pairs as drawn", () => {
  it("keeps the arms in the order the data declares them", () => {
    for (const p of yieldPairs(data))
      expect(p.values.map((v) => v.armId)).toEqual(["screened", "control"]);
  });

  it("derives which rows separate and which overlap", () => {
    expect(separatedRows(data)).toEqual(["found"]);
    expect(overlappingRows(data)).toEqual(["advanced", "died"]);
  });

  it("signs the difference from the first arm to the second", () => {
    expect(differenceOn(data, "found")).toBeCloseTo(4.1, 10);
    expect(differenceOn(data, "advanced")).toBe(0);
    // The programme's arm is LOWER here, so the difference is negative.
    expect(differenceOn(data, "died")).toBeCloseTo(-0.3, 10);
  });

  it("derives the relative excess people quote when a programme finds more", () => {
    expect(relativeExcessOn(data, "found")).toBeCloseTo(0.4409, 4);
    expect(relativeExcessOn(data, "advanced")).toBe(0);
  });

  it("reports separation and never equality", () => {
    // The mortality row overlaps, which is NOT proof the two are the same. The
    // module must therefore never claim it is: it reports separation only.
    expect(separatedOn(data, "died")).toBe(false);
    expect(differenceOn(data, "died")).not.toBe(0);
  });

  it("throws rather than guessing when asked for a row that is not there", () => {
    expect(() => pairAt(data, "nope")).toThrow(/no yield row/);
  });
});

describe("restricting to a beat's rows", () => {
  const setup = restrictYield(data, { groupIds: ["found", "advanced"] });

  it("drops the held-back row and its observations together", () => {
    expect(setup.rows.map((r) => r.id)).toEqual(["found", "advanced"]);
    expect(setup.observations.every((o) => o.rowId !== "died")).toBe(true);
  });

  it("holds the axis still, so nothing already on screen moves at the reveal", () => {
    expect(setup.axisMax).toBe(data.axisMax);
    expect(axisFraction(setup, 13.4)).toBe(axisFraction(data, 13.4));
  });

  it("leaves the restricted figure valid on its own", () => {
    expect(PuzzleData.safeParse(setup).success).toBe(true);
  });

  it("makes the reveal a superset of the setup by construction", () => {
    const reveal = restrictYield(data, {});
    const setupIds = new Set(setup.rows.map((r) => r.id));
    expect(reveal.rows.filter((r) => setupIds.has(r.id)).map((r) => r.id)).toEqual([
      "found",
      "advanced",
    ]);
  });
});
