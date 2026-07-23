import { describe, it, expect } from "vitest";
import { recallBias } from "./recall-bias";
import { Puzzle } from "../schema";
import { formatPct, restrictRates, stratifiedRates } from "../../engine/charts/rates";

const data = recallBias.setup.data;
if (data.type !== "rates") {
  throw new Error("recall-bias must use the rates shape");
}

const cell = (stratumId: string, groupId: string) =>
  stratifiedRates(data)
    .find((s) => s.stratumId === stratumId)!
    .rates.find((r) => r.groupId === groupId)!;

/** The crude odds ratio of one panel, from its counts alone. */
function oddsRatio(stratumId: string): number {
  const cases = cell(stratumId, "cases");
  const controls = cell(stratumId, "controls");
  const a = cases.numerator;
  const b = cases.denominator - cases.numerator;
  const c = controls.numerator;
  const d = controls.denominator - controls.numerator;
  return (a * d) / (b * c);
}

/**
 * The reveal states two odds ratios in prose, so they are derived here from the
 * counts rather than trusted. If a count is ever mistyped the numbers in the
 * text stop matching the figure, and these fail instead.
 */
describe("recall-bias seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(recallBias).success).toBe(true);
  });

  it("matches the published counts", () => {
    expect(cell("before", "cases")).toMatchObject({ numerator: 54, denominator: 141 });
    expect(cell("before", "controls")).toMatchObject({ numerator: 281, denominator: 1094 });
    expect(cell("after", "cases")).toMatchObject({ numerator: 64, denominator: 141 });
    expect(cell("after", "controls")).toMatchObject({ numerator: 269, denominator: 1094 });
  });

  it("is the same women both times", () => {
    // The whole claim rests on this. Two different samples would make the
    // comparison meaningless, and a mistyped denominator would make it two
    // different samples.
    for (const group of ["cases", "controls"] as const) {
      expect({
        group,
        before: cell("before", group).denominator,
        after: cell("after", group).denominator,
      }).toEqual({
        group,
        before: cell("after", group).denominator,
        after: cell("after", group).denominator,
      });
    }
    expect(cell("after", "cases").denominator + cell("after", "controls").denominator).toBe(1235);
  });

  it("reproduces the published percentages", () => {
    expect(formatPct(cell("after", "cases").rate)).toBe("45%");
    expect(formatPct(cell("after", "controls").rate)).toBe("25%");
    expect(formatPct(cell("before", "cases").rate)).toBe("38%");
    expect(formatPct(cell("before", "controls").rate)).toBe("26%");
  });

  it("shows the effect it teaches: the cases drifted and the controls did not", () => {
    const drift = (group: "cases" | "controls") =>
      cell("after", group).rate - cell("before", group).rate;

    expect(drift("cases")).toBeGreaterThan(0.06); // about seven points up
    expect(drift("cases")).toBeLessThan(0.08);
    // The controls are the built-in control for the passage of time itself:
    // they answered the same question over the same years and barely moved,
    // and moved the other way.
    expect(Math.abs(drift("controls"))).toBeLessThan(0.02);
    expect(drift("controls")).toBeLessThan(0);
  });

  it("inflates a real association rather than inventing one", () => {
    // This is the puzzle's honest core, and the reason the "it is all an
    // artefact" option is wrong. Both odds ratios are above 1.
    expect(oddsRatio("before")).toBeGreaterThan(1.5);
    expect(oddsRatio("after")).toBeGreaterThan(oddsRatio("before"));
  });

  it("gives the odds ratios quoted in the reveal", () => {
    expect(oddsRatio("before")).toBeCloseTo(1.8, 1);
    expect(oddsRatio("after")).toBeCloseTo(2.5, 1);
    // "roughly a third of what the later study measured was not there before"
    const inflation = (oddsRatio("after") - oddsRatio("before")) / oddsRatio("after");
    expect(inflation).toBeGreaterThan(0.25);
    expect(inflation).toBeLessThan(0.4);
  });

  it("opens on the retrospective panel alone, then shows both", () => {
    const setup = restrictRates(data, recallBias.setup.initialView);
    expect(setup.strata.map((s) => s.id)).toEqual(["after"]);
    expect(setup.observations).toHaveLength(2);
    expect(restrictRates(data, recallBias.reveal.view).observations).toHaveLength(4);
  });

  it("refuses to pool the two askings, or to crown either group", () => {
    expect(data.strataAreSeparateSamples).toBe(true);
    expect(data.crownWinner).toBe(false);
    expect(recallBias.setup.initialView.kind).not.toBe("aggregate");
    expect(recallBias.reveal.view.kind).not.toBe("aggregate");
  });

  it("discloses that the printed odds ratios are not these crude ones", () => {
    // The provenance note is load-bearing here, not decoration: the paper's
    // 1.90 and 3.01 cannot be recomputed from these four cells, and a reader
    // who tried would otherwise conclude the counts were wrong.
    const note = recallBias.provenance.note?.en ?? "";
    expect(note).toContain("1.90");
    expect(note).toContain("3.01");
    expect(note).toContain("1.80");
    expect(note).toContain("2.55");
  });
});
