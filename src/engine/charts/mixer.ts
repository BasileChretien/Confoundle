import type { PuzzleData, RatesData } from "../../puzzles/schema";

/**
 * The Simpson's mixer: the reversal as something you cause rather than read.
 *
 * WHAT IT DOES. Each group's success rate WITHIN each stratum is held exactly
 * as measured and never moves. The only thing the reader changes is who got the
 * hard cases. Drag it far enough and the overall winner swaps, while both
 * stratum comparisons sit where they always were.
 *
 * That is the whole of Simpson's paradox, and it is the one thing a static
 * chart cannot show: the pooled number moving on its own while nothing
 * underneath it changes. The reveal already draws both views; this lets
 * somebody drive the thing between them.
 *
 * IT IS A COUNTERFACTUAL AND MUST READ AS ONE. The rates are measured; the mix
 * is invented, so every number it draws except the stratum rates is a what-if.
 * The caption says so and the shape is only offered after the reveal, where
 * nothing is being scored. It answers no question and grades nothing, so the
 * hedge rule has no purchase on it: there is no band to get wrong.
 *
 * TWO GROUPS AND TWO STRATA, and it refuses anything else rather than
 * pretending. One slider cannot describe a three-way split, and a mixer that
 * silently averaged the extra strata would be drawing a number nobody authored.
 */

export interface MixerGroup {
  id: string;
  /** Success rate in each stratum, exactly as observed. Never varies with the mix. */
  byStratum: readonly number[];
}

export interface MixerModel {
  groups: readonly MixerGroup[];
  stratumIds: readonly string[];
  /**
   * Which direction counts as ahead. NOT DECORATION: a mortality table is a
   * rates puzzle like any other, and comparing it with `>` names the arm that
   * kills more people as the winner. The caption is a translated sentence, so
   * that mistake would print, in ten languages, the exact inverse of the
   * paradox it exists to demonstrate.
   */
  higherIsBetter: boolean;
}

/** Is `x` ahead of `y`, in whichever direction this puzzle counts as better? */
const ahead = (x: number, y: number, higherIsBetter: boolean): boolean =>
  higherIsBetter ? x > y : x < y;

/** Can this data be mixed at all? */
export function mixableShape(data: PuzzleData): data is RatesData {
  if (data.type !== "rates") return false;
  const strata = data.strata ?? [];
  if (data.groups.length !== 2 || strata.length !== 2) return false;
  if (data.strataAreSeparateSamples === true) return false;
  // Every cell must be observed, or a rate would have to be invented to fill it.
  return data.groups.every((g) =>
    strata.every((s) =>
      data.observations.some((o) => o.groupId === g.id && o.stratumId === s.id),
    ),
  );
}

/** The fixed rates the mixer holds still. */
export function mixerModel(data: RatesData): MixerModel {
  const stratumIds = (data.strata ?? []).map((s) => s.id);
  return {
    stratumIds,
    higherIsBetter: data.higherIsBetter,
    groups: data.groups.map((g) => ({
      id: g.id,
      byStratum: stratumIds.map((sid) => {
        const o = data.observations.find(
          (x) => x.groupId === g.id && x.stratumId === sid,
        )!;
        return o.numerator / o.denominator;
      }),
    })),
  };
}

/**
 * The overall rate each group would show at mix `t`.
 *
 * `t` is the share of the FIRST group's caseload that falls in the SECOND
 * stratum; the other group is its mirror. Mirroring is what makes one slider
 * enough, and it is a stylised world rather than a reconstruction of the study,
 * which is why nothing here claims to mark where the real trial sat.
 *
 * NOTHING HERE KNOWS WHICH STRATUM IS THE HARD ONE, and it must not. Which of
 * the two is harder is a fact about the puzzle rather than about this module,
 * and a table authored the other way round would silently invert the slider.
 * The view names the stratum it is moving by that stratum's own label instead.
 */
export function mixerFrame(model: MixerModel, t: number): number[] {
  const clamped = Math.min(1, Math.max(0, t));
  return model.groups.map((g, i) => {
    const share = i === 0 ? clamped : 1 - clamped;
    return (1 - share) * g.byStratum[0]! + share * g.byStratum[1]!;
  });
}

/** Which group leads at this mix, or null when they are level. */
export function leaderAt(model: MixerModel, t: number): string | null {
  const [a, b] = mixerFrame(model, t);
  if (a === undefined || b === undefined) return null;
  if (a === b) return null;
  return ahead(a, b, model.higherIsBetter)
    ? model.groups[0]!.id
    : model.groups[1]!.id;
}

/**
 * Does the winner change anywhere along the slider?
 *
 * Weaker than `reversible`, and deliberately kept apart from it: a crossing is
 * necessary for the paradox but not sufficient, and one of the two shipped
 * puzzles this module refuses is refused by exactly that gap. Used by the tests
 * to hold the distinction still.
 */
export function reverses(model: MixerModel): boolean {
  const first = leaderAt(model, 0);
  const last = leaderAt(model, 1);
  return first !== null && last !== null && first !== last;
}

/** The group ahead in every stratum, or null if neither is. */
export function betterInEveryStratum(model: MixerModel): string | null {
  const [a, b] = model.groups;
  if (!a || !b) return null;
  const h = model.higherIsBetter;
  const aWins = a.byStratum.every((rate, i) => ahead(rate, b.byStratum[i]!, h));
  const bWins = b.byStratum.every((rate, i) => ahead(rate, a.byStratum[i]!, h));
  return aWins ? a.id : bWins ? b.id : null;
}

/**
 * The paradox itself, as a single question the view can ask: is there a group
 * that is ahead in EVERY stratum and behind overall at this mix?
 *
 * The composition lives here rather than in the renderer because it is the one
 * claim the figure makes in words, and a claim made in words has to be true.
 * Assembled inline it would be two correct helpers joined by an `&&` nobody
 * tested, which is how a caption ends up asserting a reversal that has not
 * happened yet.
 */
export function reversedAt(model: MixerModel, t: number): string | null {
  const everywhere = betterInEveryStratum(model);
  if (everywhere === null) return null;
  const leader = leaderAt(model, t);
  return leader !== null && leader !== everywhere ? everywhere : null;
}

/**
 * Whether the reversal is reachable at all, which decides whether the toy is
 * worth offering.
 *
 * `mixerFrame` is affine in `t` for both groups, so the gap between them is
 * affine too, and an affine function changes sign inside an interval only if it
 * differs in sign at the ends. Checking the two endpoints is therefore exact
 * rather than a sample, which matters: sampling would have to guess a step
 * size, and a crossing that only exists between two guesses is a slider that
 * does nothing for most readers and everything for one.
 */
export function reversible(model: MixerModel): boolean {
  return reversedAt(model, 0) !== null || reversedAt(model, 1) !== null;
}

/**
 * THE MIXER IS OFFERED ONLY WHERE IT HAS SOMETHING TO SHOW.
 *
 * The test is `reversedAt` rather than `reverses`, and the difference is the
 * whole point. Two shipped puzzles pass every structural check here and are
 * still refused, for two DIFFERENT reasons, and an earlier version of this
 * comment gave the wrong one for both:
 *
 *   `written-in-the-stars` never swaps its leader at all.
 *
 *   `spectrum-bias` DOES swap it, and is refused anyway, because neither group
 *   leads in both strata (0.9245 / 0.4200 against 0.5556 / 0.7801). A crossing
 *   without a dominant group is just two lines meeting. The paradox is a group
 *   that wins everywhere and loses overall, so with nobody winning everywhere
 *   the caption could never fire and the reader would drag to no end.
 *
 * The sufficient condition is therefore a REVERSAL and not a crossing. Anyone
 * tempted to relax this to `reverses` on the strength of "spectrum-bias never
 * crosses" should know that sentence was false, which is why it is written out
 * here rather than left as a name.
 */
export function canMix(data: PuzzleData): data is RatesData {
  return mixableShape(data) && reversible(mixerModel(data));
}

/**
 * WHERE THE SLIDER STARTS, and it is not the middle.
 *
 * At the midpoint of `kidney-stones` the mixer produces 83.1% and 77.7%, which
 * are, at the rounding the commit beat uses, that puzzle's own two headline
 * numbers ATTACHED TO THE OPPOSITE ARMS. A reader who has just chosen between
 * "83% overall" and "78% overall" would open the fold and meet them swapped,
 * with nothing marking where the real study sat, because one mirrored slider
 * cannot reproduce the observed split exactly and inventing a marker for it
 * would be worse than leaving none.
 *
 * Starting at one end removes the collision and reads better anyway. The
 * opening state is unambiguously hypothetical, the group that wins everywhere
 * is also winning overall so no claim is being made yet, and the only thing to
 * do is drag, which is the one thing the reader is there to do.
 */
export const OPENING_MIX = 0;
