import { describe, it, expect } from "vitest";
import { TEST_ITEMS } from "../puzzles/testItems";
import { puzzles } from "../puzzles";
import { newProgress, type SkillProgress } from "./schedule";
import { SOUND_SHARE, buildSession, poolDepth, selectReview } from "./select";

const T0 = 1_700_000_000_000;

/** Every skill a puzzle teaches, which is every skill the SRS can schedule. */
const SKILLS = puzzles.map((p) => p.reasoningSkill);

describe("picking a scenario for a due skill", () => {
  it("finds something for every skill the deck teaches", () => {
    const empty = SKILLS.filter(
      (skill) => selectReview(newProgress(skill, T0), TEST_ITEMS, 1) === null,
    );
    expect(empty).toEqual([]);
  });

  it("only ever draws a trap for that skill, or a sound item", () => {
    for (const skill of SKILLS) {
      for (let seed = 0; seed < 40; seed++) {
        const review = selectReview(newProgress(skill, T0), TEST_ITEMS, seed);
        expect(review).not.toBeNull();
        const trap = review!.item.trap;
        // Never a trap belonging to a different skill: that would test a
        // skill the learner may not have met yet.
        expect(trap === null || trap === skill).toBe(true);
        expect(review!.skill).toBe(skill);
      }
    }
  });

  it("prefers a scenario this learner has not met for this skill", () => {
    const skill = "simpsons-paradox";
    const traps = TEST_ITEMS.filter((i) => i.trap === skill);
    expect(traps.length).toBeGreaterThan(1);

    // Mark all but one trap as seen, and force a trap draw by seeking a seed
    // that does not want a sound item.
    const progress: SkillProgress = {
      ...newProgress(skill, T0),
      seenItemIds: traps.slice(0, -1).map((i) => i.id),
    };
    const fresh = traps[traps.length - 1];

    const drawn = new Set<string>();
    for (let seed = 0; seed < 60; seed++) {
      const review = selectReview(progress, TEST_ITEMS, seed);
      if (review && review.item.trap === skill) drawn.add(review.item.id);
    }
    // Among traps, only the unseen one should ever come up.
    expect([...drawn]).toEqual([fresh.id]);
  });

  it("falls back to the longest-unseen scenario once the pool is exhausted", () => {
    const skill = "simpsons-paradox";
    const traps = TEST_ITEMS.filter((i) => i.trap === skill);
    const progress: SkillProgress = {
      ...newProgress(skill, T0),
      // Oldest first, so the first entry is the one to reuse.
      seenItemIds: traps.map((i) => i.id),
    };
    for (let seed = 0; seed < 60; seed++) {
      const review = selectReview(progress, TEST_ITEMS, seed);
      if (review && review.item.trap === skill) {
        expect(review.item.id).toBe(traps[0].id);
      }
    }
  });

  it("mixes in sound reasoning often enough that 'always trap' loses", () => {
    // Without this the winning strategy is to answer trap every time, and the
    // system measures nothing.
    let sound = 0;
    const draws = 400;
    for (let seed = 0; seed < draws; seed++) {
      const review = selectReview(
        newProgress("simpsons-paradox", T0),
        TEST_ITEMS,
        seed,
      );
      if (review?.item.trap === null) sound++;
    }
    const share = sound / draws;
    expect(share).toBeGreaterThan(SOUND_SHARE - 0.12);
    expect(share).toBeLessThan(SOUND_SHARE + 0.12);
  });
});

describe("building a session", () => {
  const due = SKILLS.map((s) => newProgress(s, T0));

  it("never shows the same scenario twice in one sitting", () => {
    for (let seed = 0; seed < 25; seed++) {
      const session = buildSession(due, TEST_ITEMS, seed);
      const ids = session.map((r) => r.item.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("covers every due skill while items last", () => {
    const session = buildSession(due, TEST_ITEMS, 7);
    expect(session.map((r) => r.skill)).toEqual(SKILLS);
  });

  it("respects the session limit", () => {
    expect(buildSession(due, TEST_ITEMS, 3, 5)).toHaveLength(5);
  });

  it("skips a skill with nothing authored rather than throwing", () => {
    const orphan = newProgress("not-a-taught-skill", T0);
    const session = buildSession([orphan, ...due], TEST_ITEMS, 3);
    expect(session.some((r) => r.skill === "not-a-taught-skill")).toBe(false);
    expect(session.length).toBeGreaterThan(0);
  });
});

describe("bank depth, which is the real constraint on shipping this", () => {
  it("has at least two scenarios per skill today", () => {
    const thin = SKILLS.filter((s) => poolDepth(s, TEST_ITEMS) < 2);
    expect(thin).toEqual([]);
  });

  it("is honest that the bank is not yet deep enough for spaced repetition", () => {
    // A ladder of eight review stages wants 8 to 12 scenarios per skill, so a
    // learner does not meet the same one twice before burning it. Today the
    // deck carries 2 or 3. This assertion is deliberately written to hold NOW
    // and to be tightened as the bank grows, so the gap stays visible in the
    // suite instead of living only in a planning document.
    const deepEnough = SKILLS.filter((s) => poolDepth(s, TEST_ITEMS) >= 8);
    expect(deepEnough.length).toBeLessThan(SKILLS.length);
  });
});
