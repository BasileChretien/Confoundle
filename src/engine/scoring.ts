/**
 * The wager: before the reveal a player says how sure they are. Conviction is
 * rewarded when right and punished when wrong, which is the whole sting of the
 * game, and over time it measures calibration (was your confidence earned?).
 */
export type Confidence = "hunch" | "sure" | "certain";

export const CONFIDENCE_LEVELS: Confidence[] = ["hunch", "sure", "certain"];

const REWARD: Record<Confidence, number> = { hunch: 10, sure: 20, certain: 30 };
const PENALTY: Record<Confidence, number> = { hunch: 0, sure: -5, certain: -10 };

export function scoreFor(correct: boolean, c: Confidence): number {
  return correct ? REWARD[c] : PENALTY[c];
}

/** English reaction line for (correct, confidence); translated at render time. */
export function reactionFor(correct: boolean, c: Confidence): string {
  if (correct) {
    if (c === "certain") return "Sharp eye, and you called it.";
    if (c === "sure") return "Nicely spotted.";
    return "Good instinct.";
  }
  if (c === "certain") return "Ouch. Confidently wrong, the classic trap.";
  if (c === "sure") return "So does almost everyone. That's the trap.";
  return "You sensed something was off, but went with it anyway.";
}
