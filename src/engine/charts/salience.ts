import type { SalienceComparison, SalienceData } from "../../puzzles/schema";

/**
 * Pure derivation for the salience shape. No React, no DOM, so the web engine
 * and any future Remotion template read the same numbers.
 *
 * Only one share is authored per comparison, the percentage who picked the side
 * that is in fact more frequent. Everything else is computed here: the other
 * side's share, which side the majority went for, and whether the majority was
 * right. That way the two shares can never drift apart, and no view can claim
 * the public was wrong about a comparison the counts say it got right.
 */

/** The share, 0..100, that picked this side of the comparison. */
export function shareFor(c: SalienceComparison, side: "a" | "b"): number {
  return side === c.commoner ? c.percentCorrect : 100 - c.percentCorrect;
}

/** Which side the majority picked. Ties resolve to the commoner side, which is
 * the conservative reading: it never invents a public error. */
export function majoritySide(c: SalienceComparison): "a" | "b" {
  return c.percentCorrect >= 50 ? c.commoner : other(c.commoner);
}

export function other(side: "a" | "b"): "a" | "b" {
  return side === "a" ? "b" : "a";
}

/** Whether most people picked the side that actually happens more often. */
export function majorityWasRight(c: SalienceComparison): boolean {
  return c.percentCorrect >= 50;
}

export function missedComparisons(data: SalienceData): SalienceComparison[] {
  return data.comparisons.filter((c) => !majorityWasRight(c));
}

export function hitComparisons(data: SalienceData): SalienceComparison[] {
  return data.comparisons.filter(majorityWasRight);
}

/**
 * The comparison the public got right whose true margin is narrowest, and the
 * one it got wrong whose true margin is widest.
 *
 * These two exist to be compared. "The public only fails when the answer is
 * close" is the natural excuse, and it is refuted whenever the narrowest margin
 * they got right is narrower than a margin they got wrong. Deriving both here
 * means the lesson can state that refutation from the data rather than assert
 * it in prose.
 */
export function narrowestHit(
  data: SalienceData,
): SalienceComparison | undefined {
  return hitComparisons(data).reduce<SalienceComparison | undefined>(
    (best, c) =>
      best === undefined || c.trueRatio < best.trueRatio ? c : best,
    undefined,
  );
}

export function widestMiss(data: SalienceData): SalienceComparison | undefined {
  return missedComparisons(data).reduce<SalienceComparison | undefined>(
    (worst, c) =>
      worst === undefined || c.trueRatio > worst.trueRatio ? c : worst,
    undefined,
  );
}

/**
 * True when a comparison the public got right had a narrower true margin than
 * one it got wrong, which is what kills the closeness explanation.
 */
export function closenessExplanationFails(data: SalienceData): boolean {
  const hit = narrowestHit(data);
  const missed = missedComparisons(data);
  if (!hit) return false;
  return missed.some((c) => c.trueRatio > hit.trueRatio);
}

/** A view can draw part of the data (see `DataView.groupIds`), keyed on
 * comparison id. Immutable: the authored data is never touched. */
export function restrictSalience(
  data: SalienceData,
  filter?: { groupIds?: string[] },
): SalienceData {
  const want = filter?.groupIds;
  if (!want) return data;
  return {
    ...data,
    comparisons: data.comparisons.filter((c) => want.includes(c.id)),
  };
}

/**
 * The ratio as authored, with trailing zeros trimmed: 1.42 stays 1.42, 20.9
 * stays 20.9, 52 stays 52.
 *
 * Rounding to one decimal would print 1.4 on the chart beside a reveal that
 * says 1.42, and the whole design rests on the two being views of the same
 * numbers. A chart that disagrees with its own caption is worse than no chart.
 */
export function formatRatio(ratio: number): string {
  return String(Number(ratio.toFixed(2)));
}

export function formatShare(share: number): string {
  return `${Math.round(share)}%`;
}
