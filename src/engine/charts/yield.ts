import type { YieldData } from "../../puzzles/schema";

/**
 * Pure derivation for the `yield` shape. No React, so a future Remotion
 * template can reuse it.
 *
 * The rule that governs this module: a data file authors the PUBLISHED rate and
 * the PUBLISHED interval for each population on each row, and nothing else.
 * Which rows moved, whether a pair's intervals clear one another, and how big
 * any gap is are all computed here. A data file that stated any of them could
 * contradict the numbers it drew them from, and this is a lesson about exactly
 * that reading, so asserting it would be the one shortcut that empties the
 * puzzle.
 *
 * A note on what `separated` does and does not mean. Two intervals that fail to
 * overlap imply a difference; two that overlap do NOT imply the absence of one,
 * because overlapping intervals are still compatible with a real difference.
 * So this module reports `separated` and never `same`, and callers must not
 * read a false as proof of equality. The puzzle that needs "no difference"
 * takes it from the source's own test, which is a published number and not
 * something derivable from a pair of intervals.
 */

export type YieldPair = {
  rowId: string;
  label: YieldData["rows"][number]["label"];
  short?: YieldData["rows"][number]["short"];
  note?: YieldData["rows"][number]["note"];
  /** One entry per arm, in the order `data.arms` declares them. */
  values: { armId: string; rate: number; ciLow: number; ciHigh: number }[];
  /** First arm minus second, in the shape's own units. Signed. */
  difference: number;
  /** True when the two intervals do not touch. */
  separated: boolean;
};

const observationAt = (data: YieldData, rowId: string, armId: string) => {
  const o = data.observations.find((x) => x.rowId === rowId && x.armId === armId);
  if (!o) throw new Error(`no observation for row ${rowId} in arm ${armId}`);
  return o;
};

/** Every row as drawn, with its gap and its separation derived. */
export function yieldPairs(data: YieldData): YieldPair[] {
  return data.rows.map((r) => {
    const values = data.arms.map((a) => {
      const o = observationAt(data, r.id, a.id);
      return { armId: a.id, rate: o.rate, ciLow: o.ciLow, ciHigh: o.ciHigh };
    });
    const [x, y] = values;
    if (!x || !y) throw new Error(`row ${r.id} does not carry both arms`);
    return {
      rowId: r.id,
      label: r.label,
      short: r.short,
      note: r.note,
      values,
      difference: x.rate - y.rate,
      separated: x.ciHigh < y.ciLow || y.ciHigh < x.ciLow,
    };
  });
}

/** One row, with its gap and separation derived. */
export function pairAt(data: YieldData, rowId: string): YieldPair {
  const found = yieldPairs(data).find((p) => p.rowId === rowId);
  if (!found) throw new Error(`no yield row with id ${rowId}`);
  return found;
}

/** First arm minus second on one row, in the shape's own units. */
export function differenceOn(data: YieldData, rowId: string): number {
  return pairAt(data, rowId).difference;
}

/**
 * How much bigger the first arm's rate is than the second's, as a proportion of
 * the second. The figure people quote when a screening programme "found more".
 */
export function relativeExcessOn(data: YieldData, rowId: string): number {
  const p = pairAt(data, rowId);
  const [x, y] = p.values;
  if (!x || !y) throw new Error(`row ${rowId} does not carry both arms`);
  if (y.rate === 0) throw new Error(`row ${rowId} has a zero comparator, so no ratio exists`);
  return (x.rate - y.rate) / y.rate;
}

/** True when the two arms' intervals on this row do not touch. */
export function separatedOn(data: YieldData, rowId: string): boolean {
  return pairAt(data, rowId).separated;
}

/** The rows whose intervals clear one another, in declaration order. */
export function separatedRows(data: YieldData): string[] {
  return yieldPairs(data)
    .filter((p) => p.separated)
    .map((p) => p.rowId);
}

/** And the mirror: rows whose intervals still overlap. */
export function overlappingRows(data: YieldData): string[] {
  return yieldPairs(data)
    .filter((p) => !p.separated)
    .map((p) => p.rowId);
}

/** Fraction of the axis at which a value sits, for the renderer. */
export function axisFraction(data: YieldData, value: number): number {
  return value / data.axisMax;
}

/**
 * Draw only the rows a beat has been given.
 *
 * The setup beat names its rows through `groupIds` and the reveal omits it, so
 * the reveal ADDS rows to a figure that is otherwise identical. Omitted means
 * draw everything, which keeps the reveal a superset of the setup by
 * construction rather than by an author remembering to make it one.
 *
 * Note what is NOT filtered: `axisMax` is shared, so both beats put every bar
 * on one scale and a row that arrives at the reveal lands where the reader was
 * already looking. Rescaling between beats would change how far apart the pairs
 * already on screen appear, which is the whole verdict, so this shape must
 * never do it.
 */
export function restrictYield(data: YieldData, view: { groupIds?: string[] }): YieldData {
  if (!view.groupIds) return data;
  const keep = new Set(view.groupIds);
  return {
    ...data,
    rows: data.rows.filter((r) => keep.has(r.id)),
    observations: data.observations.filter((o) => keep.has(o.rowId)),
  };
}
