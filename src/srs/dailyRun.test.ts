import { describe, it, expect } from "vitest";
import { dailyRandom, drawDailyRun } from "./dailyRun";
import { TEST_ITEMS } from "../puzzles/testItems";
import { drawRound } from "./trapHunt";

/**
 * A daily is only worth having if two devices agree, and everything that could
 * break that agreement lives in the draw rather than in the UI.
 */
describe("the daily draw", () => {
  it("gives the same items to everybody on the same day", () => {
    const a = drawDailyRun(20_680).map((i) => i.id);
    const b = drawDailyRun(20_680).map((i) => i.id);
    expect(a).toEqual(b);
    expect(a).toHaveLength(8);
  });

  it("gives a different set the next day", () => {
    const today = drawDailyRun(20_680).map((i) => i.id);
    const tomorrow = drawDailyRun(20_681).map((i) => i.id);
    expect(tomorrow).not.toEqual(today);
  });

  it("never repeats an item inside one run", () => {
    for (const day of [0, 1, 20_680, 25_000]) {
      const ids = drawDailyRun(day).map((i) => i.id);
      expect(new Set(ids).size, `day ${day}`).toBe(ids.length);
    }
  });

  it("does not depend on the order of the bank's own file", () => {
    /*
      THE TRAP THIS EXISTS FOR. `drawRound` shuffles whatever array it is
      handed, so reformatting `testItems.ts` or moving one item would re-roll
      the day for anybody who loaded after the deploy, and two friends would
      compare strips drawn from different sets with nothing showing it. Sorting
      by id first makes the draw a function of WHICH items exist rather than of
      how they are arranged.
    */
    const reversed = [...TEST_ITEMS].reverse();
    const sorted = [...reversed].sort((a, b) => a.id.localeCompare(b.id));
    const fromReversed = drawRound(dailyRandom(20_680), 8, sorted).items;
    expect(fromReversed.map((i) => i.id)).toEqual(
      drawDailyRun(20_680).map((i) => i.id),
    );
  });

  it("draws from the whole bank, excluding nothing", () => {
    /*
      The calibration run passes `recentlySeen()` so a player does not repeat
      themselves. The daily must not: an exclude set filters the pool before the
      shuffle, so the same seed and two different histories give two different
      runs, and the day stops being shared. A player meeting yesterday's item is
      the price.
    */
    const day = 20_680;
    const withNothingExcluded = drawRound(
      dailyRandom(day),
      8,
      [...TEST_ITEMS].sort((a, b) => a.id.localeCompare(b.id)),
      new Set(),
    ).items.map((i) => i.id);
    expect(drawDailyRun(day).map((i) => i.id)).toEqual(withNothingExcluded);
  });
});

describe("the generator behind it", () => {
  it("is deterministic in the day and different across days", () => {
    const seq = (d: number) => Array.from({ length: 5 }, dailyRandom(d));
    expect(seq(7)).toEqual(seq(7));
    expect(seq(7)).not.toEqual(seq(8));
  });

  it("stays inside [0, 1) so a shuffle index cannot fall off the end", () => {
    for (const day of [0, 1, 7, 20_680, 99_999]) {
      for (const v of Array.from({ length: 200 }, dailyRandom(day))) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThan(1);
      }
    }
  });

  it("does not get stuck on one value, which would hang a rejection sampler", () => {
    // `drawRound` documents that an earlier version spun forever on exactly
    // this. It shuffles now, so it cannot, but a degenerate generator would
    // still produce an unshuffled run.
    const vs = Array.from({ length: 50 }, dailyRandom(20_680));
    expect(new Set(vs).size).toBeGreaterThan(40);
  });
});
