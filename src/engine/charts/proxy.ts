import type { ProxyData, ProxyMeasure } from "../../puzzles/schema";

/**
 * Pure derivation for the proxy shape. No React, no DOM.
 *
 * The lesson is a comparison between two comparisons. On the scale the model
 * was trained on, the two groups are a few per cent apart. On the scale anyone
 * actually cared about, they are tens of per cent apart. Both gaps come from
 * the same table, so the setup's reassuring number and the reveal's alarming
 * one cannot contradict each other: they are the same arithmetic run on
 * different rows.
 *
 * THE RATIO IS THE DERIVED QUANTITY, not the raw values, and that is deliberate.
 * The measures are in different units, dollars against counts of admissions, so
 * they cannot share an axis and their raw sizes say nothing to each other. What
 * IS comparable across them is how far apart the two groups sit, and that is a
 * pure number. It is also the only quantity that makes the reveal land: four
 * per cent and twelve per cent against forty four and eighty four.
 */

/** One measure, with both groups' values and how far apart they are. */
export interface MeasureGap {
  readonly measureId: string;
  readonly label: ProxyMeasure["label"];
  readonly scale: ProxyMeasure["scale"];
  readonly unit: ProxyMeasure["unit"];
  readonly per: ProxyMeasure["per"];
  /** In the data's group order, so a renderer never has to sort. */
  readonly values: readonly { readonly groupId: string; readonly value: number }[];
  /**
   * How many times the larger value is of the smaller, so it is always at
   * least 1 and a reader never has to know which way round the groups were
   * written. Null when the smaller value is zero, where a ratio would be a
   * division by zero dressed up as infinity.
   */
  readonly ratio: number | null;
  /** Which group is on top. Null when they are exactly equal. */
  readonly higherGroupId: string | null;
}

export function gapsFor(data: ProxyData): readonly MeasureGap[] {
  return data.measures.map((m) => {
    const values = data.groups.map((g) => ({
      groupId: g.id,
      value:
        data.observations.find((o) => o.measureId === m.id && o.groupId === g.id)?.value ?? 0,
    }));
    const sorted = [...values].sort((a, b) => b.value - a.value);
    const top = sorted[0]!;
    const bottom = sorted[sorted.length - 1]!;
    return {
      measureId: m.id,
      label: m.label,
      scale: m.scale,
      unit: m.unit,
      per: m.per,
      values,
      ratio: bottom.value > 0 ? top.value / bottom.value : null,
      higherGroupId: top.value === bottom.value ? null : top.groupId,
    };
  });
}

/**
 * The measures a given beat draws.
 *
 * The setup shows only what the model was trained on, which is the whole trap:
 * on those rows the groups agree, so the obvious reading is that the model
 * treats them alike. The reveal adds the rows nobody trained on.
 */
export function gapsForScale(
  data: ProxyData,
  scales: readonly ProxyMeasure["scale"][],
): readonly MeasureGap[] {
  return gapsFor(data).filter((g) => scales.includes(g.scale));
}

/**
 * The same slice, as data rather than as derived gaps.
 *
 * NAMED `restrict*` ON PURPOSE, and the name is load bearing. The colour guard
 * in `declaredColors.test.ts` finds slice-drawing renderers by reading the
 * sources for this exact shape of call, and a renderer it cannot see is one
 * nothing checks. This shape slices MEASURES rather than groups, so colour
 * cannot drift the way that guard was written for, but opting in is still
 * right: the day somebody makes the setup show one group instead of one scale,
 * the check that catches it should already be pointed here.
 */
export function restrictProxy(
  data: ProxyData,
  opts: { readonly scales: readonly ProxyMeasure["scale"][] },
): ProxyData {
  const measures = data.measures.filter((m) => opts.scales.includes(m.scale));
  const keep = new Set(measures.map((m) => m.id));
  return {
    ...data,
    measures,
    observations: data.observations.filter((o) => keep.has(o.measureId)),
  };
}

/**
 * How much wider the truth gaps run than the proxy gaps, as a plain number.
 *
 * Computed on the WIDEST gap in each set rather than an average, because an
 * average over measures in different units is a number with no referent: it
 * would mix a ratio of dollars with a ratio of admissions and report the mean
 * of two things that were never the same thing. The widest is at least a real
 * observation somebody can point at in the figure.
 *
 * Null when either set is empty or contains an undefined ratio, rather than
 * silently dropping the undefined one, since a set with an unmeasurable gap in
 * it does not have a known widest.
 */
export function widestGap(gaps: readonly MeasureGap[]): number | null {
  if (gaps.length === 0) return null;
  let widest = 0;
  for (const g of gaps) {
    if (g.ratio === null) return null;
    widest = Math.max(widest, g.ratio);
  }
  return widest;
}

/** A ratio as a percentage difference, e.g. 1.44 becomes 44. */
export function asPercentMore(ratio: number): number {
  return Math.round((ratio - 1) * 100);
}
