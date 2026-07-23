import { describe, it, expect } from "vitest";
import { berkson } from "./berkson";
import { Puzzle } from "../schema";
import { restrictRates, stratifiedRates } from "../../engine/charts/rates";

const data = berkson.setup.data;
if (data.type !== "rates") {
  throw new Error("berkson must use the rates shape");
}

const cell = (stratumId: string, groupId: string) =>
  stratifiedRates(data)
    .find((s) => s.stratumId === stratumId)!
    .rates.find((r) => r.groupId === groupId)!;

/** Odds ratio for one panel: the association the panel appears to show. */
function oddsRatio(stratumId: string): number {
  const a = cell(stratumId, "resp");
  const b = cell(stratumId, "noresp");
  const aYes = a.numerator;
  const aNo = a.denominator - a.numerator;
  const bYes = b.numerator;
  const bNo = b.denominator - b.numerator;
  return (aYes * bNo) / (aNo * bYes);
}

/**
 * The puzzle claims a strong association inside the hospital sample and none
 * in the community it was drawn from. Both must hold in the real Sackett
 * Table 2 counts, and the published odds ratios must fall out of them.
 */
describe("berkson seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(berkson).success).toBe(true);
  });

  it("matches the published cells", () => {
    expect(cell("hospital", "resp")).toMatchObject({
      numerator: 5,
      denominator: 20,
    });
    expect(cell("hospital", "noresp")).toMatchObject({
      numerator: 18,
      denominator: 237,
    });
    expect(cell("community", "resp")).toMatchObject({
      numerator: 17,
      denominator: 224,
    });
    expect(cell("community", "noresp")).toMatchObject({
      numerator: 184,
      denominator: 2560,
    });
  });

  it("reproduces the table's marginal totals", () => {
    expect(20 + 237).toBe(257); // the hospitalised subset
    expect(224 + 2560).toBe(2784); // everyone the survey asked
    expect(5 + 18).toBe(23); // bone or joint disease, in hospital
    expect(17 + 184).toBe(201); // bone or joint disease, in the community
  });

  it("reproduces the printed relative odds", () => {
    expect(oddsRatio("hospital")).toBeCloseTo(4.06, 2);
    expect(oddsRatio("community")).toBeCloseTo(1.06, 2);
  });

  it("shows a strong link in hospital and none outside it", () => {
    expect(oddsRatio("hospital")).toBeGreaterThan(3);
    expect(oddsRatio("community")).toBeLessThan(1.1);
    expect(cell("hospital", "resp").rate).toBeGreaterThan(
      3 * cell("hospital", "noresp").rate,
    );
    // In the community the two groups are within a percentage point.
    expect(
      Math.abs(cell("community", "resp").rate - cell("community", "noresp").rate),
    ).toBeLessThan(0.01);
  });

  it("opens on the hospital sample alone, then shows both", () => {
    const setup = restrictRates(data, berkson.setup.initialView);
    expect(setup.strata.map((s) => s.id)).toEqual(["hospital"]);
    expect(setup.observations).toHaveLength(2);
    expect(restrictRates(data, berkson.reveal.view).observations).toHaveLength(4);
  });

  it("refuses to pool nested samples or crown a winner", () => {
    expect(data.strataAreSeparateSamples).toBe(true);
    expect(data.crownWinner).toBe(false);
    expect(berkson.setup.initialView.kind).not.toBe("aggregate");
    expect(berkson.reveal.view.kind).not.toBe("aggregate");
  });
});
