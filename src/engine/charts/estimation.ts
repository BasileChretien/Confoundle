import type { EstimateGroup, EstimationData } from "../../puzzles/schema";

/**
 * Pure derivation for the estimation shape. No React, no DOM, so the web engine
 * and any future Remotion template read the same numbers.
 *
 * Everything the lesson claims is computed here from the three authored values
 * (two estimates and the truth), so no ratio can ever drift from the figures it
 * came from: how far apart the two guesses are, and how far short of the answer
 * both of them fall.
 */

export function ratioBetween(data: EstimationData): number {
  const [a, b] = data.groups.map((g) => g.estimate);
  const hi = Math.max(a, b);
  const lo = Math.min(a, b);
  return lo === 0 ? 0 : hi / lo;
}

/** 0..1: what fraction of the true value this estimate reached. */
export function shareOfTruth(group: EstimateGroup, data: EstimationData): number {
  return group.estimate / data.trueValue;
}

/** How many times bigger the truth is than the more generous guess. */
export function truthOverBest(data: EstimationData): number {
  const best = Math.max(...data.groups.map((g) => g.estimate));
  return best === 0 ? 0 : data.trueValue / best;
}

export function higherGroup(data: EstimationData): EstimateGroup {
  return data.groups.reduce((hi, g) => (g.estimate > hi.estimate ? g : hi));
}

export function lowerGroup(data: EstimationData): EstimateGroup {
  return data.groups.reduce((lo, g) => (g.estimate < lo.estimate ? g : lo));
}

/**
 * A view can ask for part of the data (see `DataView.groupIds`). The setup shows
 * one group's guess; the reveal adds the other and the answer. Immutable.
 */
export function restrictEstimation(
  data: EstimationData,
  filter?: { groupIds?: string[] },
): EstimationData {
  const want = filter?.groupIds;
  if (!want) return data;
  return { ...data, groups: data.groups.filter((g) => want.includes(g.id)) };
}

/**
 * Bar width as a fraction of the widest thing being drawn.
 *
 * `withtruth` scales against the true value, which is the whole point: two
 * guesses that differ fourfold both shrink to slivers once the answer is on the
 * same axis, and that collapse is the second half of the lesson. `oneguess`
 * has no truth to scale against yet, so it fills its own frame, which is
 * exactly how a lone estimate always looks before you know the answer.
 */
export function barFraction(
  value: number,
  data: EstimationData,
  againstTruth: boolean,
): number {
  const max = againstTruth
    ? data.trueValue
    : Math.max(...data.groups.map((g) => g.estimate));
  return max === 0 ? 0 : value / max;
}

/** Thousands separators, so 40320 reads as a number rather than a string. */
export function formatValue(value: number): string {
  return value.toLocaleString("en-US");
}

export function formatTimes(times: number): string {
  return `${times.toFixed(1)}x`;
}
