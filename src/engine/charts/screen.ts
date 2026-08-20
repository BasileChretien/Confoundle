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
  if (shareReal === null || Number.isNaN(shareReal)) return null;
  /*
    A HALF IS NOT A MAJORITY, AND NEITHER IS ANYTHING THAT PRINTS AS ONE.
    The exact tie is reachable on the shipped figure: 48 with the condition
    gives 48 real positives out of 96, and a plain `> 0.5` called that "most of
    them do not" beside a figure reading 50%.

    The band is here for the same reason one step out. The share is drawn to
    the nearest whole percent, so every value within half a point of a half
    DISPLAYS as 50%, and a claim of a majority beside that number contradicts
    the number. Not reachable on `medical-test`, where no position lands in the
    band, which is exactly why it is written down: this shape has already had
    one bug hidden by that puzzle's convenient arithmetic.
  */
  if (Math.abs(shareReal - 0.5) < 0.005) return null;
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
 * `reversible` does for the Simpson mixer.
 *
 * THE ENDS ARE THE ENDS, and an earlier version took them one step inside on
 * the grounds that an empty arm is degenerate. That was wrong twice over. It is
 * not degenerate: a population with none of the condition is exactly the case
 * where every positive is a false one, which is the lesson rather than an edge
 * of it. And stepping inside made this function abort on `courtroom-odds`,
 * whose 12,000,000 / 1 / 1 / 1 produces a 1-against-1 TIE at one person, so
 * `mostAreReal` returned null and the whole check gave up. The consequence was
 * not a wrong answer but a false STORY: six places in this repo said that
 * puzzle passes every structural check and is refused only by
 * `baseRateCanVary`, when in fact the arithmetic was quietly refusing it and
 * the flag was doing nothing. At the true ends it passes, the flag is what
 * stops it, and the sentence is true.
 */
export function flips(model: ScreenModel): boolean {
  const low = mostAreReal(model, 0);
  const high = mostAreReal(model, model.total);
  return low !== null && high !== null && low !== high;
}

/**
 * THE TOY IS OFFERED ONLY WHERE MOVING THE BASE RATE IS A SENSIBLE QUESTION,
 * and that is not something the numbers can tell you.
 *
 * `courtroom-odds` has exactly this shape: a total, a count that did it, and
 * how many fit the description either way. Its verdict flips from "fewer than
 * half" at nobody to "more than half" at everybody, its table is complete, and
 * every structural check here passes: with the flag set it WOULD be offered,
 * which is what makes the flag load-bearing rather than decorative. It is
 * still nonsense to drag, because ONE CRIME HAPPENED and "how many couples did
 * it" is not a dial a reader can turn; inviting them to turn it teaches that
 * the base rate is a matter of opinion. For a screening test the same dial is
 * the whole clinical point, because the base rate is a property of WHO YOU
 * TEST and the reader really does choose that.
 *
 * No arrangement of the counts distinguishes those two, so the puzzle declares
 * it. `baseRateCanVary` is opt-in and optional: a `frequencies` puzzle that
 * says nothing gets no toy, which is the safe direction to fail.
 */
export function canScreen(data: PuzzleData): data is FrequenciesData {
  if (data.type !== "frequencies") return false;
  if (data.baseRateCanVary !== true) return false;
  /*
    THESE TWO ARE BELT AND BRACES, AND THE TESTS BELOW CANNOT ISOLATE THEM.
    A population with only one kind of person in it, or a test that catches
    nobody, is already refused by `flips`: the first divides by zero and gives
    a NaN share, the second produces no positives at either end, and both land
    on the null that `flips` treats as "no answer". Deleting either line
    therefore changes no outcome, and review showed that the tests naming them
    stay green without them.

    They are kept because they say what the shape requires, in the place a
    reader looks for it, and because relying on NaN propagation to refuse bad
    data is a guarantee nobody should have to reconstruct. What is NOT claimed
    is that they are load-bearing.
  */
  if (data.withCondition <= 0 || data.total - data.withCondition <= 0) return false;
  if (data.positiveGivenCondition <= 0) return false;
  return flips(screenModel(data));
}
