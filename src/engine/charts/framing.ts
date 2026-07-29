import type { FramingData, FramingFrame } from "../../puzzles/schema";

/**
 * Pure derivation for the framing shape. No React, no DOM.
 *
 * Nothing here recomputes a share: the source printed percentages and those are
 * what the puzzle quotes. What IS derived is the only claim the puzzle makes,
 * which is that the two wordings of one identical choice come out the other way
 * round. That has to be computed rather than asserted in prose, so it cannot
 * quietly stop being true if the numbers are ever edited.
 */

export type Preference = "sure" | "gamble";

export function preferenceOf(frame: FramingFrame): Preference {
  return frame.surePercent >= frame.gamblePercent ? "sure" : "gamble";
}

/** The margin the winning option won by, in percentage points. */
export function marginOf(frame: FramingFrame): number {
  return Math.abs(frame.surePercent - frame.gamblePercent);
}

/**
 * True when rewording the same choice flips which option the majority takes.
 * This is the whole lesson, so the puzzle's test asserts it.
 */
export function reverses(data: FramingData): boolean {
  const [a, b] = data.frames;
  return preferenceOf(a) !== preferenceOf(b);
}

/**
 * How far the preference moved between the two wordings, in percentage points
 * of the certain option. Positive means the second wording pushed people away
 * from certainty.
 */
export function swing(data: FramingData): number {
  const [a, b] = data.frames;
  return a.surePercent - b.surePercent;
}

/** Total people asked, across both wordings. */
export function totalAsked(data: FramingData): number {
  return data.frames.reduce((sum, f) => sum + f.n, 0);
}

/** Percentages are quoted as the source printed them, with no false precision. */
export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
