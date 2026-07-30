import { describe, expect, it } from "vitest";
import { hawthorneEffect } from "./hawthorne-effect";

const raw = hawthorneEffect.setup.data;
if (raw.type !== "rates") throw new Error("expected the rates shape");
const data = raw;

const count = (groupId: string, stratumId: string): { n: number; d: number } => {
  const o = data.observations.find(
    (x) => x.groupId === groupId && x.stratumId === stratumId,
  );
  if (!o) throw new Error(`no observation for ${groupId}/${stratumId}`);
  return { n: o.numerator, d: o.denominator };
};

/**
 * Every integer numerator this puzzle authors is DECODED from Table 2, which
 * prints pair counts and a percentage to one decimal place. The decoding is only
 * legitimate if exactly one integer reproduces the printed percentage, so that
 * is asserted here rather than assumed.
 */
const candidates = (pct: number, n: number): number[] => {
  const out: number[] = [];
  for (let k = 0; k <= n; k++) {
    if (Number(((100 * k) / n).toFixed(1)) === pct) out.push(k);
  }
  return out;
};

describe("Wu et al. 2018, the Hawthorne effect by setting", () => {
  it("decodes every authored count uniquely from the printed percentages", () => {
    expect(candidates(80.6, 880)).toEqual([709]);
    expect(candidates(69.2, 880)).toEqual([609]);
    expect(candidates(64.7, 133)).toEqual([86]);
    expect(candidates(24.1, 133)).toEqual([32]);
  });

  it("authors exactly those decoded counts and nothing else", () => {
    expect(count("overt", "icu")).toEqual({ n: 709, d: 880 });
    expect(count("covert", "icu")).toEqual({ n: 609, d: 880 });
    expect(count("overt", "opd")).toEqual({ n: 86, d: 133 });
    expect(count("covert", "opd")).toEqual({ n: 32, d: 133 });
    expect(data.observations).toHaveLength(4);
  });

  it("never touches the rows that cannot be decoded", () => {
    // The overall row (3,047 pairs) and the nurse row (2,105) admit three and
    // two candidate numerators. If either ever appears here, the puzzle has
    // started guessing.
    expect(candidates(78.2, 3047).length).toBeGreaterThan(1);
    expect(candidates(84.2, 2105).length).toBeGreaterThan(1);
    const denominators = data.observations.map((o) => o.denominator);
    expect(denominators).not.toContain(3047);
    expect(denominators).not.toContain(2105);
  });

  it("reproduces the paper's own Hawthorne effect column, which is the outside check", () => {
    const gap = (stratumId: string) =>
      (100 * count("overt", stratumId).n) / count("overt", stratumId).d -
      (100 * count("covert", stratumId).n) / count("covert", stratumId).d;
    expect(Number(gap("icu").toFixed(1))).toBe(11.4);
    expect(Number(gap("opd").toFixed(1))).toBe(40.6);
  });

  it("makes the outpatient gap roughly four times the intensive care one", () => {
    const gap = (stratumId: string) =>
      (100 * count("overt", stratumId).n) / count("overt", stratumId).d -
      (100 * count("covert", stratumId).n) / count("covert", stratumId).d;
    const ratio = gap("opd") / gap("icu");
    expect(ratio).toBeGreaterThan(3);
    expect(ratio).toBeLessThan(4);
  });

  it("shows intensive care alone in the setup", () => {
    const view = hawthorneEffect.setup.initialView;
    expect(view.kind).toBe("stratified");
    if (view.kind !== "stratified") throw new Error("unreachable");
    expect(view.strataIds).toEqual(["icu"]);
  });

  it("never pools two locations that are not one population", () => {
    expect(data.strataAreSeparateSamples).toBe(true);
  });

  it("marks the hedge wrong, and the framing has to earn that", () => {
    const hedge = hawthorneEffect.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
    // The inference is that the auditor is a bigger change in some places than
    // others. If this contrast is cut, the hedge becomes defensible.
    const framing = hawthorneEffect.setup.framing.en;
    expect(framing).toContain("within sight of one another all day");
    expect(framing).toContain("move between rooms alone");
  });

  it("says the Hawthorne studies do not support the Hawthorne effect", () => {
    // The plan's central worry. If this puzzle ever presents the 1920s
    // illumination experiments as its evidence it has become the failure this
    // project exists to attack.
    const body = hawthorneEffect.lesson.body?.en ?? "";
    expect(body).toContain("the tidy pattern largely dissolves");
    expect(body).toContain("the study it is named after is not that evidence");
  });

  it("records the decoding and the three limits in the provenance note", () => {
    const note = hawthorneEffect.provenance.note?.en ?? "";
    expect(note).toContain("decoded rather than printed");
    expect(note).toContain("No other integer rounds to the figures the paper prints");
    // One hospital, a small outpatient row, and matched pairs are not randomised.
    expect(note).toContain("133 pairs");
    expect(note).toContain("not randomised");
  });
});
