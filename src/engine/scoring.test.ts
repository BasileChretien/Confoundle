import { describe, it, expect } from "vitest";
import { ALL_DICTIONARIES as DICTIONARIES } from "../app/translations/all";
import { CONFIDENCE_LEVELS, reactionFor, scoreFor, type Confidence } from "./scoring";

/**
 * The module that produces the player-facing number had no test at all, in a
 * repo that machine-enforces translation coverage, palette slots, chart locale
 * numerals, hedge tells and planning-doc freshness. This is that test.
 *
 * It does two jobs. It closes the same computed-key translation hole that
 * `charts/scopeLabels.test.ts` closes, because `reactionFor` also returns bare
 * English which `RevealView` wraps as `t({ en: reactionFor(...) })`, a computed
 * argument that `inlineChrome.test.ts` cannot match and `coverage.test.ts`
 * cannot reach. And it PINS THE KNOWN DEFECT in the payoff table so that the
 * fix cannot be quietly forgotten and the table cannot be quietly changed.
 */

/** Expected score of a stake, given the player's own belief `p` that they are right. */
function ev(c: Confidence, p: number): number {
  return p * scoreFor(true, c) + (1 - p) * scoreFor(false, c);
}

/** Belief at which two stakes have equal expected value. */
function crossing(a: Confidence, b: Confidence): number {
  const slopeA = scoreFor(true, a) - scoreFor(false, a);
  const slopeB = scoreFor(true, b) - scoreFor(false, b);
  return (scoreFor(false, b) - scoreFor(false, a)) / (slopeA - slopeB);
}

describe("scoreFor", () => {
  it("pays more for a bolder correct call and costs more for a bolder miss", () => {
    expect(scoreFor(true, "hunch")).toBeLessThan(scoreFor(true, "sure"));
    expect(scoreFor(true, "sure")).toBeLessThan(scoreFor(true, "certain"));
    expect(scoreFor(false, "hunch")).toBeGreaterThan(scoreFor(false, "sure"));
    expect(scoreFor(false, "sure")).toBeGreaterThan(scoreFor(false, "certain"));
  });
});

describe("the payoff table is not a proper scoring rule (KNOWN, PENDING)", () => {
  /*
    THIS BLOCK ENCODES A DEFECT, NOT A REQUIREMENT. It asserts what the table
    does today so that the table cannot change without somebody deciding to,
    and so the defect has a name in the suite rather than living only in a
    review comment.

    All three expected-value lines (10p, 25p-5, 40p-10) meet at the same point,
    p = 1/3. The consequences: "certain" strictly dominates for any player who
    is better than a guess, and "fairly sure" is never uniquely optimal at any
    belief whatsoever, so the middle rung of a three-rung calibration scale is
    a dead button. On a deck whose subject is calibration, the rule pays for
    exactly the overclaiming the curriculum exists to correct, and the app
    contradicts itself: `schedule.ts` demotes a certain miss by three stages
    and clamps it to the apprentice ceiling, and the Confounder mocks the
    player for it, while the score rewards it and the score is what reaches the
    share line and the friends board.

    WHEN THE CONFIDENCE PAYOFFS ARE REPLACED, DELETE THIS BLOCK AND ASSERT THE
    OPPOSITE: that the crossings are strictly increasing, so that each stake is
    uniquely optimal on a non-empty interval of belief and honest reporting
    maximises expected score. The commented assertion below is that test,
    ready to be swapped in.
  */
  it("has all three stakes crossing at one point, so the middle is unreachable", () => {
    expect(crossing("hunch", "sure")).toBeCloseTo(1 / 3, 10);
    expect(crossing("sure", "certain")).toBeCloseTo(1 / 3, 10);
    expect(crossing("hunch", "certain")).toBeCloseTo(1 / 3, 10);

    // "Fairly sure" is never strictly best, at any belief, anywhere.
    for (let p = 0; p <= 1.0001; p += 0.01) {
      const best = Math.max(ev("hunch", p), ev("sure", p), ev("certain", p));
      expect(ev("sure", p)).toBeLessThanOrEqual(best + 1e-9);
      if (Math.abs(p - 1 / 3) > 0.02) {
        expect(ev("sure", p)).toBeLessThan(best - 1e-9);
      }
    }

    // The replacement, once the table is proper:
    //   expect(crossing("hunch", "sure")).toBeLessThan(crossing("sure", "certain"));
  });
});

describe("reaction lines", () => {
  const ALL = [true, false].flatMap((correct) =>
    CONFIDENCE_LEVELS.map((c) => ({ correct, c, line: reactionFor(correct, c) })),
  );

  it("gives every (outcome, stake) pair a distinct line", () => {
    expect(ALL.every((x) => x.line.length > 0)).toBe(true);
    expect(new Set(ALL.map((x) => x.line)).size).toBe(ALL.length);
  });

  it("never reproaches a player who hedged and missed", () => {
    /*
      A hunch is doubt about YOUR OWN ANSWER, not a suspicion about the data.
      The line here used to read "You sensed something was off, but went with
      it anyway", which told a player who had staked almost nothing and missed
      that they had been negligent. That is the calibration form of marking a
      well-reasoning player wrong to land a sting, and the rule against that
      outranks the sting. A guard rather than a wording preference, because the
      wording is exactly what drifted last time.
    */
    const line = reactionFor(false, "hunch").toLowerCase();
    for (const reproach of ["anyway", "should have", "but you went", "ignored"]) {
      expect(line, `hedge-and-miss line reproaches the player: ${line}`).not.toContain(
        reproach,
      );
    }
  });

  it("makes no claim about how many other people were fooled", () => {
    /*
      "So does almost everyone. That's the trap." was an unsourced universal
      quantifier in the app's own voice, printed on every sure-and-wrong answer
      of every puzzle, three lines above `CompanyLine`, which reads the real
      tally and applies a twenty-answer floor before saying anything at all.
      Population claims belong to the component that has the numbers.
    */
    for (const { line } of ALL) {
      const lowered = line.toLowerCase();
      for (const claim of ["everyone", "most people", "nobody", "% of"]) {
        expect(lowered, `reaction line makes a population claim: ${line}`).not.toContain(
          claim,
        );
      }
    }
  });

  it("has every line in all nine dictionaries", () => {
    const locales = Object.keys(DICTIONARIES) as Array<keyof typeof DICTIONARIES>;
    const missing: string[] = [];
    for (const { line } of ALL) {
      for (const locale of locales) {
        if (!(line in DICTIONARIES[locale])) {
          missing.push(`${locale}: ${JSON.stringify(line)}`);
        }
      }
    }
    expect(
      missing,
      `Reaction lines missing from dictionaries. These reach the reveal beat ` +
        `through a computed key, which neither the coverage test nor the ` +
        `inline-chrome scan can see:\n` + missing.join("\n"),
    ).toEqual([]);
  });
});
