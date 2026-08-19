import { describe, it, expect } from "vitest";
import { ALL_DICTIONARIES as DICTIONARIES } from "../app/translations/all";
import { isAcceptableScore } from "../server/scoreBounds";
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
 * cannot reach. And it holds the payoff table to being a PROPER rule, so the
 * property that makes the wager mean what it says cannot be lost again by
 * somebody retuning the numbers with a green suite.
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

describe("the payoff table rewards saying what you believe", () => {
  /*
    THIS BLOCK REPLACED ONE THAT PINNED A DEFECT. The old table paid 10/20/30
    and 0/-5/-10, whose expected-value lines are 10p, 25p-5 and 40p-10: all
    three met at p = 1/3, so "certain" strictly dominated for anybody better
    than a guess and "fairly sure" was never uniquely optimal at any belief.

    It asserts the SHAPE rather than the figures, deliberately. The numbers can
    be retuned; what must survive is that each stake is uniquely best on a real
    interval of belief. Pinning the numbers instead would let somebody "tune"
    the table straight back into degeneracy with a green suite, which is how
    the property was lost the first time.
  */

  it("gives each stake a real interval of belief where it is uniquely best", () => {
    const lo = crossing("hunch", "sure");
    const hi = crossing("sure", "certain");

    // Ordered crossings are the whole property. Equal crossings are exactly
    // the old defect: the middle band collapses to a point.
    expect(lo).toBeLessThan(hi);
    expect(lo).toBeGreaterThan(0);
    expect(hi).toBeLessThan(1);

    const bestAt = (p: number): Confidence => {
      let best: Confidence = "hunch";
      for (const c of CONFIDENCE_LEVELS) if (ev(c, p) > ev(best, p)) best = c;
      return best;
    };

    // A point strictly inside each band picks that band's stake.
    expect(bestAt(lo / 2)).toBe("hunch");
    expect(bestAt((lo + hi) / 2)).toBe("sure");
    expect(bestAt((hi + 1) / 2)).toBe("certain");
  });

  it("leaves no stake that is never worth choosing", () => {
    const everBest = new Set<Confidence>();
    for (let p = 0.001; p < 1; p += 0.001) {
      let best: Confidence = "hunch";
      for (const c of CONFIDENCE_LEVELS) if (ev(c, p) > ev(best, p)) best = c;
      everBest.add(best);
    }
    expect(
      [...everBest].sort(),
      "a stake that is optimal at no belief is a dead button on a calibration scale",
    ).toEqual([...CONFIDENCE_LEVELS].sort());
  });

  it("pays more for boldness only where boldness is warranted", () => {
    // Bolder stakes must have strictly steeper lines, or the ordering above
    // could hold by accident on a table that is not monotone at all.
    const slope = (c: Confidence) => scoreFor(true, c) - scoreFor(false, c);
    expect(slope("hunch")).toBeLessThan(slope("sure"));
    expect(slope("sure")).toBeLessThan(slope("certain"));
  });

  it("stays inside the range the score endpoint accepts", () => {
    /*
      IMPORTED, NOT RETYPED, because a hand-copied bound is exactly the
      defect `declaredColors`, `scopeLabels` and `localeNumerals` exist to
      catch. The endpoint rejects anything outside these with a 400,
      and `global.ts` turns a failed request into a silent null, so a table
      that overflowed would make the percentile quietly disappear rather than
      break loudly.
    */
    for (const c of CONFIDENCE_LEVELS) {
      expect(isAcceptableScore(scoreFor(true, c))).toBe(true);
      expect(isAcceptableScore(scoreFor(false, c))).toBe(true);
    }
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
      of every puzzle, three lines above `CrowdLines`, which reads the real
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

/**
 * WHAT THE CONFOUNDER MAY SAY, which is narrower than what it may be funny about.
 *
 * All six reaction lines are now the app's one character speaking, at the beat
 * where it set the trap. That buys the register a real constraint, and the
 * constraint is not new: two of these six lines were previously replaced for
 * breaking it.
 *
 * "So does almost everyone. That's the trap." was an unsourced universal
 * quantifier printed on every sure-and-wrong answer of every puzzle, three
 * lines above `CrowdLines`, which knows the real number and may say something
 * quite different. A character with a stake in your being wrong cannot be near
 * the numbers, and the deck's whole subject is claims made about populations
 * that the data does not support.
 *
 * The blacklist is the `hedgeTells.test.ts` shape: not a proof, a list of
 * phrases that have actually caused this, meant to grow when review finds
 * another. It reads the English source, which is where these are authored;
 * the nine translations are held to the same rule by the person writing them.
 */
describe("the reaction lines claim nothing about the population", () => {
  const POPULATION_TELLS = [
    "everyone",
    "everybody",
    "most people",
    "most players",
    "nobody",
    "no one",
    "almost all",
    "usually",
    "typically",
    "% of",
  ];

  const LINES = [true, false].flatMap((correct) =>
    CONFIDENCE_LEVELS.map((c) => reactionFor(correct, c)),
  );

  it("catches a tell when there is one", () => {
    // The guard on the guard: a matcher that stopped matching passes silently.
    const offends = (line: string) =>
      POPULATION_TELLS.some((tell) => line.toLowerCase().includes(tell));
    expect(offends("So does almost everyone. That's the trap.")).toBe(true);
    expect(offends("Most people miss this.")).toBe(true);
    expect(offends("Certain, and wrong. Those are the ones I keep.")).toBe(false);
  });

  it("finds none in any line the app can show", () => {
    const offenders = LINES.filter((line) =>
      POPULATION_TELLS.some((tell) => line.toLowerCase().includes(tell)),
    );
    expect(offenders).toEqual([]);
  });

  it("claims the setup rather than the player's particular answer", () => {
    /*
      `reactionFor(false, "sure")` fires for ANY wrong answer, not only for the
      choice a puzzle flags as its intuitive trap. So a line saying "that one
      was built to feel obvious" is false whenever somebody picked a different
      wrong answer, which is the same over-claim as the population line in a
      smaller costume. The setup is authored by this deck; the player's choice
      is not.
    */
    expect(reactionFor(false, "sure")).toContain("setup");
    expect(reactionFor(false, "sure")).not.toContain("that one");
  });

  it("gives all six their own line", () => {
    // A copy-paste that collapsed two states would read as deliberate.
    expect(new Set(LINES).size).toBe(LINES.length);
  });
});

/**
 * WHEREVER THE CHARACTER SPEAKS, ITS NAME IS ON IT.
 *
 * `reactionFor` returns first-person lines now, and there are two call sites,
 * not one. The reveal got the mark and the review screen did not, so a reviewer
 * met "Those are the ones I keep" with no speaker attached: a product talking
 * about itself rather than a character talking to them. The previous copy was
 * neutral and third person, so it was safe unattributed; these lines are not,
 * and nothing structural noticed the difference.
 *
 * The scan is the `declaredColors` shape: it finds the call sites by reading the
 * sources rather than from a list here, so a third one added later is covered
 * without its author knowing this test exists. What it proves is that the two
 * appear in the same file, which is weaker than proving they are adjacent on
 * screen. That is the honest limit of a text scan, and the alternative is a
 * browser this repo does not have.
 */
describe("the character is never anonymous", () => {
  const SOURCES = import.meta.glob("./**/*.tsx", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>;

  const strip = (src: string) =>
    src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

  const callSites = Object.entries(SOURCES).filter(([, src]) =>
    /reactionFor\(/.test(strip(src)),
  );

  it("found the call sites by reading, not from a list", () => {
    // A scan that matched nothing would pass every check below.
    expect(Object.keys(SOURCES).length).toBeGreaterThan(20);
    expect(callSites.length).toBeGreaterThanOrEqual(2);
  });

  it.each(callSites.map(([path]) => path))(
    "%s names the speaker beside the line",
    (path) => {
      const src = strip(SOURCES[path]!);
      expect(src).toMatch(/ConfounderMark/);
    },
  );
});

/**
 * A population claim usually arrives carrying a number, and a number is the one
 * thing a blacklist can see in a language it cannot read.
 *
 * The English blacklist above cannot police the nine translations: a translator
 * could write the local equivalent of "most players" and nothing would fail,
 * exactly as `hedgeTells.test.ts` cannot police translated puzzle content. This
 * does not close that hole. It closes the sharpest corner of it, which is the
 * form the removed line actually took.
 */
describe("no reaction line carries a figure, in any language", () => {
  it("holds across all ten locales", () => {
    const english = [true, false].flatMap((correct) =>
      CONFIDENCE_LEVELS.map((c) => reactionFor(correct, c)),
    );
    const offenders: string[] = [];
    for (const [locale, dict] of Object.entries(DICTIONARIES)) {
      for (const line of english) {
        const translated = (dict as Record<string, string>)[line];
        if (translated && /[0-9%]|[٠-٩০-৯]/.test(translated)) {
          offenders.push(`${locale}: ${translated}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
