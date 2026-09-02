import { describe, expect, it } from "vitest";
import { PuzzleData } from "../../puzzles/schema";
import type { ForestData } from "../../puzzles/schema";
import {
  axisFraction,
  benchmarkRow,
  distanceFromBenchmark,
  forestRows,
  reachesBenchmark,
  restrictForest,
  rowsReachingBenchmark,
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


/* ---------------------------------------------------------------------------
   The benchmark line.
   ------------------------------------------------------------------------ */

/**
 * A second synthetic figure, shaped like the question the benchmark exists for:
 * three estimates of one thing and a fourth from the design we trust. The
 * numbers are chosen so that "closer" and "reaches" DISAGREE, because that
 * disagreement is the whole reason the derivation is not a subtraction.
 *
 * `near` sits 0.05 from the benchmark and its interval stops short of it.
 * `wide` sits 0.20 away, twice as far as `mid`, and covers it comfortably. A
 * card that ranked by distance would name `near` and be wrong.
 */
const marked: ForestData = {
  type: "forest",
  label: t("Against a trusted design"),
  unit: t("hazard ratio"),
  metricLabel: t("Pooled estimate"),
  nullValue: 1,
  nullLabel: t("No effect"),
  worseLabel: t("Killed more"),
  betterLabel: t("Killed fewer"),
  higherIsWorse: true,
  axisMin: 0.3,
  axisMax: 1.3,
  benchmarkId: "trusted",
  heterogeneityLabel: t("How much the studies behind a row disagree"),
  rows: [
    { id: "near", label: t("Nearest miss"), estimate: 0.79, ciLow: 0.72, ciHigh: 0.83, k: 9 },
    { id: "mid", label: t("Middling"), estimate: 0.74, ciLow: 0.6, ciHigh: 0.88, k: 5 },
    { id: "wide", label: t("Wide"), estimate: 0.64, ciLow: 0.5, ciHigh: 0.95, k: 3, heterogeneity: 91 },
    { id: "trusted", label: t("Randomised"), estimate: 0.84, ciLow: 0.77, ciHigh: 0.91, k: 18, isPooled: true },
  ],
};

describe("the benchmark line", () => {
  it("finds the row it names", () => {
    expect(benchmarkRow(marked)?.id).toBe("trusted");
    expect(benchmarkRow(marked)?.estimate).toBe(0.84);
  });

  it("has none to find when no row is named", () => {
    expect(benchmarkRow(data)).toBeNull();
    expect(reachesBenchmark(data, "pooled")).toBeNull();
    expect(rowsReachingBenchmark(data)).toEqual([]);
    expect(distanceFromBenchmark(data, "pooled")).toBeNull();
  });

  it("has none to find on the beat that was not given the row", () => {
    // What the setup actually renders. The line must not be drawn from a row
    // the reader cannot see, and `restrictForest` is what removes it.
    const setup = restrictForest(marked, { groupIds: ["near", "mid"] });
    expect(benchmarkRow(setup)).toBeNull();
  });

  it("reports containment, which is not the same as nearness", () => {
    // The point of the shape. `near` is the closest and does not reach it.
    expect(reachesBenchmark(marked, "near")).toBe(false);
    expect(reachesBenchmark(marked, "mid")).toBe(true);
    expect(reachesBenchmark(marked, "wide")).toBe(true);
  });

  it("refuses to judge the benchmark against itself", () => {
    expect(reachesBenchmark(marked, "trusted")).toBeNull();
  });

  it("keeps the yardstick out of its own tally", () => {
    expect(rowsReachingBenchmark(marked)).toEqual(["mid", "wide"]);
  });

  it("counts an interval that ends exactly on the benchmark as reaching it", () => {
    // A boundary taken at the boundary. An interval whose end IS the value has
    // not excluded it, and the arithmetic here is a published number matching a
    // published number rather than a float landing near one.
    const touching = {
      ...marked,
      rows: marked.rows.map((r) => (r.id === "near" ? { ...r, ciHigh: 0.84 } : r)),
    };
    expect(reachesBenchmark(touching, "near")).toBe(true);
  });

  it("does not read higherIsWorse, because containment has no direction", () => {
    // Written because the instinct when extending this module is to reach for
    // the flag, and here it would be wrong: an interval covers a value or it
    // does not, whichever side of the null the harm sits on. Flipping the flag
    // alone must change nothing.
    const flipped = { ...marked, higherIsWorse: false };
    expect(rowsReachingBenchmark(flipped)).toEqual(rowsReachingBenchmark(marked));
    expect(reachesBenchmark(flipped, "near")).toBe(reachesBenchmark(marked, "near"));
  });

  it("signs the distance rather than taking its magnitude", () => {
    expect(distanceFromBenchmark(marked, "wide")).toBeCloseTo(-0.2, 10);
    expect(distanceFromBenchmark(marked, "trusted")).toBe(0);
  });

  it("carries a row's heterogeneity through to the drawn bar, and leaves the rest undefined", () => {
    const byId = Object.fromEntries(forestRows(marked).map((r) => [r.id, r.heterogeneity]));
    expect(byId).toEqual({ near: undefined, mid: undefined, wide: 91, trusted: undefined });
  });
});

describe("the schema, on the benchmark it now allows", () => {
  const parse = (d: unknown) => PuzzleData.safeParse(d);

  it("accepts a figure whose benchmark names a real row", () => {
    expect(parse(marked).success).toBe(true);
  });

  it("refuses a benchmark that names no row", () => {
    expect(parse({ ...marked, benchmarkId: "nobody" }).success).toBe(false);
  });

  it("still accepts a figure with no benchmark at all", () => {
    expect(parse(data).success).toBe(true);
  });

  it("refuses a value with nothing naming the column", () => {
    const { heterogeneityLabel: _drop, ...unlabelled } = marked;
    expect(parse(unlabelled).success).toBe(false);
  });

  it("refuses a label over a column no row fills", () => {
    const empty = {
      ...marked,
      rows: marked.rows.map(({ heterogeneity: _h, ...rest }) => rest),
    };
    expect(parse(empty).success).toBe(false);
  });

  it("refuses a heterogeneity outside nought to a hundred", () => {
    const bad = {
      ...marked,
      rows: marked.rows.map((r) => (r.id === "wide" ? { ...r, heterogeneity: 140 } : r)),
    };
    expect(parse(bad).success).toBe(false);
  });
});
