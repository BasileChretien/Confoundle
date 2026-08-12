import type { PublishedData } from "../../puzzles/schema";

/**
 * Pure derivation for the `published` shape. No React, so a future Remotion
 * template can reuse it.
 *
 * The rule that governs this module: a data file authors the rate, the standard
 * error, the denominator and the source's own adjusted figure, exactly as
 * printed, and nothing else. Every gap, every direction and every comparison
 * between adjusted and unadjusted is computed here.
 *
 * WHAT THIS MODULE WILL NOT DO, and it is the point of the whole shape. It
 * never turns a rate back into a count. The reason this shape exists is that
 * the source printed percentages whose numerators cannot always be recovered:
 * for the figure it was built for, three of four cells have exactly one integer
 * numerator that reproduces the printed percentage and the fourth has two, with
 * nothing published to break the tie. A helper returning "deaths" would be
 * inventing that number in the one place it matters, so there is no such
 * helper, and `n` is carried only to be printed.
 *
 * Nor does it compute a confidence interval from the standard error. The
 * source printed one standard error and that is what the figure draws; turning
 * it into a 95 per cent interval would be presenting the deck's arithmetic as
 * the source's, and for a lesson about taking published numbers at face value
 * that would be a poor place to start.
 */

export type PublishedPoint = {
  armId: string;
  rate: number;
  se: number;
  n: number;
  adjusted?: number;
};

export type PublishedPair = {
  rowId: string;
  label: PublishedData["rows"][number]["label"];
  short?: PublishedData["rows"][number]["short"];
  note?: PublishedData["rows"][number]["note"];
  /** One entry per arm, in the order `data.arms` declares them. */
  values: PublishedPoint[];
};

const observationAt = (data: PublishedData, rowId: string, armId: string) => {
  const o = data.observations.find((x) => x.rowId === rowId && x.armId === armId);
  if (!o) throw new Error(`no observation for row ${rowId} in arm ${armId}`);
  return o;
};

/** Every row as drawn, with one point per arm still present in the data. */
export function publishedPairs(data: PublishedData): PublishedPair[] {
  return data.rows.map((r) => ({
    rowId: r.id,
    label: r.label,
    short: r.short,
    note: r.note,
    values: data.arms.map((a) => {
      const o = observationAt(data, r.id, a.id);
      return { armId: a.id, rate: o.rate, se: o.se, n: o.n, adjusted: o.adjusted };
    }),
  }));
}

/**
 * The gap between the first two rows within one arm, signed as first minus
 * second. This is the gradient the shape is about.
 */
export function gradientIn(data: PublishedData, armId: string): number {
  const [first, second] = data.rows;
  if (!first || !second) throw new Error("a gradient needs at least two rows");
  return (
    observationAt(data, first.id, armId).rate - observationAt(data, second.id, armId).rate
  );
}

/** The same gradient after the source's own adjustment, where it published one. */
export function adjustedGradientIn(data: PublishedData, armId: string): number | null {
  const [first, second] = data.rows;
  if (!first || !second) throw new Error("a gradient needs at least two rows");
  const a = observationAt(data, first.id, armId).adjusted;
  const b = observationAt(data, second.id, armId).adjusted;
  if (a === undefined || b === undefined) return null;
  return a - b;
}

/**
 * How much of the gradient the source's adjustment removed, as a proportion.
 * Zero means adjustment changed nothing; one means it removed all of it.
 * Returns null when the source published no adjusted figures.
 */
export function gradientRemovedByAdjustment(
  data: PublishedData,
  armId: string,
): number | null {
  const raw = gradientIn(data, armId);
  const adj = adjustedGradientIn(data, armId);
  if (adj === null) return null;
  if (raw === 0) throw new Error(`arm ${armId} has no gradient to remove`);
  return (raw - adj) / raw;
}

/** The gap between two arms within one row, signed as first arm minus second. */
export function armGapOn(data: PublishedData, rowId: string): number {
  const [x, y] = data.arms;
  if (!x || !y) throw new Error("an arm gap needs at least two arms");
  return observationAt(data, rowId, x.id).rate - observationAt(data, rowId, y.id).rate;
}

/** Fraction of the axis at which a value sits, for the renderer. */
export function axisFraction(data: PublishedData, value: number): number {
  return value / data.axisMax;
}

/**
 * Draw only the arms a beat has been given.
 *
 * The setup names its arm through `strataIds` and the reveal omits it, so the
 * reveal ADDS an arm to a figure that is otherwise identical. Omitted means
 * draw everything, which keeps the reveal a superset of the setup by
 * construction. `axisMax` is shared and untouched, so no point already on
 * screen moves when the second arm arrives.
 */
export function restrictPublished(
  data: PublishedData,
  view: { strataIds?: string[] },
): PublishedData {
  if (!view.strataIds || view.strataIds.length === 0) return data;
  const keep = new Set(view.strataIds);
  return {
    ...data,
    arms: data.arms.filter((a) => keep.has(a.id)),
    observations: data.observations.filter((o) => keep.has(o.armId)),
  };
}
