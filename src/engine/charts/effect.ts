import type { EffectData } from "../../puzzles/schema";

/**
 * Pure derivation for the effect shape. No React, no DOM, so the same numbers
 * can drive the web engine and any future card or clip template.
 *
 * The whole lesson lives in the two readings this produces from one estimate:
 * `excludesNoEffect` (is it distinguishable from nothing) and `share` (how much
 * of the thing it actually fixes). A result can be emphatically the first and
 * negligibly the second, and a large enough study guarantees the first.
 */

export interface EffectReading {
  estimate: number;
  ciLow: number;
  ciHigh: number;
  /** True when the whole interval sits on one side of zero. */
  excludesNoEffect: boolean;
  /** The estimate as a fraction of the reference quantity, 0..1. */
  share: number;
  /** The reference quantity with the effect applied. */
  treated: number;
  reference: number;
}

export function effectReading(data: EffectData): EffectReading {
  const { estimate, ciLow, ciHigh, reference } = data;
  return {
    estimate,
    ciLow,
    ciHigh,
    excludesNoEffect: (ciLow > 0 && ciHigh > 0) || (ciLow < 0 && ciHigh < 0),
    share: reference > 0 ? Math.abs(estimate) / reference : 0,
    treated: reference - estimate,
    reference,
  };
}

/**
 * Where to draw the interval in the significance view, as percentages across a
 * axis that always includes zero and is padded so the interval never touches an
 * edge. Returned as 0..100 so the renderer can position with plain CSS.
 */
export interface SignificanceAxis {
  /** Left edge of the interval bar, 0..100. */
  left: number;
  /** Width of the interval bar, 0..100. */
  width: number;
  /** Where the point estimate sits, 0..100. */
  point: number;
  /** Where the no-difference line sits, 0..100. */
  zero: number;
}

export function significanceAxis(data: EffectData): SignificanceAxis {
  const { ciLow, ciHigh, estimate } = data;
  const lo = Math.min(0, ciLow, estimate);
  const hi = Math.max(0, ciHigh, estimate);
  // Pad both ends by a tenth of the span so nothing renders flush to the edge
  // and a zero at one extreme still reads as a line rather than a border.
  const pad = (hi - lo) * 0.1 || 1;
  const min = lo - pad;
  const max = hi + pad;
  const span = max - min;
  const at = (v: number) => ((v - min) / span) * 100;
  return {
    left: at(ciLow),
    width: at(ciHigh) - at(ciLow),
    point: at(estimate),
    zero: at(0),
  };
}

/** Round for display without pretending to more precision than authored. */
export function formatAmount(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
