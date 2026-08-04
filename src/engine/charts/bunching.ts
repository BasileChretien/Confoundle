import type { BunchingData, DataView } from "../../puzzles/schema";

/**
 * Pure derivation for the `bunching` shape. No React, no formatting decisions
 * that belong to a renderer, so a future Remotion template can reuse it.
 *
 * Everything here is derived from the authored counts. Nothing in a puzzle data
 * file states a percentage or a drop; if it did, it could contradict the bins.
 */

export type BunchingBar = {
  id: string;
  label: BunchingData["bins"][number]["label"];
  short?: BunchingData["bins"][number]["short"];
  count: number;
  past: boolean;
  /** Height as a fraction of the tallest bin drawn, 0 to 1. */
  height: number;
};

export type BunchingShape = {
  bars: BunchingBar[];
  /** Tallest count among the bins drawn, which sets the scale. */
  peak: number;
  /** The last bin before the line, when one is drawn. */
  lastBefore: BunchingBar | null;
  /** The first bin past the line, when one is drawn. */
  firstAfter: BunchingBar | null;
  /** True once both sides are on screen, which is what the reveal adds. */
  showsBothSides: boolean;
};

/**
 * Restrict the data to the bins a view asks for.
 *
 * The setup shows only the bins approaching the line, so the reader sees an
 * ordinary slope and has to guess what happens next. Passing no `groupIds`
 * draws everything, which is what the reveal does.
 */
export function restrictBunching(
  data: BunchingData,
  view: Pick<DataView, "groupIds"> | undefined,
): BunchingData {
  const wanted = view?.groupIds;
  if (!wanted || wanted.length === 0) return data;
  const keep = new Set(wanted);
  return { ...data, bins: data.bins.filter((b) => keep.has(b.id)) };
}

/** Bars, scaled against the tallest bin actually drawn. */
export function bunchingShape(data: BunchingData): BunchingShape {
  const peak = data.bins.reduce((m, b) => Math.max(m, b.count), 0);
  const bars: BunchingBar[] = data.bins.map((b) => ({
    id: b.id,
    label: b.label,
    short: b.short,
    count: b.count,
    past: b.past,
    // Guard the empty case rather than emitting NaN into a width.
    height: peak > 0 ? b.count / peak : 0,
  }));
  // Both are null unless the view actually draws bins on both sides, which is
  // what keeps the setup from being able to report a drop it is not showing.
  const firstPastIndex = bars.findIndex((b) => b.past);
  const lastBefore = firstPastIndex > 0 ? bars[firstPastIndex - 1] : null;
  const firstAfter = firstPastIndex === -1 ? null : bars[firstPastIndex];
  return {
    bars,
    peak,
    lastBefore,
    firstAfter,
    showsBothSides: bars.some((b) => !b.past) && bars.some((b) => b.past),
  };
}

/**
 * The cliff: how far the count falls from the last bin before the line to the
 * first bin past it, as a fraction of the bin before.
 *
 * Returns null when only one side is drawn, which is the setup's state. A
 * caller must not present a drop it cannot see.
 */
export function cliffAcross(data: BunchingData): {
  before: number;
  after: number;
  drop: number;
  dropFraction: number;
} | null {
  const { lastBefore, firstAfter } = bunchingShape(data);
  if (!lastBefore || !firstAfter || lastBefore.count === 0) return null;
  const drop = lastBefore.count - firstAfter.count;
  return {
    before: lastBefore.count,
    after: firstAfter.count,
    drop,
    dropFraction: drop / lastBefore.count,
  };
}

/**
 * How many more items landed in the bin before the line than the bin after, as
 * a fraction of the bin after. This is the direction papers usually quote it in
 * ("50% more finished in the minute before three hours than the minute after"),
 * and it is a different number from `dropFraction`, so both exist rather than
 * one being derived at a call site and getting the denominator wrong.
 */
export function excessBeforeLine(data: BunchingData): number | null {
  const cliff = cliffAcross(data);
  if (!cliff || cliff.after === 0) return null;
  return (cliff.before - cliff.after) / cliff.after;
}
