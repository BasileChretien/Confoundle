import { describe, expect, it } from "vitest";
import { statisticalPower } from "./statistical-power";

/**
 * A survey has no external figure to reconcile against, so the checks here are
 * the internal orderings that all have to hold if the four counts are read
 * correctly. If any one of them breaks, a digit has been mistyped.
 */
const raw = statisticalPower.setup.data;
if (raw.type !== "rates") throw new Error("expected the rates shape");
const data = raw;

const count = (groupId: string): { n: number; d: number } => {
  const o = data.observations.find((x) => x.groupId === groupId);
  if (!o) throw new Error(`no observation for ${groupId}`);
  return { n: o.numerator, d: o.denominator };
};

// The four figures Freiman prints, kept here so the orderings can be asserted
// even though only two of them are authored as observations.
const MISSED_25 = 67;
const MISSED_50 = 50;
const CI_ALLOWED_25 = 57;
const CI_ALLOWED_50 = 34;
const TOTAL = 71;

describe("Freiman et al. 1978, the survey of 71 negative trials", () => {
  it("derives the four from the sixty-seven, over seventy-one", () => {
    const adequate = count("could-have-found-it");
    expect(adequate.d).toBe(TOTAL);
    expect(adequate.n).toBe(TOTAL - MISSED_25);
    expect(adequate.n).toBe(4);
  });

  it("shows every trial reporting nothing, which is the setup's whole point", () => {
    const reported = count("reported-nothing");
    expect(reported.n).toBe(TOTAL);
    expect(reported.d).toBe(TOTAL);
  });

  it("holds all three internal orderings", () => {
    // A smaller improvement is harder to detect, so more trials could miss it.
    expect(MISSED_25).toBeGreaterThan(MISSED_50);
    // The same ordering under the confidence interval criterion.
    expect(CI_ALLOWED_25).toBeGreaterThan(CI_ALLOWED_50);
    // The power criterion is the stricter of the two, at both effect sizes.
    expect(MISSED_25).toBeGreaterThan(CI_ALLOWED_25);
    expect(MISSED_50).toBeGreaterThan(CI_ALLOWED_50);
  });

  it("hides the capability in the setup and shows both in the reveal", () => {
    expect(statisticalPower.setup.initialView.groupIds).toEqual(["reported-nothing"]);
    expect(statisticalPower.reveal.view.groupIds).toBeUndefined();
  });

  it("marks the hedge wrong, and the framing has to earn that", () => {
    const hedge = statisticalPower.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
    // The inference the reader needs is that the question is about size. If
    // this sentence is ever cut, the hedge becomes defensible.
    expect(statisticalPower.setup.framing.en).toContain("was each trial large enough");
  });

  it("keeps the two error types apart, which is the examinable part", () => {
    // France examines this at rang A and the USMLE names it. A lesson that
    // teaches "small studies are bad" without naming the type II error has not
    // covered the thing the blueprints ask for.
    const how = statisticalPower.lesson.howItWorks?.en ?? "";
    expect(how).toContain("type I error");
    expect(how).toContain("type II error");
    expect(how).toContain("power is never a property of a study alone");
  });

  it("refuses to overclaim, in both directions", () => {
    const body = statisticalPower.lesson.body?.en ?? "";
    // Not "the treatments worked".
    expect(body).toContain("It was that nobody had found out");
    // And the reveal must not say the treatments do work either.
    expect(statisticalPower.reveal.body?.en ?? "").toContain("failed to show anything");
  });

  it("dates the finding rather than implying the field is unchanged", () => {
    const note = statisticalPower.provenance.note?.en ?? "";
    expect(note).toContain("1978");
    expect(note).toContain("not of today");
    // Relative against absolute, which relative-risk teaches and this must not blur.
    expect(note).toContain("not a difference of twenty-five percentage points");
    // And that a survey is not a random sample.
    expect(note).toContain("rather than a random sample");
  });
});
