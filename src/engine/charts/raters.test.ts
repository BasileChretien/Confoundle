import { describe, expect, it } from "vitest";
import type { RatersData } from "../../puzzles/schema";
import { markFraction, raterSpread, restrictRaters } from "./raters";

const t = (en: string) => ({ en });

const data: RatersData = {
  type: "raters",
  label: t("Marks given to one paper"),
  subject: t("One geometry examination paper"),
  metricLabel: t("Mark out of 100"),
  min: 0,
  max: 100,
  threshold: 70,
  thresholdLabel: t("Pass mark, 70"),
  aboveLabel: t("Passed"),
  belowLabel: t("Failed"),
  groups: [{ id: "wisconsin", label: t("The school the paper came from") }],
  raters: [
    { id: "t1", label: t("Teacher 1"), groupId: "wisconsin", mark: 70 },
    { id: "t2", label: t("Teacher 2"), groupId: "wisconsin", mark: 65 },
    { id: "t3", label: t("Teacher 3"), groupId: "wisconsin", mark: 60 },
    { id: "t4", label: t("Teacher 4"), groupId: "wisconsin", mark: 70 },
    { id: "t5", label: t("Teacher 5"), groupId: "wisconsin", mark: 59 },
  ],
};

describe("restrictRaters", () => {
  it("keeps only the named raters, in declared order", () => {
    const out = restrictRaters(data, { raterIds: ["t4", "t1"] });
    // Declared order, NOT the order the ids were asked for: the chart reads
    // left to right off this list and must not be reorderable by a view.
    expect(out.raters.map((r) => r.id)).toEqual(["t1", "t4"]);
  });

  it("returns everything when no ids are given, which is the reveal", () => {
    expect(restrictRaters(data, {}).raters).toHaveLength(5);
  });

  it("carries the scale and the threshold through untouched", () => {
    const out = restrictRaters(data, { raterIds: ["t5"] });
    expect(out.min).toBe(0);
    expect(out.max).toBe(100);
    expect(out.threshold).toBe(70);
    // The setup must not rescale to its own slice. If it did, one mark drawn
    // alone would sit wherever the axis happened to start and would MOVE when
    // the reveal brought the others in, which is the thing the two beats
    // promise never happens.
    expect(out.thresholdLabel).toEqual(data.thresholdLabel);
  });

  it("does not mutate the data it was handed", () => {
    restrictRaters(data, { raterIds: ["t1"] });
    expect(data.raters).toHaveLength(5);
  });
});

describe("raterSpread", () => {
  it("counts each side of the line and reports the extremes", () => {
    expect(raterSpread(data)).toEqual({
      above: 2,
      below: 3,
      total: 5,
      lowest: 59,
      highest: 70,
      range: 11,
    });
  });

  /**
   * The decision this shape makes rather than inherits. A pass mark is
   * conventionally inclusive, so 70 out of 70 passed. Two of the five marks in
   * this fixture are exactly 70, so getting this backwards would report four
   * failures instead of three and would misstate the card's own headline.
   */
  it("counts a mark exactly on the threshold as above it", () => {
    expect(raterSpread(data).above).toBe(2);
    const stricter: RatersData = { ...data, threshold: 71 };
    expect(raterSpread(stricter).above).toBe(0);
  });

  it("reports the spread of whatever slice it is handed", () => {
    const setup = restrictRaters(data, { raterIds: ["t1"] });
    expect(raterSpread(setup)).toMatchObject({ above: 1, below: 0, total: 1, range: 0 });
  });
});

describe("markFraction", () => {
  it("places a mark across the scale", () => {
    expect(markFraction(data, 0)).toBe(0);
    expect(markFraction(data, 50)).toBe(0.5);
    expect(markFraction(data, 100)).toBe(1);
  });

  it("clamps rather than drawing outside the axis", () => {
    expect(markFraction(data, -20)).toBe(0);
    expect(markFraction(data, 140)).toBe(1);
  });

  it("does not divide by zero on a degenerate scale", () => {
    expect(markFraction({ ...data, min: 50, max: 50 }, 50)).toBe(0);
  });
});
