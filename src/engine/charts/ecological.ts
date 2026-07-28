import type { EcologicalData } from "../../puzzles/schema";

/**
 * Pure derivation for the ecological shape. No React, no DOM.
 *
 * Only the person-level rates are computed, from the authored counts, so the
 * two bars can never disagree with the arithmetic. The two correlations are
 * authored, because they are printed in the source and are not recoverable from
 * the counts: the group-level one is a correlation across places, and no
 * per-place figures were ever published.
 */

export interface PersonRate {
  label: EcologicalData["groups"][number]["label"];
  short?: EcologicalData["groups"][number]["short"];
  affected: number;
  total: number;
  /** 0..1 */
  rate: number;
}

export function personRates(data: EcologicalData): PersonRate[] {
  return data.groups.map((g) => ({
    label: g.label,
    short: g.short,
    affected: g.affected,
    total: g.total,
    rate: g.total > 0 ? g.affected / g.total : 0,
  }));
}

/**
 * True when counting people and counting places point opposite ways, which is
 * the whole content of the fallacy. The schema refuses data where they agree;
 * this is the derived statement the view and the tests read.
 */
export function levelsDisagree(data: EcologicalData): boolean {
  const personSign = Math.sign(data.personCorrelation);
  const groupSign = Math.sign(data.groupCorrelation);
  return personSign !== 0 && groupSign !== 0 && personSign !== groupSign;
}

/** Which group has the higher rate once people are counted one at a time. */
export function higherAtPersonLevel(data: EcologicalData): number {
  const rates = personRates(data);
  let best = 0;
  rates.forEach((r, i) => {
    if (r.rate > rates[best].rate) best = i;
  });
  return best;
}

/**
 * Endpoints for the group-level slope, as percentages of the plot box, from the
 * sign and strength of the printed correlation. Deliberately a line and not a
 * cloud of points: drawing dots would invent per-place observations the source
 * never published.
 */
export function slopeLine(data: EcologicalData): {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
} {
  // Steepness tracks |r| but stays inside the box at any value.
  const rise = Math.min(Math.abs(data.groupCorrelation), 1) * 70;
  const mid = 50;
  const goingDown = data.groupCorrelation < 0;
  return goingDown
    ? { x1: 8, y1: mid - rise / 2, x2: 92, y2: mid + rise / 2 }
    : { x1: 8, y1: mid + rise / 2, x2: 92, y2: mid - rise / 2 };
}

/** Correlations are quoted the way sources print them, with a sign. */
export function formatR(r: number): string {
  const rounded = Math.round(r * 100) / 100;
  return (rounded > 0 ? "+" : rounded < 0 ? "−" : "") + Math.abs(rounded).toFixed(2);
}
