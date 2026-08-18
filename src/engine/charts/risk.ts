import type { RiskData } from "../../puzzles/schema";

/**
 * Pure derivation for the risk shape. No React, no DOM, importable by the web
 * engine and (later) by Remotion templates, so every surface quotes the same
 * numbers. Relative-versus-absolute lives here: `relativeReduction` and
 * `absoluteReduction` are computed from the very same four integers, and they
 * feel completely different because they are divided by different things.
 *
 *   relativeReduction = (controlRisk - treatedRisk) / controlRisk
 *   absoluteReduction =  controlRisk - treatedRisk
 *
 * The first asks "what fraction of the risk went away", the second asks "what
 * fraction of the people". When a risk is small the two are worlds apart, and
 * only the second tells you what taking the drug does for you.
 */

export interface RiskSummary {
  controlRisk: number; // 0..1
  treatedRisk: number; // 0..1
  relativeReduction: number; // 0..1, the headline number
  absoluteReduction: number; // 0..1, in percentage points
  /** Events avoided per `data.scale` people treated. */
  avoidedPerScale: number;
  /** People treated for one to benefit. Infinite when nothing is avoided. */
  numberNeededToTreat: number;
  /** Treated risk as a share of control risk: what the relative view draws. */
  remainingShare: number; // 0..1
}

export function riskSummary(data: RiskData): RiskSummary {
  const controlRisk = data.control.events / data.control.n;
  const treatedRisk = data.treated.events / data.treated.n;
  const absoluteReduction = controlRisk - treatedRisk;
  const relativeReduction =
    controlRisk > 0 ? absoluteReduction / controlRisk : 0;

  return {
    controlRisk,
    treatedRisk,
    relativeReduction,
    absoluteReduction,
    avoidedPerScale: absoluteReduction * data.scale,
    numberNeededToTreat:
      absoluteReduction > 0 ? 1 / absoluteReduction : Number.POSITIVE_INFINITY,
    remainingShare: controlRisk > 0 ? treatedRisk / controlRisk : 0,
  };
}

/** Percent with one decimal only when it needs one, e.g. "7.5%" and "31%". */
export function formatRiskPct(rate: number): string {
  const pct = rate * 100;
  const rounded = Math.round(pct * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(1)}%`;
}


/**
 * The frame to draw at a point in the scrub between the two authored views.
 *
 * THE RULE THIS ENCODES, and it is the one constraint the whole scrub design
 * turns on: LAYOUT MAY INTERPOLATE, VALUES MAY NOT. A bar's height is a
 * position on the page and may move smoothly. A printed number is a claim
 * about the world, and there is no reading of the source table that supports
 * "2.4%" at phase 0.37. Tweening the numerals would fabricate a data frame on
 * a deck whose whole position is that every figure was read off a table.
 *
 * The risk shape makes that easy to honour, because its two views already
 * disagree about whether numerals exist at all. The relative view prints none
 * (the bars are a share of the control arm, so "100%" over the control would
 * read as "100% of these men", which is the opposite of what it means), and
 * the absolute view prints both. So the readouts simply do not appear until
 * the scrub has arrived, and no intermediate figure is ever shown.
 *
 * `framed` is layout too: the outline of the full 0 to 100 scale is what makes
 * the absolute view legible, and it snaps at the midpoint rather than fading,
 * because a half-drawn frame reads as a rendering fault rather than a state.
 */
export interface RiskFrame {
  /** Control then treated, each 0..1 of the drawn column. */
  fills: [number, number];
  /** Present only once the scrub has arrived at the absolute view. */
  readouts: [string, string] | null;
  framed: boolean;
}

/*
  THE PRECISE FORM, NOT `a + (b - a) * t`, and the difference is not pedantry.
  The naive form is not exact at its own endpoints in floating point: with
  a = 1 and b = 0.03 it returns 0.030000000000000027 at t = 1, so the scrub
  would arrive next to the authored view rather than on it. This form is
  exactly `a` at 0 and exactly `b` at 1, which is what lets the test assert
  the endpoints with equality instead of tolerance. Caught by that test.
*/
const lerp = (a: number, b: number, t: number): number =>
  (1 - t) * a + t * b;

export function riskFrameAt(data: RiskData, phase: number): RiskFrame {
  const t = Math.max(0, Math.min(1, phase));
  const s = riskSummary(data);

  // The two authored endpoints, named rather than inlined so the test can
  // assert the frame at 0 and 1 equals exactly what the discrete views draw.
  const relative: [number, number] = [1, s.remainingShare];
  const absolute: [number, number] = [s.controlRisk, s.treatedRisk];

  return {
    fills: [
      lerp(relative[0], absolute[0], t),
      lerp(relative[1], absolute[1], t),
    ],
    readouts:
      t === 1
        ? [formatRiskPct(s.controlRisk), formatRiskPct(s.treatedRisk)]
        : null,
    framed: t >= 0.5,
  };
}
