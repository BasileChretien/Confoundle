import { describe, expect, it } from "vitest";
import { misinformationEffect } from "./misinformation-effect";

/**
 * Loftus and Palmer print Table 2 as counts and then state the resulting
 * probabilities in their own prose. That gives a third check on top of the two
 * arithmetic ones, and all three are asserted here rather than trusted.
 */
const raw = misinformationEffect.setup.data;
if (raw.type !== "rates") throw new Error("expected the rates shape");
const data = raw;

const count = (groupId: string): { n: number; d: number } => {
  const o = data.observations.find((x) => x.groupId === groupId);
  if (!o) throw new Error(`no observation for ${groupId}`);
  return { n: o.numerator, d: o.denominator };
};

describe("Loftus and Palmer 1974, experiment 2", () => {
  it("reconciles the table three ways", () => {
    const smashed = count("smashed");
    const hit = count("hit");
    const control = count("control");

    // One: every condition had fifty people, and Table 2's yes and no cells
    // sum to that. The no cells are 34, 43 and 44.
    expect(smashed.d).toBe(50);
    expect(hit.d).toBe(50);
    expect(control.d).toBe(50);
    expect(smashed.n + 34).toBe(50);
    expect(hit.n + 43).toBe(50);
    expect(control.n + 44).toBe(50);

    // Two: the three groups sum to the 150 students the Method section states.
    expect(smashed.d + hit.d + control.d).toBe(150);

    // Three: the paper's own prose gives P(Y) as .32 for smashed and .14 for
    // hit, which must recompute from the counts.
    expect(smashed.n / smashed.d).toBeCloseTo(0.32, 5);
    expect(hit.n / hit.d).toBeCloseTo(0.14, 5);
  });

  it("more than doubles against hit, which is the answer", () => {
    expect(count("smashed").n).toBeGreaterThan(2 * count("hit").n);
  });

  it("keeps hit and control almost identical, which is what makes the reveal", () => {
    // Seven against six. If these ever diverge the setup stops reading as
    // "the wording changed nothing" and the puzzle loses its hinge.
    expect(Math.abs(count("hit").n - count("control").n)).toBeLessThanOrEqual(1);
  });

  it("hides the smashed group in the setup and shows all three in the reveal", () => {
    const view = misinformationEffect.setup.initialView;
    expect(view.groupIds).toEqual(["control", "hit"]);
    expect(misinformationEffect.reveal.view.groupIds).toBeUndefined();
  });

  it("counts a report of broken glass as a bad outcome, since there was none", () => {
    expect(data.higherIsBetter).toBe(false);
  });

  it("marks the hedge wrong, and the framing has to earn that", () => {
    const hedge = misinformationEffect.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
    // The hedge is only defensible if the framing withholds the inference. It
    // supplies the verb's effect on speed and the link from speed to glass, so
    // if either sentence is ever cut this test should fail first.
    const framing = misinformationEffect.setup.framing.en;
    expect(framing).toContain("40.5");
    expect(framing).toContain("34.0");
    expect(framing).toContain("broken glass is the sort of thing you expect");
  });

  it("never authors from experiment 1, whose cells hold nine people", () => {
    // Experiment 1 is context and deep dive only. Its numbers may appear in
    // prose but must never become observations.
    const counts = data.observations.map((o) => `${o.numerator}/${o.denominator}`);
    expect(counts.sort()).toEqual(["16/50", "6/50", "7/50"]);
    const deepDive = misinformationEffect.lesson.examples?.[0]?.summary.en ?? "";
    expect(deepDive).toContain("nine per verb");
  });

  it("says outright that there was no broken glass in the film", () => {
    // Without this the puzzle is about exaggeration rather than about a memory
    // of something that never existed, which is the whole distinction from
    // the shipped framing-effect puzzle.
    expect(misinformationEffect.setup.framing.en).toContain(
      "There was no broken glass in the film",
    );
  });

  it("keeps the limits in the provenance note", () => {
    const note = misinformationEffect.provenance.note?.en ?? "";
    // The 40.5 correction, so nobody silently restores the widespread 40.8.
    expect(note).toContain("40.8");
    // And that this is one 1974 study of students, not a settled science.
    expect(note).toContain("1974");
    expect(note).toContain("random sample");
  });
});
