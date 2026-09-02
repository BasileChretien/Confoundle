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

/**
 * Thousands separators, so 40320 reads as a number rather than a string.
 *
 * The separators are the READER'S. This was `toLocaleString("en-US")`, which
 * pins English grouping whatever language the app is showing, so a French
 * reader who writes 40 320 and a Bengali reader who writes ৪০,৩২০ both got
 * 40,320. The locale is a required argument rather than an optional one on
 * purpose: an omitted one would fall back to the runtime's default, which is
 * the same defect wearing a different hat, and it would fail silently.
 *
 * The module stays pure, with no React in it, so a Remotion template renders
 * the identical string by passing the identical locale in.
 */
export function formatValue(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value);
}

/*
  `formatTimes` USED TO LIVE HERE and was deleted rather than converted.

  It returned `${times.toFixed(1)}x`, which is two defects in one line: the
  decimal separator is English in all ten languages, and the "x" is an English
  multiplication marker short enough that `chartsLocalized`, which matches runs
  of two or more Latin letters, would never have seen it.

  It was also called by nothing. The only references anywhere in the repo were
  its own two test assertions, which is why the file could be described as
  "converted whole" while still mixing the two styles: the conversion reached
  every function a view actually used. A caller that needs this should build the
  whole sentence with `fillSlots` and put the unit inside the slot, the way the
  shortcut shape's ratio caption does.
*/
