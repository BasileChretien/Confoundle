import type { DeliveredData } from "../../puzzles/schema";

/**
 * Pure derivation for the `delivered` shape. No React, so a future Remotion
 * template can reuse it.
 *
 * The rule that governs this module: a data file authors the mean each cell
 * was measured at and the exposure that cell was actually given, and nothing
 * else. Which tiers were treated alike, how far apart a tier's two arms came
 * out, and whether the hidden column explains that gap are all computed here.
 *
 * WHAT THIS MODULE DELIBERATELY WILL NOT TELL YOU. It reports that a tier's two
 * arms were given the same exposure. It does not report what therefore caused
 * that tier's difference, and there is no export that comes close to saying so.
 * "The exposures matched, so the gap must be the thing I have in mind" is an
 * inference about a particular experiment, licensed by that experiment's own
 * design and its own controls, and it belongs in a puzzle's lesson where it can
 * be argued and qualified. Computing it here would let any future data file
 * inherit a causal claim it never earned.
 *
 * Nor is there an export dividing one tier's difference by another's. Two
 * differences measured under different exposures are not on a common footing,
 * and a function returning "8.3" would invite exactly the reading that the
 * ratio is an effect size. A puzzle that wants to say one gap is much larger
 * than another can say so and assert it in its own test against these numbers.
 */

export type DeliveredPair = {
  tierId: string;
  label: DeliveredData["tiers"][number]["label"];
  short?: DeliveredData["tiers"][number]["short"];
  note?: DeliveredData["tiers"][number]["note"];
  /** One entry per arm, in the order `data.arms` declares them. */
  values: { armId: string; mean: number; n: number; exposure: number }[];
  /** First arm minus second, on the shape's own scale. Signed. */
  difference: number;
  /** First arm minus second, in units of `exposureUnit`. Signed. */
  exposureGap: number;
  /** True when this tier's two arms were given exactly the same thing. */
  matched: boolean;
};

const observationAt = (data: DeliveredData, tierId: string, armId: string) => {
  const o = data.observations.find((x) => x.tierId === tierId && x.armId === armId);
  if (!o) throw new Error(`no observation for tier ${tierId} in arm ${armId}`);
  return o;
};

/** Every tier as drawn, with its gap and its exposure gap derived. */
export function deliveredPairs(data: DeliveredData): DeliveredPair[] {
  return data.tiers.map((t) => {
    const values = data.arms.map((a) => {
      const o = observationAt(data, t.id, a.id);
      return { armId: a.id, mean: o.mean, n: o.n, exposure: o.exposure };
    });
    const [x, y] = values;
    if (!x || !y) throw new Error(`tier ${t.id} does not carry both arms`);
    return {
      tierId: t.id,
      label: t.label,
      short: t.short,
      note: t.note,
      values,
      difference: x.mean - y.mean,
      exposureGap: x.exposure - y.exposure,
      matched: x.exposure === y.exposure,
    };
  });
}

/** One tier, with its gap and exposure gap derived. */
export function pairAt(data: DeliveredData, tierId: string): DeliveredPair {
  const found = deliveredPairs(data).find((p) => p.tierId === tierId);
  if (!found) throw new Error(`no delivered tier with id ${tierId}`);
  return found;
}

/** First arm minus second on one tier, on the shape's own scale. */
export function differenceOn(data: DeliveredData, tierId: string): number {
  return pairAt(data, tierId).difference;
}

/** First arm minus second on one tier, in units of `exposureUnit`. */
export function exposureGapOn(data: DeliveredData, tierId: string): number {
  return pairAt(data, tierId).exposureGap;
}

/** True when this tier's two arms were given exactly the same thing. */
export function matchedOn(data: DeliveredData, tierId: string): boolean {
  return pairAt(data, tierId).matched;
}

/** The tiers whose two arms were given the same thing, in declaration order. */
export function matchedTiers(data: DeliveredData): string[] {
  return deliveredPairs(data)
    .filter((p) => p.matched)
    .map((p) => p.tierId);
}

/** And the mirror: tiers where the exposure itself differed. */
export function unmatchedTiers(data: DeliveredData): string[] {
  return deliveredPairs(data)
    .filter((p) => !p.matched)
    .map((p) => p.tierId);
}

/** Fraction of the axis at which a value sits, for the renderer. */
export function axisFraction(data: DeliveredData, value: number): number {
  const { min, max } = data.scale;
  return (value - min) / (max - min);
}

/**
 * Whether a beat prints the exposure column.
 *
 * The setup and the reveal draw the same bars from the same observations; the
 * only difference between them is this boolean. Keeping it here rather than in
 * the renderer means the rule is testable, and means a third view kind added
 * later cannot silently default to showing the answer.
 */
export function showsExposure(kind: string): boolean {
  return kind === "asdelivered";
}
