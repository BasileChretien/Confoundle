/**
 * The wager: before the reveal a player says how sure they are, and the payoff
 * table is built so that SAYING WHAT YOU ACTUALLY BELIEVE earns the most.
 *
 * WHAT WAS WRONG BEFORE. The table paid 10/20/30 when right and 0/-5/-10 when
 * wrong. Writing p for the player's own belief that they are right, the three
 * expected-value lines were 10p, 25p-5 and 40p-10, and all three met at exactly
 * p = 1/3. Two consequences, both bad, and the second one worse. "Certain"
 * strictly dominated for anybody better than a guess, so the rule paid for
 * exactly the overclaiming this deck exists to correct. And "fairly sure" was
 * never uniquely optimal at ANY belief, so the middle rung of a three-rung
 * calibration scale was a dead button.
 *
 * The app then contradicted itself in three voices: `schedule.ts` demotes a
 * certain miss by three stages and clamps it to the apprentice ceiling, the
 * Confounder mocks the player for having been certain and wrong, and the score
 * rewarded it. The score won that argument, because the score is what reaches
 * the share line and the friends board, which sorts by it.
 *
 * WHAT THE TABLE IS NOW. A quadratic (Brier) rule, evaluated at representative
 * beliefs for the three bins and scaled to whole numbers. The property that
 * matters is not the exact figures but the SHAPE: the expected-value lines have
 * strictly increasing slopes AND strictly increasing crossings, so each stake
 * is uniquely best on a real interval of belief:
 *
 *     hunch   below 0.583
 *     sure    0.583 to 0.800
 *     certain above 0.800
 *
 * Honest reporting therefore maximises expected score, which is what the wager
 * always claimed to measure. `scoring.test.ts` asserts the ordering rather than
 * the numbers, so the figures can be tuned without the property being lost by
 * accident, which is precisely how it was lost the first time.
 *
 * ONE CONSEQUENCE WORTH KNOWING. Per-puzzle scores now range +40 to -36 rather
 * than +30 to -10, so the day's global percentile histogram mixes the two
 * scales until old days age out. It stays inside the endpoint's accepted range
 * of -50 to 200, so nothing is silently rejected.
 */
export type Confidence = "hunch" | "sure" | "certain";

export const CONFIDENCE_LEVELS: Confidence[] = ["hunch", "sure", "certain"];

const REWARD: Record<Confidence, number> = { hunch: 26, sure: 36, certain: 40 };
const PENALTY: Record<Confidence, number> = {
  hunch: -6,
  sure: -20,
  certain: -36,
};

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
