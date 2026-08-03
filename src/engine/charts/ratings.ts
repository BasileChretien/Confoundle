import type { RatingObservation, RatingsData } from "../../puzzles/schema";

/**
 * Pure derivation for the ratings shape. No React, no DOM, so the web engine
 * and any future Remotion template read the same numbers.
 *
 * Nothing here rescales or recentres a mean. The whole reason this shape exists
 * is that a mean is only meaningful against the scale it was measured on, so
 * every position is computed as a fraction of that scale and the anchor is
 * drawn where the source put it.
 */

export interface RatingPoint {
  seriesId: string;
  mean: number;
  sd?: number;
  n: number;
  /** 0..1 position of the mean along the scale. */
  position: number;
  /** 0..1 positions of mean minus and plus one sd, clamped to the scale. */
  low?: number;
  high?: number;
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export function pointOf(o: RatingObservation, scale: RatingsData["scale"]): RatingPoint {
  const span = scale.max - scale.min;
  const at = (v: number) => clamp01((v - scale.min) / span);
  return {
    seriesId: o.seriesId,
    mean: o.mean,
    sd: o.sd,
    n: o.n,
    position: at(o.mean),
    low: o.sd === undefined ? undefined : at(o.mean - o.sd),
    high: o.sd === undefined ? undefined : at(o.mean + o.sd),
  };
}

export function points(data: RatingsData): RatingPoint[] {
  return data.series
    .map((s) => data.observations.find((o) => o.seriesId === s.id))
    .filter((o): o is RatingObservation => o !== undefined)
    .map((o) => pointOf(o, data.scale));
}

/** 0..1 position of the anchor, or undefined when the puzzle draws none. */
export function anchorPosition(data: RatingsData): number | undefined {
  if (data.scale.anchorAt === undefined) return undefined;
  return clamp01(
    (data.scale.anchorAt - data.scale.min) / (data.scale.max - data.scale.min),
  );
}

/**
 * The difference between two series' means, in scale units. Reported to two
 * decimals because that is the precision such papers print, and computed rather
 * than authored so a puzzle cannot quote a gap its own data contradicts.
 */
export function gapBetween(data: RatingsData, aId: string, bId: string): number {
  const a = data.observations.find((o) => o.seriesId === aId);
  const b = data.observations.find((o) => o.seriesId === bId);
  if (!a || !b) return 0;
  return Number((b.mean - a.mean).toFixed(2));
}

/**
 * How far a series sits from the anchor, signed. The third-person lesson turns
 * on the self rating sitting almost exactly on "no effect at all", so this is
 * the quantity a test should assert rather than the raw mean.
 */
export function distanceFromAnchor(
  data: RatingsData,
  seriesId: string,
): number | undefined {
  if (data.scale.anchorAt === undefined) return undefined;
  const o = data.observations.find((x) => x.seriesId === seriesId);
  if (!o) return undefined;
  return Number((o.mean - data.scale.anchorAt).toFixed(2));
}

/**
 * A view can ask for part of the data (see `DataView.groupIds`). Series map to
 * `groupIds`. Immutable: the authored data is never touched.
 */
export function restrictRatings(
  data: RatingsData,
  view: { groupIds?: string[] },
): RatingsData {
  if (!view.groupIds) return data;
  const keep = new Set(view.groupIds);
  return {
    ...data,
    series: data.series.filter((s) => keep.has(s.id)),
    observations: data.observations.filter((o) => keep.has(o.seriesId)),
  };
}
