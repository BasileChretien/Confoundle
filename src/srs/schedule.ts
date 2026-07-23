import type { Confidence } from "../engine/scoring";

/**
 * Spaced repetition, scheduled per SKILL rather than per item.
 *
 * This is the one design decision everything else follows from. A puzzle is
 * single-use: once you know the kidney-stone one is Simpson's paradox,
 * replaying it tests whether you remember the answer, not whether you have the
 * skill. So puzzles are lessons, Trap Hunt items are reviews, and the thing
 * being scheduled is the skill, with items as interchangeable probes drawn
 * fresh each time.
 *
 * That is deliberately unlike the systems this borrows from, which re-test an
 * identical card and therefore let a diligent learner memorise the card instead
 * of the concept. Drawing a different scenario for the same skill each review
 * tests transfer, which is the only thing worth having in a clinician.
 *
 * Pure: no storage, no clock of its own, no React. `now` is always passed in,
 * so every rule here is testable and the same code can run on a server when
 * accounts land.
 */

export const STAGES = [
  { name: "Learned", hours: 4 },
  { name: "Apprentice I", hours: 4 },
  { name: "Apprentice II", hours: 8 },
  { name: "Apprentice III", hours: 24 },
  { name: "Apprentice IV", hours: 48 },
  { name: "Guru I", hours: 24 * 7 },
  { name: "Guru II", hours: 24 * 14 },
  { name: "Master", hours: 24 * 30 },
  { name: "Enlightened", hours: 24 * 120 },
  { name: "Burned", hours: Number.POSITIVE_INFINITY },
] as const;

export const FIRST_STAGE = 1;
export const BURNED = STAGES.length - 1;
/** Above this, intervals are measured in weeks rather than hours. */
export const APPRENTICE_CEILING = 4;

export interface SkillProgress {
  skill: string; // a puzzle's reasoningSkill
  stage: number; // index into STAGES
  dueAt: number; // epoch ms; when this skill next wants reviewing
  /** Item ids already used for this skill, most recent last. */
  seenItemIds: string[];
  /**
   * Set when the learner was CERTAIN and wrong, cleared when they next get it
   * right. Confidently wrong is a mis-learned rule rather than a forgotten
   * one, and it is the exact failure this whole project exists to fix, so it
   * is worth surfacing rather than burying in a stage number.
   */
  misconceived: boolean;
  lifetime: { correct: number; wrong: number };
}

export function newProgress(skill: string, now: number): SkillProgress {
  return {
    skill,
    stage: FIRST_STAGE,
    dueAt: now + hoursToMs(STAGES[FIRST_STAGE].hours),
    seenItemIds: [],
    misconceived: false,
    lifetime: { correct: 0, wrong: 0 },
  };
}

function hoursToMs(hours: number): number {
  return Number.isFinite(hours) ? hours * 60 * 60 * 1000 : Number.MAX_SAFE_INTEGER;
}

/**
 * How far a wrong answer knocks a skill back.
 *
 * Confidence is the signal here, and it is a better one than the "how hard was
 * that?" question other systems ask, because it is captured BEFORE the reveal
 * and so is not contaminated by hindsight. Someone who guessed and missed has
 * simply not learned it yet. Someone who was certain and missed believes
 * something false, which is worse and should cost more.
 */
const DEMOTION: Record<Confidence, number> = { hunch: 1, sure: 2, certain: 3 };

export function nextStage(
  stage: number,
  correct: boolean,
  confidence: Confidence,
): number {
  if (correct) return Math.min(stage + 1, BURNED);
  const dropped = stage - DEMOTION[confidence];
  // Certain and wrong always lands back inside the short-interval band, however
  // high the skill had climbed. A confident error is not a small slip.
  const ceiling = confidence === "certain" ? APPRENTICE_CEILING : BURNED;
  return Math.max(FIRST_STAGE, Math.min(dropped, ceiling));
}

export interface ReviewOutcome {
  correct: boolean;
  confidence: Confidence;
  itemId: string;
}

/** Apply one review to a skill, returning fresh progress. Never mutates. */
export function applyReview(
  progress: SkillProgress,
  outcome: ReviewOutcome,
  now: number,
): SkillProgress {
  const stage = nextStage(progress.stage, outcome.correct, outcome.confidence);
  const seen = [
    ...progress.seenItemIds.filter((id) => id !== outcome.itemId),
    outcome.itemId,
  ];
  return {
    ...progress,
    stage,
    dueAt: now + hoursToMs(STAGES[stage].hours),
    seenItemIds: seen,
    misconceived: outcome.correct
      ? false
      : progress.misconceived || outcome.confidence === "certain",
    lifetime: {
      correct: progress.lifetime.correct + (outcome.correct ? 1 : 0),
      wrong: progress.lifetime.wrong + (outcome.correct ? 0 : 1),
    },
  };
}

export function isBurned(progress: SkillProgress): boolean {
  return progress.stage >= BURNED;
}

/** Skills wanting review now, most overdue first. Burned skills never return. */
export function dueSkills(
  all: SkillProgress[],
  now: number,
): SkillProgress[] {
  return all
    .filter((p) => !isBurned(p) && p.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt);
}

/** Progress towards finishing the course, which is finite and meant to be. */
export function courseProgress(
  all: SkillProgress[],
  totalSkills: number,
): { learned: number; burned: number; total: number } {
  return {
    learned: all.length,
    burned: all.filter(isBurned).length,
    total: totalSkills,
  };
}
