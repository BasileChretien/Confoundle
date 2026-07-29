import { describe, it, expect } from "vitest";
import { anchoring } from "./anchoring";
import { Puzzle } from "../schema";
import {
  barFraction,
  higherGroup,
  ratioBetween,
  restrictEstimation,
  shareOfTruth,
  truthOverBest,
} from "../../engine/charts/estimation";

const data = anchoring.setup.data;
if (data.type !== "estimation") {
  throw new Error("anchoring must use the estimation shape");
}

const group = (id: string) => data.groups.find((g) => g.id === id)!;

describe("anchoring seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(anchoring).success).toBe(true);
  });

  it("matches the published medians", () => {
    expect(group("ascending").estimate).toBe(512);
    expect(group("descending").estimate).toBe(2250);
    expect(data.trueValue).toBe(40320);
  });

  it("uses a true value that is actually true, which is why this demonstration was chosen", () => {
    // The whole reason this beats the wheel-of-fortune version: the right answer
    // is checkable forever rather than a historical fact that moves.
    let factorial = 1;
    for (let i = 1; i <= 8; i++) factorial *= i;
    expect(data.trueValue).toBe(factorial);
    // And both prompts must genuinely be the same product, or the puzzle lies.
    const digitsOf = (s: string) =>
      (s.match(/\d+/g) ?? []).map(Number).sort((a, b) => a - b);
    expect(digitsOf(group("ascending").promptText.en)).toEqual(
      digitsOf(group("descending").promptText.en),
    );
  });

  it("shows the first effect it teaches: order alone quadrupled the guess", () => {
    expect(ratioBetween(data)).toBeCloseTo(2250 / 512, 10);
    expect(ratioBetween(data)).toBeGreaterThan(4);
    expect(higherGroup(data).id).toBe("descending");
  });

  it("shows the second effect: both guesses are nothing against the answer", () => {
    expect(shareOfTruth(group("ascending"), data)).toBeLessThan(0.02);
    expect(shareOfTruth(group("descending"), data)).toBeLessThan(0.06);
    expect(truthOverBest(data)).toBeGreaterThan(17);
  });

  it("collapses the two guesses only once the truth shares the axis", () => {
    // Setup: the lone guess fills its frame. Reveal: it is a sliver. Same number.
    expect(barFraction(512, data, false)).toBeGreaterThan(0.2);
    expect(barFraction(512, data, true)).toBeLessThan(0.02);
  });

  it("gives the framing the mechanism the deduction needs", () => {
    // Winnability rests on this. Without the five-seconds-is-not-enough clause
    // and the two visible opening pairs, "higher" stops being deducible and the
    // hedge quietly becomes correct.
    const framing = anchoring.setup.framing.en;
    expect(framing).toMatch(/five seconds is nowhere near enough/i);
    expect(framing).toMatch(/first two or three steps/i);
    expect(framing).toContain("8 x 7 x 6 x 5 x 4 x 3 x 2 x 1");
  });

  it("marks the hedge wrong and traps the it-cannot-matter intuition", () => {
    const hedge = anchoring.choices.find((c) => c.id === "cannot-tell")!;
    expect(hedge.isCorrect).toBe(false);
    expect(anchoring.choices.find((c) => c.isCorrect)!.id).toBe("higher");
    expect(anchoring.choices.find((c) => c.isIntuitiveTrap)!.id).toBe("same");
  });

  it("never implies a precision the source did not print", () => {
    // No group sizes, no spread, no test statistic exist for this demonstration.
    // Anything that claimed otherwise would be inventing data.
    for (const g of data.groups) {
      expect(g).not.toHaveProperty("n");
      expect(g).not.toHaveProperty("sd");
    }
    expect(data.statNote.en).toMatch(/no group sizes/i);
    expect(anchoring.provenance.note?.en).toMatch(/no test statistic/i);
  });

  it("opens on one guess, then shows both against the answer", () => {
    const setup = restrictEstimation(data, anchoring.setup.initialView);
    expect(setup.groups.map((g) => g.id)).toEqual(["ascending"]);
    expect(anchoring.setup.initialView.kind).toBe("oneguess");
    expect(restrictEstimation(data, anchoring.reveal.view).groups).toHaveLength(2);
    expect(anchoring.reveal.view.kind).toBe("withtruth");
  });
});
