import { describe, it, expect } from "vitest";
import { lengthTime } from "./length-time";
import { Puzzle } from "../schema";
import { formatPct, restrictRates, stratifiedRates } from "../../engine/charts/rates";

const data = lengthTime.setup.data;
if (data.type !== "rates") {
  throw new Error("length-time must use the rates shape");
}

const cell = (stratumId: string, groupId: string) =>
  stratifiedRates(data)
    .find((s) => s.stratumId === stratumId)!
    .rates.find((r) => r.groupId === groupId)!;

/**
 * The puzzle claims screening flattered the diagnosed while doing nothing for
 * the trial as a whole. Both halves must hold in the published counts, and the
 * mechanism (more cases found in an evenly randomised trial) has to be visible
 * in the denominators, or the reveal is asserting something the data does not
 * show.
 */
describe("length-time seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(lengthTime).success).toBe(true);
  });

  it("matches the published counts", () => {
    expect(cell("diagnosed", "screened")).toMatchObject({
      numerator: 133,
      denominator: 206,
    });
    // 160, not the 106 misprinted in Table 3.
    expect(cell("diagnosed", "usual")).toMatchObject({
      numerator: 119,
      denominator: 160,
    });
    expect(cell("everyone", "screened")).toMatchObject({
      numerator: 337,
      denominator: 4607,
    });
    expect(cell("everyone", "usual")).toMatchObject({
      numerator: 303,
      denominator: 4585,
    });
  });

  it("rejects the misprinted usual-care denominator", () => {
    // With 106, the 119 lung-cancer deaths would exceed the cohort. This is
    // the check that catches anyone "correcting" the data back to the typo.
    const usual = cell("diagnosed", "usual");
    expect(usual.denominator).toBeGreaterThan(usual.numerator);
    expect(usual.denominator).toBe(160);
  });

  it("reproduces the published percentages", () => {
    expect(formatPct(cell("diagnosed", "screened").rate)).toBe("65%");
    expect(formatPct(cell("diagnosed", "usual").rate)).toBe("74%");
    expect(formatPct(cell("everyone", "screened").rate)).toBe("7%");
    expect(formatPct(cell("everyone", "usual").rate)).toBe("7%");
  });

  it("reverses between the two ways of counting", () => {
    // Among the diagnosed, screening looks protective...
    expect(cell("diagnosed", "screened").rate).toBeLessThan(
      cell("diagnosed", "usual").rate,
    );
    // ...and among everyone randomised it is not, if anything the other way.
    expect(cell("everyone", "screened").rate).toBeGreaterThan(
      cell("everyone", "usual").rate,
    );
  });

  it("shows the mechanism: more cases found in an evenly split trial", () => {
    const arms = cell("everyone", "screened").denominator;
    const others = cell("everyone", "usual").denominator;
    // The randomisation was even to within half a percent...
    expect(Math.abs(arms - others) / arms).toBeLessThan(0.005);
    // ...yet the screened arm produced far more lung-cancer diagnoses.
    const casesScreened = cell("diagnosed", "screened").denominator;
    const casesUsual = cell("diagnosed", "usual").denominator;
    expect(casesScreened).toBeGreaterThan(casesUsual * 1.25);
  });

  it("leaves the death count essentially unmoved", () => {
    const gap =
      cell("everyone", "screened").rate - cell("everyone", "usual").rate;
    expect(Math.abs(gap)).toBeLessThan(0.01); // under one percentage point
  });

  it("opens on the diagnosed alone, then shows both", () => {
    const setup = restrictRates(data, lengthTime.setup.initialView);
    expect(setup.strata.map((s) => s.id)).toEqual(["diagnosed"]);
    expect(setup.observations).toHaveLength(2);
    expect(restrictRates(data, lengthTime.reveal.view).observations).toHaveLength(4);
  });

  it("refuses to pool the two denominators, or to crown a near-tie", () => {
    expect(data.strataAreSeparateSamples).toBe(true);
    expect(data.crownWinner).toBe(false);
    expect(lengthTime.setup.initialView.kind).not.toBe("aggregate");
    expect(lengthTime.reveal.view.kind).not.toBe("aggregate");
  });
});
