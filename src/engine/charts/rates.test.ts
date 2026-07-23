import { describe, it, expect } from "vitest";
import { kidneyStones } from "../../puzzles/data/kidney-stones";
import {
  aggregateRates,
  stratifiedRates,
  bestGroupId,
  formatPct,
  restrictRates,
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

describe("bestGroupId", () => {
  const rate = (groupId: string, r: number) => ({
    groupId,
    numerator: r,
    denominator: 100,
    rate: r / 100,
  });

  it("crowns nobody when there is nothing to beat", () => {
    expect(bestGroupId([], true)).toBeNull();
    expect(bestGroupId([rate("A", 92)], true)).toBeNull();
  });

  it("crowns nobody on a tie", () => {
    expect(bestGroupId([rate("A", 55), rate("B", 55)], true)).toBeNull();
  });

  it("honours the metric's direction", () => {
    const rates = [rate("A", 30), rate("B", 70)];
    expect(bestGroupId(rates, true)).toBe("B");
    expect(bestGroupId(rates, false)).toBe("A");
  });
});

describe("restrictRates, drawing part of the data", () => {
  const data = kidneyStones.setup.data;
  if (data.type !== "rates") throw new Error("seed puzzle must be rates data");

  it("returns the data untouched when nothing is filtered", () => {
    expect(restrictRates(data)).toBe(data);
    expect(restrictRates(data, {})).toBe(data);
  });

  it("keeps only the named stratum, and only its observations", () => {
    const only = restrictRates(data, { strataIds: ["large"] });
    expect(only.strata.map((s) => s.id)).toEqual(["large"]);
    expect(only.groups).toHaveLength(2);
    expect(only.observations).toHaveLength(2);
    expect(only.observations.every((o) => o.stratumId === "large")).toBe(true);
  });

  it("keeps only the named group, and only its observations", () => {
    const only = restrictRates(data, { groupIds: ["A"] });
    expect(only.groups.map((g) => g.id)).toEqual(["A"]);
    expect(only.strata).toHaveLength(2);
    expect(only.observations.every((o) => o.groupId === "A")).toBe(true);
  });

  it("leaves the authored data alone", () => {
    const before = JSON.stringify(data);
    restrictRates(data, { groupIds: ["A"], strataIds: ["small"] });
    expect(JSON.stringify(data)).toBe(before);
  });

  it("derives the same rates from the slice as from the whole", () => {
    const whole = stratifiedRates(data).find((s) => s.stratumId === "large")!;
    const slice = stratifiedRates(restrictRates(data, { strataIds: ["large"] }));
    expect(slice).toHaveLength(1);
    expect(slice[0]).toEqual(whole);
  });
});
