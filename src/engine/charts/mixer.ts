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
}

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
 * `t` is the share of the FIRST group's caseload that is the second stratum,
 * the hard one; the other group is its mirror. Mirroring is what makes one
 * slider enough, and it is a stylised world rather than a reconstruction of the
 * study, which is why nothing here claims to mark where the real trial sat.
 */
export function mixerFrame(model: MixerModel, t: number): number[] {
  const clamped = Math.min(1, Math.max(0, t));
  return model.groups.map((g, i) => {
    const hardShare = i === 0 ? clamped : 1 - clamped;
    // (1 - t) * easy + t * hard, written so the endpoints are exact.
    return (1 - hardShare) * g.byStratum[0]! + hardShare * g.byStratum[1]!;
  });
}

/** Which group leads at this mix, or null when they are level. */
export function leaderAt(model: MixerModel, t: number): string | null {
  const [a, b] = mixerFrame(model, t);
  if (a === undefined || b === undefined) return null;
  if (a === b) return null;
  return a > b ? model.groups[0]!.id : model.groups[1]!.id;
}

/**
 * Does the winner change anywhere along the slider?
 *
 * The property the whole shape exists to demonstrate, and the one worth
 * refusing to draw without: a mixer whose leader never swaps is a slider that
 * teaches nothing, and offering it would imply a reversal that is not there.
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
  const aWins = a.byStratum.every((rate, i) => rate > b.byStratum[i]!);
  const bWins = b.byStratum.every((rate, i) => rate > a.byStratum[i]!);
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
 * `mixerFrame` is linear in `t` for both groups, so the gap between them is
 * linear too, and a linear function changes sign inside an interval only if it
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
 * Two shipped puzzles pass every structural test here and never cross:
 * `spectrum-bias` and `written-in-the-stars` are two groups by two strata with
 * a full table, and dragging them moves the overall bars without ever swapping
 * them. A slider whose payoff never arrives teaches the opposite of the lesson,
 * because the reader concludes the mix cannot flip a comparison. So the shape
 * is necessary and the crossing is what makes it sufficient.
 */
export function canMix(data: PuzzleData): data is RatesData {
  return mixableShape(data) && reversible(mixerModel(data));
}
