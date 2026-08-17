import type { RatersData } from "../../puzzles/schema";

/**
 * Pure derivation for the `raters` shape, kept out of the renderer so the same
 * numbers can be reused by a future Remotion template without a DOM.
 *
 * WHY `restrictRaters` FILTERS AND NOTHING ELSE DOES. The setup beat draws a
 * subset of the judges and the reveal draws them all, so the only thing a beat
 * changes is WHICH raters are present. The scale, the threshold and the labels
 * are properties of the measurement rather than of the beat, and copying them
 * through unchanged is what makes the reveal a superset of the setup by
 * construction rather than by an author remembering.
 */

/** Keep only the named raters, in their declared order. */
export function restrictRaters(
  data: RatersData,
  opts: { raterIds?: readonly string[] },
): RatersData {
  if (!opts.raterIds) return data;
  const wanted = new Set(opts.raterIds);
  return { ...data, raters: data.raters.filter((r) => wanted.has(r.id)) };
}

export interface RaterSpread {
  /** How many raters put the work above the line, and how many below. */
  above: number;
  below: number;
  total: number;
  lowest: number;
  highest: number;
  /** Highest minus lowest, which is the number the reveal usually quotes. */
  range: number;
}

/**
 * Counts by side of the threshold, plus the extremes.
 *
 * A mark exactly ON the threshold counts as above, because a threshold in this
 * shape is a pass mark and a pass mark is conventionally inclusive. That is a
 * decision rather than an obvious truth, so it is written down here and tested,
 * instead of being rediscovered from the behaviour of a chart.
 */
export function raterSpread(data: RatersData): RaterSpread {
  const marks = data.raters.map((r) => r.mark);
  const above = marks.filter((m) => m >= data.threshold).length;
  const lowest = Math.min(...marks);
  const highest = Math.max(...marks);
  return {
    above,
    below: marks.length - above,
    total: marks.length,
    lowest,
    highest,
    range: highest - lowest,
  };
}

/** Where a mark sits across the scale, as a 0..1 fraction, clamped. */
export function markFraction(data: RatersData, mark: number): number {
  const span = data.max - data.min;
  if (span <= 0) return 0;
  return Math.min(1, Math.max(0, (mark - data.min) / span));
}
