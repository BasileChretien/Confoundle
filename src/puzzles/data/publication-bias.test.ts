import { describe, it, expect } from "vitest";
import { publicationBias } from "./publication-bias";
import { Puzzle } from "../schema";
import { formatPct, restrictRates, stratifiedRates } from "../../engine/charts/rates";

const data = publicationBias.setup.data;
if (data.type !== "rates") {
  throw new Error("publication-bias must use the rates shape");
}

const cell = (groupId: string) =>
  stratifiedRates(data)[0].rates.find((r) => r.groupId === groupId)!;

/**
 * The puzzle turns on a gap between the literature and the registry, and on
 * both figures being reconstructible from counts the paper prints. The
 * component arithmetic is asserted here because the published-trial numerator
 * (48) and denominator (51) are each sums of two printed integers rather than
 * single printed numbers, which the provenance also states.
 */
describe("publication-bias seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(publicationBias).success).toBe(true);
  });

  it("matches the published counts", () => {
    expect(cell("journals")).toMatchObject({ numerator: 48, denominator: 51 });
    expect(cell("registry")).toMatchObject({ numerator: 38, denominator: 74 });
  });

  it("reconstructs the journal figures from the printed components", () => {
    // Table 1 prints 40 agreeing, 11 conflicting, 23 unpublished.
    const agreeing = 40;
    const conflicting = 11;
    const unpublished = 23;
    expect(agreeing + conflicting + unpublished).toBe(74);
    // Published at all:
    expect(agreeing + conflicting).toBe(cell("journals").denominator);
    // Reading as positive: the 37 FDA-positive that were published, plus the
    // 11 FDA-negative or questionable that read as positive.
    expect(37 + conflicting).toBe(cell("journals").numerator);
  });

  it("accounts for every registered trial by verdict", () => {
    const positive = 38;
    const negativeOrQuestionable = 36;
    expect(positive + negativeOrQuestionable).toBe(74);
    expect(positive).toBe(cell("registry").numerator);
    expect(cell("registry").denominator).toBe(74);
  });

  it("reproduces the paper's own headline pair", () => {
    expect(formatPct(cell("journals").rate)).toBe("94%");
    expect(formatPct(cell("registry").rate)).toBe("51%");
  });

  it("keeps both bars inside the renderable band", () => {
    // The obvious chart, publication rate among positive trials, is 37/38 and
    // saturates at 97 percent. This framing was chosen because both bars sit
    // mid-range; if either drifts out, the figure stops working.
    for (const id of ["journals", "registry"]) {
      expect(cell(id).rate).toBeGreaterThan(0.05);
      expect(cell(id).rate).toBeLessThan(0.95);
    }
  });

  it("shows the literature roughly twice as positive as the record", () => {
    expect(cell("journals").rate / cell("registry").rate).toBeGreaterThan(1.7);
  });

  it("opens on the journals alone, then shows the registry beside them", () => {
    const setup = restrictRates(data, publicationBias.setup.initialView);
    expect(setup.groups.map((g) => g.id)).toEqual(["journals"]);
    expect(setup.observations).toHaveLength(1);
    expect(
      restrictRates(data, publicationBias.reveal.view).observations,
    ).toHaveLength(2);
  });

  it("crowns nobody, because neither number is a winner", () => {
    expect(data.crownWinner).toBe(false);
  });
});
