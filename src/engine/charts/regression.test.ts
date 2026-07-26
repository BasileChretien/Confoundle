import { describe, it, expect } from "vitest";
import type { RegressionData } from "../../puzzles/schema";
import {
  axisPos,
  meanPos,
  overallReversion,
  regressionRows,
  formatDeviation,
} from "./regression";

const text = (en: string) => ({ en });

/**
 * Galton's numbers, rounded as the puzzle authors them: the tallest parents
 * average 71.9 in and their children 70.8, the shortest average 65.1 and their
 * children 66.2, against a population average of 68.3. Every expectation is
 * checkable by hand.
 */
const data: RegressionData = {
  type: "regression",
  label: text("Heights"),
  unit: text("in"),
  axisMin: 62,
  axisMax: 74,
  mean: 68.3,
  meanLabel: text("Average"),
  firstLabel: text("Parents"),
  secondLabel: text("Children"),
  groups: [
    { id: "tall", label: text("Tallest parents"), first: 71.9, second: 70.8, n: 66 },
    { id: "short", label: text("Shortest parents"), first: 65.1, second: 66.2, n: 103 },
  ],
};

describe("regression-to-the-mean derivation", () => {
  it("measures each group's gap from the mean at both measurements", () => {
    const [tall, short] = regressionRows(data);
    expect(tall.firstDev).toBeCloseTo(3.6, 6);
    expect(tall.secondDev).toBeCloseTo(2.5, 6);
    expect(short.firstDev).toBeCloseTo(-3.2, 6);
    expect(short.secondDev).toBeCloseTo(-2.1, 6);
  });

  it("derives the reversion as the share of the gap that closed", () => {
    const [tall, short] = regressionRows(data);
    // Both groups fell about a third of the way back toward the mean on their own.
    expect(tall.reverted).toBeCloseTo(1 - 2.5 / 3.6, 6);
    expect(short.reverted).toBeCloseTo(1 - -2.1 / -3.2, 6);
    expect(tall.reverted).toBeGreaterThan(0.2);
    expect(short.reverted).toBeGreaterThan(0.2);
  });

  it("always moves the second measurement toward the mean, never past it", () => {
    for (const r of regressionRows(data)) {
      // Same side of the mean, but closer to it.
      expect(Math.sign(r.secondDev)).toBe(Math.sign(r.firstDev));
      expect(Math.abs(r.secondDev)).toBeLessThan(Math.abs(r.firstDev));
    }
  });

  it("summarises the reveal in one number, about a third of the way back", () => {
    const overall = overallReversion(regressionRows(data));
    expect(overall).not.toBeNull();
    expect(overall as number).toBeGreaterThan(0.25);
    expect(overall as number).toBeLessThan(0.45);
  });

  it("returns null reversion for a group that started on the mean", () => {
    const onMean = regressionRows({
      ...data,
      groups: [{ id: "mid", label: text("Average parents"), first: 68.3, second: 68.5 }],
    });
    expect(onMean[0].reverted).toBeNull();
    expect(overallReversion(onMean)).toBeNull();
  });

  it("places values on the axis and clamps out-of-range ones", () => {
    expect(meanPos(data)).toBeCloseTo((68.3 - 62) / (74 - 62), 6);
    expect(axisPos(62, data)).toBe(0);
    expect(axisPos(74, data)).toBe(1);
    expect(axisPos(80, data)).toBe(1);
    expect(axisPos(50, data)).toBe(0);
  });

  it("formats signed deviations with a unit", () => {
    expect(formatDeviation(3.6, "in")).toBe("+3.6 in");
    expect(formatDeviation(-3.2, "in")).toBe("-3.2 in");
  });
});
