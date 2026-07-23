import { describe, it, expect } from "vitest";
import { confoundingIndication } from "./confounding-indication";
import { Puzzle } from "../schema";
import { formatPct, restrictRates, stratifiedRates } from "../../engine/charts/rates";

const data = confoundingIndication.setup.data;
if (data.type !== "rates") {
  throw new Error("confounding-indication must use the rates shape");
}

const cell = (stratumId: string, groupId: string) =>
  stratifiedRates(data)
    .find((s) => s.stratumId === stratumId)!
    .rates.find((r) => r.groupId === groupId)!;

/**
 * The puzzle's whole claim is that these are one population sliced twice. That
 * is checkable: both slicings must account for the same 6,800 patients and the
 * same 2,375 deaths. If any count is ever mistyped, that identity breaks and
 * these fail, rather than shipping a comparison of two different cohorts.
 */
describe("confounding-by-indication seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(confoundingIndication).success).toBe(true);
  });

  it("matches the published counts", () => {
    expect(cell("doctor", "on")).toMatchObject({ numerator: 1207, denominator: 3017 });
    expect(cell("doctor", "off")).toMatchObject({ numerator: 1168, denominator: 3783 });
    expect(cell("coin", "on")).toMatchObject({ numerator: 1181, denominator: 3397 });
    expect(cell("coin", "off")).toMatchObject({ numerator: 1194, denominator: 3403 });
  });

  it("is the same 6,800 patients, sliced two ways", () => {
    const patients = (stratumId: string) =>
      cell(stratumId, "on").denominator + cell(stratumId, "off").denominator;
    expect(patients("doctor")).toBe(6800);
    expect(patients("coin")).toBe(6800);
  });

  it("is the same 2,375 deaths, sliced two ways", () => {
    const deaths = (stratumId: string) =>
      cell(stratumId, "on").numerator + cell(stratumId, "off").numerator;
    expect(deaths("doctor")).toBe(2375);
    expect(deaths("coin")).toBe(2375);
  });

  it("reproduces the published percentages", () => {
    expect(formatPct(cell("doctor", "on").rate)).toBe("40%");
    expect(formatPct(cell("doctor", "off").rate)).toBe("31%");
    expect(formatPct(cell("coin", "on").rate)).toBe("35%");
    expect(formatPct(cell("coin", "off").rate)).toBe("35%");
  });

  it("looks damning when doctors chose, and flat when a coin did", () => {
    const prescribedGap =
      cell("doctor", "on").rate - cell("doctor", "off").rate;
    const randomisedGap = cell("coin", "on").rate - cell("coin", "off").rate;
    expect(prescribedGap).toBeGreaterThan(0.08); // about nine points
    expect(Math.abs(randomisedGap)).toBeLessThan(0.005); // under half a point
    // And the randomised gap points the other way, so it is not a shrunken
    // version of the same effect: there is no effect.
    expect(randomisedGap).toBeLessThan(0);
  });

  it("opens on the prescribed panel alone, then shows both", () => {
    const setup = restrictRates(data, confoundingIndication.setup.initialView);
    expect(setup.strata.map((s) => s.id)).toEqual(["doctor"]);
    expect(setup.observations).toHaveLength(2);
    expect(
      restrictRates(data, confoundingIndication.reveal.view).observations,
    ).toHaveLength(4);
  });

  it("refuses to pool the two slicings, or to crown a dead heat", () => {
    expect(data.strataAreSeparateSamples).toBe(true);
    expect(data.crownWinner).toBe(false);
    expect(confoundingIndication.setup.initialView.kind).not.toBe("aggregate");
    expect(confoundingIndication.reveal.view.kind).not.toBe("aggregate");
  });
});
