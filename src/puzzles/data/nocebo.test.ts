import { describe, it, expect } from "vitest";
import { nocebo } from "./nocebo";
import { Puzzle } from "../schema";
import { aggregateRates, formatPct, restrictRates } from "../../engine/charts/rates";

const data = nocebo.setup.data;
if (data.type !== "rates") {
  throw new Error("nocebo must use the rates shape");
}

const rate = (groupId: string) =>
  aggregateRates(data).find((r) => r.groupId === groupId)!;

/**
 * The reveal here is one extra bar, so what has to be proved is that the two
 * bars are genuinely a dead heat. A puzzle whose "no difference" turned out to
 * be a real difference would teach the opposite of its lesson, and the gap is
 * small enough that a single mistyped digit would do it.
 */
describe("nocebo seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(nocebo).success).toBe(true);
  });

  it("matches the published counts", () => {
    expect(rate("statin")).toMatchObject({ numerator: 248, denominator: 397 });
    expect(rate("placebo")).toMatchObject({ numerator: 239, denominator: 388 });
  });

  it("reproduces the published percentages", () => {
    // The paper prints 62.5 and 61.6. Rounded to whole percents for display,
    // both bars read the same, which is a starker reveal than the prose can be:
    // hence the prose quotes the paper's one-decimal figures rather than
    // integers, so nothing on screen can contradict anything in the text.
    expect(rate("statin").rate * 100).toBeCloseTo(62.5, 1);
    expect(rate("placebo").rate * 100).toBeCloseTo(61.6, 1);
    expect(formatPct(rate("statin").rate)).toBe("62%");
    expect(formatPct(rate("placebo").rate)).toBe("62%");
    for (const text of [nocebo.setup.framing.en, nocebo.reveal.explanation.en]) {
      expect(text).not.toMatch(/\b63 percent\b/);
    }
  });

  it("shows the effect it teaches: the dummy tablet does the same thing", () => {
    const gap = rate("statin").rate - rate("placebo").rate;
    // Under one percentage point. If this ever grew, the reveal would be
    // claiming a dead heat the data no longer supports.
    expect(Math.abs(gap)).toBeLessThan(0.01);
  });

  it("keeps the symptom common in both arms, which is the point", () => {
    // The trap only works because the raw rate is alarming on its own.
    for (const group of ["statin", "placebo"] as const) {
      expect(rate(group).rate).toBeGreaterThan(0.6);
    }
  });

  it("accounts for 785 treatment periods, not 785 people", () => {
    expect(rate("statin").denominator + rate("placebo").denominator).toBe(785);
    // The unit is the single likeliest thing to be misread, so the puzzle has
    // to say so where a reader will see it, not only in the citation.
    const note = nocebo.provenance.note?.en ?? "";
    expect(note).toContain("not people");
    expect(note).toContain("152");
    expect(nocebo.setup.framing.en).toContain("152");
    expect(data.metricLabel.en.toLowerCase()).toContain("stretches");
  });

  it("opens on the statin bar alone, then shows both", () => {
    const setup = restrictRates(data, nocebo.setup.initialView);
    expect(setup.groups.map((g) => g.id)).toEqual(["statin"]);
    expect(setup.observations).toHaveLength(1);
    expect(restrictRates(data, nocebo.reveal.view).observations).toHaveLength(2);
  });

  it("crowns nobody, because a dead heat has no winner", () => {
    expect(data.crownWinner).toBe(false);
  });

  it("refuses to teach that the pain is imaginary", () => {
    // The single most important editorial constraint on this puzzle. The
    // dismissive option must exist, so a player can be caught choosing it, and
    // must be marked wrong.
    const correct = nocebo.choices.find((c) => c.isCorrect)!;
    expect(correct.label.en).toContain("real");
    const dismissive = nocebo.choices.find((c) => c.label.en.includes("not real"))!;
    expect(dismissive.isCorrect).toBe(false);
    // And the limits are stated in the lesson rather than left to the reader.
    const body = nocebo.lesson.body?.en ?? "";
    expect(body).toContain("real");
    expect(body).toContain("selected group");
  });
});
