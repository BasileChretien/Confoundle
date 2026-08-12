import type { ConditionalData } from "../../puzzles/schema";

/**
 * Pure derivation for the `conditional` shape. No JSX, no formatting.
 *
 * ONE THING THIS DELIBERATELY WILL NOT DO. It never turns a standard deviation
 * into a confidence interval or a standard error. The sources this shape draws
 * print an SD per cell, and widening that into an interval would put this
 * deck's arithmetic on a figure whose whole subject is reading published
 * numbers as published. The renderer draws the SD and says it is an SD.
 */

export interface ConditionalPoint {
  rowId: string;
  columnId: string;
  mean: number;
  sd?: number;
  n: number;
}

export interface ConditionalRowSeries {
  rowId: string;
  points: ConditionalPoint[];
  /** Widest minus narrowest mean in this row: how much the factor moved it. */
  spread: number;
}

function cell(data: ConditionalData, rowId: string, columnId: string): ConditionalPoint {
  const c = data.cells.find((x) => x.rowId === rowId && x.columnId === columnId);
  if (!c)
    throw new Error(
      `no cell for ${rowId}/${columnId}; the schema should have rejected this`,
    );
  return { rowId, columnId, mean: c.mean, sd: c.sd, n: c.n };
}

/** Every row, in authored order, each with its columns in authored order. */
export function rowSeries(data: ConditionalData): ConditionalRowSeries[] {
  return data.rows.map((r) => {
    const points = data.columns.map((c) => cell(data, r.id, c.id));
    const means = points.map((p) => p.mean);
    return {
      rowId: r.id,
      points,
      spread: Math.max(...means) - Math.min(...means),
    };
  });
}

export function spreadOf(data: ConditionalData, rowId: string): number {
  const s = rowSeries(data).find((x) => x.rowId === rowId);
  if (!s) throw new Error(`no row ${rowId}`);
  return s.spread;
}

/**
 * How much wider the factor's effect is in one row than another. This is the
 * single number the reveal argues about, so it is derived once here rather than
 * recomputed by eye in prose.
 */
export function spreadRatio(data: ConditionalData, wideRowId: string, narrowRowId: string): number {
  const narrow = spreadOf(data, narrowRowId);
  if (narrow === 0) return Number.POSITIVE_INFINITY;
  return spreadOf(data, wideRowId) / narrow;
}

/** Where a mean sits on the authored scale, as a fraction from 0 to 1. */
export function scaleFraction(data: ConditionalData, value: number): number {
  const { min, max } = data.scale;
  if (max === min) return 0.5;
  return (value - min) / (max - min);
}

/**
 * Which rows a beat draws. The setup names one row through `groupIds`; the
 * reveal omits it and gets them all, so the reveal is a superset of the setup
 * by construction rather than by an author keeping two lists in step.
 */
export function restrictConditional(
  data: ConditionalData,
  view: { groupIds?: string[] },
): ConditionalData {
  if (!view.groupIds || view.groupIds.length === 0) return data;
  const keep = new Set(view.groupIds);
  return {
    ...data,
    rows: data.rows.filter((r) => keep.has(r.id)),
    cells: data.cells.filter((c) => keep.has(c.rowId)),
  };
}
