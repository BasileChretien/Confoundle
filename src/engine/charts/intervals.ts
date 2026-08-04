import type { IntervalData } from "../../puzzles/schema";

/**
 * Pure derivation for the `interval` shape. No React, so a future Remotion
 * template can reuse it.
 *
 * One rule governs this whole module: a data file authors the published shares
 * and the published margin, and NOTHING else. The gap, the margin on the gap
 * and the ratio between the two margins are all computed here. A data file that
 * stated any of them could contradict the shares it drew them from, and this is
 * a lesson about exactly that arithmetic, so getting it from the file rather
 * than from the numbers would be the one unforgivable shortcut.
 */

/** The z multiplier behind a 95 per cent margin, the one pollsters print. */
const Z95 = 1.96;

export type IntervalBar = {
  id: string;
  label: IntervalData["options"][number]["label"];
  short?: IntervalData["options"][number]["short"];
  percent: number;
  /** Half-width of the published margin, in percentage points. */
  margin: number;
};

/**
 * The shares as drawn, each carrying the poll's published margin.
 *
 * Every share gets the same margin because that is what a poll prints: one
 * figure for the whole sample. It is an approximation even in the source, since
 * the true margin is widest at fifty per cent and narrows towards the ends, and
 * the puzzle says so rather than pretending the printed number is exact.
 */
export function intervalShares(data: IntervalData): IntervalBar[] {
  return data.options.map((o) => ({
    id: o.id,
    label: o.label,
    short: o.short,
    percent: o.percent,
    margin: data.publishedMargin,
  }));
}

const shareOf = (data: IntervalData, id: string) =>
  data.options.find((o) => o.id === id)?.percent ?? null;

/** The lead, in percentage points. Derived, never authored. */
export function gapSize(data: IntervalData): number {
  const [a, b] = data.gapBetween;
  const pa = shareOf(data, a);
  const pb = shareOf(data, b);
  if (pa === null || pb === null) return 0;
  return pa - pb;
}

/**
 * The 95 per cent margin on the DIFFERENCE between two shares of one sample.
 *
 * The two shares are negatively correlated, because a respondent who picked one
 * did not pick the other, and that correlation is what makes this wider rather
 * than narrower:
 *
 *   Var(p1 - p2) = [p1 + p2 - (p1 - p2)^2] / n
 *
 * Near an even split the result is close to TWICE the margin on either share,
 * not the square root of two times it. Root two is the answer for two
 * independent samples, where the covariance term vanishes, and it is the
 * plausible wrong answer this shape exists to catch.
 */
export function gapMargin(data: IntervalData): number {
  const [aId, bId] = data.gapBetween;
  const pa = (shareOf(data, aId) ?? 0) / 100;
  const pb = (shareOf(data, bId) ?? 0) / 100;
  const deff = data.designEffect ?? 1;
  const variance = ((pa + pb - (pa - pb) ** 2) * deff) / data.sampleSize;
  return Z95 * Math.sqrt(variance) * 100;
}

/** How many times wider the margin on the gap is than the printed one. */
export function marginRatio(data: IntervalData): number {
  return gapMargin(data) / data.publishedMargin;
}

/**
 * The margin the same two shares would carry if they came from two SEPARATE
 * samples of the same size. Exported because the puzzle needs to show the
 * reader what the answer they probably picked would have been correct for.
 */
export function independentSampleMargin(data: IntervalData): number {
  return data.publishedMargin * Math.SQRT2;
}

/** Does the lead clear its own margin? Null when it lands within a tenth. */
export function gapClearsItsMargin(data: IntervalData): boolean | null {
  const gap = gapSize(data);
  const margin = gapMargin(data);
  if (Math.abs(gap - margin) < 0.1) return null;
  return gap > margin;
}
