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
 * SO THE TWO CURRENCIES ARE SEPARATE, and that separation is the whole design.
 *
 *   The SCORE is the per-item wager from `engine/scoring`, which is a proper
 *   rule: each stake is uniquely best on a real interval of belief, and no
 *   item's stake affects any other item's payoff. Honest reporting therefore
 *   maximises it, by construction rather than by tuning.
 *
 *   The STREAK is consecutive well-calibrated calls. It is the number to beat
 *   and the thing that makes the mode tense, and it feeds NOTHING. Breaking it
 *   costs no points, so it cannot distort the stake.
 *
 * A run therefore says two different things about a player, deliberately. A
 * cautious one can hold a long streak on a modest score; a bold one can post a
 * high score with a short streak. Neither is cheating, and the pair is a more
 * honest description of somebody than either number alone.
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
  /** Longest unbroken stretch of well-calibrated calls. */
  longestStreak: number;
  /** Where the streak stood at the end, which is what a share line quotes. */
  finalStreak: number;
  /** How many calls were simply right, regardless of stake. */
  correct: number;
}

export function gradeRun(answers: readonly RunAnswer[]): RunResult {
  let score = 0;
  let longestStreak = 0;
  let finalStreak = 0;
  let correct = 0;

  for (const a of answers) {
    score += scoreFor(a.correct, a.confidence);
    if (a.correct) correct += 1;
    if (isWellCalibrated(a)) {
      finalStreak += 1;
      if (finalStreak > longestStreak) longestStreak = finalStreak;
    } else {
      finalStreak = 0;
    }
  }

  return { score, longestStreak, finalStreak, correct };
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
