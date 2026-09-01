import type { ClassifierData } from "../../puzzles/schema";

/**
 * Pure derivation for the classifier shape. No React, no DOM.
 *
 * One confusion matrix per group, read two ways. The setup asks "of the people
 * it flagged, how many did the thing?" and gets nearly the same answer for
 * both groups. The reveal asks "of the people who did NOT do the thing, how
 * many did it flag?" and gets answers that differ by a factor of two. Both
 * come out of the same four counts, so neither can be dismissed as the wrong
 * arithmetic.
 *
 * THE THIRD QUANTITY IS THE ONE THAT MAKES IT A THEOREM. Without the base
 * rate, the disagreement looks like an oversight somebody could fix. With it,
 * the two readings are bound together by an identity, and equalising both at
 * once is impossible unless the base rates match or the tool is perfect. That
 * is why `identityResidual` exists here rather than as a sentence in the
 * card: a claim this strong should be computed from the data on screen.
 */

/** Everything the figure can say about one group, all derived from four counts. */
export interface GroupRates {
  readonly id: string;
  readonly n: number;
  /** Of those flagged, the share the outcome followed for. The setup's reading. */
  readonly amongFlagged: number;
  /** Of those it did not happen to, the share that were flagged. The reveal's reading. */
  readonly flaggedInError: number;
  /** Of those it did happen to, the share that were not flagged. */
  readonly missed: number;
  /** How often the outcome happened at all. The reason the other two are bound. */
  readonly baseRate: number;
}

export function ratesFor(data: ClassifierData): readonly GroupRates[] {
  return data.groups.map((g) => {
    const flagged = g.flaggedAndHappened + g.flaggedNotHappened;
    const happened = g.flaggedAndHappened + g.notFlaggedButHappened;
    const notHappened = g.flaggedNotHappened + g.notFlaggedNorHappened;
    const n = flagged + g.notFlaggedButHappened + g.notFlaggedNorHappened;
    return {
      id: g.id,
      n,
      amongFlagged: g.flaggedAndHappened / flagged,
      flaggedInError: g.flaggedNotHappened / notHappened,
      missed: g.notFlaggedButHappened / happened,
      baseRate: happened / n,
    };
  });
}

/** The widest difference between groups on one reading, as a plain proportion. */
function spread(values: readonly number[]): number {
  return Math.max(...values) - Math.min(...values);
}

export function spreadAmongFlagged(data: ClassifierData): number {
  return spread(ratesFor(data).map((r) => r.amongFlagged));
}

export function spreadFlaggedInError(data: ClassifierData): number {
  return spread(ratesFor(data).map((r) => r.flaggedInError));
}

export function spreadBaseRate(data: ClassifierData): number {
  return spread(ratesFor(data).map((r) => r.baseRate));
}

/**
 * The identity that makes the two readings incompatible.
 *
 * For any group, the share flagged in error is fixed once you know the base
 * rate, the share among the flagged, and the share missed:
 *
 *   flaggedInError = p/(1 - p) . (1 - amongFlagged)/amongFlagged . (1 - missed)
 *
 * It is an algebraic rearrangement of the four counts rather than a modelling
 * assumption, so it holds exactly, always. Its consequence is the lesson: hold
 * `amongFlagged` equal across groups whose `p` differs, and `flaggedInError`
 * is forced apart. Nobody chose that and no amount of care avoids it.
 *
 * Returned as a residual rather than a boolean so a test can assert HOW
 * exactly it holds. A boolean would hide the difference between an identity
 * and a good approximation, and the whole claim rests on it being the former.
 */
export function identityResidual(rates: GroupRates): number {
  const p = rates.baseRate;
  const predicted =
    (p / (1 - p)) *
    ((1 - rates.amongFlagged) / rates.amongFlagged) *
    (1 - rates.missed);
  return predicted - rates.flaggedInError;
}

/**
 * What the second reading would have to be for the first to stay equal, if a
 * group's base rate were the same as another's.
 *
 * This is the counterfactual the reveal needs: not "the error rates differ",
 * which is an observation, but "they differ BECAUSE the base rates do", which
 * is a claim, and one this function makes checkable. Feed a group its own
 * rates with somebody else's base rate and see where the error rate lands.
 */
export function errorRateAtBaseRate(rates: GroupRates, p: number): number {
  return (
    (p / (1 - p)) *
    ((1 - rates.amongFlagged) / rates.amongFlagged) *
    (1 - rates.missed)
  );
}

/**
 * Whether this table actually exhibits the conflict, which is a question worth
 * asking of a card rather than assuming of the shape.
 *
 * A table where both readings agree is perfectly legal data and a dead puzzle:
 * the reveal would restate the setup. The thresholds are in proportion points and
 * the caller supplies them, because "nearly the same" is a judgement about the
 * particular card and does not belong buried in a helper.
 */
export function showsTheConflict(
  data: ClassifierData,
  opts: { readonly agreeWithin: number; readonly differBy: number },
): boolean {
  return (
    spreadAmongFlagged(data) <= opts.agreeWithin &&
    spreadFlaggedInError(data) >= opts.differBy
  );
}

/*
  THERE IS DELIBERATELY NO `restrictClassifier` HERE, and the absence is worth
  a note because the obvious move was to add one.

  Every other multi-beat shape in this directory hands its renderer a filtered
  copy of the data, and `declaredColors.test.ts` finds those renderers by
  scanning the sources for exactly that call. Writing one here would have put
  this renderer inside that guard's net, which looked like a free win.

  It would have been a lie. The two beats of this shape draw the SAME four
  counts for the SAME groups; what changes is which question is asked of them.
  A `restrict` that returned its argument unchanged, as the first draft of this
  file did, is a function that does nothing, wearing a name that claims it
  does something, purely so a scan will match it. This repo has shipped that
  once already: `canScreen` kept checks another guard had made unreachable, and
  a test named for them passed with the whole mechanism deleted.

  So the renderer branches on its `kind` prop instead, and it is not in the
  SLICED list because it does not slice. Colour still resolves through
  `declaredColors`, which costs nothing and is right whatever happens later.
*/
