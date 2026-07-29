import { describe, it, expect } from "vitest";
import type { DoseData } from "../../puzzles/schema";
import {
  firstStepGain,
  firstStepShare,
  formatMean,
  formatShare,
  plotX,
  points,
  remainingDoses,
  restrictDose,
  totalGain,
} from "./dose";

const text = (en: string) => ({ en });

const data: DoseData = {
  type: "dose",
  label: text("Rated true"),
  doseLabel: text("times seen before"),
  outcomeLabel: text("average rating"),
  scaleMin: 1,
  scaleMax: 6,
  sampleLabel: text("57 people"),
  meansNote: text("published means"),
  steps: [
    { id: "d0", label: text("never"), dose: 0, mean: 3.64, sd: 0.65 },
    { id: "d1", label: text("once"), dose: 1, mean: 4.26, sd: 0.83 },
    { id: "d9", label: text("nine"), dose: 9, mean: 4.78, sd: 1.01 },
    { id: "d18", label: text("eighteen"), dose: 18, mean: 4.72, sd: 1.02 },
    { id: "d27", label: text("twenty-seven"), dose: 27, mean: 4.87, sd: 0.99 },
  ],
};

describe("dose derivation", () => {
  it("places points in proportion to the DOSE, never to their index", () => {
    // The whole point. Spacing by index would put dose 1 a quarter of the way
    // across; in truth it belongs in the leftmost 1/27th, which is what makes
    // the front-loading visible instead of hidden.
    const xs = points(data).map((p) => p.x);
    expect(xs[0]).toBeCloseTo(0, 10);
    expect(xs[1]).toBeCloseTo(1 / 27, 10);
    expect(xs[2]).toBeCloseTo(9 / 27, 10);
    expect(xs[4]).toBeCloseTo(1, 10);
    // And explicitly NOT the evenly spaced version.
    expect(xs[1]).not.toBeCloseTo(0.25, 2);
  });

  it("maps the outcome onto its declared scale", () => {
    const ys = points(data).map((p) => p.y);
    expect(ys[0]).toBeCloseTo((3.64 - 1) / 5, 10);
    expect(ys[4]).toBeCloseTo((4.87 - 1) / 5, 10);
    for (const y of ys) {
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(1);
    }
  });

  it("derives the share the first dose carries rather than authoring it", () => {
    expect(totalGain(data)).toBeCloseTo(1.23, 10);
    expect(firstStepGain(data)).toBeCloseTo(0.62, 10);
    expect(firstStepShare(data)).toBeCloseTo(0.62 / 1.23, 10);
    expect(formatShare(firstStepShare(data))).toBe("50%");
  });

  it("shows the property the shape exists to teach: the climb is front-loaded", () => {
    // One extra exposure does about as much as the twenty-six after it.
    expect(firstStepShare(data)).toBeGreaterThan(0.4);
    expect(remainingDoses(data)).toBe(26);
  });

  it("restricts to the endpoints without touching the authored data", () => {
    const ends = restrictDose(data, { groupIds: ["d0", "d27"] });
    expect(ends.steps.map((s) => s.id)).toEqual(["d0", "d27"]);
    expect(data.steps).toHaveLength(5);
    expect(restrictDose(data).steps).toHaveLength(5);
  });

  it("keeps the endpoints at the ends of the axis when only they are shown", () => {
    // A filtered view rescales to what it draws, so the setup's two points sit
    // at 0 and 1 and the reader is not shown an axis with a mystery gap in it.
    const ends = restrictDose(data, { groupIds: ["d0", "d27"] });
    expect(plotX(0, ends)).toBeCloseTo(0, 10);
    expect(plotX(27, ends)).toBeCloseTo(1, 10);
  });

  it("formats means at the precision the source printed", () => {
    expect(formatMean(3.64)).toBe("3.64");
    expect(formatMean(4.7)).toBe("4.70");
  });
});
