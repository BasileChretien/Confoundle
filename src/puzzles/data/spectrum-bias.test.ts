import { describe, it, expect } from "vitest";
import { spectrumBias } from "./spectrum-bias";
import { Puzzle } from "../schema";
import { formatPct, restrictRates, stratifiedRates } from "../../engine/charts/rates";

const data = spectrumBias.setup.data;
if (data.type !== "rates") {
  throw new Error("spectrum-bias must use the rates shape");
}

const rateFor = (stratumId: string, groupId: string) =>
  stratifiedRates(data)
    .find((s) => s.stratumId === stratumId)!
    .rates.find((r) => r.groupId === groupId)!;

/**
 * The puzzle claims one test performed two completely different ways on two
 * groups of patients, and traded sensitivity for specificity as it did so. If
 * a count is ever mistyped these fail rather than shipping a lesson the data
 * no longer supports.
 */
describe("spectrum-bias seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(spectrumBias).success).toBe(true);
  });

  it("matches the published cells", () => {
    expect(rateFor("infected", "likely")).toMatchObject({
      numerator: 49,
      denominator: 53,
    });
    expect(rateFor("clear", "likely")).toMatchObject({
      numerator: 21,
      denominator: 50,
    });
    expect(rateFor("infected", "unlikely")).toMatchObject({
      numerator: 10,
      denominator: 18,
    });
    expect(rateFor("clear", "unlikely")).toMatchObject({
      numerator: 188,
      denominator: 241,
    });
  });

  it("reproduces the published percentages", () => {
    expect(formatPct(rateFor("infected", "likely").rate)).toBe("92%");
    expect(formatPct(rateFor("infected", "unlikely").rate)).toBe("56%");
    expect(formatPct(rateFor("clear", "likely").rate)).toBe("42%");
    expect(formatPct(rateFor("clear", "unlikely").rate)).toBe("78%");
  });

  it("reconciles with the paper's whole-sample table", () => {
    // 53 + 50 = 103 and 18 + 241 = 259; with the 4 patients whose prior
    // probability was never recorded, that is the 366 patients of Table 2.
    const n = (stratumId: string, groupId: string) =>
      rateFor(stratumId, groupId).denominator;
    expect(n("infected", "likely") + n("clear", "likely")).toBe(103);
    expect(n("infected", "unlikely") + n("clear", "unlikely")).toBe(259);
    expect(103 + 259 + 4).toBe(366);
  });

  it("trades sensitivity against specificity between the groups", () => {
    // Better at catching infection in the suspected group...
    expect(rateFor("infected", "likely").rate).toBeGreaterThan(
      rateFor("infected", "unlikely").rate,
    );
    // ...and worse at clearing the uninfected. Neither group simply "did better".
    expect(rateFor("clear", "likely").rate).toBeLessThan(
      rateFor("clear", "unlikely").rate,
    );
  });

  it("opens on the single figure a textbook would quote", () => {
    const shown = restrictRates(data, spectrumBias.setup.initialView);
    expect(shown.groups).toHaveLength(1);
    expect(shown.strata).toHaveLength(1);
    expect(shown.observations).toEqual([
      { groupId: "likely", stratumId: "infected", numerator: 49, denominator: 53 },
    ]);
  });

  it("holds nothing back in the reveal", () => {
    const shown = restrictRates(data, spectrumBias.reveal.view);
    expect(shown.observations).toHaveLength(4);
  });
});
