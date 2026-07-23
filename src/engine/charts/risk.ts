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
