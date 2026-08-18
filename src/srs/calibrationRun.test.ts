import { describe, it, expect } from "vitest";
import { CONFIDENCE_LEVELS, scoreFor, type Confidence } from "../engine/scoring";
import {
  beatEveryFixedStake,
  drawRun,
  fixedStakeScores,
  gradeAnswer,
  gradeRun,
  isWellCalibrated,
  RUN_SIZE,
  type RunAnswer,
} from "./calibrationRun";
import { TEST_ITEMS } from "../puzzles/testItems";

/**
 * The calibration run, and above all the property that makes it honest: the
 * streak must never be able to change what stake is worth placing.
 */

const answer = (
  correct: boolean,
  confidence: Confidence,
  itemId = "i",
): RunAnswer => ({ itemId, saidTrap: true, correct, confidence });

describe("what counts as calibrated", () => {
  it("treats a hedge that misses as calibrated, because it is", () => {
    /*
      The rule the whole mode turns on. Somebody who says "I am not sure" and
      is wrong has described themselves accurately, which is the behaviour
      being taught. Ending their streak for it would teach them to be quietly
      confident instead, which is the exact failure the deck exists to correct.
    */
    expect(isWellCalibrated(answer(false, "hunch"))).toBe(true);
  });

  it("breaks on a claim the evidence did not support", () => {
    expect(isWellCalibrated(answer(false, "sure"))).toBe(false);
    expect(isWellCalibrated(answer(false, "certain"))).toBe(false);
  });

  it("counts every correct call, however timidly staked", () => {
    for (const c of CONFIDENCE_LEVELS) {
      expect(isWellCalibrated(answer(true, c))).toBe(true);
    }
  });
});

describe("grading a run", () => {
  it("scores the sum of the per-item wager and nothing else", () => {
    const answers = [
      answer(true, "certain"),
      answer(false, "hunch"),
      answer(true, "sure"),
    ];
    const expected =
      scoreFor(true, "certain") + scoreFor(false, "hunch") + scoreFor(true, "sure");
    expect(gradeRun(answers).score).toBe(expected);
  });

  it("keeps the longest streak, not just the surviving one", () => {
    const answers = [
      answer(true, "sure"),
      answer(true, "sure"),
      answer(true, "sure"),
      answer(false, "certain"), // breaks it
      answer(true, "sure"),
    ];
    const r = gradeRun(answers);
    expect(r.longestStreak).toBe(3);
    expect(r.finalStreak).toBe(1);
  });

  it("lets a hedger hold an unbroken streak on a modest score", () => {
    /*
      Two currencies saying two different true things about one player. A
      cautious reader who is right half the time never breaks calibration,
      because a hedge that misses is honest, so their streak is perfect. Their
      score is not, and it should not be: they were right four times out of
      eight and staked nothing on any of it.
    */
    const timid = Array.from({ length: 8 }, (_, i) => answer(i % 2 === 0, "hunch"));
    const timidResult = gradeRun(timid);
    expect(timidResult.longestStreak).toBe(8);
    expect(timidResult.correct).toBe(4);

    // The same eight calls, staked by somebody who knew which was which.
    const calibrated = Array.from({ length: 8 }, (_, i) =>
      answer(i % 2 === 0, i % 2 === 0 ? "certain" : "hunch"),
    );
    const calibratedResult = gradeRun(calibrated);
    expect(calibratedResult.longestStreak).toBe(8);
    expect(calibratedResult.score).toBeGreaterThan(timidResult.score);
  });
});

describe("the streak cannot change what a stake is worth", () => {
  /*
    THE LOAD-BEARING TEST. The whole reason the run is built this way is that a
    run whose VALUE depends on survival makes the stake a risk-management
    decision about the rest of the round rather than a report of belief. That
    was measured: with a value-carrying run, staking "hunch" is optimal up to a
    belief of about 0.82 and "fairly sure" is never optimal at all.

    So the score must stay a sum of independent per-item terms. If somebody
    later makes the streak feed the score, or makes a broken streak forfeit
    points, this fails, and it should.
  */
  it("changes the total by exactly one item's delta when one stake changes", () => {
    const base: RunAnswer[] = [
      answer(true, "sure", "a"),
      answer(false, "certain", "b"),
      answer(true, "hunch", "c"),
      answer(false, "sure", "d"),
    ];
    for (let i = 0; i < base.length; i++) {
      for (const c of CONFIDENCE_LEVELS) {
        const swapped = base.map((a, j) => (j === i ? { ...a, confidence: c } : a));
        const delta =
          scoreFor(base[i]!.correct, c) - scoreFor(base[i]!.correct, base[i]!.confidence);
        expect(gradeRun(swapped).score).toBe(gradeRun(base).score + delta);
      }
    }
  });

  it("scores a run the same however its items are ordered", () => {
    /*
      Order changes the streak and must not change the score. If it ever does,
      the two currencies have become entangled.

      NOT A REVERSAL, which cannot show this: reversing a binary sequence
      preserves the lengths of its runs, so the longest streak is invariant
      under it by construction. The first draft of this test asserted a
      reversal WOULD move the streak and failed, correctly. These two orderings
      hold the same calls and differ only in how the misses are spaced.
    */
    const clustered: RunAnswer[] = [
      answer(true, "sure", "a"),
      answer(true, "sure", "b"),
      answer(true, "sure", "c"),
      answer(false, "certain", "d"),
      answer(false, "certain", "e"),
    ];
    const spread: RunAnswer[] = [
      clustered[0]!,
      clustered[3]!,
      clustered[1]!,
      clustered[4]!,
      clustered[2]!,
    ];

    expect(gradeRun(spread).score).toBe(gradeRun(clustered).score);
    expect(gradeRun(clustered).longestStreak).toBe(3);
    expect(gradeRun(spread).longestStreak).toBe(1);
  });

  it("pays honest reporting the most, at every belief", () => {
    /*
      The property inherited from the proper wager, asserted here because this
      mode is where a player is asked to stake eight times in a row and so
      where a bias would compound.
    */
    const ev = (c: Confidence, p: number) =>
      p * scoreFor(true, c) + (1 - p) * scoreFor(false, c);
    const honest = (p: number): Confidence => {
      let best: Confidence = "hunch";
      for (const c of CONFIDENCE_LEVELS) if (ev(c, p) > ev(best, p)) best = c;
      return best;
    };
    for (let p = 0.02; p < 1; p += 0.02) {
      const mine = ev(honest(p), p);
      for (const c of CONFIDENCE_LEVELS) {
        expect(ev(c, p)).toBeLessThanOrEqual(mine + 1e-9);
      }
    }
  });
});

describe("the null-strategy baseline", () => {
  /*
    Generalised from `alwaysTrapScore`, whose docstring states the principle: a
    scored mechanic that never publishes what a thoughtless strategy would have
    earned is asking to be believed on nothing.
  */
  it("reports what each fixed stake would have scored on the same calls", () => {
    const answers = [answer(true, "hunch"), answer(false, "certain")];
    const fixed = fixedStakeScores(answers);
    expect(fixed.certain).toBe(scoreFor(true, "certain") + scoreFor(false, "certain"));
    expect(fixed.hunch).toBe(scoreFor(true, "hunch") + scoreFor(false, "hunch"));
  });

  it("says so plainly when a fixed stake would have done better", () => {
    // Somebody who staked certain on everything and was right throughout did
    // not out-think a machine that always says certain, and should be told.
    const allCertainAllRight = Array.from({ length: 8 }, () => answer(true, "certain"));
    expect(beatEveryFixedStake(allCertainAllRight)).toBe(false);
  });

  it("credits staking that genuinely beat every fixed stake", () => {
    // Bold where right, cautious where wrong: the thing the mode is for.
    const calibrated = [
      answer(true, "certain"),
      answer(true, "certain"),
      answer(false, "hunch"),
      answer(false, "hunch"),
    ];
    expect(beatEveryFixedStake(calibrated)).toBe(true);
  });
});

describe("drawing a run", () => {
  it("draws the round size from the real bank without repeats", () => {
    let n = 0;
    const items = drawRun(() => ((n = (n * 9301 + 49297) % 233280), n / 233280));
    expect(items).toHaveLength(RUN_SIZE);
    expect(new Set(items.map((i) => i.id)).size).toBe(RUN_SIZE);
    for (const i of items) expect(TEST_ITEMS.some((t) => t.id === i.id)).toBe(true);
  });

  it("carries the stake through grading", () => {
    const item = TEST_ITEMS[0]!;
    const a = gradeAnswer(item, item.trap !== null, "sure");
    expect(a.confidence).toBe("sure");
    expect(a.correct).toBe(true);
  });
});
