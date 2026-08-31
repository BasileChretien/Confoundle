import { describe, it, expect } from "vitest";
import { createReviews, gradeReview } from "./reviews";
import type { ProgressStore } from "../srs/store";
import type { SkillProgress } from "../srs/schedule";
import { STAGES } from "../srs/schedule";
import type { TestItem } from "../puzzles/testItems";
import type { Review } from "../srs/select";

const HOUR = 60 * 60 * 1000;
const NOW = 1_760_000_000_000;

/** An in-memory store, so these tests never touch localStorage. */
class MemoryStore implements ProgressStore {
  constructor(public skills: SkillProgress[] = []) {}
  async load() {
    return this.skills;
  }
  async save(all: SkillProgress[]) {
    this.skills = all;
  }
  async clear() {
    this.skills = [];
  }
}

/** A tiny bank: one trap and one sound decoy for each of two skills. */
const BANK: TestItem[] = [
  { id: "a-trap-1", scenario: { en: "x" }, trap: "skill-a", explanation: { en: "x" } },
  { id: "a-trap-2", scenario: { en: "x" }, trap: "skill-a", explanation: { en: "x" } },
  { id: "b-trap-1", scenario: { en: "x" }, trap: "skill-b", explanation: { en: "x" } },
  { id: "sound-1", scenario: { en: "x" }, trap: null, explanation: { en: "x" } },
  { id: "sound-2", scenario: { en: "x" }, trap: null, explanation: { en: "x" } },
];

describe("enrolling a skill", () => {
  it("puts a newly learned skill on the schedule", async () => {
    const store = new MemoryStore();
    const reviews = createReviews(store, () => BANK);
    await reviews.enrollSkill("skill-a", NOW);
    expect(store.skills.map((p) => p.skill)).toEqual(["skill-a"]);
  });

  it("does not reset a skill already learned", async () => {
    const store = new MemoryStore();
    const reviews = createReviews(store, () => BANK);
    await reviews.enrollSkill("skill-a", NOW);
    // Advance the one skill up the ladder, then re-learn its puzzle.
    await reviews.recordReviews(
      [{ skill: "skill-a", itemId: "a-trap-1", correct: true, confidence: "sure" }],
      NOW,
    );
    const stageAfterReview = store.skills[0].stage;
    await reviews.enrollSkill("skill-a", NOW + HOUR);
    expect(store.skills[0].stage).toBe(stageAfterReview);
  });

  it("does not make a freshly enrolled skill due at once", async () => {
    // Spacing is the point: a skill just met should wait out its first interval.
    const store = new MemoryStore();
    const reviews = createReviews(store, () => BANK);
    await reviews.enrollSkill("skill-a", NOW);
    expect(await reviews.reviewsDue(NOW)).toBe(0);
    expect(await reviews.reviewsDue(NOW + 5 * HOUR)).toBe(1);
  });
});

describe("building a session", () => {
  it("draws only from the skills that are due", async () => {
    const store = new MemoryStore();
    const reviews = createReviews(store, () => BANK);
    await reviews.enrollSkill("skill-a", NOW);
    await reviews.enrollSkill("skill-b", NOW + 100 * HOUR); // enrolled much later, not due
    const session = await reviews.nextSession(1, NOW + 5 * HOUR);
    expect(session.every((r) => r.skill === "skill-a")).toBe(true);
    expect(session.length).toBeGreaterThan(0);
  });

  it("only shows a skill an item it can be scored on", async () => {
    const store = new MemoryStore();
    const reviews = createReviews(store, () => BANK);
    await reviews.enrollSkill("skill-a", NOW);
    const [review] = await reviews.nextSession(3, NOW + 5 * HOUR);
    expect(review.item.trap === "skill-a" || review.item.trap === null).toBe(true);
  });

  it("does not replay the same draw on every fresh page load", async () => {
    // The caller's seed is a counter that restarts at zero each load, so with
    // the seed alone every visit drew the identical first card. Worse, hash(1)
    // sits below SOUND_SHARE, so that card was always a SOUND one: answer "not
    // a trap" without reading and you were right every time. The clock is what
    // breaks the tie, so two loads at different moments must be able to differ.
    const store = new MemoryStore();
    const reviews = createReviews(store, () => BANK);
    await reviews.enrollSkill("skill-a", NOW);

    const draws = new Set<string>();
    for (let i = 0; i < 40; i++) {
      const [review] = await reviews.nextSession(0, NOW + 5 * HOUR + i * 60_000);
      if (review) draws.add(`${review.item.id}|${review.item.trap === null}`);
    }
    expect(draws.size).toBeGreaterThan(1);
  });

  it("stays replayable when the clock is pinned, so sessions remain testable", async () => {
    const store = new MemoryStore();
    const reviews = createReviews(store, () => BANK);
    await reviews.enrollSkill("skill-a", NOW);
    const at = NOW + 5 * HOUR;
    const a = await reviews.nextSession(7, at);
    const b = await reviews.nextSession(7, at);
    expect(a.map((r) => r.item.id)).toEqual(b.map((r) => r.item.id));
  });
});

describe("grading", () => {
  const trap: Review = {
    item: BANK[0], // a-trap-1, trap: skill-a
    skill: "skill-a",
  };
  const sound: Review = {
    item: BANK[3], // sound-1, trap: null
    skill: "skill-a",
  };

  it("is correct when the learner catches a real trap", () => {
    expect(gradeReview(trap, true)).toBe(true);
    expect(gradeReview(trap, false)).toBe(false);
  });

  it("is correct when the learner clears sound reasoning", () => {
    // The whole reason sound decoys exist: answering 'trap' every time must fail.
    expect(gradeReview(sound, false)).toBe(true);
    expect(gradeReview(sound, true)).toBe(false);
  });
});

describe("recording a session", () => {
  it("promotes on a right answer and moves the due date out", async () => {
    const store = new MemoryStore();
    const reviews = createReviews(store, () => BANK);
    await reviews.enrollSkill("skill-a", NOW);
    const startStage = store.skills[0].stage;
    const startDue = store.skills[0].dueAt;

    await reviews.recordReviews(
      [{ skill: "skill-a", itemId: "a-trap-1", correct: true, confidence: "sure" }],
      NOW + 5 * HOUR,
    );
    expect(store.skills[0].stage).toBe(startStage + 1);
    expect(store.skills[0].dueAt).toBeGreaterThan(startDue);
    expect(store.skills[0].lifetime).toEqual({ correct: 1, wrong: 0 });
  });

  it("records a confident miss as misconceived", async () => {
    // The exact failure this whole project exists to surface: certain and wrong.
    const store = new MemoryStore();
    const reviews = createReviews(store, () => BANK);
    await reviews.enrollSkill("skill-a", NOW);
    await reviews.recordReviews(
      [{ skill: "skill-a", itemId: "a-trap-1", correct: false, confidence: "certain" }],
      NOW + 5 * HOUR,
    );
    expect(store.skills[0].misconceived).toBe(true);
  });

  it("remembers which scenarios were seen, so they are not repeated first", async () => {
    const store = new MemoryStore();
    const reviews = createReviews(store, () => BANK);
    await reviews.enrollSkill("skill-a", NOW);
    await reviews.recordReviews(
      [{ skill: "skill-a", itemId: "a-trap-1", correct: true, confidence: "hunch" }],
      NOW + 5 * HOUR,
    );
    expect(store.skills[0].seenItemIds).toContain("a-trap-1");
  });

  it("never lets a skill climb past the top of the ladder", async () => {
    const store = new MemoryStore();
    const reviews = createReviews(store, () => BANK);
    await reviews.enrollSkill("skill-a", NOW);
    let clock = NOW + 5 * HOUR;
    for (let i = 0; i < STAGES.length + 3; i += 1) {
      await reviews.recordReviews(
        [{ skill: "skill-a", itemId: "a-trap-1", correct: true, confidence: "sure" }],
        clock,
      );
      clock += 200 * 24 * HOUR;
    }
    expect(store.skills[0].stage).toBe(STAGES.length - 1);
  });
});
