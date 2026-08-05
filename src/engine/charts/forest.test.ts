import { describe, expect, it } from "vitest";
import type { ForestData } from "../../puzzles/schema";
import {
  axisFraction,
  forestRows,
  gapBetween,
  intervalsDisjoint,
  rowAt,
  showsBenefit,
  showsHarm,
  timesTheEffect,
  totalK,
  weightedMean,
} from "./forest";

const t = (en: string) => ({ en });

/** A synthetic forest, so these tests do not depend on any puzzle's numbers. */
const data: ForestData = {
  type: "forest",
  label: t("A figure"),
  unit: t("standardised mean difference"),
  metricLabel: t("Pooled estimate"),
  nullValue: 0,
  nullLabel: t("No effect"),
  worseLabel: t("Made things worse"),
  betterLabel: t("Helped"),
  axisMin: -0.6,
  axisMax: 0.8,
  rows: [
    { id: "pooled", label: t("Everything"), estimate: 0.3, ciLow: 0.22, ciHigh: 0.35, k: 100, isPooled: true },
    { id: "strong", label: t("With the extra"), estimate: 0.4, ciLow: 0.3, ciHigh: 0.5, k: 40 },
    { id: "weak", label: t("Without it"), estimate: 0.2, ciLow: 0.12, ciHigh: 0.28, k: 60 },
    { id: "ambiguous", label: t("A thin slice"), estimate: -0.1, ciLow: -0.4, ciHigh: 0.18, k: 8 },
  ],
};

describe("rows as drawn", () => {
  it("derives which side of the null each row falls on", () => {
    const byId = Object.fromEntries(forestRows(data).map((r) => [r.id, r.side]));
    expect(byId).toEqual({
      pooled: "better",
      strong: "better",
      weak: "better",
      ambiguous: "worse",
    });
  });

  it("derives whether each interval clears the null line", () => {
    const byId = Object.fromEntries(forestRows(data).map((r) => [r.id, r.clearsNull]));
    expect(byId).toEqual({ pooled: true, strong: true, weak: true, ambiguous: false });
  });

  it("marks the pooled row and only that row", () => {
    expect(forestRows(data).filter((r) => r.isPooled).map((r) => r.id)).toEqual(["pooled"]);
  });

  it("throws rather than guessing when a row id is unknown", () => {
    expect(() => rowAt(data, "nope")).toThrow(/no forest row/);
  });
});

describe("harm is a sign AND a clearance, which is the whole shape", () => {
  it("does not call a shrunken but positive row harmful", () => {
    // The reasoning error the shape exists to catch: `weak` is less than half
    // of `strong`, and it is still a benefit.
    expect(showsHarm(data, "weak")).toBe(false);
    expect(showsBenefit(data, "weak")).toBe(true);
  });

  it("does not call a negative estimate harm when its interval spans the null", () => {
    // The same error in the other direction, and just as wrong. A point
    // estimate below the line with an interval crossing it is compatible with
    // no effect, so it cannot support a claim of damage.
    expect(rowAt(data, "ambiguous").side).toBe("worse");
    expect(showsHarm(data, "ambiguous")).toBe(false);
    expect(showsBenefit(data, "ambiguous")).toBe(false);
  });

  it("does call a row harmful when it is negative and clear of the line", () => {
    const harmful: ForestData = {
      ...data,
      rows: [...data.rows, { id: "real", label: t("Actual harm"), estimate: -0.3, ciLow: -0.5, ciHigh: -0.12, k: 20 }],
    };
    expect(showsHarm(harmful, "real")).toBe(true);
    expect(showsBenefit(harmful, "real")).toBe(false);
  });
});

describe("comparisons between rows", () => {
  it("measures the gap in the shape's own unit", () => {
    expect(Number(gapBetween(data, "strong", "weak").toFixed(4))).toBe(0.2);
  });

  it("expresses one row as a multiple of another's distance from the null", () => {
    expect(Number(timesTheEffect(data, "strong", "weak").toFixed(4))).toBe(2);
  });

  it("refuses a ratio against a row sitting on the null", () => {
    const onNull: ForestData = {
      ...data,
      rows: [...data.rows, { id: "zero", label: t("Nothing"), estimate: 0, ciLow: -0.2, ciHigh: 0.2, k: 5 }],
    };
    expect(() => timesTheEffect(onNull, "strong", "zero")).toThrow(/sits on the null/);
  });

  it("reports whether two intervals overlap", () => {
    // strong [.30,.50] against weak [.12,.28]: disjoint, so the difference is
    // visible on the figure rather than a matter of taking the points on trust.
    expect(intervalsDisjoint(data, "strong", "weak")).toBe(true);
    expect(intervalsDisjoint(data, "pooled", "strong")).toBe(false);
  });
});

describe("reconciliation helpers", () => {
  it("sums the evidence behind a set of rows", () => {
    expect(totalK(data, ["strong", "weak"])).toBe(100);
  });

  it("weights by k, landing near the pooled row without claiming to equal it", () => {
    // (40 x .4 + 60 x .2) / 100 = .28 against a pooled .30. Close, and NOT
    // equal, which is the point: random-effects weights are not study counts.
    const approx = weightedMean(data, ["strong", "weak"]);
    expect(Number(approx.toFixed(4))).toBe(0.28);
    expect(approx).not.toBe(rowAt(data, "pooled").estimate);
    expect(Math.abs(approx - rowAt(data, "pooled").estimate)).toBeLessThan(0.05);
  });

  it("refuses to average rows carrying no evidence", () => {
    const empty: ForestData = { ...data, rows: data.rows.map((r) => ({ ...r, k: 1 })) };
    expect(() => weightedMean(empty, [])).toThrow(/no evidence/);
  });
});

describe("axis placement", () => {
  it("puts the null line where the axis says", () => {
    // -0.6 to 0.8, so zero sits at 0.6 / 1.4.
    expect(Number(axisFraction(data, 0).toFixed(4))).toBe(0.4286);
    expect(axisFraction(data, data.axisMin)).toBe(0);
    expect(axisFraction(data, data.axisMax)).toBe(1);
  });
});
