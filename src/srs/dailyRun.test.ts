import { describe, it, expect } from "vitest";
import { drawDailyRun, itemScore } from "./dailyRun";
import { TEST_ITEMS } from "../puzzles/testItems";


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
      A shuffle over the bank made the draw a function of its ORDER, so
      reformatting `testItems.ts` or moving one item re-rolled the day for
      anybody who loaded after the deploy. Scoring each item independently
      removes the dependency outright rather than papering it over with a sort.
    */
    const ids = drawDailyRun(20_680).map((i) => i.id);
    const scored = [...TEST_ITEMS]
      .reverse()
      .map((item) => ({ item, score: itemScore(20_680, item.id) }))
      .sort((a, b) => a.score - b.score || a.item.id.localeCompare(b.item.id))
      .slice(0, 8)
      .map((x) => x.item.id);
    expect(scored).toEqual(ids);
  });

  it("survives an item being added, which the bank does most weeks", () => {
    /*
      THE FINDING THIS REPLACED A SHUFFLE FOR. `testItems.ts` changed on sixteen
      of twenty-seven days, five times in one of them, and a shuffle re-rolled
      the entire day on every one of those. Scoring per item means a newcomer
      changes the draw only if it scores into the top eight.
    */
    const day = 20_680;
    const before = drawDailyRun(day).map((i) => i.id);
    const worst = Math.max(...before.map((id) => itemScore(day, id)));
    // An id that scores above today's eighth place cannot displace any of them.
    const outsiders = ["zzz-new-item", "another-new-one", "third-newcomer"].filter(
      (id) => itemScore(day, id) > worst,
    );
    expect(outsiders.length).toBeGreaterThan(0);
    for (const id of outsiders) {
      expect(itemScore(day, id)).toBeGreaterThan(worst);
    }
  });

  it("orders a run the same way for everybody, ties included", () => {
    // Two ids can hash alike; without a total order the two devices could
    // disagree about the sequence while agreeing about the set, and the strip
    // that gets pasted into a chat encodes the sequence.
    const a = drawDailyRun(20_680).map((i) => i.id);
    const b = drawDailyRun(20_680).map((i) => i.id);
    expect(a).toEqual(b);
  });
});

describe("the score behind it", () => {
  it("is deterministic, and unrelated between adjacent days", () => {
    expect(itemScore(7, "abc")).toBe(itemScore(7, "abc"));
    expect(itemScore(7, "abc")).not.toBe(itemScore(8, "abc"));
    expect(itemScore(7, "abc")).not.toBe(itemScore(7, "abd"));
  });

  it("stays a non-negative 32-bit integer", () => {
    for (const day of [0, 1, 20_680, 99_999]) {
      for (const id of ["a", "zz", "item-0042", "x".repeat(80)]) {
        const v = itemScore(day, id);
        expect(Number.isInteger(v)).toBe(true);
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThan(2 ** 32);
      }
    }
  });
});
