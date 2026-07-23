import { describe, it, expect } from "vitest";
import {
  selectItems,
  gradeAnswer,
  rankFor,
  checkpointDue,
  reviewDue,
  CHECKPOINT_EVERY,
  ROUND_SIZE,
} from "./trapHunt";
import { TEST_ITEMS } from "../puzzles/testItems";

const ALL = [
  "simpsons-paradox",
  "base-rate-fallacy",
  "correlation-not-causation",
  "survivorship-bias",
];

describe("trap hunt rounds", () => {
  it("always mixes in a genuinely sound item", () => {
    const round = selectItems(ALL, TEST_ITEMS, ROUND_SIZE, 3);
    expect(round).toHaveLength(ROUND_SIZE);
    expect(round.some((i) => i.trap === null)).toBe(true);
  });

  it("only draws traps the player has actually learned", () => {
    const round = selectItems(["survivorship-bias"], TEST_ITEMS, ROUND_SIZE, 5);
    for (const item of round) {
      if (item.trap !== null) expect(item.trap).toBe("survivorship-bias");
    }
  });

  it("is reproducible for a given seed", () => {
    const a = selectItems(ALL, TEST_ITEMS, 4, 9).map((i) => i.id);
    const b = selectItems(ALL, TEST_ITEMS, 4, 9).map((i) => i.id);
    expect(a).toEqual(b);
  });
});

describe("grading", () => {
  it("marks a sound item right only when judged sound", () => {
    const sound = TEST_ITEMS.find((i) => i.trap === null)!;
    expect(gradeAnswer(sound, { isTrap: false })).toBe(true);
    expect(gradeAnswer(sound, { isTrap: true, trap: "simpsons-paradox" })).toBe(
      false,
    );
  });

  it("requires naming the right trap, not just spotting one", () => {
    const trap = TEST_ITEMS.find((i) => i.trap === "simpsons-paradox")!;
    expect(gradeAnswer(trap, { isTrap: true, trap: "simpsons-paradox" })).toBe(
      true,
    );
    expect(gradeAnswer(trap, { isTrap: true, trap: "base-rate-fallacy" })).toBe(
      false,
    );
    expect(gradeAnswer(trap, { isTrap: false })).toBe(false);
  });
});

describe("unlocks", () => {
  it("opens a checkpoint every N biases learned", () => {
    expect(checkpointDue(CHECKPOINT_EVERY, 0)).toBe(true);
    expect(checkpointDue(CHECKPOINT_EVERY - 1, 0)).toBe(false);
    expect(checkpointDue(CHECKPOINT_EVERY, CHECKPOINT_EVERY)).toBe(false);
  });

  it("schedules a spaced review a week after the last one", () => {
    expect(reviewDue(100, 107)).toBe(true);
    expect(reviewDue(100, 106)).toBe(false);
    expect(reviewDue(null, 999)).toBe(false);
  });

  it("ranks up with lifetime correct answers", () => {
    expect(rankFor(0)).toBe("Novice");
    expect(rankFor(50)).toBe("Sharp eye");
  });
});
