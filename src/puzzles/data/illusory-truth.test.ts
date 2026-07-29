import { describe, it, expect } from "vitest";
import { illusoryTruth } from "./illusory-truth";
import { Puzzle } from "../schema";
import {
  firstStepGain,
  firstStepShare,
  plotX,
  points,
  remainingDoses,
  restrictDose,
  totalGain,
} from "../../engine/charts/dose";

const data = illusoryTruth.setup.data;
if (data.type !== "dose") {
  throw new Error("illusoryTruth must use the dose shape");
}

const step = (id: string) => data.steps.find((s) => s.id === id)!;

describe("illusory-truth seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(illusoryTruth).success).toBe(true);
  });

  it("matches the published Experiment 2 table", () => {
    expect(step("d0")).toMatchObject({ dose: 0, mean: 3.64, sd: 0.65 });
    expect(step("d1")).toMatchObject({ dose: 1, mean: 4.26, sd: 0.83 });
    expect(step("d9")).toMatchObject({ dose: 9, mean: 4.78, sd: 1.01 });
    expect(step("d18")).toMatchObject({ dose: 18, mean: 4.72, sd: 1.02 });
    expect(step("d27")).toMatchObject({ dose: 27, mean: 4.87, sd: 0.99 });
    expect(data.scaleMin).toBe(1);
    expect(data.scaleMax).toBe(6);
  });

  it("shows the effect it teaches: the first showing buys about half the climb", () => {
    expect(totalGain(data)).toBeCloseTo(1.23, 10);
    expect(firstStepGain(data)).toBeCloseTo(0.62, 10);
    // Half, not "all": the lesson is a share, and the reveal says as much.
    expect(firstStepShare(data)).toBeGreaterThan(0.45);
    expect(firstStepShare(data)).toBeLessThan(0.55);
    expect(remainingDoses(data)).toBe(26);
  });

  it("never claims the later showings did nothing", () => {
    // Only the paper's Experiment 1 shows a total plateau. This is Experiment 2,
    // where 9, 18 and 27 showings all still beat a single showing. Overstating
    // that is the single easiest way to make this puzzle false.
    const prose = [
      illusoryTruth.reveal.explanation.en,
      illusoryTruth.reveal.body?.en ?? "",
      illusoryTruth.lesson.takeaway.en,
    ].join(" ");
    expect(prose).not.toMatch(/no (?:further )?effect|did nothing more|stops working/i);
    expect(illusoryTruth.reveal.body?.en).toMatch(/were not doing nothing/i);
    expect(illusoryTruth.provenance.note?.en).toMatch(/must not be overstated/i);
    // The curve genuinely still rises after the first step, so prose that said
    // otherwise would contradict the authored data.
    expect(step("d27").mean).toBeGreaterThan(step("d1").mean);
  });

  it("gives the framing the two facts the deduction needs", () => {
    // Winnability rests on these. The stated scale rules out a proportional
    // answer, and the first step gives the direction. Remove either and the
    // hedge quietly becomes correct.
    const framing = illusoryTruth.setup.framing.en;
    expect(framing).toMatch(/from 1 to 6/);
    expect(framing).toContain("3.64");
    expect(framing).toContain("4.26");
    // A proportional climb would land far off the top of the stated scale,
    // which is precisely why "far higher" is impossible rather than unlikely.
    const proportional = step("d0").mean + 27 * firstStepGain(data);
    expect(proportional).toBeGreaterThan(data.scaleMax);
  });

  it("marks the hedge wrong and traps the proportional intuition", () => {
    const hedge = illusoryTruth.choices.find((c) => c.id === "cannot-tell")!;
    expect(hedge.isCorrect).toBe(false);
    expect(illusoryTruth.choices.find((c) => c.isCorrect)!.id).toBe("barely");
    expect(illusoryTruth.choices.find((c) => c.isIntuitiveTrap)!.id).toBe("proportional");
  });

  it("opens on the first two points, then draws the whole curve", () => {
    const setup = restrictDose(data, illusoryTruth.setup.initialView);
    expect(setup.steps.map((s) => s.id)).toEqual(["d0", "d1"]);
    expect(illusoryTruth.setup.initialView.kind).toBe("partial");
    expect(restrictDose(data, illusoryTruth.reveal.view).steps).toHaveLength(5);
    expect(illusoryTruth.reveal.view.kind).toBe("curve");
  });

  it("draws the curve against the real dose, which is what makes it honest", () => {
    // Spacing the five doses evenly would put the single first showing a
    // quarter of the way across and flatten the cliff into a slope. In a deck
    // that ships a misleading-axis lesson, that would be indefensible.
    const xs = points(data).map((p) => p.x);
    expect(xs[1]).toBeCloseTo(1 / 27, 10);
    expect(xs[1]).toBeLessThan(0.05);
    expect(plotX(27, data)).toBeCloseTo(1, 10);
  });

  it("stays non-partisan, which is why this source was chosen", () => {
    expect(illusoryTruth.provenance.note?.en).toMatch(/neutral trivia/i);
    expect(illusoryTruth.provenance.note?.en).toMatch(/non-partisan/i);
  });
});
