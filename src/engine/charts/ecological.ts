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

/**
 * Correlations are quoted the way sources print them, with a sign.
 *
 * The locale is a REQUIRED argument rather than an optional one, and that is
 * the point of the signature: an omitted locale falls back to the JavaScript
 * runtime's default, which is the browser's rather than the reader's, and it
 * does so silently. `toFixed(2)` had no locale at all, so `+0.79` kept its
 * decimal point for a French or Russian reader who writes `+0,79`, and did it
 * beside counts that this figure now groups in their language.
 *
 * The module stays pure, so a Remotion template renders the same string by
 * passing the same locale in.
 *
 * The SIGN is still built by hand and the magnitude alone goes through `Intl`,
 * which is not an oversight. `signDisplay: "exceptZero"` is the tidier spelling
 * and it changes the glyph: it emits U+002D HYPHEN-MINUS, where this figure has
 * always drawn U+2212 MINUS SIGN, which is the character a published
 * correlation is set in and the one that lines up with the digits in a
 * tabular-numerals font. It also prefixes a U+200E left-to-right mark in
 * Arabic. Formatting the absolute value sidesteps both.
 */
export function formatR(r: number, locale: string): string {
  const rounded = Math.round(r * 100) / 100;
  const magnitude = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(rounded));
  return (rounded > 0 ? "+" : rounded < 0 ? "−" : "") + magnitude;
}
