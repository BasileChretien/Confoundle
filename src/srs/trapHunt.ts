import type { TestItem } from "../puzzles/testItems";
import { itemBank } from "../puzzles/itemBank";

/**
 * Trap Hunt: the item bank as a game in its own right.
 *
 * WHY THIS IS SEPARATE FROM REVIEWS, and it is the decision the rest of this
 * file follows from. A review is scheduled retrieval: the SRS picks a skill
 * because it is due, and the answer moves that skill along its ladder. Trap
 * Hunt is practice on demand, drawn from the whole bank whether or not anything
 * is due.
 *
 * So it writes NOTHING to the schedule. Feeding unscheduled repetitions into
 * spaced repetition would corrupt the intervals that make it work, and counting
 * them as reviews would inflate a number the learner uses to decide whether
 * they are keeping up. It keeps its own small record instead, which is honest
 * about being a different activity.
 *
 * WHY THE BANK'S OWN MIX IS PRESERVED. Roughly a quarter of the bank is sound
 * reasoning rather than a trap, and that ratio is the difference between a test
 * and a bias-naming quiz: a player who answers "trap" every time should score
 * near a quarter, not near everything. Rebalancing towards traps to make the
 * round feel livelier would quietly destroy the thing being measured, so the
 * draw is uniform over the bank and the mix falls out of it.
 */

export const ROUND_SIZE = 8;

export interface TrapHuntRound {
  items: TestItem[];
}

export interface TrapHuntAnswer {
  itemId: string;
  /** What the player said: true = "this falls for something". */
  saidTrap: boolean;
  correct: boolean;
}

/**
 * Deterministic given the numbers handed in, so the round can be tested. The
 * caller supplies randomness rather than this module reaching for it, which is
 * also what keeps it usable from a seeded replay later.
 */
export function drawRound(
  random: () => number,
  size = ROUND_SIZE,
  bank: readonly TestItem[] = itemBank(),
  exclude: ReadonlySet<string> = new Set(),
): TrapHuntRound {
  const pool = bank.filter((i) => !exclude.has(i.id));
  // Falling back to the whole bank matters once somebody has played a lot:
  // running out of unseen items should repeat rather than end the mode.
  const source = pool.length >= size ? pool : bank;

  /**
   * Partial Fisher-Yates, not rejection sampling.
   *
   * The first version drew an index and retried on a collision, which has no
   * bound: hand it a generator that keeps returning the same value and it spins
   * forever. That is not hypothetical, because a seeded generator is exactly
   * what the tests use, and the test suite hung on it. Swapping in a shuffle
   * makes the draw terminate in a fixed number of steps whatever the source of
   * randomness does.
   */
  const pick = [...source];
  const wanted = Math.min(size, pick.length);
  for (let i = 0; i < wanted; i++) {
    const j = i + Math.floor(random() * (pick.length - i));
    const at = Math.min(j, pick.length - 1);
    [pick[i], pick[at]] = [pick[at]!, pick[i]!];
  }
  return { items: pick.slice(0, wanted) };
}

/** An item "falls for something" exactly when it carries a trap. */
export function isTrap(item: TestItem): boolean {
  return item.trap !== null;
}

export function grade(item: TestItem, saidTrap: boolean): TrapHuntAnswer {
  return { itemId: item.id, saidTrap, correct: saidTrap === isTrap(item) };
}

/**
 * The longest unbroken run in a round, which is what the mode scores on.
 *
 * A run rather than a total, because the interesting failure in this deck is
 * the one that breaks a streak of confident correct calls, and because a run is
 * the number worth trying to beat.
 */
export function longestRun(answers: readonly TrapHuntAnswer[]): number {
  let best = 0;
  let current = 0;
  for (const a of answers) {
    current = a.correct ? current + 1 : 0;
    if (current > best) best = current;
  }
  return best;
}

/**
 * What a player who never thinks would score, given the same round. Shown
 * beside their result, because a mode about spotting traps that never says
 * "answering trap every time would have got you five" is doing the thing this
 * whole deck argues against.
 */
export function alwaysTrapScore(items: readonly TestItem[]): number {
  return items.filter(isTrap).length;
}
