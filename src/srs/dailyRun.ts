import { drawRound, ROUND_SIZE } from "./trapHunt";
import { TEST_ITEMS, type TestItem } from "../puzzles/testItems";

/**
 * The same eight items for everybody, today.
 *
 * WHY A RUN AND NOT A PUZZLE. The obvious daily is one card a day, and the name
 * of the product invites it, but the deck holds 73 and `srs/schedule.ts` argues
 * that replaying a known puzzle tests memory rather than skill. A daily puzzle
 * therefore runs out in seventy-three days and then starts lying about what it
 * measures. An eight-item draw from a bank of a thousand does not repeat for
 * years and grows with the bank rather than with the deck.
 *
 * It is also the only thing that gives the friends board a denominator. Two
 * friends browsing 73 cards freely will essentially never land on the same one,
 * which is why the board is correct and permanently empty: making the shared
 * number name the card fixed the wrong comparison and could not manufacture a
 * right one. A day everybody plays the same eight items can.
 *
 * DETERMINISM HAS TWO TRAPS AND BOTH ARE IN `drawRound`.
 *
 * It takes an `exclude` set, and the calibration run passes `recentlySeen()`.
 * That filters the pool before the shuffle, so the same seed and two different
 * histories produce two different runs. The daily therefore excludes nothing:
 * a player may meet an item they saw yesterday, which is the price of everybody
 * meeting the same one.
 *
 * And it shuffles the bank in ITS OWN FILE ORDER, so reformatting
 * `testItems.ts`, or moving one item, would silently re-roll the day for
 * anybody who loaded after the deploy. Sorting by id first makes the draw a
 * function of WHICH items exist rather than of how they are arranged, so only a
 * deliberate change to the bank can move it.
 *
 * WHAT IS STILL TRUE AND WORTH SAYING PLAINLY: adding or removing an item
 * re-rolls the current day for anybody who loads afterwards, so two friends
 * across a mid-day deploy would compare strips drawn from different sets. That
 * is the cross-denominator defect this project has now fixed three times, in a
 * smaller form, and the fix if it ever bites is a frozen id list per day rather
 * than a live draw. It is not worth that machinery until the bank changes often
 * enough to matter.
 */

/**
 * A small deterministic generator, seeded from the day.
 *
 * mulberry32: thirty-two bits of state, well distributed for a shuffle, and
 * short enough to read. `Math.random` cannot be used because the whole point is
 * that two devices agree.
 */
export function dailyRandom(day: number): () => number {
  // `| 0` keeps the state a 32-bit integer, and the offset stops day 0 from
  // seeding a generator whose first outputs are degenerate.
  let a = (day + 0x6d2b79f5) | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The bank in an order no edit to its file can change. */
const stableBank = (): readonly TestItem[] =>
  [...TEST_ITEMS].sort((a, b) => a.id.localeCompare(b.id));

/** Today's eight, or any given day's. Pure in `day`. */
export function drawDailyRun(day: number, size = ROUND_SIZE): TestItem[] {
  // No `exclude`: see the header. Everybody draws from the same pool or the
  // day is not shared.
  return drawRound(dailyRandom(day), size, stableBank()).items;
}
