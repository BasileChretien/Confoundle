import type { MagnitudeData } from "../../puzzles/schema";

/**
 * Pure derivation for the `magnitude` shape. No React, no formatting decisions
 * that belong to a renderer, so a future Remotion template can reuse it.
 *
 * Everything here is derived from the two authored numbers per item. Nothing in
 * a puzzle data file states a ratio or a rank; if it did, it could contradict
 * the values it was drawn from.
 */

export type MagnitudeRow = {
  id: string;
  label: MagnitudeData["items"][number]["label"];
  short?: MagnitudeData["items"][number]["short"];
  actual: number;
  estimated: number;
  /** estimated / actual. Above 1 is an overestimate, below 1 an underestimate. */
  ratio: number;
  /** How far off in units of the scale, unsigned. A different ordering from
   * `ratio`, deliberately: see `furthestByGap`. */
  gap: number;
  /** Bar widths as fractions of `peak`, 0 to 1. */
  estimatedWidth: number;
  actualWidth: number;
};

export type MagnitudeShape = {
  rows: MagnitudeRow[];
  /**
   * The largest number anywhere in the data, over BOTH series and every item.
   *
   * Deliberately not the largest number the current view draws. The setup shows
   * guesses only and the reveal adds the truths, so a view-local peak would
   * shrink every guess bar the moment the reveal landed, and the reader would
   * lose the one thing the two beats are meant to share.
   */
  peak: number;
};

/** Rows with their ratios and bar widths, scaled over the whole data set. */
export function magnitudeShape(data: MagnitudeData): MagnitudeShape {
  const peak = data.items.reduce(
    (m, it) => Math.max(m, it.actual, it.estimated),
    0,
  );
  const rows: MagnitudeRow[] = data.items.map((it) => ({
    id: it.id,
    label: it.label,
    short: it.short,
    actual: it.actual,
    estimated: it.estimated,
    ratio: it.estimated / it.actual,
    gap: Math.abs(it.estimated - it.actual),
    // Guard the empty case rather than emitting NaN into a width.
    estimatedWidth: peak > 0 ? it.estimated / peak : 0,
    actualWidth: peak > 0 ? it.actual / peak : 0,
  }));
  return { rows, peak };
}

/** The item people got wrong by the largest FACTOR, over or under. */
export function mostDistortedByFactor(data: MagnitudeData): MagnitudeRow | null {
  const { rows } = magnitudeShape(data);
  if (rows.length === 0) return null;
  // A ratio of 4 and a ratio of 1/4 are equally wrong, so compare each against
  // 1 in whichever direction it falls rather than ranking on `ratio` itself,
  // which would always put overestimates on top.
  const wrongness = (r: MagnitudeRow) => (r.ratio >= 1 ? r.ratio : 1 / r.ratio);
  return rows.reduce((worst, r) => (wrongness(r) > wrongness(worst) ? r : worst));
}

/**
 * The item people got wrong by the largest number of scale units.
 *
 * This exists so a puzzle's test can prove it is a DIFFERENT item from
 * `mostDistortedByFactor`. When the two disagree, a commit beat asking which
 * one is furthest from the truth is ambiguous, and the framing has to say which
 * of the two it means. That is the `statistical-power` pattern: put the
 * discriminator in the question rather than marking a reasonable reader wrong.
 */
export function furthestByGap(data: MagnitudeData): MagnitudeRow | null {
  const { rows } = magnitudeShape(data);
  if (rows.length === 0) return null;
  return rows.reduce((worst, r) => (r.gap > worst.gap ? r : worst));
}

/**
 * The compression itself: the smallest item's ratio against the largest one's.
 *
 * The schema guarantees the items ascend by `actual` and that the first is
 * overestimated by more than the last, so this is always the two ends of the
 * axis and never needs to sort.
 */
export function compressionSpan(data: MagnitudeData): {
  smallest: MagnitudeRow;
  largest: MagnitudeRow;
} | null {
  const { rows } = magnitudeShape(data);
  if (rows.length < 2) return null;
  return { smallest: rows[0], largest: rows[rows.length - 1] };
}

/**
 * How far apart two items really are, against how far apart people put them.
 *
 * The headline number of this lesson: guesses that differ by a factor of four
 * can be describing things that differ by a factor of two hundred.
 */
export function ratioBetween(
  data: MagnitudeData,
  smallId: string,
  largeId: string,
): { guessed: number; actual: number } | null {
  const small = data.items.find((it) => it.id === smallId);
  const large = data.items.find((it) => it.id === largeId);
  if (!small || !large) return null;
  return {
    guessed: large.estimated / small.estimated,
    actual: large.actual / small.actual,
  };
}
