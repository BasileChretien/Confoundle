import type { CrossedData } from "../../puzzles/schema";

/**
 * Pure derivation for the `crossed` shape. No React, so a future Remotion
 * template can reuse it.
 *
 * The rule that governs this module: a data file authors four cell means and
 * says which level of each factor every cell sits in, and nothing else. Which
 * pairs differ in one factor and which in both, how big each gap is, and which
 * gap the confounded comparison was made of are all computed here.
 *
 * WHAT THIS MODULE WILL NOT TELL YOU. It reports the gaps. It does not report
 * which factor "caused" the result, and there is no export that decides that.
 * The temptation is real, because for the figure this shape was built for the
 * answer looks obvious from four numbers. But "the gap along factor A is bigger
 * than the gap along factor B" is a statement about two point differences with
 * no uncertainty attached, and a source's own test is what licenses calling
 * that a finding. A puzzle that wants to say so states it in prose, cites the
 * test, and asserts the arithmetic in its own test file.
 *
 * Nor is there an export that adds the two single-factor gaps and compares the
 * sum against the diagonal. A crossed design does not decompose that way unless
 * the factors are additive, which is a modelling assumption the data cannot
 * carry, and a function returning a "residual" would smuggle it in.
 */

export type CrossedPoint = {
  cellId: string;
  aId: string;
  bId: string;
  mean: number;
  n: number;
  note?: CrossedData["cells"][number]["note"];
};

export type CrossedGap = {
  fromId: string;
  toId: string;
  /** `from` minus `to`. Signed, in the shape's own units. */
  difference: number;
  /** Which factors the two cells differ on. */
  varies: ("a" | "b")[];
};

const cellById = (data: CrossedData, id: string) => {
  const c = data.cells.find((x) => x.id === id);
  if (!c) throw new Error(`no crossed cell with id ${id}`);
  return c;
};

/** Every cell, in declaration order. */
export function points(data: CrossedData): CrossedPoint[] {
  return data.cells.map((c) => ({
    cellId: c.id,
    aId: c.aId,
    bId: c.bId,
    mean: c.mean,
    n: c.n,
    note: c.note,
  }));
}

/** The cells sitting in one level of the first factor, in declaration order. */
export function cellsInA(data: CrossedData, aId: string): CrossedPoint[] {
  return points(data).filter((p) => p.aId === aId);
}

/** One gap, with the factors it varies worked out rather than asserted. */
export function gap(data: CrossedData, fromId: string, toId: string): CrossedGap {
  const from = cellById(data, fromId);
  const to = cellById(data, toId);
  const varies: ("a" | "b")[] = [];
  if (from.aId !== to.aId) varies.push("a");
  if (from.bId !== to.bId) varies.push("b");
  return { fromId, toId, difference: from.mean - to.mean, varies };
}

/** Every pair, so a caller can pick without knowing the cell ids. */
export function allGaps(data: CrossedData): CrossedGap[] {
  const out: CrossedGap[] = [];
  for (let i = 0; i < data.cells.length; i++)
    for (let j = i + 1; j < data.cells.length; j++)
      out.push(gap(data, data.cells[i]!.id, data.cells[j]!.id));
  return out;
}

/**
 * The pairs that differ in both factors at once. These are the comparisons a
 * study makes when it varies two things together, and they are what the setup
 * beat draws.
 */
export function confoundedGaps(data: CrossedData): CrossedGap[] {
  return allGaps(data).filter((g) => g.varies.length === 2);
}

/** And the pairs that move one factor with the other held still. */
export function cleanGaps(data: CrossedData, factor: "a" | "b"): CrossedGap[] {
  return allGaps(data).filter((g) => g.varies.length === 1 && g.varies[0] === factor);
}

/** Fraction of the axis at which a value sits, for the renderer. */
export function axisFraction(data: CrossedData, value: number): number {
  const { min, max } = data.scale;
  return (value - min) / (max - min);
}

/**
 * Draw only the cells a beat has been given.
 *
 * The setup names its two cells through `groupIds` and the reveal omits it, so
 * the reveal ADDS cells to a figure that is otherwise identical. Omitted means
 * draw everything, which keeps the reveal a superset of the setup by
 * construction rather than by an author remembering to make it one. Note what
 * is NOT filtered: the scale and the reference are shared, so nothing already
 * on screen moves when the two extra points arrive.
 */
export function restrictCrossed(
  data: CrossedData,
  view: { groupIds?: string[] },
): CrossedData {
  if (!view.groupIds || view.groupIds.length === 0) return data;
  const keep = new Set(view.groupIds);
  return { ...data, cells: data.cells.filter((c) => keep.has(c.id)) };
}
