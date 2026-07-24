import { BURNED, isBurned, type SkillProgress } from "../srs/schedule";

/**
 * How far along a single lesson's skill is, for display.
 *
 * Pure and separate from the views because two screens need exactly this: the
 * lesson list (a badge per card) and the dashboard (a mastery row per skill).
 * Deriving it twice would be how the two drift apart and start disagreeing
 * about whether something is mastered.
 *
 * The three states are deliberately coarse. A learner does not need to know
 * they are on stage 5 of 8; they need to know whether this is new, in progress,
 * or finished with. The stage numbers ride along for a progress bar, not as the
 * headline.
 */

export type LessonState = "new" | "learned" | "mastered";

export interface LessonProgress {
  state: LessonState;
  /** Position on the ladder, 0 when never learned. */
  stage: number;
  /** The top of the ladder, so a bar can be drawn without importing the SRS. */
  maxStage: number;
  /** True when this skill was once answered wrongly while feeling certain. */
  misconceived: boolean;
  /** When the next review comes due, null only when never learned. */
  dueAt: number | null;
  lifetime: { correct: number; wrong: number };
}

const UNSTARTED: LessonProgress = {
  state: "new",
  stage: 0,
  maxStage: BURNED,
  misconceived: false,
  dueAt: null,
  lifetime: { correct: 0, wrong: 0 },
};

export function lessonProgressFor(
  skill: string,
  all: readonly SkillProgress[],
): LessonProgress {
  const p = all.find((x) => x.skill === skill);
  if (!p) return UNSTARTED;
  const mastered = isBurned(p);
  return {
    state: mastered ? "mastered" : "learned",
    stage: p.stage,
    maxStage: BURNED,
    misconceived: p.misconceived,
    // Mastered skills keep a due date: burning now means an annual check
    // rather than an exit, so hiding it would be the lie.
    dueAt: p.dueAt,
    lifetime: p.lifetime,
  };
}

/** Accuracy across every review of this skill, or null before the first one. */
export function accuracyOf(p: LessonProgress): number | null {
  const total = p.lifetime.correct + p.lifetime.wrong;
  return total === 0 ? null : p.lifetime.correct / total;
}
