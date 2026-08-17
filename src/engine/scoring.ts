/**
 * The wager: before the reveal a player says how sure they are. Conviction is
 * rewarded when right and punished when wrong, which is the whole sting of the
 * game.
 *
 * KNOWN DEFECT, DELIBERATELY LEFT FOR THE MODES WORK, RECORDED HERE SO NOBODY
 * READS THE PAYOFFS BELOW AS ENDORSED. This docstring used to end "and over
 * time it measures calibration (was your confidence earned?)". It does not.
 * Writing p for the player's own belief that they are right, the three
 * expected-value lines are 10p, 25p-5 and 40p-10, and all three are concurrent
 * at p = 1/3. So "certain" strictly dominates for anybody better than a guess,
 * "fairly sure" is never uniquely optimal at any belief whatsoever, and the
 * rule pays for exactly the overclaiming the deck exists to correct. The
 * schedule disagrees (`schedule.ts` demotes a certain miss by three stages and
 * clamps it to the apprentice ceiling) and so does the Confounder, which mocks
 * the player for having been certain and wrong. The points win that argument,
 * because the points are what reaches the share line and the friends board.
 *
 * The table is not corrected here because the confidence payoffs are being
 * replaced wholesale, and changing them twice would move the global percentile
 * histogram twice for no gain. What is fixed in this pass is the two reaction
 * lines below, which were making claims of their own.
 */
export type Confidence = "hunch" | "sure" | "certain";

export const CONFIDENCE_LEVELS: Confidence[] = ["hunch", "sure", "certain"];

const REWARD: Record<Confidence, number> = { hunch: 10, sure: 20, certain: 30 };
const PENALTY: Record<Confidence, number> = { hunch: 0, sure: -5, certain: -10 };

export function scoreFor(correct: boolean, c: Confidence): number {
  return correct ? REWARD[c] : PENALTY[c];
}

/**
 * English reaction line for (correct, confidence); translated at render time.
 *
 * TWO OF THESE SIX LINES WERE REPLACED, FOR TWO DIFFERENT REASONS.
 *
 * `sure` and wrong read "So does almost everyone. That's the trap." That is an
 * unsourced universal quantifier in the app's own voice, printed on every
 * sure-and-wrong answer of every puzzle regardless of what the tally actually
 * says, and it sat three lines above `CompanyLine`, which knows the real
 * number and may say something quite different. Same defect as the reveal
 * badge, same fix: describe the setup, which the deck authored and therefore
 * knows about, rather than the population, which it does not.
 *
 * `hunch` and wrong read "You sensed something was off, but went with it
 * anyway." That misreads its own stake. A hunch is doubt about YOUR OWN
 * ANSWER, not a suspicion about the data, so the line reproached a player who
 * had hedged honestly and missed, which is precisely the behaviour the wager
 * exists to encourage. It is the calibration form of marking a well-reasoning
 * player wrong in order to land a sting, and the rule against that outranks
 * the sting every time. Being wrong with little staked is calibration working,
 * and it now reads that way.
 */
export function reactionFor(correct: boolean, c: Confidence): string {
  if (correct) {
    if (c === "certain") return "Sharp eye, and you called it.";
    if (c === "sure") return "Nicely spotted.";
    return "Good instinct.";
  }
  if (c === "certain") return "Ouch. Confidently wrong, the classic trap.";
  if (c === "sure") return "The setup was built to make that one feel obvious.";
  return "Wrong, but you staked almost nothing on it. That is the wager working.";
}
