import { describe, it, expect } from "vitest";
import {
  APPRENTICE_CEILING,
  BURNED,
  FIRST_STAGE,
  STAGES,
  applyReview,
  dueSkills,
  isBurned,
  newProgress,
  nextStage,
} from "./schedule";

const T0 = 1_700_000_000_000; // a fixed instant; nothing here reads the clock
const HOUR = 60 * 60 * 1000;

describe("the stage ladder", () => {
  it("gets strictly longer until it retires the skill", () => {
    for (let i = FIRST_STAGE; i < BURNED - 1; i++) {
      expect(STAGES[i + 1].hours).toBeGreaterThan(STAGES[i].hours);
    }
    expect(STAGES[BURNED].hours).toBe(Number.POSITIVE_INFINITY);
  });
});

describe("promotion", () => {
  it("advances one stage on a correct answer, whatever the confidence", () => {
    for (const c of ["hunch", "sure", "certain"] as const) {
      expect(nextStage(3, true, c)).toBe(4);
    }
  });

  it("stops at burned rather than running off the end", () => {
    expect(nextStage(BURNED, true, "certain")).toBe(BURNED);
    expect(nextStage(BURNED - 1, true, "hunch")).toBe(BURNED);
  });
});

describe("demotion is weighted by how sure they were", () => {
  it("costs a guess least and a conviction most", () => {
    expect(nextStage(6, false, "hunch")).toBe(5);
    expect(nextStage(6, false, "sure")).toBe(4);
    expect(nextStage(6, false, "certain")).toBeLessThanOrEqual(APPRENTICE_CEILING);
  });

  it("drops a confidently wrong answer back into short intervals from any height", () => {
    // The whole point of the product: someone certain and wrong believes
    // something false. That must not sit on a four-month interval.
    for (const stage of [5, 6, 7, 8]) {
      expect(nextStage(stage, false, "certain")).toBeLessThanOrEqual(
        APPRENTICE_CEILING,
      );
    }
  });

  it("never falls below the first stage", () => {
    expect(nextStage(FIRST_STAGE, false, "certain")).toBe(FIRST_STAGE);
    expect(nextStage(2, false, "certain")).toBe(FIRST_STAGE);
  });
});

describe("applying a review", () => {
  const base = newProgress("simpsons-paradox", T0);

  it("schedules the next review by the new stage's interval", () => {
    const after = applyReview(
      base,
      { correct: true, confidence: "sure", itemId: "sp-schools" },
      T0,
    );
    expect(after.stage).toBe(FIRST_STAGE + 1);
    expect(after.dueAt).toBe(T0 + STAGES[FIRST_STAGE + 1].hours * HOUR);
  });

  it("never mutates the progress it was given", () => {
    const before = JSON.stringify(base);
    applyReview(base, { correct: false, confidence: "certain", itemId: "x" }, T0);
    expect(JSON.stringify(base)).toBe(before);
  });

  it("records the item so the next review can pick a different one", () => {
    const after = applyReview(
      base,
      { correct: true, confidence: "sure", itemId: "sp-schools" },
      T0,
    );
    expect(after.seenItemIds).toEqual(["sp-schools"]);
  });

  it("moves a repeated item to the back of the queue rather than duplicating", () => {
    let p = applyReview(base, { correct: true, confidence: "sure", itemId: "a" }, T0);
    p = applyReview(p, { correct: true, confidence: "sure", itemId: "b" }, T0);
    p = applyReview(p, { correct: true, confidence: "sure", itemId: "a" }, T0);
    expect(p.seenItemIds).toEqual(["b", "a"]);
  });

  it("flags a confidently wrong answer, and clears it only when they get it right", () => {
    const wrong = applyReview(
      base,
      { correct: false, confidence: "certain", itemId: "a" },
      T0,
    );
    expect(wrong.misconceived).toBe(true);

    // Being wrong again, less surely, does not clear the flag.
    const stillWrong = applyReview(
      wrong,
      { correct: false, confidence: "hunch", itemId: "b" },
      T0,
    );
    expect(stillWrong.misconceived).toBe(true);

    const fixed = applyReview(
      stillWrong,
      { correct: true, confidence: "sure", itemId: "c" },
      T0,
    );
    expect(fixed.misconceived).toBe(false);
  });

  it("keeps a lifetime tally", () => {
    let p = applyReview(base, { correct: true, confidence: "sure", itemId: "a" }, T0);
    p = applyReview(p, { correct: false, confidence: "hunch", itemId: "b" }, T0);
    expect(p.lifetime).toEqual({ correct: 1, wrong: 1 });
  });
});

describe("what is due", () => {
  it("returns only what has come due, most overdue first", () => {
    const a = { ...newProgress("a", T0), dueAt: T0 - 5 * HOUR };
    const b = { ...newProgress("b", T0), dueAt: T0 - 50 * HOUR };
    const c = { ...newProgress("c", T0), dueAt: T0 + 5 * HOUR };
    expect(dueSkills([a, b, c], T0).map((p) => p.skill)).toEqual(["b", "a"]);
  });

  it("never asks for a burned skill again", () => {
    const burned = { ...newProgress("a", T0), stage: BURNED, dueAt: T0 - HOUR };
    expect(isBurned(burned)).toBe(true);
    expect(dueSkills([burned], T0)).toEqual([]);
  });

  it("takes a perfect learner all the way to burned, and then stops", () => {
    let p = newProgress("simpsons-paradox", T0);
    let now = T0;
    let reviews = 0;
    while (!isBurned(p) && reviews < 50) {
      now = p.dueAt;
      p = applyReview(p, { correct: true, confidence: "sure", itemId: `i${reviews}` }, now);
      reviews++;
    }
    expect(isBurned(p)).toBe(true);
    expect(reviews).toBe(BURNED - FIRST_STAGE);
    expect(dueSkills([p], now + 1000 * 24 * 3600 * 1000)).toEqual([]);
  });
});
