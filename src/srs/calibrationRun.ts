import { CONFIDENCE_LEVELS, scoreFor, type Confidence } from "../engine/scoring";
import type { TestItem } from "../puzzles/testItems";
import { drawRound, grade, ROUND_SIZE, type TrapHuntAnswer } from "./trapHunt";

/**
 * The calibration run: Trap Hunt with a stake on every call, scored so that
 * saying what you actually believe is the way to win.
 *
 * WHY THIS EXISTS AND WHY IT IS SHAPED LIKE THIS. The deck's deepest skill is
 * not spotting a trap, it is knowing how sure you are entitled to be, and no
 * mode measured that. The obvious design, a run whose VALUE rises with bolder
 * correct calls and which ENDS when a bold call misses, does not work, and it
 * fails in the same way the old wager did.
 *
 * Modelled as a dynamic program over an eight-item round, with +3/+2/+1 for a
 * correct certain/sure/hunch, a wrong hunch free and surviving, and a wrong
 * sure or certain ending the run, the optimal stake is "hunch" all the way up
 * to a belief of about 0.82, and "fairly sure" is essentially never optimal.
 * Widening the search over gain tables and over lives-based variants found no
 * assignment with three sensible bands. The cause is structural rather than a
 * matter of tuning: when ending the run is the dominant cost, the stake becomes
 * a risk-management decision about the REST OF THE ROUND rather than a report
 * of belief about THIS item, and hedging is free insurance.
 *
 * SO THE STAKE IS SCORED PER ITEM AND NOTHING ELSE IS ACCUMULATED.
 *
 * The SCORE is the per-item wager from `engine/scoring`, which is a proper
 * rule: each stake is uniquely best on a real interval of belief, and no item's
 * stake affects any other item's payoff. Honest reporting maximises it by
 * construction rather than by tuning, so it is shown for the run just played.
 *
 * THIS FILE ONCE ARGUED, AT LENGTH AND IN THIS PARAGRAPH, THAT A STREAK BESIDE
 * IT WAS SAFE because it "feeds nothing". That was wrong twice over, and both
 * halves are worth keeping because the reasoning was persuasive and false.
 *
 * A streak of well-calibrated calls is eight out of eight for anybody who
 * stakes `hunch` every time, since a hedge that misses is calibrated. And a
 * number the app STORES AND CONGRATULATES feeds something whatever the score
 * does: being celebrated is the reward. Its neighbour `bestScore` failed the
 * same test from the other side, because a record keeps only a maximum and a
 * maximum never meets the penalty column, so its ceilings ran 320 / 288 / 208
 * strictly by stake.
 *
 * The rule that replaced the argument, and the one to apply to anything added
 * here later: a mechanic is safe only if the map from what the player REPORTS
 * to everything the player VALUES factors through the per-item payoff table.
 * Anything that is a function of `correct` is safe. Anything that is a function
 * of `confidence` is suspect until shown otherwise.
 *
 * What a run says about a player is therefore a report rather than a target:
 * how many calls were right, and how each stake actually held up. See
 * `reliabilityByStake`.
 *
 * IT WRITES NOTHING TO THE SCHEDULE, for the reasons `trapHunt.ts` gives at
 * length: unscheduled repetitions corrupt the intervals that make spaced
 * repetition work, and counting them as reviews inflates the number a learner
 * uses to decide whether they are keeping up.
 */

export const RUN_SIZE = ROUND_SIZE;

export interface RunAnswer extends TrapHuntAnswer {
  /** How sure the player said they were, staked before the verdict. */
  confidence: Confidence;
}

/**
 * Was the stake honest about the outcome?
 *
 * A hedge that misses is CALIBRATED, not a failure, and that is the rule the
 * whole mode turns on. A player who says "I am not sure" and is wrong has
 * described themselves accurately, which is the behaviour being taught; ending
 * their streak for it would teach them to be quietly confident instead. Only
 * claiming more than the evidence supported breaks it.
 */
export function isWellCalibrated(a: RunAnswer): boolean {
  return a.correct || a.confidence === "hunch";
}

export interface RunResult {
  /** Sum of the per-item proper score. */
  score: number;
  /** How many calls were simply right, regardless of stake. */
  correct: number;
}

/**
 * THE LONGEST CALIBRATED STREAK USED TO BE REPORTED HERE, AND IT PAID FOR
 * REFUSING TO COMMIT.
 *
 * `isWellCalibrated` is `correct || confidence === "hunch"`, which is the right
 * rule for LABELLING one call: a hedge that misses is an accurate description
 * of a player who was unsure. It is a catastrophic rule to take a maximum over.
 * Stake `hunch` on all eight and every call is well calibrated, so the streak
 * is eight, guaranteed, on every run, forever. The mode then stored that as a
 * personal best and congratulated the player for it.
 *
 * The defence at the time was that the streak "feeds nothing and so cannot
 * distort the stake". That was wrong, and the shape of the error is worth
 * keeping: a stored record the app celebrates IS a reward channel, whatever the
 * score does. It was the degenerate wager this mode was built to replace,
 * rebuilt inside it.
 *
 * `isWellCalibrated` stays, because marking a single overclaim on a single item
 * is honest feedback rather than a target. What was removed is the maximum.
 */
export function gradeRun(answers: readonly RunAnswer[]): RunResult {
  let score = 0;
  let correct = 0;

  for (const a of answers) {
    score += scoreFor(a.correct, a.confidence);
    if (a.correct) correct += 1;
  }

  return { score, correct };
}

/** Calls made and calls right, per stake. */
export interface StakeReliability {
  calls: number;
  right: number;
}

/**
 * What the player's own stakes were worth, which is the thing this mode exists
 * to show them and never did.
 *
 * A REPORT, NOT A TARGET, and that distinction is the whole design. It is a
 * description of what already happened, with nothing to beat and no maximum
 * taken over it, so there is no strategy that improves it other than reading
 * the evidence better. Somebody who says "certain" ten times and is right nine
 * times learns something true and actionable about themselves; that is the
 * product, and it was sitting one function away the whole time.
 */
export function reliabilityByStake(
  answers: readonly RunAnswer[],
): Record<Confidence, StakeReliability> {
  const out = {} as Record<Confidence, StakeReliability>;
  for (const c of CONFIDENCE_LEVELS) out[c] = { calls: 0, right: 0 };
  for (const a of answers) {
    const row = out[a.confidence];
    row.calls += 1;
    if (a.correct) row.right += 1;
  }
  return out;
}

/**
 * What the same calls would have scored on a single fixed stake, shown beside
 * the player's result.
 *
 * THE GUARD RAIL, generalised from `alwaysTrapScore`, whose docstring states
 * the principle: a mode about spotting traps that never says "answering trap
 * every time would have got you five" is doing the thing this deck argues
 * against. A scored mechanic has to publish what a thoughtless strategy would
 * have earned, or its number is a claim nobody can check.
 *
 * It reuses the player's OWN correctness, so it answers the only question
 * worth asking: given how well you actually read these eight, did your stakes
 * beat just picking one and never thinking about it again? If a fixed stake
 * wins, the player has learned something true about themselves, and they
 * should hear it from the app rather than from a critic.
 */
export function fixedStakeScores(
  answers: readonly RunAnswer[],
): Record<Confidence, number> {
  const out = {} as Record<Confidence, number>;
  for (const c of CONFIDENCE_LEVELS) {
    out[c] = answers.reduce((sum, a) => sum + scoreFor(a.correct, c), 0);
  }
  return out;
}

/** Did the player's staking beat every fixed stake on their own answers? */
export function beatEveryFixedStake(answers: readonly RunAnswer[]): boolean {
  const mine = gradeRun(answers).score;
  const fixed = fixedStakeScores(answers);
  return CONFIDENCE_LEVELS.every((c) => mine > fixed[c]);
}

/**
 * Draw a round. Deterministic given the randomness handed in, so a seeded
 * replay stays possible, exactly as `drawRound` intends.
 */
export function drawRun(
  random: () => number,
  size = RUN_SIZE,
  exclude: ReadonlySet<string> = new Set(),
): TestItem[] {
  return drawRound(random, size, undefined, exclude).items;
}

/** Grade one call, given the stake that was placed before the verdict. */
export function gradeAnswer(
  item: TestItem,
  saidTrap: boolean,
  confidence: Confidence,
): RunAnswer {
  return { ...grade(item, saidTrap), confidence };
}
