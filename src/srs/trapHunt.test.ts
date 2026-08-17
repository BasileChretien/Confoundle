import { describe, expect, it } from "vitest";

import {
  alwaysTrapScore,
  drawRound,
  grade,
  isTrap,
  longestRun,
  ROUND_SIZE,
} from "./trapHunt";
import { TEST_ITEMS, type TestItem } from "../puzzles/testItems";

const item = (id: string, trap: string | null): TestItem => ({
  id,
  scenario: { en: id },
  trap,
  explanation: { en: "because" },
});

/** Cycles through fixed values so a draw is reproducible. */
const seeded = (values: number[]) => {
  let i = 0;
  return () => values[i++ % values.length]!;
};

describe("drawing a round", () => {
  const bank = Array.from({ length: 40 }, (_, i) =>
    item(`i${i}`, i % 4 === 0 ? null : "some-skill"),
  );

  it("draws the round size", () => {
    expect(drawRound(seeded([0.1, 0.9, 0.3, 0.7, 0.5, 0.2, 0.8, 0.4]), ROUND_SIZE, bank).items)
      .toHaveLength(ROUND_SIZE);
  });

  it("never repeats an item inside one round", () => {
    // A seed that keeps landing on the same index must not yield duplicates.
    const round = drawRound(seeded([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.51, 0.52, 0.53, 0.54, 0.55, 0.56, 0.57]), 8, bank);
    expect(new Set(round.items.map((i) => i.id)).size).toBe(round.items.length);
  });

  it("skips items the player has just seen", () => {
    const exclude = new Set(bank.slice(0, 30).map((i) => i.id));
    const round = drawRound(seeded([0.05, 0.35, 0.65, 0.95, 0.2, 0.5, 0.8, 0.15]), 8, bank, exclude);
    for (const i of round.items) expect(exclude.has(i.id)).toBe(false);
  });

  it("repeats rather than ending the mode once the unseen pool runs dry", () => {
    // Somebody who has played a lot should get items again, not an empty round.
    const exclude = new Set(bank.map((i) => i.id));
    const round = drawRound(seeded([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]), 8, bank, exclude);
    expect(round.items).toHaveLength(8);
  });

  it("cannot ask for more than the bank holds", () => {
    const tiny = bank.slice(0, 3);
    expect(drawRound(seeded([0.1, 0.5, 0.9]), 8, tiny).items).toHaveLength(3);
  });
});

describe("the mix is the test", () => {
  it("keeps enough sound items in the real bank that answering trap always loses", () => {
    /**
     * THE ONE THAT MATTERS. If the bank were all traps, "is there a trap?" is
     * not a question and the mode becomes a bias-naming quiz. This asserts the
     * property the mode depends on rather than the exact ratio, which is free
     * to drift as cards ship.
     */
    const sound = TEST_ITEMS.filter((i) => !isTrap(i)).length;
    expect(sound).toBeGreaterThan(0);
    expect(sound / TEST_ITEMS.length).toBeGreaterThan(0.1);
  });

  it("tells the player what a thoughtless run would have scored", () => {
    const items = [item("a", "x"), item("b", null), item("c", "y")];
    expect(alwaysTrapScore(items)).toBe(2);
  });
});

describe("grading", () => {
  it("is right when the call matches the item", () => {
    expect(grade(item("a", "halo-effect"), true).correct).toBe(true);
    expect(grade(item("a", "halo-effect"), false).correct).toBe(false);
    expect(grade(item("b", null), false).correct).toBe(true);
    expect(grade(item("b", null), true).correct).toBe(false);
  });

  it("calling a sound item a trap is a miss, not a near miss", () => {
    // The decoys exist precisely so that seeing traps everywhere costs
    // something. If this ever became partial credit the bank stops testing.
    expect(grade(item("b", null), true).correct).toBe(false);
  });
});

describe("the run", () => {
  const a = (correct: boolean) => ({ itemId: "x", saidTrap: true, correct });

  it("counts the longest unbroken stretch, not the total", () => {
    expect(longestRun([a(true), a(true), a(false), a(true)])).toBe(2);
    expect(longestRun([a(false), a(true), a(true), a(true)])).toBe(3);
  });

  it("is zero when nothing was right, and handles an empty round", () => {
    expect(longestRun([a(false), a(false)])).toBe(0);
    expect(longestRun([])).toBe(0);
  });

  it("counts a perfect round in full", () => {
    expect(longestRun([a(true), a(true), a(true)])).toBe(3);
  });
});
