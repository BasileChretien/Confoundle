import type { DriftData, DriftObservation } from "../../puzzles/schema";

/**
 * Pure derivation for the drift shape. No React, no DOM, so the web engine and
 * any future Remotion template read the same numbers.
 *
 * Only the signed counts are authored. Every percentage here is derived, which
 * matters more for this shape than for most: the sleeper effect's four-week
 * figures are sums of two published tables, and summing the published
 * *percentages* rather than the counts gives 14.0 where the counts give 13.9.
 * Deriving from counts is what keeps the puzzle from quoting a number that its
 * own data contradicts.
 */

export interface DriftPoint {
  seriesId: string;
  checkpointId: string;
  /** Signed count: movers toward minus movers away. */
  net: number;
  denominator: number;
  /** Signed percentage, derived. Negative means movement away. */
  percent: number;
}

export function pointOf(o: DriftObservation): DriftPoint {
  return {
    seriesId: o.seriesId,
    checkpointId: o.checkpointId,
    net: o.net,
    denominator: o.denominator,
    percent: (100 * o.net) / o.denominator,
  };
}

export function points(data: DriftData): DriftPoint[] {
  return data.observations.map(pointOf);
}

/** The points of one series, in checkpoint order rather than authoring order. */
export function seriesPoints(data: DriftData, seriesId: string): DriftPoint[] {
  return data.checkpoints
    .map((c) =>
      data.observations.find(
        (o) => o.seriesId === seriesId && o.checkpointId === c.id,
      ),
    )
    .filter((o): o is DriftObservation => o !== undefined)
    .map(pointOf);
}

/**
 * The largest distance from the baseline anywhere in the data, as a percentage.
 * The renderer needs one scale for both directions so that a rise of five and a
 * fall of five are drawn the same length; scaling each side separately would
 * make the smaller movement look like the larger one.
 */
export function maxExcursion(data: DriftData): number {
  return data.observations.reduce(
    (m, o) => Math.max(m, Math.abs((100 * o.net) / o.denominator)),
    0,
  );
}

/**
 * Whether two series swap order between the first and last checkpoint. This is
 * the whole finding for the sleeper effect, so the puzzle asserts it against
 * this function rather than against a hardcoded pair of numbers.
 */
export function crossesOver(data: DriftData, aId: string, bId: string): boolean {
  const a = seriesPoints(data, aId);
  const b = seriesPoints(data, bId);
  if (a.length < 2 || b.length < 2) return false;
  const first = Math.sign(a[0].percent - b[0].percent);
  const last = Math.sign(a[a.length - 1].percent - b[b.length - 1].percent);
  return first !== 0 && last !== 0 && first !== last;
}

/**
 * A view can ask for part of the data (see `DataView.groupIds` / `strataIds`).
 * Series map to `groupIds` and checkpoints to `strataIds`, reusing the existing
 * view fields so no new plumbing is needed. Immutable: the authored data is
 * never touched.
 */
export function restrictDrift(
  data: DriftData,
  view: { groupIds?: string[]; strataIds?: string[] },
): DriftData {
  const series = view.groupIds
    ? data.series.filter((s) => view.groupIds!.includes(s.id))
    : data.series;
  const checkpoints = view.strataIds
    ? data.checkpoints.filter((c) => view.strataIds!.includes(c.id))
    : data.checkpoints;
  const seriesIds = new Set(series.map((s) => s.id));
  const checkpointIds = new Set(checkpoints.map((c) => c.id));
  return {
    ...data,
    series,
    checkpoints,
    observations: data.observations.filter(
      (o) => seriesIds.has(o.seriesId) && checkpointIds.has(o.checkpointId),
    ),
  };
}
