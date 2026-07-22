import { describe, it, expect } from "vitest";
import { baseRate } from "../../puzzles/data/base-rate";
import { frequencyBreakdown } from "./frequencies";

/**
 * Correctness proof for the base-rate seed: a rare condition + an accurate test
 * still yields a tiny positive predictive value. If these numbers ever drift,
 * the puzzle stops teaching what it claims.
 */
describe("base-rate seed, most positives are false alarms", () => {
  const data = baseRate.setup.data;
  if (data.type !== "frequencies")
    throw new Error("seed puzzle must be frequencies data");
  const b = frequencyBreakdown(data);

  it("51 positive results, only 1 real", () => {
    expect(b.allPositive).toBe(51);
    expect(b.truePositive).toBe(1);
    expect(b.falsePositive).toBe(50);
  });

  it("the test itself is strong (100% sensitive, ~5% false alarms)", () => {
    expect(Math.round(b.sensitivity * 100)).toBe(100);
    expect(Math.round(b.falsePositiveRate * 100)).toBe(5);
  });

  it("yet a positive means only ~2% chance", () => {
    expect(Math.round(b.ppv * 100)).toBe(2);
  });
});
