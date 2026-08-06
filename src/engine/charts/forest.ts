import type { ForestData } from "../../puzzles/schema";

/**
 * Pure derivation for the `forest` shape. No React, so a future Remotion
 * template can reuse it.
 *
 * The rule that governs this module: a data file authors the PUBLISHED estimate
 * and the PUBLISHED interval for each row, and nothing else. Which side of the
 * null a row falls on, whether its interval clears the line, and how the
 * subgroups reconcile against the pooled row are all computed here. A data file
 * that stated any of them could contradict the numbers it drew them from, and
 * this is a lesson about exactly that reading, so asserting it would be the one
 * shortcut that empties the puzzle.
 */

export type ForestBar = {
  id: string;
  label: ForestData["rows"][number]["label"];
  short?: ForestData["rows"][number]["short"];
  estimate: number;
  ciLow: number;
  ciHigh: number;
  k: number;
  isPooled: boolean;
  /** Where the row sits relative to the null line. */
  side: "better" | "worse" | "null";
  /** True when the interval is entirely clear of the null line. */
  clearsNull: boolean;
};

const sideOf = (
  estimate: number,
  nullValue: number,
  higherIsWorse: boolean,
): ForestBar["side"] => {
  if (estimate === nullValue) return "null";
  const above = estimate > nullValue;
  // `higherIsWorse` flips which side of the line counts as harm, so a hazard
  // ratio above 1 reads as harm while an effect size above 0 reads as benefit.
  return above === higherIsWorse ? "worse" : "better";
};

/** Every row as drawn, with its relation to the null line derived. */
export function forestRows(data: ForestData): ForestBar[] {
  return data.rows.map((r) => ({
    id: r.id,
    label: r.label,
    short: r.short,
    estimate: r.estimate,
    ciLow: r.ciLow,
    ciHigh: r.ciHigh,
    k: r.k,
    isPooled: r.isPooled === true,
    side: sideOf(r.estimate, data.nullValue, data.higherIsWorse === true),
    clearsNull: r.ciLow > data.nullValue || r.ciHigh < data.nullValue,
  }));
}

const rowOf = (data: ForestData, id: string) => {
  const r = data.rows.find((x) => x.id === id);
  if (!r) throw new Error(`no forest row with id ${id}`);
  return r;
};

/** One row, with its derived side and clearance. */
export function rowAt(data: ForestData, id: string): ForestBar {
  const found = forestRows(data).find((r) => r.id === id);
  if (!found) throw new Error(`no forest row with id ${id}`);
  return found;
}

/**
 * Does this row show harm? The distinction the whole shape exists for.
 *
 * An estimate on the worse side of the null is NOT enough: an interval that
 * still contains the null is compatible with no effect, and calling that harm
 * is the same error in the opposite direction. Harm means the estimate is on
 * the worse side AND the interval clears the line.
 */
export function showsHarm(data: ForestData, id: string): boolean {
  const r = rowAt(data, id);
  return r.side === "worse" && r.clearsNull;
}

/** And the mirror: a row that helps, with its interval clear of the null. */
export function showsBenefit(data: ForestData, id: string): boolean {
  const r = rowAt(data, id);
  return r.side === "better" && r.clearsNull;
}

/** How far apart two rows' estimates are, in the shape's own unit. */
export function gapBetween(data: ForestData, aId: string, bId: string): number {
  return rowOf(data, aId).estimate - rowOf(data, bId).estimate;
}

/** The ratio of one row's distance from the null to another's. */
export function timesTheEffect(data: ForestData, aId: string, bId: string): number {
  const a = rowOf(data, aId).estimate - data.nullValue;
  const b = rowOf(data, bId).estimate - data.nullValue;
  if (b === 0) throw new Error(`row ${bId} sits on the null line, so no ratio exists`);
  return a / b;
}

/** True when two rows' intervals do not touch, so the difference is visible. */
export function intervalsDisjoint(data: ForestData, aId: string, bId: string): boolean {
  const a = rowOf(data, aId);
  const b = rowOf(data, bId);
  return a.ciHigh < b.ciLow || b.ciHigh < a.ciLow;
}

/**
 * The k-weighted mean of a set of rows, for reconciling subgroups against the
 * row that pools them.
 *
 * THIS IS A CONSISTENCY CHECK AND NOT AN IDENTITY, and callers must treat it as
 * one. A random-effects pooled estimate weights each study by the inverse of its
 * total variance, which is not its sample count, so this will land near the
 * published pooled figure without equalling it. It is here so a data file can be
 * tested for gross inconsistency, never so a puzzle can print a figure the
 * source did not.
 */
export function weightedMean(data: ForestData, ids: string[]): number {
  const rows = ids.map((id) => rowOf(data, id));
  const totalK = rows.reduce((s, r) => s + r.k, 0);
  if (totalK === 0) throw new Error("no evidence behind those rows");
  return rows.reduce((s, r) => s + r.k * r.estimate, 0) / totalK;
}

/** Total studies behind a set of rows, for reconciling against a printed total. */
export function totalK(data: ForestData, ids: string[]): number {
  return ids.map((id) => rowOf(data, id)).reduce((s, r) => s + r.k, 0);
}

/** Fraction of the axis at which a value sits, for the renderer. */
export function axisFraction(data: ForestData, value: number): number {
  return (value - data.axisMin) / (data.axisMax - data.axisMin);
}

/**
 * Draw only the rows a beat has been given.
 *
 * The setup beat names its rows through `groupIds` and the reveal omits it, so
 * the reveal ADDS rows to a figure that is otherwise identical. Omitted means
 * draw everything, which keeps the reveal a superset of the setup by
 * construction rather than by an author remembering to make it one.
 *
 * Note what is NOT filtered: `axisMin`, `axisMax` and `nullValue` are shared, so
 * both beats put the null line in the same place and a row that arrives at the
 * reveal lands where the reader was already looking. Rescaling between beats
 * would make the added row incomparable to the ones already on screen, which is
 * the one thing this shape must never do.
 */
export function restrictForest(data: ForestData, view: { groupIds?: string[] }): ForestData {
  if (!view.groupIds) return data;
  const keep = new Set(view.groupIds);
  return { ...data, rows: data.rows.filter((r) => keep.has(r.id)) };
}
