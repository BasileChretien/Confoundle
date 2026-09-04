import { describe, expect, it } from "vitest";
import { prevalentUserBias } from "./prevalent-user-bias";
import {
  benchmarkRow,
  forestRows,
  reachesBenchmark,
  restrictForest,
  rowAt,
  rowsReachingBenchmark,
} from "../../engine/charts/forest";

/**
 * Danaei, Tavakkoli and Hernan (2012), read at source at PMC3271813.
 *
 * Nothing here is recomputed from counts: the source prints random-effects
 * pooled hazard ratios. What this file checks is that the four authored
 * estimates are the printed ones, that the claim the card rests on is DERIVED
 * rather than asserted in prose, and that backlog entry 79's four honesty
 * constraints are discharged in text a reader actually sees.
 */
const raw = prevalentUserBias.setup.data;
if (raw.type !== "forest") throw new Error("expected forest data");
const data = raw;

const OBSERVATIONAL = ["prevalent", "mixed", "incident"];

describe("the figures as printed", () => {
  it("carries the three observational rows", () => {
    const p = rowAt(data, "prevalent");
    const m = rowAt(data, "mixed");
    const i = rowAt(data, "incident");
    expect([p.estimate, p.ciLow, p.ciHigh, p.k]).toEqual([0.54, 0.45, 0.66, 13]);
    expect([m.estimate, m.ciLow, m.ciHigh, m.k]).toEqual([0.7, 0.64, 0.78, 13]);
    expect([i.estimate, i.ciLow, i.ciHigh, i.k]).toEqual([0.77, 0.65, 0.91, 4]);
  });

  it("carries the randomised benchmark", () => {
    const t = rowAt(data, "trials");
    expect([t.estimate, t.ciLow, t.ciHigh, t.k]).toEqual([0.84, 0.77, 0.91, 18]);
    expect(t.isPooled).toBe(true);
  });

  it("puts the null line at 1 and reads above it as harm, since these are hazard ratios", () => {
    expect(data.nullValue).toBe(1);
    expect(data.higherIsWorse).toBe(true);
    // With the flag set, an estimate below 1 is the beneficial side. If the
    // flag were dropped the axis labels would swap and the figure would say
    // that fewer deaths is the harmful direction.
    expect(rowAt(data, "prevalent").side).toBe("better");
  });

  it("keeps every interval inside the axis, so nothing is drawn clipped", () => {
    for (const r of forestRows(data)) {
      expect(r.ciLow).toBeGreaterThanOrEqual(data.axisMin);
      expect(r.ciHigh).toBeLessThanOrEqual(data.axisMax);
    }
  });
});

describe("the claim the card rests on, derived", () => {
  it("names the randomised row as the benchmark", () => {
    expect(data.benchmarkId).toBe("trials");
    expect(benchmarkRow(data)?.estimate).toBe(0.84);
  });

  it("has ONLY the new-user design reach the trials", () => {
    // The whole card. "Closer" is true of each row in turn and is a trend;
    // this is the fact, and it is computed from the intervals rather than
    // stated anywhere in the data file.
    expect(rowsReachingBenchmark(data)).toEqual(["incident"]);
    expect(reachesBenchmark(data, "prevalent")).toBe(false);
    expect(reachesBenchmark(data, "mixed")).toBe(false);
  });

  it("has the two that miss it EXCLUDE it rather than merely sit short of it", () => {
    // The distinction the reveal draws in words: they disagree with the trials,
    // they are not noisy versions of them.
    expect(rowAt(data, "prevalent").ciHigh).toBeLessThan(0.84);
    expect(rowAt(data, "mixed").ciHigh).toBeLessThan(0.84);
  });

  it("runs monotonically toward the benchmark as the design admits fewer existing users", () => {
    const order = OBSERVATIONAL.map((id) => rowAt(data, id).estimate);
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(order[order.length - 1]).toBeLessThan(0.84);
  });

  it("decelerates, which is what lets the commit beat rule out the null", () => {
    // The gradient is the discriminator the reader is given, so its SHAPE is
    // load-bearing: a reader extrapolating a decelerating run does not land at
    // 1. If a future edit made the steps grow, the no-effect band would become
    // defensible and the puzzle would breach the hedge rule.
    const [a, b, c] = OBSERVATIONAL.map((id) => rowAt(data, id).estimate);
    expect(b - a).toBeGreaterThan(c - b);
    expect(data.nullValue - c).toBeGreaterThan(0.05);
  });
});

describe("the beats", () => {
  it("draws the three observational rows at the setup and withholds the trials", () => {
    const view = prevalentUserBias.setup.initialView;
    expect(view.kind).toBe("whatisknown");
    expect(view.groupIds).toEqual(OBSERVATIONAL);
    const shown = restrictForest(data, { groupIds: view.groupIds }).rows.map((r) => r.id);
    expect(shown).toEqual(OBSERVATIONAL);
  });

  it("draws no benchmark line on the beat that has no benchmark row", () => {
    // The line must not appear before the number it is drawn from.
    const setup = restrictForest(data, {
      groupIds: prevalentUserBias.setup.initialView.groupIds,
    });
    expect(benchmarkRow(setup)).toBeNull();
  });

  it("adds the trials at the reveal", () => {
    expect(prevalentUserBias.reveal.view.kind).toBe("themissingrow");
    const shown = restrictForest(data, {
      groupIds: prevalentUserBias.reveal.view.groupIds,
    }).rows.map((r) => r.id);
    expect(shown).toEqual([...OBSERVATIONAL, "trials"]);
  });

  it("keeps one axis and one null line across the beats", () => {
    const setup = restrictForest(data, {
      groupIds: prevalentUserBias.setup.initialView.groupIds,
    });
    expect([setup.axisMin, setup.axisMax, setup.nullValue]).toEqual([
      data.axisMin,
      data.axisMax,
      data.nullValue,
    ]);
  });
});

describe("the four honesty constraints from backlog entry 79", () => {
  const framing = prevalentUserBias.setup.framing.en;
  const revealBody = prevalentUserBias.reveal.body!.en;
  const howItWorks = prevalentUserBias.lesson.howItWorks!.en;

  it("says these are different studies and not one dataset cut several ways", () => {
    expect(framing).toMatch(/different studies, not one dataset/i);
    expect(howItWorks).toMatch(/different studies grouped by design/i);
  });

  it("draws the heterogeneity rather than hiding it, and names the column", () => {
    const byId = Object.fromEntries(
      forestRows(data).map((r) => [r.id, r.heterogeneity]),
    );
    expect(byId).toEqual({
      prevalent: 91,
      mixed: 58,
      incident: 84,
      trials: undefined,
    });
    expect(data.heterogeneityLabel).toBeDefined();
    expect(revealBody).toMatch(/91, 58 and 84 per cent/);
  });

  it("says that one study appears in two of the groups", () => {
    expect(howItWorks).toMatch(/appears in two of the groups/i);
  });

  it("does not call the observational studies wrong", () => {
    expect(revealBody).toMatch(/not fraudulent/i);
    expect(revealBody).toMatch(/a real question with a flattering answer/i);
    // And says what they DID answer, which is the part that keeps the card
    // from reading as a debunking.
    expect(revealBody).toMatch(/already tolerated one for years/i);
  });
});

describe("the bands", () => {
  const choices = prevalentUserBias.choices;

  it("has exactly one correct band, and it is the end of the gradient", () => {
    const correct = choices.filter((c) => c.isCorrect);
    expect(correct.map((c) => c.id)).toEqual(["near-the-end"]);
  });

  it("makes the weight-of-evidence answer the trap", () => {
    const trap = choices.filter((c) => c.isIntuitiveTrap);
    expect(trap.map((c) => c.id)).toEqual(["with-the-weight"]);
    expect(trap[0]!.isCorrect).toBe(false);
    // The trap is reasonable, which is why it works: the correct row pools the
    // FEWEST studies on the figure and has the widest interval.
    const kOf = (id: string) => {
      const k = rowAt(data, id).k;
      expect(k).toBeDefined();
      return k!;
    };
    expect(kOf("incident")).toBeLessThan(kOf("prevalent"));
    const width = (id: string) => rowAt(data, id).ciHigh - rowAt(data, id).ciLow;
    expect(width("incident")).toBeGreaterThan(width("prevalent"));
    expect(width("incident")).toBeGreaterThan(width("mixed"));
  });

  it("offers four bands that name four different places on the axis", () => {
    expect(choices).toHaveLength(4);
    expect(new Set(choices.map((c) => c.id)).size).toBe(4);
  });
});

describe("what the card claims about adjustment", () => {
  const example = prevalentUserBias.lesson.examples![0]!;

  it("quotes the unadjusted figures and says adjustment did not close the gap", () => {
    expect(example.summary.en).toMatch(/0\.44/);
    expect(example.summary.en).toMatch(/0\.47/);
    expect(example.summary.en).toMatch(/excluding the randomised result/i);
  });

  it("cites the source for that example, not just for the card", () => {
    expect(example.provenance.doi).toBe("10.1093/aje/kwr301");
    expect(example.provenance.year).toBe(2012);
  });

  it("says in the reveal why adjustment cannot be the remedy", () => {
    expect(prevalentUserBias.reveal.body!.en).toMatch(
      /no adjustment reaches people who never appear in the data/i,
    );
  });
});

describe("provenance", () => {
  it("names the paper, the outcome and what was read", () => {
    const p = prevalentUserBias.provenance;
    expect(p.doi).toBe("10.1093/aje/kwr301");
    expect(p.year).toBe(2012);
    expect(p.source).toMatch(/secondary prevention, all-cause mortality/i);
    expect(p.source).toMatch(/as printed/i);
  });
});
