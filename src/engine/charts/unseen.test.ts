import { describe, expect, it } from "vitest";
import { PuzzleData, type UnseenData } from "../../puzzles/schema";
import {
  axisFraction,
  correctionDirection,
  correctionFactor,
  correctionIsClear,
  correctionSize,
  resolvedShare,
  showsCorrection,
  tracedShare,
  unobservedShare,
  unresolvedShare,
} from "./unseen";

const t = (en: string) => ({ en });

/** A synthetic programme, so these tests do not depend on any puzzle's numbers. */
const data: UnseenData = {
  type: "unseen",
  label: t("A figure"),
  metricLabel: t("Died within two years"),
  perLabel: t("per 100 patients"),
  rateNote: t("Published estimates."),
  axisMax: 10,
  cohort: 100000,
  cohortLabel: t("On treatment"),
  unobserved: 20000,
  unobservedLabel: t("Filed as lost"),
  traced: 2000,
  tracedLabel: t("Chased"),
  resolved: 1500,
  resolvedLabel: t("Found"),
  reported: { label: t("As recorded"), value: 2.0, ciLow: 1.8, ciHigh: 2.2 },
  corrected: { label: t("After looking"), value: 7.0, ciLow: 5.7, ciHigh: 8.4 },
  foundAmongUnobserved: { label: t("Dead among the lost"), value: 17, ciLow: 15, ciHigh: 19 },
};

describe("the shape validates", () => {
  it("accepts a well-formed figure", () => {
    expect(PuzzleData.safeParse(data).success).toBe(true);
  });

  it("rejects a funnel that does not nest", () => {
    for (const bad of [
      { ...data, unobserved: 200000 },
      { ...data, traced: 30000 },
      { ...data, resolved: 3000 },
    ])
      expect(PuzzleData.safeParse(bad).success).toBe(false);
  });

  it("rejects an estimate outside its own interval", () => {
    const bad = { ...data, corrected: { ...data.corrected, value: 99 } };
    expect(PuzzleData.safeParse(bad).success).toBe(false);
  });

  it("rejects an estimate running past the shared axis", () => {
    expect(PuzzleData.safeParse({ ...data, axisMax: 8 }).success).toBe(false);
  });

  it("does NOT hold the found-among-missing figure to that axis", () => {
    // It is a share of the missing group, not of the cohort, so 17 is fine on
    // an axis whose maximum is 10. Pinning it to that axis would be the bug.
    expect(data.foundAmongUnobserved.value).toBeGreaterThan(data.axisMax);
    expect(PuzzleData.safeParse(data).success).toBe(true);
  });

  it("rejects a correction whose interval overlaps the reported one", () => {
    const nothingMoved = {
      ...data,
      corrected: { ...data.corrected, value: 2.1, ciLow: 1.9, ciHigh: 2.4 },
    };
    const r = PuzzleData.safeParse(nothingMoved);
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues.some((i) => /overlap/.test(i.message))).toBe(true);
  });

  it("rejects a correction blamed on a missing group too small to cause it", () => {
    const r = PuzzleData.safeParse({ ...data, unobserved: 500, traced: 400, resolved: 300 });
    expect(r.success).toBe(false);
    if (!r.success)
      expect(r.error.issues.some((i) => /too few to account/.test(i.message))).toBe(true);
  });
});

describe("the counted half, derived", () => {
  it("derives the share of the cohort nobody observed", () => {
    expect(unobservedShare(data)).toBeCloseTo(0.2, 10);
  });

  it("derives how much of the missing group was chased and how much resolved", () => {
    expect(tracedShare(data)).toBeCloseTo(0.1, 10);
    expect(resolvedShare(data)).toBeCloseTo(0.75, 10);
  });

  it("reports the unresolved share rather than leaving it to be subtracted", () => {
    // A correction resting on incomplete tracing is weaker than one resting on
    // complete tracing, so this is given rather than hidden.
    expect(unresolvedShare(data)).toBeCloseTo(0.25, 10);
    expect(resolvedShare(data) + unresolvedShare(data)).toBeCloseTo(1, 10);
  });

  it("does not divide by zero when nobody went missing or nobody was chased", () => {
    expect(tracedShare({ ...data, unobserved: 0, traced: 0, resolved: 0 })).toBe(0);
    expect(resolvedShare({ ...data, traced: 0, resolved: 0 })).toBe(0);
    expect(unresolvedShare({ ...data, traced: 0, resolved: 0 })).toBe(0);
  });
});

describe("the estimated half, related but never rebuilt", () => {
  it("derives the size and direction of the correction", () => {
    expect(correctionSize(data)).toBeCloseTo(5, 10);
    expect(correctionDirection(data)).toBe("up");
    expect(correctionFactor(data)).toBeCloseTo(3.5, 10);
  });

  it("derives whether the correction clears the reported interval", () => {
    expect(correctionIsClear(data)).toBe(true);
    const marginal = {
      ...data,
      corrected: { ...data.corrected, value: 2.3, ciLow: 2.1, ciHigh: 2.6 },
    };
    expect(correctionIsClear(marginal)).toBe(false);
  });

  it("signs a downward correction the other way", () => {
    const down = {
      ...data,
      reported: { label: t("As recorded"), value: 7.0, ciLow: 5.7, ciHigh: 8.4 },
      corrected: { label: t("After looking"), value: 2.0, ciLow: 1.8, ciHigh: 2.2 },
    };
    expect(correctionDirection(down)).toBe("down");
    expect(correctionSize(down)).toBeCloseTo(-5, 10);
  });

  it("throws rather than returning Infinity when the reported figure is zero", () => {
    const zero = { ...data, reported: { ...data.reported, value: 0, ciLow: 0, ciHigh: 0 } };
    expect(() => correctionFactor(zero)).toThrow(/no ratio exists/);
  });

  it("never offers the product that looks like it should rebuild the correction", () => {
    // 20% missing x 17% of them dead = 3.4 points, which is NOT the 5.0 point
    // correction the paper's weighted estimation produced. The module exports
    // no such product, and this test exists so nobody adds one.
    const tempting = unobservedShare(data) * data.foundAmongUnobserved.value;
    expect(tempting).toBeCloseTo(3.4, 10);
    expect(tempting).not.toBeCloseTo(correctionSize(data), 1);
  });
});

describe("the beats", () => {
  it("holds the correction back at the setup and adds it at the reveal", () => {
    expect(showsCorrection("asrecorded")).toBe(false);
    expect(showsCorrection("afterlooking")).toBe(true);
  });

  it("shares one axis, so the reported estimate cannot move between beats", () => {
    expect(axisFraction(data, data.reported.value)).toBeCloseTo(0.2, 10);
    // Same data object drives both beats; there is no per-beat rescaling here.
    expect(axisFraction(data, data.corrected.value)).toBeCloseTo(0.7, 10);
  });
});
