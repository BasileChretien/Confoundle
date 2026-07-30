import { describe, expect, it } from "vitest";
import { allocationConcealment } from "./allocation-concealment";

const raw = allocationConcealment.setup.data;
if (raw.type !== "rates") throw new Error("expected the rates shape");
const data = raw;

const count = (groupId: string, stratumId: string): { n: number; d: number } => {
  const o = data.observations.find(
    (x) => x.groupId === groupId && x.stratumId === stratumId,
  );
  if (!o) throw new Error(`no observation for ${groupId}/${stratumId}`);
  return { n: o.numerator, d: o.denominator };
};

describe("PHANTASi, and an allocation chance cannot explain", () => {
  it("reconciles the trial five ways", () => {
    const aAlloc = count("antibiotics", "allocation");
    const uAlloc = count("usual-care", "allocation");
    const aDead = count("antibiotics", "deaths");
    const uDead = count("usual-care", "deaths");

    // One: the arms sum to the stated intention-to-treat total.
    expect(aAlloc.n + uAlloc.n).toBe(2672);
    expect(aAlloc.d).toBe(2672);

    // Two: the intervention share matches the 57 per cent reported elsewhere.
    expect(Math.round((100 * aAlloc.n) / aAlloc.d)).toBe(57);

    // Three and four: both arms' mortality rounds to the printed 8 per cent.
    expect(Math.round((100 * aDead.n) / aDead.d)).toBe(8);
    expect(Math.round((100 * uDead.n) / uDead.d)).toBe(8);

    // Five: the two rates give the printed relative risk of 0.95.
    const rr = aDead.n / aDead.d / (uDead.n / uDead.d);
    expect(Number(rr.toFixed(2))).toBe(0.96);
    expect(rr).toBeGreaterThan(0.94);
    expect(rr).toBeLessThan(0.97);
  });

  it("keeps the mortality denominators equal to the arm sizes", () => {
    // If these ever drift apart the puzzle is quoting two different trials.
    expect(count("antibiotics", "deaths").d).toBe(count("antibiotics", "allocation").n);
    expect(count("usual-care", "deaths").d).toBe(count("usual-care", "allocation").n);
  });

  it("is at least seven standard deviations from a fair one to one split", () => {
    const total = 2672;
    const observed = count("antibiotics", "allocation").n;
    const expected = total / 2;
    const sd = Math.sqrt(total * 0.25);
    expect((observed - expected) / sd).toBeGreaterThan(7);
  });

  it("shows the allocation alone in the setup, which is forced", () => {
    // The mortality stratum carries 1535 and 1137 as denominators, so showing
    // it first would print the arm sizes and give the answer away.
    const view = allocationConcealment.setup.initialView;
    expect(view.kind).toBe("stratified");
    if (view.kind !== "stratified") throw new Error("unreachable");
    expect(view.strataIds).toEqual(["allocation"]);
  });

  it("never pools two countings that are not one population", () => {
    expect(data.strataAreSeparateSamples).toBe(true);
  });

  it("marks the hedge wrong, and the framing has to earn that", () => {
    const hedge = allocationConcealment.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
    const framing = allocationConcealment.setup.framing.en;
    // All three facts the inference needs. Cut any one and the hedge is fair.
    expect(framing).toContain("one to one");
    expect(framing).toContain("blocks of four");
    expect(framing).toContain("sealed envelopes");
  });

  it("keeps concealment and blinding apart, which is the examinable distinction", () => {
    // France examines this at rang A. A lesson that says "the trial was not
    // blinded" has not taught allocation concealment.
    const body = allocationConcealment.lesson.body?.en ?? "";
    expect(body).toContain("Blinding is about who knows the assignment after");
    expect(body).toContain("Concealment is about who can see the assignment before");
  });

  it("refuses to turn this into an accusation", () => {
    // The crews were trying to help patients. If this puzzle ever reads as a
    // fraud story it has misrepresented the source and the mechanism.
    const revealBody = allocationConcealment.reveal.body?.en ?? "";
    expect(revealBody).toContain("Nobody here was cheating for gain");
    expect(revealBody).toContain("retrained the crews");
  });

  it("states the three limits in the provenance note", () => {
    const note = allocationConcealment.provenance.note?.en ?? "";
    // That the seven sigma figure is deliberately conservative under blocking.
    expect(note).toContain("conservative");
    // That this is not an allegation of misconduct.
    expect(note).toContain("not an accusation of misconduct");
    // And that an unequal ratio proves non-randomness, not prognostic imbalance.
    expect(note).toContain("does not by itself measure how different");
  });
});
