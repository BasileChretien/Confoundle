import type { InteractionData, InteractionStratum } from "../../puzzles/schema";

/**
 * Pure derivation for the effect-modification shape. No React, no DOM.
 *
 * The lesson is the gap between two ways of handling a third variable:
 *
 *  - crude odds ratio: pool every stratum's cells and take one ratio. This is
 *    what you report if the third variable is a confounder and the effect is
 *    really the same everywhere.
 *  - Mantel-Haenszel odds ratio: the standard adjusted number, a weighted blend
 *    of the strata. When the strata agree it equals them; when they disagree it
 *    hides the disagreement inside an average.
 *  - stratum odds ratios: the ratio computed inside each stratum. When these fly
 *    apart, the third variable is an effect modifier, and no single number, crude
 *    or adjusted, is a fair summary.
 *
 * Every number is derived from the four integers of each 2x2, so the setup's one
 * number and the reveal's split cannot contradict each other.
 */

/** Odds ratio of a single 2x2 stratum. */
export function stratumOdds(s: InteractionStratum): number {
  return (
    (s.exposedCases * s.unexposedControls) /
    (s.unexposedCases * s.exposedControls)
  );
}

export interface StratumOR {
  id: string;
  label: InteractionStratum["label"];
  short: InteractionStratum["short"];
  or: number;
  exposedCases: number;
  exposedControls: number;
  unexposedCases: number;
  unexposedControls: number;
}

export interface InteractionSummary {
  strata: StratumOR[];
  /** Odds ratio of the pooled cells (ignores the third variable entirely). */
  crudeOR: number;
  /** Mantel-Haenszel odds ratio (the standard "adjusted for it" number). */
  adjustedOR: number;
  /** Largest stratum OR divided by smallest: how far the effect swings. */
  spread: number;
  /** min and max stratum OR, for scaling the axis. */
  minOR: number;
  maxOR: number;
}

export function interactionSummary(data: InteractionData): InteractionSummary {
  const strata: StratumOR[] = data.strata.map((s) => ({
    id: s.id,
    label: s.label,
    short: s.short,
    or: stratumOdds(s),
    exposedCases: s.exposedCases,
    exposedControls: s.exposedControls,
    unexposedCases: s.unexposedCases,
    unexposedControls: s.unexposedControls,
  }));

  const sum = (f: (s: InteractionStratum) => number) =>
    data.strata.reduce((acc, s) => acc + f(s), 0);

  const crudeOR =
    (sum((s) => s.exposedCases) * sum((s) => s.unexposedControls)) /
    (sum((s) => s.unexposedCases) * sum((s) => s.exposedControls));

  // Mantel-Haenszel: sum(a*d/n) / sum(b*c/n) over strata.
  let mhNum = 0;
  let mhDen = 0;
  for (const s of data.strata) {
    const n =
      s.exposedCases + s.exposedControls + s.unexposedCases + s.unexposedControls;
    mhNum += (s.exposedCases * s.unexposedControls) / n;
    mhDen += (s.unexposedCases * s.exposedControls) / n;
  }
  const adjustedOR = mhNum / mhDen;

  const ors = strata.map((s) => s.or);
  const minOR = Math.min(...ors);
  const maxOR = Math.max(...ors);

  return {
    strata,
    crudeOR,
    adjustedOR,
    spread: minOR > 0 ? maxOR / minOR : Number.POSITIVE_INFINITY,
    minOR,
    maxOR,
  };
}

/** Odds ratio for display: two significant-ish figures, e.g. "4.4", "1.25". */
export function formatOR(or: number): string {
  if (or >= 10) return or.toFixed(0);
  if (or >= 1) return (Math.round(or * 100) / 100).toString();
  return (Math.round(or * 100) / 100).toString();
}
