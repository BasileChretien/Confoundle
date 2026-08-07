import type { UnseenData } from "../../puzzles/schema";

/**
 * Pure derivation for the `unseen` shape. No React, so a future Remotion
 * template can reuse it.
 *
 * The division of labour here is the whole point of the shape, and it is
 * unusual: HALF the figure is counted and half is estimated.
 *
 * The counted half (cohort, unobserved, traced, resolved) is authored as raw
 * counts and every share is derived here. The estimated half (the reported
 * number, the corrected number, and what tracing found among the missing) is
 * authored EXACTLY AS PUBLISHED and never recomputed, because those figures
 * come out of probability-weighted survival estimation and cannot be rebuilt
 * from the counts on the same figure. A module that tried would be inventing
 * data, and the temptation is real: `unobservedShare * foundShare` looks like
 * it ought to reconstruct the correction, and it does not. That product is not
 * exported for exactly that reason.
 *
 * What IS derived is the relationship between the two estimates: how far apart
 * they are, which way, and whether their intervals clear one another. A data
 * file that stated any of those could contradict the numbers it drew them from.
 */

/** How much of the cohort had no observed outcome at all. */
export function unobservedShare(d: UnseenData): number {
  return d.unobserved / d.cohort;
}

/** How much of the missing group was chased. */
export function tracedShare(d: UnseenData): number {
  return d.unobserved === 0 ? 0 : d.traced / d.unobserved;
}

/** How much of the chase came back with an answer. */
export function resolvedShare(d: UnseenData): number {
  return d.traced === 0 ? 0 : d.resolved / d.traced;
}

/**
 * And how much of it did not, which is the figure a reader should be given
 * rather than left to subtract. A correction resting on incomplete tracing is
 * weaker than one resting on complete tracing, and the card has to say so.
 */
export function unresolvedShare(d: UnseenData): number {
  return d.traced === 0 ? 0 : (d.traced - d.resolved) / d.traced;
}

/** Corrected minus reported, in the shape's own units. Signed. */
export function correctionSize(d: UnseenData): number {
  return d.corrected.value - d.reported.value;
}

/**
 * How many times the reported figure the corrected one is. The number people
 * quote, and the reason to be careful: it is a ratio of two ESTIMATES, so it
 * carries both their uncertainties and has no interval of its own here.
 */
export function correctionFactor(d: UnseenData): number {
  if (d.reported.value === 0) throw new Error("the reported estimate is zero, so no ratio exists");
  return d.corrected.value / d.reported.value;
}

/** True when the two intervals do not touch, so the correction is visible. */
export function correctionIsClear(d: UnseenData): boolean {
  return d.reported.ciHigh < d.corrected.ciLow || d.corrected.ciHigh < d.reported.ciLow;
}

/** Which way the correction ran. The reported figure usually understates. */
export function correctionDirection(d: UnseenData): "up" | "down" | "none" {
  const s = correctionSize(d);
  return s > 0 ? "up" : s < 0 ? "down" : "none";
}

/** Fraction of the estimates axis at which a value sits, for the renderer. */
export function axisFraction(d: UnseenData, value: number): number {
  return value / d.axisMax;
}

/**
 * What a beat draws.
 *
 * Unlike `rates` or `yield`, this shape has nothing to filter: both beats draw
 * the same cohort and the same reported estimate, and the reveal ADDS the two
 * figures that were held back. So the beat is decided by `kind` alone and there
 * are no `groupIds`, which is also why `schema.ts` does not list `unseen` among
 * the filterable shapes. Holding the composition bar and the reported estimate
 * identical across the beats is not a nicety: the reader has to see that
 * nothing about the original figure changed, only that something arrived
 * beside it.
 */
export function showsCorrection(kind: "asrecorded" | "afterlooking"): boolean {
  return kind === "afterlooking";
}
