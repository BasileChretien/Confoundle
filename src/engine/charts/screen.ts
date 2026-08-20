import type { FrequenciesData, PuzzleData } from "../../puzzles/schema";

/**
 * The screening mixer: what a positive result is worth, as something you cause.
 *
 * WHAT IT DOES. The test's two characteristics are held exactly as measured and
 * never move: how often it catches the condition, and how often it fires on
 * somebody who does not have it. The only thing the reader changes is HOW
 * COMMON THE CONDITION IS AMONG THE PEOPLE TESTED. Drag it and the share of
 * positives that are real swings from almost none to almost all.
 *
 * That is the whole of base-rate neglect, and it is the one thing a static
 * frequency tree cannot show: the tree is a photograph of one prevalence. The
 * reveal already draws the counts; this lets somebody drive the thing between
 * them, and the point that lands is that the SAME TEST is trustworthy or
 * useless depending on who you point it at.
 *
 * IT IS A COUNTERFACTUAL AND MUST READ AS ONE. The test characteristics are
 * measured; the prevalence is invented, so every count it draws except at the
 * authored base rate is a what-if. It is offered after the reveal, where
 * nothing is scored, so the hedge rule has no purchase on it.
 *
 * NOTHING HERE KNOWS WHAT THE CONDITION IS. Which way round the labels read,
 * and whether moving the base rate is even a sensible question, are facts about
 * the puzzle rather than about this module: see `canScreen`.
 */

export interface ScreenModel {
  /** Everyone in the authored figure. The slider moves a count out of this. */
  total: number;
  /** The authored base rate, which the toy must reproduce exactly. */
  authoredWithCondition: number;
  /** Caught, out of those who have it. A property of the TEST. Never varies. */
  sensitivity: number;
  /** Fired, out of those who do not. A property of the TEST. Never varies. */
  falsePositiveRate: number;
}

export interface ScreenFrame {
  withCondition: number;
  /** Positives that are real, at this base rate. */
  truePositives: number;
  /** Positives that are not. */
  falsePositives: number;
  /** The share of positives that are real, or null when nobody tests positive. */
  shareReal: number | null;
}

/** The fixed characteristics, read off the authored counts. */
export function screenModel(data: FrequenciesData): ScreenModel {
  const without = data.total - data.withCondition;
  return {
    total: data.total,
    authoredWithCondition: data.withCondition,
    sensitivity: data.positiveGivenCondition / data.withCondition,
    falsePositiveRate: without === 0 ? 0 : data.positiveGivenNoCondition / without,
  };
}

/**
 * The counts at a given base rate.
 *
 * THE COUNTS ARE ROUNDED AND THE SHARE IS COMPUTED FROM THE ROUNDED COUNTS, on
 * purpose. The alternative is a share taken from the unrounded rates, which is
 * more precise and which a reader cannot check: they would see 1 and 50 on the
 * page and a percentage that is not 1/51. A figure whose own arithmetic does
 * not close is worse than one that is a fraction of a person out, especially
 * this figure, whose entire job is to make the division feel obvious.
 */
export function screenFrame(model: ScreenModel, withCondition: number): ScreenFrame {
  const clamped = Math.min(model.total, Math.max(0, Math.round(withCondition)));
  const truePositives = Math.round(clamped * model.sensitivity);
  const falsePositives = Math.round((model.total - clamped) * model.falsePositiveRate);
  const positives = truePositives + falsePositives;
  return {
    withCondition: clamped,
    truePositives,
    falsePositives,
    shareReal: positives === 0 ? null : truePositives / positives,
  };
}

/**
 * Whether MOST positives are real at this base rate, or null when there is no
 * majority to report.
 *
 * The one claim the figure makes in words, so it is a function with a test
 * rather than a comparison assembled in a renderer.
 *
 * NULL COVERS TWO CASES AND BOTH ARE REACHABLE. Nobody testing positive is the
 * obvious one. The other is an EXACT TIE, and it is not hypothetical: on the
 * shipped figure, 48 people with the condition gives 48 real positives out of
 * 96, and a plain `> 0.5` reported that as "most of them do not", which is
 * false. Half is not a majority in either direction, and a caption that claims
 * one while the figure beside it reads 50% is the figure contradicting itself,
 * which is the failure this whole family of toys is written to avoid.
 */
export function mostAreReal(model: ScreenModel, withCondition: number): boolean | null {
  const { shareReal } = screenFrame(model, withCondition);
  if (shareReal === null) return null;
  if (shareReal === 0.5) return null;
  return shareReal > 0.5;
}

/**
 * Does the answer to "is a positive more likely right than wrong" actually
 * FLIP somewhere on the slider?
 *
 * The property worth refusing to draw without. A toy where most positives are
 * real throughout, or false throughout, is a slider that moves a number without
 * ever changing what the number MEANS, and the caption it exists to earn could
 * never fire.
 *
 * The share is monotonic in the base rate (more of the condition can only add
 * true positives and remove false ones), so the two ends decide it, exactly as
 * `reversible` does for the Simpson mixer. Both ends are taken one step inside
 * the range because at zero and at the total one arm of the comparison is
 * empty, which is a degenerate population rather than a rare one.
 */
export function flips(model: ScreenModel): boolean {
  const low = mostAreReal(model, 1);
  const high = mostAreReal(model, model.total - 1);
  return low !== null && high !== null && low !== high;
}

/**
 * THE TOY IS OFFERED ONLY WHERE MOVING THE BASE RATE IS A SENSIBLE QUESTION,
 * and that is not something the numbers can tell you.
 *
 * `prosecutors-fallacy` has exactly this shape: a total, a count that did it,
 * and how many fit the description either way. The arithmetic works and the
 * share flips, so every structural check here passes. It is still nonsense to
 * drag, because ONE CRIME HAPPENED: "how many couples did it" is not a dial a
 * reader can turn, and inviting them to turn it teaches that the base rate is
 * a matter of opinion. For a screening test the same dial is the whole
 * clinical point, because the base rate is a property of WHO YOU TEST and the
 * reader really does choose that.
 *
 * No arrangement of the counts distinguishes those two, so the puzzle declares
 * it. `baseRateCanVary` is opt-in and optional: a `frequencies` puzzle that
 * says nothing gets no toy, which is the safe direction to fail.
 */
export function canScreen(data: PuzzleData): data is FrequenciesData {
  if (data.type !== "frequencies") return false;
  if (data.baseRateCanVary !== true) return false;
  // A test that catches nobody, or a population with only one kind of person
  // in it, has no share of real positives to talk about.
  if (data.withCondition <= 0 || data.total - data.withCondition <= 0) return false;
  if (data.positiveGivenCondition <= 0) return false;
  return flips(screenModel(data));
}
