import type { NoninferiorityData } from "../../puzzles/schema.ts";

/**
 * Pure derivation for the noninferiority shape. No React, no DOM.
 *
 * One estimate, read against TWO reference lines rather than one. The null
 * answers "did it do anything"; the margin answers "was it acceptably close to
 * the old option", and the margin is not a measurement at all: it was chosen
 * before any data existed. A trial built to clear the second line is routinely
 * reported as though it had cleared the first.
 *
 * THREE ZONES, WHICH IS WHY THIS IS NOT `forest`. A forest plot's axis has two
 * sides, better and worse, and its optional benchmark must be some row's own
 * estimate. Here the axis is cut into three by two lines of completely
 * different kinds, and the whole lesson lives in the middle zone, where a
 * result is neither worse-by-too-much nor better, and where the great majority
 * of successful non-inferiority trials land.
 *
 * THE MARGIN CARRIES THE DIRECTION, so nothing here reads a `higherIsWorse`
 * flag and nothing can default one wrongly. A non-inferiority margin is by
 * definition the largest tolerable amount of WORSENESS, so it always sits on
 * the worse side of the null. Above it for a ratio of an adverse outcome,
 * below it for a ratio of a good one. The schema refuses a margin sitting
 * exactly on the null, which is the one arrangement that would leave the
 * direction undefined, so every function below can rely on this.
 */

/** How often the outcome occurred in an arm, per the shape's own denominator. */
export function armRate(
  arm: NoninferiorityData["intervention"],
  per: number,
): number {
  return (arm.events / arm.n) * per;
}

/**
 * The ratio the two arms' counts imply, which the schema checks the published
 * estimate against. Null when the control arm saw no events, where the ratio
 * would be an infinity standing in for a measurement.
 */
export function impliedRatio(data: NoninferiorityData): number | null {
  if (data.control.events === 0) return null;
  return (
    data.intervention.events /
    data.intervention.n /
    (data.control.events / data.control.n)
  );
}

/** Whether the worse side of the axis is the high side. See the header. */
export function worseIsAbove(data: NoninferiorityData): boolean {
  return data.margin > data.nullValue;
}

/** The end of the interval nearest the margin: the one non-inferiority tests. */
export function boundTowardMargin(data: NoninferiorityData): number {
  return worseIsAbove(data) ? data.ciHigh : data.ciLow;
}

/** The other end: the one superiority would have to clear. */
export function boundTowardBenefit(data: NoninferiorityData): number {
  return worseIsAbove(data) ? data.ciLow : data.ciHigh;
}

/**
 * Non-inferiority met: the interval stops short of the margin.
 *
 * Strict, because a bound sitting exactly on the margin has not cleared it and
 * the convention every such trial states is that the bound must fall BELOW the
 * margin (or above it, when the axis runs the other way).
 */
export function meetsNonInferiority(data: NoninferiorityData): boolean {
  return worseIsAbove(data)
    ? boundTowardMargin(data) < data.margin
    : boundTowardMargin(data) > data.margin;
}

/** Whether the interval contains no difference at all, which is the punchline. */
export function crossesNull(data: NoninferiorityData): boolean {
  return data.ciLow <= data.nullValue && data.nullValue <= data.ciHigh;
}

/**
 * Superiority shown: the whole interval sits on the better side of the null.
 *
 * This is the claim a reader hears in "12% lower" and it is a different, and
 * strictly stronger, thing than the trial set out to test.
 */
export function showsSuperiority(data: NoninferiorityData): boolean {
  return worseIsAbove(data)
    ? data.ciHigh < data.nullValue
    : data.ciLow > data.nullValue;
}

export type Verdict = "inferior" | "noninferior" | "superior";

/**
 * What the trial established, in one word.
 *
 * The order matters: an interval that never cleared the margin has failed
 * outright, whatever its point estimate looks like, so that is asked first.
 */
export function verdict(data: NoninferiorityData): Verdict {
  if (!meetsNonInferiority(data)) return "inferior";
  return showsSuperiority(data) ? "superior" : "noninferior";
}

/**
 * The apparent change a point estimate advertises, as a fraction.
 *
 * For a rate ratio of 0.88 against a null of 1 this is 0.12, which is the
 * "12% lower" a release prints. Returned as a magnitude, since which direction
 * it points is `worseIsAbove` plus the sign of `estimate - nullValue` and a
 * caller drawing a label already knows both.
 */
export function apparentChange(data: NoninferiorityData): number {
  return Math.abs(data.estimate - data.nullValue) / data.nullValue;
}

/**
 * Where a value falls along the drawn axis, as a fraction from 0 to 1.
 *
 * LINEAR, DELIBERATELY. A ratio is conventionally plotted on a log axis so that
 * halving and doubling look equally far from the null, and on a wide axis that
 * matters. This shape's reading is positional rather than metric: which side of
 * which line the interval's ends fall on, and a linear scale preserves that
 * ordering exactly. Authoring a narrow axis around the null keeps the visual
 * distortion small, and the alternative would put a log transform between the
 * reader and the two numbers the figure exists to compare.
 */
export function axisPosition(data: NoninferiorityData, value: number): number {
  const span = data.axisMax - data.axisMin;
  if (span <= 0) return 0;
  return Math.min(1, Math.max(0, (value - data.axisMin) / span));
}

/**
 * The three zones, in drawing order along the axis, each as a span of the
 * drawn width. Returned so the renderer never has to work out which of the two
 * reference lines comes first, which depends on the direction.
 */
export function zones(
  data: NoninferiorityData,
): readonly { readonly kind: Verdict; readonly from: number; readonly to: number }[] {
  const nullAt = axisPosition(data, data.nullValue);
  const marginAt = axisPosition(data, data.margin);
  return worseIsAbove(data)
    ? [
        { kind: "superior", from: 0, to: nullAt },
        { kind: "noninferior", from: nullAt, to: marginAt },
        { kind: "inferior", from: marginAt, to: 1 },
      ]
    : [
        { kind: "inferior", from: 0, to: marginAt },
        { kind: "noninferior", from: marginAt, to: nullAt },
        { kind: "superior", from: nullAt, to: 1 },
      ];
}
