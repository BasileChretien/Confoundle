import { describe, it, expect } from "vitest";
import type { EffectData } from "../../puzzles/schema";
import { effectReading, formatAmount, significanceAxis } from "./effect";

/** The Tamiflu numbers: 16.8 hours saved off an illness lasting 7 days. */
const tamiflu: EffectData = {
  type: "effect",
  label: { en: "x" },
  unit: { en: "hours" },
  estimate: 16.8,
  ciLow: 8.4,
  ciHigh: 25.1,
  pValueLabel: { en: "P < 0.001" },
  sampleLabel: { en: "x" },
  noEffectLabel: { en: "x" },
  reference: 168,
  referenceLabel: { en: "x" },
  treatedLabel: { en: "x" },
  scaleLabel: { en: "x" },
};

describe("reading one estimate two ways", () => {
  it("calls an interval clear of zero significant", () => {
    expect(effectReading(tamiflu).excludesNoEffect).toBe(true);
  });

  it("calls an interval straddling zero not significant", () => {
    const straddles = { ...tamiflu, estimate: 2, ciLow: -5, ciHigh: 9 };
    expect(effectReading(straddles).excludesNoEffect).toBe(false);
  });

  it("handles an interval entirely below zero", () => {
    const harmful = { ...tamiflu, estimate: -9, ciLow: -14, ciHigh: -3 };
    expect(effectReading(harmful).excludesNoEffect).toBe(true);
  });

  it("is the whole point: certain, and tiny", () => {
    const r = effectReading(tamiflu);
    // Certainly not nothing...
    expect(r.excludesNoEffect).toBe(true);
    // ...and yet a tenth of the illness. 16.8 / 168 = 0.10 exactly.
    expect(r.share).toBeCloseTo(0.1, 10);
    expect(r.treated).toBeCloseTo(151.2, 10);
  });

  it("keeps the arithmetic the puzzle quotes: 7 days becomes 6.3", () => {
    const r = effectReading(tamiflu);
    expect(r.reference / 24).toBeCloseTo(7, 10);
    expect(r.treated / 24).toBeCloseTo(6.3, 10);
  });
});

describe("laying the interval out for drawing", () => {
  it("puts zero, the estimate and the interval in the right order", () => {
    const a = significanceAxis(tamiflu);
    // Zero is off to the left of an interval that excludes it.
    expect(a.zero).toBeLessThan(a.left);
    expect(a.left).toBeLessThan(a.point);
    expect(a.point).toBeLessThan(a.left + a.width);
  });

  it("keeps everything on the canvas, never flush to an edge", () => {
    const a = significanceAxis(tamiflu);
    expect(a.zero).toBeGreaterThan(0);
    expect(a.left + a.width).toBeLessThan(100);
  });

  it("still places zero inside the axis when the interval straddles it", () => {
    const a = significanceAxis({ ...tamiflu, estimate: 2, ciLow: -5, ciHigh: 9 });
    expect(a.zero).toBeGreaterThan(a.left);
    expect(a.zero).toBeLessThan(a.left + a.width);
  });
});

describe("formatting", () => {
  it("keeps one decimal only when there is one", () => {
    expect(formatAmount(168)).toBe("168");
    expect(formatAmount(16.8)).toBe("16.8");
    expect(formatAmount(151.2)).toBe("151.2");
  });
});
