import type { CompetingData } from "../../puzzles/schema";

/**
 * Pure derivation for the competing-risk shape. No React, no DOM.
 *
 * The lesson is that one estimator answers a question about a world where the
 * competing event does not happen, and the other answers the question the
 * clinic actually asked. Both are computed from the same follow-up, so the
 * setup's alarming number and the reveal's smaller one cannot contradict each
 * other: they are two summaries of one cohort.
 *
 * THE DERIVED QUANTITY IS THE OVERSTATEMENT, not the raw gap in percentage
 * points, and that is deliberate. The gap in points grows simply because both
 * curves grow, so it says as much about how long the follow-up ran as about
 * the bias. The ratio is what the source itself reports, and it is what makes
 * the shape's claim legible: the same study is out by 37 per cent at five
 * years and 75 per cent at ten.
 */

/** One time point with both estimates and how far apart they are. */
export interface EstimateGap {
  readonly t: number;
  readonly naive: number;
  readonly adjusted: number;
  /** Percentage points, which is what the figure draws as a band. */
  readonly points: number;
  /**
   * How many times the naive estimate is of the adjusted one, so 1.75 means
   * the naive figure is 75 per cent greater. Null when the adjusted estimate
   * is zero, where a ratio would be a division by zero dressed as infinity.
   */
  readonly ratio: number | null;
}

export function gapsOverTime(data: CompetingData): readonly EstimateGap[] {
  return data.points.map((p) => ({
    t: p.t,
    naive: p.naive,
    adjusted: p.adjusted,
    points: p.naive - p.adjusted,
    ratio: p.adjusted > 0 ? p.naive / p.adjusted : null,
  }));
}

/**
 * The overstatement at one time, as a percentage, e.g. 75 for 1.75.
 *
 * Returns null when the time is not one the source printed. Interpolating
 * would be inventing a reading: these are published estimates at named
 * follow-up times, not a function anybody sampled.
 */
export function overstatementAt(data: CompetingData, t: number): number | null {
  const gap = gapsOverTime(data).find((g) => g.t === t);
  if (gap === undefined || gap.ratio === null) return null;
  return Math.round((gap.ratio - 1) * 100);
}

/**
 * The last point, which is where the two estimators are furthest apart in the
 * cases this shape is for, and the one the headline quotes.
 */
export function finalGap(data: CompetingData): EstimateGap {
  const gaps = gapsOverTime(data);
  return gaps[gaps.length - 1]!;
}

/**
 * Whether the distance between the estimators widens with follow-up.
 *
 * This is the source's own stated finding rather than a property of the
 * shape, so it is a question to ask of a card rather than something the
 * schema can require: a study with a short follow-up or a small competing
 * risk may show no widening at all, and would still be honestly drawn here.
 */
export function widensWithTime(data: CompetingData): boolean {
  const gaps = gapsOverTime(data);
  return gaps.every((g, i) => i === 0 || g.points >= gaps[i - 1]!.points) &&
    finalGap(data).points > gaps[0]!.points;
}

/** The fate the curves are about, and the ones they are not. */
export function eventFate(data: CompetingData): CompetingData["fates"][number] {
  return data.fates.find((f) => f.role === "event")!;
}

export function competingFates(
  data: CompetingData,
): readonly CompetingData["fates"][number][] {
  return data.fates.filter((f) => f.role === "competing");
}

/**
 * The slice each beat draws.
 *
 * The setup shows the naive curve alone, which is the whole trap: read off a
 * chart that looks like every survival curve in every paper, 21 per 100 is
 * simply what it says. The reveal adds the second curve and the fates.
 *
 * NAMED `restrict*` ON PURPOSE. The colour guard in `declaredColors.test.ts`
 * finds slice-drawing renderers by reading the sources for this shape of call.
 * This shape slices ESTIMATORS rather than groups, so the drift that guard was
 * written for cannot happen here, but opting in is still right: the day
 * somebody makes the setup draw one fate instead of one curve, the check that
 * catches it is already pointed at this renderer.
 */
export function restrictCompeting(
  data: CompetingData,
  opts: { readonly showAdjusted: boolean; readonly showFates: boolean },
): CompetingData {
  return {
    ...data,
    points: opts.showAdjusted
      ? data.points
      : data.points.map((p) => ({ ...p, adjusted: p.naive })),
    fates: opts.showFates ? data.fates : [],
  };
}

/**
 * Whether a beat is drawing the adjusted curve at all.
 *
 * `restrictCompeting` flattens the adjusted series onto the naive one rather
 * than deleting it, because the points are a single array of triples and a
 * renderer that had to cope with a missing member would need a branch on every
 * read. The cost is that the slice cannot be recognised by its shape, so it is
 * asked rather than inferred.
 */
export function hasSecondCurve(data: CompetingData): boolean {
  return data.points.some((p) => p.naive !== p.adjusted);
}
