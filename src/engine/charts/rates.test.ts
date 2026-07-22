import { describe, it, expect } from "vitest";
import { kidneyStones } from "../../puzzles/data/kidney-stones";
import {
  aggregateRates,
  stratifiedRates,
  bestGroupId,
  formatPct,
} from "./rates";

/**
 * This is a correctness proof for the seed content, not just a unit test:
 * a project where a numbers error is existential should assert, in CI-able code,
 * that the seed data genuinely produces the paradox it claims to teach.
 */
describe("kidney-stones seed data, Simpson's paradox holds", () => {
  const data = kidneyStones.setup.data;
  if (data.type !== "rates") throw new Error("seed puzzle must be rates data");

  it("aggregate: B beats A overall (the trap)", () => {
    const agg = aggregateRates(data);
    expect(bestGroupId(agg, true)).toBe("B");

    const a = agg.find((r) => r.groupId === "A")!;
    const b = agg.find((r) => r.groupId === "B")!;
    expect(a).toMatchObject({ numerator: 273, denominator: 350 });
    expect(b).toMatchObject({ numerator: 289, denominator: 350 });
    expect(formatPct(a.rate)).toBe("78%");
    expect(formatPct(b.rate)).toBe("83%");
  });

  it("stratified: A beats B in EVERY stratum (the reversal)", () => {
    const strat = stratifiedRates(data);
    expect(strat).toHaveLength(2);
    for (const s of strat) {
      expect(bestGroupId(s.rates, true)).toBe("A");
    }
  });

  it("stratified percentages match the published table", () => {
    const strat = stratifiedRates(data);
    const pct = (stratumId: string, groupId: string) =>
      formatPct(
        strat
          .find((s) => s.stratumId === stratumId)!
          .rates.find((r) => r.groupId === groupId)!.rate,
      );

    expect(pct("small", "A")).toBe("93%");
    expect(pct("small", "B")).toBe("87%");
    expect(pct("large", "A")).toBe("73%");
    expect(pct("large", "B")).toBe("69%");
  });
});
