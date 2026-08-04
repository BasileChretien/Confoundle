import type { DataView, SeriesData } from "../../puzzles/schema";

/**
 * Pure derivation for the `series` shape. No React, no formatting decisions
 * that belong to a renderer, so a future Remotion template can reuse it.
 *
 * Everything is derived from the authored counts. Nothing in a puzzle data file
 * states a percentage change or a ratio; if it did, it could contradict the
 * counts it was drawn from.
 */

export type SeriesDot = {
  pointId: string;
  label: SeriesData["points"][number]["label"];
  short?: SeriesData["points"][number]["short"];
  count: number;
  /** Position along the axis, 0 to 1, from the earliest point to the latest. */
  x: number;
  /** Height as a fraction of the largest count anywhere in the data, 0 to 1. */
  y: number;
};

export type SeriesShape = {
  lines: {
    id: string;
    label: SeriesData["lines"][number]["label"];
    short?: SeriesData["lines"][number]["short"];
    dots: SeriesDot[];
  }[];
  /**
   * The largest count anywhere in the data, over BOTH lines and every point.
   *
   * Deliberately not the largest count the current view draws. The setup shows
   * one instrument and the reveal adds the other, so a view-local peak would
   * rescale the first line the moment the second arrived, and the reader would
   * lose the one thing the two beats share.
   */
  peak: number;
};

/**
 * Restrict the data to the lines a view asks for.
 *
 * The setup draws one instrument, so the reader reads it the way a headline
 * would. Passing no `groupIds` draws both, which is what the reveal does.
 */
export function restrictSeries(
  data: SeriesData,
  view: Pick<DataView, "groupIds"> | undefined,
): SeriesData {
  const wanted = view?.groupIds;
  if (!wanted || wanted.length === 0) return data;
  const keep = new Set(wanted);
  return {
    ...data,
    lines: data.lines.filter((l) => keep.has(l.id)),
    observations: data.observations.filter((o) => keep.has(o.lineId)),
  };
}

/**
 * Lines with their points placed, scaled against the whole data set.
 *
 * `peak` is computed from `full` rather than from `drawn`, so a restricted view
 * still uses the same vertical scale. A caller that has no unrestricted copy to
 * hand may pass the same object twice, which is correct when nothing is hidden.
 */
export function seriesShape(drawn: SeriesData, full: SeriesData = drawn): SeriesShape {
  const peak = full.observations.reduce((m, o) => Math.max(m, o.count), 0);
  const lastIndex = Math.max(full.points.length - 1, 1);
  const xOf = (pointId: string) => {
    const i = full.points.findIndex((p) => p.id === pointId);
    return i < 0 ? 0 : i / lastIndex;
  };
  return {
    peak,
    lines: drawn.lines.map((l) => ({
      id: l.id,
      label: l.label,
      short: l.short,
      dots: full.points
        .map((p) => {
          const o = drawn.observations.find(
            (x) => x.lineId === l.id && x.pointId === p.id,
          );
          if (!o) return null;
          return {
            pointId: p.id,
            label: p.label,
            short: p.short,
            count: o.count,
            x: xOf(p.id),
            y: peak > 0 ? o.count / peak : 0,
          };
        })
        .filter((d) => d !== null),
    })),
  };
}

/** Points where both lines were measured, in axis order. */
function sharedPoints(data: SeriesData): string[] {
  return data.points
    .filter((p) =>
      data.lines.every((l) =>
        data.observations.some((o) => o.lineId === l.id && o.pointId === p.id),
      ),
    )
    .map((p) => p.id);
}

const countAt = (data: SeriesData, lineId: string, pointId: string) =>
  data.observations.find((o) => o.lineId === lineId && o.pointId === pointId)
    ?.count ?? null;

/**
 * The first point at which the two lines have swapped places relative to where
 * they started. This is the crossover, and it is derived rather than authored so
 * a data file cannot name a year the counts do not support.
 */
export function crossoverPoint(data: SeriesData): string | null {
  const shared = sharedPoints(data);
  if (shared.length < 2 || data.lines.length < 2) return null;
  const [a, b] = data.lines;
  const startSign = Math.sign(
    countAt(data, a.id, shared[0])! - countAt(data, b.id, shared[0])!,
  );
  for (const pointId of shared.slice(1)) {
    const sign = Math.sign(
      countAt(data, a.id, pointId)! - countAt(data, b.id, pointId)!,
    );
    if (sign !== 0 && sign !== startSign) return pointId;
  }
  return null;
}

/**
 * How far each line travelled between two named points, as a fraction of where
 * it started. Positive is a rise.
 */
export function changeBetween(
  data: SeriesData,
  fromPointId: string,
  toPointId: string,
): { lineId: string; from: number; to: number; change: number }[] {
  return data.lines
    .map((l) => {
      const from = countAt(data, l.id, fromPointId);
      const to = countAt(data, l.id, toPointId);
      if (from === null || to === null || from === 0) return null;
      return { lineId: l.id, from, to, change: (to - from) / from };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}

/** How many times one line stands above the other at a given point. */
export function ratioAt(
  data: SeriesData,
  pointId: string,
  overLineId: string,
  underLineId: string,
): number | null {
  const over = countAt(data, overLineId, pointId);
  const under = countAt(data, underLineId, pointId);
  if (over === null || under === null || under === 0) return null;
  return over / under;
}
