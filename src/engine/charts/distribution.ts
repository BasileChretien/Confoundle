import type { DistributionData, DistributionGroup } from "../../puzzles/schema";

/**
 * Pure derivation for the distribution shape. No React, no DOM, so the web
 * engine and any future Remotion template read the same numbers.
 *
 * Only ONE quantity is authored per group (the share below the mean); the share
 * that reaches it is always derived, so the two can never drift apart or fail to
 * account for everybody.
 */

export interface MeanPlacement {
  groupId: string;
  mean: number;
  /** 0..1, authored. */
  below: number;
  /** 0..1, derived: everything that is not below is at or above. */
  atOrAbove: number;
}

export function placementOf(group: DistributionGroup): MeanPlacement {
  const below = group.percentBelowMean / 100;
  return {
    groupId: group.id,
    mean: group.mean,
    below,
    atOrAbove: 1 - below,
  };
}

export function placements(data: DistributionData): MeanPlacement[] {
  return data.groups.map(placementOf);
}

/**
 * A view can ask for part of the data (see `DataView.groupIds`). Immutable: the
 * authored data is never touched.
 */
export function restrictDistribution(
  data: DistributionData,
  filter?: { groupIds?: string[] },
): DistributionData {
  const want = filter?.groupIds;
  if (!want) return data;
  return { ...data, groups: data.groups.filter((g) => want.includes(g.id)) };
}

/**
 * The group whose mean is least representative, which is the one worth naming
 * in a headline. Ties resolve to the first authored, so the result is stable.
 */
export function mostSkewed(data: DistributionData): DistributionGroup | null {
  if (data.groups.length === 0) return null;
  return data.groups.reduce((worst, g) =>
    g.percentBelowMean > worst.percentBelowMean ? g : worst,
  );
}

/** The authored range, for prose that says "between X and Y per cent". */
export function belowRange(data: DistributionData): { min: number; max: number } | null {
  if (data.groups.length === 0) return null;
  const values = data.groups.map((g) => g.percentBelowMean);
  return { min: Math.min(...values), max: Math.max(...values) };
}

/**
 * The two shares as they are DISPLAYED, in the source's own precision.
 *
 * Rounding each share independently would put 75.5 and 24.5 on screen as 76 and
 * 25, which sums to 101 and makes the figure look wrong. So the authored value
 * is shown as printed and its complement is derived from it and rounded to the
 * same one decimal place, which always comes to exactly 100.
 */
export interface MeanSplit {
  belowPercent: number;
  abovePercent: number;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

export function splitOf(group: DistributionGroup): MeanSplit {
  const belowPercent = round1(group.percentBelowMean);
  return { belowPercent, abovePercent: round1(100 - belowPercent) };
}

/** Drops a trailing ".0" so whole numbers do not read as false precision. */
export function formatPercent(percent: number): string {
  return `${Number.isInteger(percent) ? percent : percent.toFixed(1)}%`;
}
