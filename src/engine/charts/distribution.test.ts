import { describe, it, expect } from "vitest";
import type { DistributionData } from "../../puzzles/schema";
import {
  belowRange,
  formatPercent,
  mostSkewed,
  placementOf,
  placements,
  restrictDistribution,
  splitOf,
} from "./distribution";

const text = (en: string) => ({ en });

const data: DistributionData = {
  type: "distribution",
  label: text("Citations per paper"),
  itemLabel: text("papers"),
  valueLabel: text("citations"),
  meanLabel: text("the journal's average"),
  belowLabel: text("below it"),
  aboveLabel: text("reached it"),
  percentNote: text("published percentages"),
  groups: [
    { id: "a", label: text("A"), mean: 34.7, percentBelowMean: 75.5 },
    { id: "b", label: text("B"), mean: 3.1, percentBelowMean: 72.2 },
    { id: "c", label: text("C"), mean: 6.7, percentBelowMean: 65.3 },
  ],
};

describe("distribution derivation", () => {
  it("derives the share reaching the mean rather than authoring it", () => {
    const p = placementOf(data.groups[0]);
    expect(p.below).toBeCloseTo(0.755, 6);
    expect(p.atOrAbove).toBeCloseTo(0.245, 6);
  });

  it("always accounts for everybody, whatever the authored value", () => {
    for (const p of placements(data)) {
      expect(p.below + p.atOrAbove).toBeCloseTo(1, 10);
    }
  });

  it("keeps the mean alongside its placement, so the two cannot be shown apart", () => {
    expect(placements(data).map((p) => p.mean)).toEqual([34.7, 3.1, 6.7]);
  });

  it("names the least representative mean", () => {
    expect(mostSkewed(data)?.id).toBe("a");
  });

  it("reports the authored range for prose", () => {
    expect(belowRange(data)).toEqual({ min: 65.3, max: 75.5 });
  });

  it("restricts to a slice without touching the authored data", () => {
    const only = restrictDistribution(data, { groupIds: ["b"] });
    expect(only.groups.map((g) => g.id)).toEqual(["b"]);
    expect(data.groups).toHaveLength(3);
    expect(restrictDistribution(data).groups).toHaveLength(3);
  });

  it("shows the authored share exactly as the source printed it", () => {
    expect(splitOf(data.groups[0]).belowPercent).toBe(75.5);
    expect(formatPercent(75.5)).toBe("75.5%");
    // A whole number must not gain a fake decimal.
    expect(formatPercent(70)).toBe("70%");
  });

  it("never puts two shares on screen that fail to make 100", () => {
    // Rounding each independently would print 76 and 25. This is the guard.
    for (const g of data.groups) {
      const s = splitOf(g);
      expect(s.belowPercent + s.abovePercent).toBe(100);
    }
    expect(splitOf(data.groups[0]).abovePercent).toBe(24.5);
    // 100 - 72.2 is 27.799999999999997 in floating point; it must not leak out.
    expect(splitOf(data.groups[1]).abovePercent).toBe(27.8);
  });

  it("shows the property the shape exists to teach: the mean describes a minority", () => {
    for (const p of placements(data)) {
      expect(p.atOrAbove).toBeLessThan(0.5);
      expect(p.below).toBeGreaterThan(p.atOrAbove);
    }
  });
});
