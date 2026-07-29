import { describe, it, expect } from "vitest";
import { misleadingAxis } from "./misleading-axis";
import { Puzzle } from "../schema";
import { aggregateRates, restrictRates } from "../../engine/charts/rates";

const data = misleadingAxis.setup.data;
if (data.type !== "rates") {
  throw new Error("misleadingAxis must use the rates shape");
}

const rate = (groupId: string) =>
  aggregateRates(data).find((r) => r.groupId === groupId)!;

/**
 * What has to be proved here is the claim the puzzle is winnable on: that the
 * inverted-axis score is BELOW what guessing would give. If it ever drifted up
 * to chance, the correct choice would stop being deducible from the setup and
 * the hedge would quietly become the honest answer.
 */
describe("misleading-axis seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(misleadingAxis).success).toBe(true);
  });

  it("matches the published counts", () => {
    expect(rate("inverted")).toMatchObject({ numerator: 7, denominator: 38 });
    expect(rate("normal")).toMatchObject({ numerator: 39, denominator: 40 });
  });

  it("reproduces the published percentages", () => {
    // Table 3 prints 18.42% and 97.50%.
    expect(rate("inverted").rate * 100).toBeCloseTo(18.42, 2);
    expect(rate("normal").rate * 100).toBeCloseTo(97.5, 2);
  });

  it("shows the effect it teaches: the inverted axis scores BELOW guessing", () => {
    // Three answers were available (improved, declined, could not tell), so
    // blind guessing lands on the truth about a third of the time, and someone
    // who merely finds the chart hard but still picks a direction lands there
    // about half the time. The observed score is under both, which is the whole
    // basis for ruling out "it was just a hard chart".
    expect(rate("inverted").rate).toBeLessThan(1 / 3);
    expect(rate("inverted").rate).toBeLessThan(1 / 2);
    // And by a wide enough margin that it is not a rounding artefact.
    expect(1 / 3 - rate("inverted").rate).toBeGreaterThan(0.1);
  });

  it("keeps the honest chart near the ceiling, which is what rules out the readers", () => {
    expect(rate("normal").rate).toBeGreaterThan(0.95);
    // The reveal only lands if the gap is enormous rather than merely present.
    expect(rate("normal").rate - rate("inverted").rate).toBeGreaterThan(0.7);
  });

  it("accounts for all 38 responses, including the one that is not in the chart", () => {
    // 7 correct + 30 incorrect + 1 uncertain = 38. The chart can only carry the
    // first of those, so the other two live in the reveal prose, and the point
    // of the reveal ("only one person hesitated") is false if they drift.
    const correct = rate("inverted").numerator;
    const concludedOpposite = 30;
    const uncertain = 1;
    expect(correct + concludedOpposite + uncertain).toBe(
      rate("inverted").denominator,
    );
    expect(misleadingAxis.reveal.explanation.en).toContain("30");
    expect(misleadingAxis.reveal.explanation.en).toContain("one of them");
    // Same for the control arm: 39 correct + 1 incorrect + 0 uncertain = 40.
    expect(rate("normal").numerator + 1).toBe(rate("normal").denominator);
  });

  it("states the three answer options, without which the deduction is unavailable", () => {
    // The winnability of this puzzle rests entirely on the player knowing that
    // "I could not tell" was on the table. Drop it from the framing and the
    // below-chance argument cannot be made from the setup.
    const framing = misleadingAxis.setup.framing.en;
    expect(framing).toContain("improved");
    expect(framing).toContain("declined");
    expect(framing).toContain("could not tell");
  });

  it("marks the hedge wrong, deliberately", () => {
    // Recorded as a test because it is a judgement call, not an oversight: the
    // setup shows one arm only, which usually makes the hedge correct in this
    // deck. Here the third answer option makes the score itself decisive.
    const hedge = misleadingAxis.choices.find((c) => c.id === "cannot-tell")!;
    expect(hedge.isCorrect).toBe(false);
    const correct = misleadingAxis.choices.find((c) => c.isCorrect)!;
    expect(correct.id).toBe("reversed");
    // The intuitive trap must be the "hard chart" reading, since that is the
    // explanation the setup is built to make feel obvious.
    const trap = misleadingAxis.choices.find((c) => c.isIntuitiveTrap)!;
    expect(trap.id).toBe("hard");
  });

  it("opens on the inverted bar alone, then shows both", () => {
    const setup = restrictRates(data, misleadingAxis.setup.initialView);
    expect(setup.groups.map((g) => g.id)).toEqual(["inverted"]);
    expect(setup.observations).toHaveLength(1);
    expect(restrictRates(data, misleadingAxis.reveal.view).observations).toHaveLength(2);
  });

  it("stays non-partisan, which is why this source was chosen", () => {
    // The stimulus used invented places. If a future edit ever swapped in a real
    // political example, this is the guard that should stop it.
    expect(misleadingAxis.provenance.note?.en).toContain("invented places");
  });
});
