import { describe, it, expect } from "vitest";
import { willRogers } from "./will-rogers";
import {
  aggregateRates,
  bestGroupId,
  stratifiedRates,
} from "../../engine/charts/rates";

const data = willRogers.setup.data;
if (data.type !== "rates") {
  throw new Error("will-rogers must use the rates shape");
}

/**
 * The whole puzzle rests on one property holding in the real Feinstein figures:
 * every stage improves while the total does not move at all. If a count is ever
 * mistyped, these fail rather than shipping a paradox that isn't one.
 */
describe("Will Rogers seed data", () => {
  it("improves in every single stage", () => {
    const strata = stratifiedRates(data);
    expect(strata).toHaveLength(3);
    for (const s of strata) {
      const before = s.rates.find((r) => r.groupId === "old")!;
      const after = s.rates.find((r) => r.groupId === "new")!;
      expect(after.rate).toBeGreaterThan(before.rate);
    }
  });

  it("leaves the overall result exactly unchanged", () => {
    const agg = aggregateRates(data);
    const before = agg.find((r) => r.groupId === "old")!;
    const after = agg.find((r) => r.groupId === "new")!;
    expect(after.numerator).toBe(before.numerator); // 72 survivors either way
    expect(after.denominator).toBe(before.denominator); // 131 patients either way
    expect(after.rate).toBe(before.rate);
  });

  it("matches the published totals", () => {
    const agg = aggregateRates(data);
    expect(agg[0].numerator).toBe(72);
    expect(agg[0].denominator).toBe(131);
    expect(Math.round(agg[0].rate * 100)).toBe(55);
  });

  it("crowns nobody overall, because it is a dead heat", () => {
    expect(bestGroupId(aggregateRates(data), data.higherIsBetter)).toBeNull();
  });
});
