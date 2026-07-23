import type { TestItem } from "../puzzles/testItems";
import type { SkillProgress } from "./schedule";

/**
 * Choosing which scenario to put in front of a learner for a skill that is due.
 *
 * Two properties this has to preserve, and they pull against each other.
 *
 * 1. FRESHNESS. Reviewing the same scenario repeatedly teaches the scenario.
 *    Prefer items this learner has not met for this skill, and when the pool is
 *    exhausted, reach for the one seen longest ago.
 *
 * 2. THE SOUND DECOY. If every review is a trap, the winning strategy is to
 *    answer "trap" every time and the system measures nothing at all. So a
 *    share of reviews must present reasoning that is genuinely fine. That is
 *    why the item bank keeps sound items above a quarter of its mass, enforced
 *    by a test in puzzles/registry.test.ts, and why the share is a scheduling
 *    parameter rather than an accident of what got authored.
 *
 * Deterministic given a seed, so a session can be replayed and tested.
 */

/** Share of reviews that show sound reasoning rather than a trap. */
export const SOUND_SHARE = 0.3;

/** Small integer hash; same approach as the Trap Hunt round selector. */
function hash(seed: number): number {
  let x = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return ((x ^ (x >>> 16)) >>> 0) / 0x100000000;
}

/**
 * Least-recently-used pick: anything unseen first (in bank order, so the
 * choice is stable), otherwise whatever sits earliest in the seen list.
 */
function leastRecentlySeen(
  pool: TestItem[],
  seenItemIds: string[],
  seed: number,
): TestItem | null {
  if (pool.length === 0) return null;

  const unseen = pool.filter((i) => !seenItemIds.includes(i.id));
  if (unseen.length > 0) {
    return unseen[Math.floor(hash(seed) * unseen.length)] ?? unseen[0];
  }
  // Every item in this pool has been used. Take the oldest.
  let oldest = pool[0];
  let oldestRank = Number.POSITIVE_INFINITY;
  for (const item of pool) {
    const rank = seenItemIds.indexOf(item.id);
    if (rank >= 0 && rank < oldestRank) {
      oldestRank = rank;
      oldest = item;
    }
  }
  return oldest;
}

export interface Review {
  item: TestItem;
  /** The skill this review scores, even when the item shown is a sound one. */
  skill: string;
}

/**
 * Pick the scenario for one due skill.
 *
 * A sound item scores the skill it was drawn for: the learner is being asked
 * "is this an instance of that trap, or is this reasoning fine?", and getting
 * that right is exactly the skill. `excludeItemIds` keeps one session from
 * showing the same sound decoy across several different skills.
 */
export function selectReview(
  progress: SkillProgress,
  bank: TestItem[],
  seed: number,
  excludeItemIds: readonly string[] = [],
): Review | null {
  // A skill with no trap authored anywhere cannot be reviewed: every draw
  // would fall back to a sound item, so the answer would always be "not a
  // trap". That is free marks and teaches nothing, which is worse than
  // skipping the skill until someone writes it a scenario.
  if (!bank.some((i) => i.trap === progress.skill)) return null;

  const available = bank.filter((i) => !excludeItemIds.includes(i.id));
  const traps = available.filter((i) => i.trap === progress.skill);
  const sounds = available.filter((i) => i.trap === null);

  const wantsSound = hash(seed) < SOUND_SHARE;
  const first = wantsSound ? sounds : traps;
  const fallback = wantsSound ? traps : sounds;

  const item =
    leastRecentlySeen(first, progress.seenItemIds, seed + 1) ??
    leastRecentlySeen(fallback, progress.seenItemIds, seed + 2);

  return item ? { item, skill: progress.skill } : null;
}

/**
 * Build a whole review session from the due skills, never repeating an item
 * within the session even when two skills would both reach for it.
 */
export function buildSession(
  due: SkillProgress[],
  bank: TestItem[],
  seed: number,
  limit = 20,
): Review[] {
  const reviews: Review[] = [];
  const used: string[] = [];

  for (const progress of due.slice(0, limit)) {
    const review = selectReview(progress, bank, seed + reviews.length, used);
    if (!review) continue; // no item authored for this skill yet
    reviews.push(review);
    used.push(review.item.id);
  }
  return reviews;
}

/** How many distinct scenarios a skill can draw on before it must repeat. */
export function poolDepth(skill: string, bank: TestItem[]): number {
  return bank.filter((i) => i.trap === skill).length;
}
