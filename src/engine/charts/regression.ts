import type { RegressionData, RegressionGroup } from "../../puzzles/schema";

/**
 * Pure derivation for the regression-to-the-mean shape. No React, no DOM, so the
 * web engine and any future Remotion template quote the same numbers.
 *
 * The whole lesson lives in one derived quantity. A group is picked because its
 * first measurement sits far from the population mean. Its second measurement
 * almost always sits closer, and `reverted` is exactly how much closer, as a
 * share of the original gap:
 *
 *   firstDev  = first  - mean          (how extreme it was)
 *   secondDev = second - mean          (how extreme it stayed)
 *   reverted  = 1 - secondDev/firstDev (share of the gap that closed by itself)
 *
 * A group starting on the mean has no gap to close, so `reverted` is null rather
 * than a division by zero. Everything else the renderer needs (a 0..1 position
 * on the axis for drawing) is derived here too, so the chart never does its own
 * arithmetic on the raw numbers.
 */

export interface RegressionRow {
  id: string;
  label: RegressionGroup["label"];
  short: RegressionGroup["short"];
  first: number;
  second: number;
  n: number | undefined;
  firstDev: number;
  secondDev: number;
  /** Share of the starting gap that closed on its own, 0..1. Null if no gap. */
  reverted: number | null;
  /** 0..1 positions on the axis, for the renderer. */
  firstPos: number;
  secondPos: number;
}

/** Where a value sits on the axis, clamped to 0..1. */
export function axisPos(value: number, data: RegressionData): number {
  const span = data.axisMax - data.axisMin;
  if (span <= 0) return 0;
  return Math.max(0, Math.min(1, (value - data.axisMin) / span));
}

export function regressionRows(data: RegressionData): RegressionRow[] {
  return data.groups.map((g) => {
    const firstDev = g.first - data.mean;
    const secondDev = g.second - data.mean;
    return {
      id: g.id,
      label: g.label,
      short: g.short,
      first: g.first,
      second: g.second,
      n: g.n,
      firstDev,
      secondDev,
      reverted: firstDev === 0 ? null : 1 - secondDev / firstDev,
      firstPos: axisPos(g.first, data),
      secondPos: axisPos(g.second, data),
    };
  });
}

/** Position of the mean line, 0..1. */
export function meanPos(data: RegressionData): number {
  return axisPos(data.mean, data);
}

/**
 * The average share of the gap that closed across the shown groups, the single
 * number that sums up the reveal ("about a third of the way back, on its own").
 * Groups with no starting gap contribute nothing and are not counted.
 */
export function overallReversion(rows: RegressionRow[]): number | null {
  const withGap = rows.filter((r) => r.reverted !== null);
  if (withGap.length === 0) return null;
  return withGap.reduce((s, r) => s + (r.reverted as number), 0) / withGap.length;
}

/** A signed value with its unit, e.g. "+3.6 in" or "-3.2 in". */
export function formatDeviation(dev: number, unit: string): string {
  const rounded = Math.round(dev * 10) / 10;
  const sign = rounded > 0 ? "+" : "";
  return `${sign}${rounded} ${unit}`;
}
