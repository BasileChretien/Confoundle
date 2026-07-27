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
    // Raise the per-session cap past the deck size: this test is about coverage
    // when there is room, not about the default 20-review sitting limit (which
    // the next test checks). The deck now teaches more skills than that default.
    const session = buildSession(due, TEST_ITEMS, 7, SKILLS.length);
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

  it("carries a scenario for every rung of the ladder", () => {
    // Eight review stages before a skill burns, so a skill needs at least eight
    // distinct scenarios or a learner meets one twice and is tested on whether
    // they remember the scenario rather than on the skill. Ten is the floor
    // here, which leaves slack for the sound decoys that land on a skill
    // without being drawn from its own pool.
    //
    // This assertion used to say the opposite. It was written to FAIL once the
    // bank grew, so the gap could not quietly stop being tracked, and it has
    // now been tightened as intended. Raise the floor again, do not delete it.
    const thin = SKILLS.map((skill) => ({
      skill,
      scenarios: poolDepth(skill, TEST_ITEMS),
    })).filter((entry) => entry.scenarios < 10);
    expect(thin).toEqual([]);
  });

  it("never lets one skill hoard the bank", () => {
    // A skill with five times another's pool is a sign a wave of authoring went
    // to whatever was easiest to write, which is exactly where quality slips.
    const depths = SKILLS.map((s) => poolDepth(s, TEST_ITEMS));
    expect(Math.max(...depths)).toBeLessThanOrEqual(Math.min(...depths) * 3);
  });
});
