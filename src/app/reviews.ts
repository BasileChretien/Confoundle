import { TEST_ITEMS } from "../puzzles/testItems";
import {
  applyReview,
  dueSkills,
  newProgress,
  type SkillProgress,
} from "../srs/schedule";
import { buildSession, type Review } from "../srs/select";
import { LocalProgressStore, type ProgressStore } from "../srs/store";
import type { Confidence } from "../engine/scoring";
import type { TestItem } from "../puzzles/testItems";

/**
 * The glue that finally connects the spaced-repetition system to the app.
 *
 * Everything under src/srs was built, tested, and then never called: the
 * scheduler, the review selector and the stores all worked in isolation while
 * nothing in the interface ever created a review or scored one. So an account,
 * whose entire promise is "your review schedule follows you between devices",
 * synced an empty store. This module is what makes the promise real.
 *
 * A factory over an injected store rather than a module singleton, so the app
 * binds it to localStorage once while tests hand it a fresh in-memory store and
 * stay isolated. The clock is injectable too, so every rule here is testable
 * without waiting for real time to pass.
 */

export interface ReviewResult {
  skill: string;
  itemId: string;
  /** Whether the learner correctly judged trap-vs-sound for this skill. */
  correct: boolean;
  /** The wager captured BEFORE the answer was graded, as the ladder requires. */
  confidence: Confidence;
}

export interface Reviews {
  enrollSkill(skill: string, now?: number): Promise<void>;
  /** Everything on the schedule, for the lesson list and the dashboard. */
  progress(): Promise<SkillProgress[]>;
  reviewsDue(now?: number): Promise<number>;
  nextSession(seed: number, now?: number): Promise<Review[]>;
  recordReviews(results: readonly ReviewResult[], now?: number): Promise<SkillProgress[]>;
}

export function createReviews(
  store: ProgressStore,
  bank: readonly TestItem[] = TEST_ITEMS,
): Reviews {
  return {
    /**
     * Enrol a skill the first time its puzzle is learned. Idempotent: a skill
     * already on the schedule is left exactly as it is, so replaying a puzzle
     * never resets progress. A freshly enrolled skill is not due immediately;
     * it waits out the first interval, which is the whole point of spacing.
     */
    async enrollSkill(skill, now = Date.now()) {
      const all = await store.load();
      if (all.some((p) => p.skill === skill)) return;
      await store.save([...all, newProgress(skill, now)]);
    },

    /** Everything on the schedule, for the lesson list and the dashboard. */
    async progress() {
      return store.load();
    },

    /** How many skills want reviewing right now. Drives the app's entry point. */
    async reviewsDue(now = Date.now()) {
      return dueSkills(await store.load(), now).length;
    },

    /**
     * Build one review session from whatever is due. Each review scores one
     * skill, with a scenario drawn fresh from the bank: a trap for that skill,
     * or a sound decoy, so the honest answer is not always "trap".
     * Deterministic in the seed so a session can be replayed and tested.
     */
    async nextSession(seed, now = Date.now()) {
      const due = dueSkills(await store.load(), now);
      return buildSession(due, [...bank], seed);
    },

    /**
     * Apply a finished session to the schedule and persist it. Accumulates in
     * memory across the batch so one skill reviewed twice in a session lands
     * both outcomes, then writes once. Saving to the local store is what a
     * later sync carries to the account.
     */
    async recordReviews(results, now = Date.now()) {
      let all = await store.load();
      for (const r of results) {
        const idx = all.findIndex((p) => p.skill === r.skill);
        const current = idx >= 0 ? all[idx] : newProgress(r.skill, now);
        const next = applyReview(
          current,
          { correct: r.correct, confidence: r.confidence, itemId: r.itemId },
          now,
        );
        all = idx >= 0 ? all.map((p, i) => (i === idx ? next : p)) : [...all, next];
      }
      await store.save(all);
      return all;
    },
  };
}

/**
 * Grade a review. The scenario shown for skill S is either a trap for S or a
 * sound decoy, so the learner is judging one thing: does this reasoning fall
 * for S, or is it fine? Correct means their yes/no matched what the item is.
 */
export function gradeReview(review: Review, saidItFalls: boolean): boolean {
  const isTrapForThisSkill = review.item.trap === review.skill;
  return saidItFalls === isTrapForThisSkill;
}

/** The app's singleton, bound to localStorage. */
export const reviews = createReviews(new LocalProgressStore());
