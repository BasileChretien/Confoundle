import { describe, expect, it } from "vitest";
import { PuzzleData } from "../../puzzles/schema.ts";
import type { NoninferiorityData } from "../../puzzles/schema.ts";
import {
  apparentChange,
  armRate,
  axisPosition,
  boundTowardBenefit,
  boundTowardMargin,
  crossesNull,
  impliedRatio,
  meetsNonInferiority,
  showsSuperiority,
  verdict,
  worseIsAbove,
  zones,
} from "./noninferiority.ts";

const t = (en: string) => ({ en });

/**
 * A fixture with everything the shape needs, so a test can name only the
 * numbers it is about.
 */
function build(over: Partial<NoninferiorityData> = {}): NoninferiorityData {
  return {
    type: "noninferiority",
    label: t("A trial"),
    metricLabel: t("rate ratio"),
    outcomeLabel: t("events"),
    per: 1000,
    perLabel: t("per 1000"),
    intervention: { id: "new", label: t("New"), events: 82, n: 53043 },
    control: { id: "old", label: t("Old"), events: 93, n: 52872 },
    estimate: 0.88,
    ciLow: 0.65,
    ciHigh: 1.18,
    nullValue: 1,
    nullLabel: t("No difference"),
    margin: 1.2,
    marginLabel: t("Margin"),
    inferiorLabel: t("Worse"),
    noninferiorLabel: t("Not worse"),
    superiorLabel: t("Better"),
    axisMin: 0.5,
    axisMax: 1.5,
    cohortNote: t("Somewhere"),
    ...over,
  } as NoninferiorityData;
}

describe("rates and the ratio underneath them", () => {
  it("derives an arm's rate from its counts", () => {
    // 82 of 53,043 is 1.55 per 1000, which is the figure MASAI prints.
    expect(armRate({ id: "a", label: t("a"), events: 82, n: 53043 }, 1000)).toBeCloseTo(
      1.5459,
      4,
    );
    expect(armRate({ id: "b", label: t("b"), events: 93, n: 52872 }, 1000)).toBeCloseTo(
      1.759,
      3,
    );
  });

  it("reproduces the published ratio from the two arms", () => {
    const implied = impliedRatio(build());
    expect(implied).toBeCloseTo(0.87888, 5);
    // And the claim the schema's refinement actually rests on: the counts
    // round to the 0.88 the paper prints, so the figure and the citation
    // cannot be quoting two different analyses of the same trial.
    expect(Math.round(implied! * 100) / 100).toBe(0.88);
  });

  /** A ratio against nothing is an infinity wearing a measurement's clothes. */
  it("declines a ratio when the control arm saw no events", () => {
    expect(
      impliedRatio(build({ control: { id: "old", label: t("Old"), events: 0, n: 100 } })),
    ).toBeNull();
  });

  it("reads the apparent change a point estimate advertises", () => {
    // The "12% lower" of the press release, derived rather than restated.
    expect(apparentChange(build())).toBeCloseTo(0.12, 10);
    expect(apparentChange(build({ estimate: 1.3 }))).toBeCloseTo(0.3, 10);
  });
});

describe("which way the axis runs", () => {
  /**
   * THE FLAG THIS SHAPE DOES NOT HAVE. Direction comes from where the margin
   * sits, so these assert that the derivation actually reads it rather than
   * assuming an adverse outcome, which is what the one shipped puzzle happens
   * to be. See the header of `noninferiority.ts`.
   */
  it("puts the worse side above the null for a ratio of a bad outcome", () => {
    expect(worseIsAbove(build({ nullValue: 1, margin: 1.2 }))).toBe(true);
  });

  it("puts it below for a ratio of a good one", () => {
    expect(worseIsAbove(build({ nullValue: 1, margin: 0.9 }))).toBe(false);
  });

  it("tests the interval end that faces the margin, whichever end that is", () => {
    const bad = build({ margin: 1.2, ciLow: 0.65, ciHigh: 1.18 });
    expect(boundTowardMargin(bad)).toBe(1.18);
    expect(boundTowardBenefit(bad)).toBe(0.65);

    const good = build({ margin: 0.9, ciLow: 0.65, ciHigh: 1.18 });
    expect(boundTowardMargin(good)).toBe(0.65);
    expect(boundTowardBenefit(good)).toBe(1.18);
  });
});

describe("what a trial established", () => {
  it("calls MASAI non-inferior and not superior", () => {
    const masai = build();
    expect(meetsNonInferiority(masai)).toBe(true);
    expect(showsSuperiority(masai)).toBe(false);
    expect(crossesNull(masai)).toBe(true);
    expect(verdict(masai)).toBe("noninferior");
  });

  /** A bound resting exactly on the margin has not cleared it. */
  it("refuses non-inferiority when the bound lands on the margin", () => {
    expect(meetsNonInferiority(build({ ciHigh: 1.2, margin: 1.2 }))).toBe(false);
    expect(meetsNonInferiority(build({ ciLow: 0.9, margin: 0.9, ciHigh: 1.4 }))).toBe(false);
  });

  it("calls it superior only when the whole interval clears the null", () => {
    expect(verdict(build({ estimate: 0.8, ciLow: 0.65, ciHigh: 0.99 }))).toBe("superior");
    expect(verdict(build({ estimate: 0.8, ciLow: 0.65, ciHigh: 1.0 }))).toBe("noninferior");
  });

  it("calls it inferior when the interval runs past the margin", () => {
    expect(verdict(build({ estimate: 1.1, ciLow: 0.95, ciHigh: 1.3 }))).toBe("inferior");
  });

  /**
   * THE COUNTER-EXAMPLE THE PROJECT'S OWN RULE ASKS FOR: one interval, read
   * against a margin on each side of the null, giving opposite verdicts. A
   * derivation that had hard-coded "higher is worse" would return the same
   * answer twice here, and every other test in this file would still pass,
   * because the shipped puzzle counts an adverse outcome.
   */
  describe("the same interval, with the margin on the other side", () => {
    const ci = { estimate: 1.1, ciLow: 0.95, ciHigh: 1.3, axisMin: 0.5, axisMax: 1.5 };

    it("fails outright when higher is worse", () => {
      expect(verdict(build({ ...ci, margin: 1.2 }))).toBe("inferior");
    });

    it("and passes when higher is better", () => {
      expect(verdict(build({ ...ci, margin: 0.9 }))).toBe("noninferior");
    });

    it("and an interval clear of the null is superior only on the side it clears", () => {
      const above = { estimate: 1.15, ciLow: 1.05, ciHigh: 1.3 };
      expect(verdict(build({ ...above, margin: 0.9 }))).toBe("superior");
      expect(verdict(build({ ...above, margin: 1.2 }))).toBe("inferior");
    });
  });
});

describe("drawing the axis", () => {
  it("places a value by its share of the axis", () => {
    const d = build({ axisMin: 0.5, axisMax: 1.5 });
    expect(axisPosition(d, 0.5)).toBe(0);
    expect(axisPosition(d, 1)).toBe(0.5);
    expect(axisPosition(d, 1.5)).toBe(1);
  });

  it("clamps rather than drawing off the end", () => {
    const d = build({ axisMin: 0.5, axisMax: 1.5 });
    expect(axisPosition(d, 0.1)).toBe(0);
    expect(axisPosition(d, 9)).toBe(1);
  });

  it("returns the three zones in drawing order, tiling the whole axis", () => {
    const bad = zones(build({ nullValue: 1, margin: 1.2, axisMin: 0.5, axisMax: 1.5 }));
    expect(bad.map((z) => z.kind)).toEqual(["superior", "noninferior", "inferior"]);
    expect(bad[0]!.from).toBe(0);
    expect(bad[bad.length - 1]!.to).toBe(1);
    expect(bad.map((z) => z.to)).toEqual([0.5, 0.7, 1]);
    // Each zone begins where the last ended, so no gap and no overlap.
    expect(bad.map((z) => z.from).slice(1)).toEqual(bad.map((z) => z.to).slice(0, -1));
  });

  /** Reversed, so the reader of a good-outcome ratio is not shown a mirrored lie. */
  it("reverses that order when the margin is below the null", () => {
    const good = zones(build({ nullValue: 1, margin: 0.9, axisMin: 0.5, axisMax: 1.5 }));
    expect(good.map((z) => z.kind)).toEqual(["inferior", "noninferior", "superior"]);
    expect(good[0]!.from).toBe(0);
    expect(good[good.length - 1]!.to).toBe(1);
    // Each zone begins where the last ended, so no gap and no overlap is drawn.
    expect(good.map((z) => z.from).slice(1)).toEqual(good.map((z) => z.to).slice(0, -1));
  });
});

/**
 * The schema's own refusals.
 *
 * These are guards in `schema.ts` rather than in the module above, and without
 * this block every one of them is a line that could be deleted with the whole
 * suite staying green: the derivation tests build their fixtures with a cast
 * and never go through zod at all.
 */
describe("what the schema refuses", () => {
  const valid = {
    type: "noninferiority",
    label: t("A trial"),
    metricLabel: t("rate ratio"),
    outcomeLabel: t("events"),
    per: 1000,
    perLabel: t("per 1000"),
    intervention: { id: "new", label: t("New"), events: 82, n: 53043 },
    control: { id: "old", label: t("Old"), events: 93, n: 52872 },
    estimate: 0.88,
    ciLow: 0.65,
    ciHigh: 1.18,
    nullValue: 1,
    nullLabel: t("No difference"),
    margin: 1.2,
    marginLabel: t("Margin"),
    inferiorLabel: t("Worse"),
    noninferiorLabel: t("Not worse"),
    superiorLabel: t("Better"),
    axisMin: 0.5,
    axisMax: 1.5,
    cohortNote: t("Somewhere"),
  };

  const parse = (over: Record<string, unknown> = {}) =>
    PuzzleData.safeParse({ ...valid, ...over });

  const refusal = (over: Record<string, unknown>) => {
    const r = parse(over);
    return r.success ? "ACCEPTED" : r.error.issues.map((i) => i.message).join(" | ");
  };

  it("accepts the real trial, so the refusals below mean something", () => {
    expect(parse().success).toBe(true);
  });

  /**
   * THE ONE THAT MATTERS MOST. Taking a ratio from a press release and the
   * counts from the paper is the exact error this card is about, and it is the
   * error most likely to be made while authoring the next one.
   */
  it("refuses a ratio the counts do not reproduce", () => {
    expect(refusal({ estimate: 0.75 })).toContain("implies a ratio of");
    // And tolerates the rounding a source actually prints: 0.8788 as 0.88.
    expect(parse({ estimate: 0.88 }).success).toBe(true);
  });

  it("refuses a margin sitting exactly on the null", () => {
    expect(refusal({ margin: 1 })).toContain("no tolerance to test against");
  });

  it("refuses an estimate outside its own interval", () => {
    expect(refusal({ ciLow: 0.9, ciHigh: 1.18, estimate: 0.88 })).toContain(
      "must lie inside its interval",
    );
  });

  it("refuses an interval that would be drawn clipped", () => {
    expect(refusal({ axisMin: 0.7 })).toContain("runs outside the axis");
  });

  it("refuses a null or a margin off the end of the axis", () => {
    expect(refusal({ axisMax: 1.19 })).toContain("must fall inside the axis");
  });

  it("refuses two arms sharing an id", () => {
    expect(
      refusal({ control: { id: "new", label: t("Old"), events: 93, n: 52872 } }),
    ).toContain("different ids");
  });

  it("refuses more events than people", () => {
    expect(
      refusal({ control: { id: "old", label: t("Old"), events: 99, n: 90 } }),
    ).toContain("more events than people");
  });
});
