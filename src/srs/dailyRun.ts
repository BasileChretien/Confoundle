import { ROUND_SIZE } from "./trapHunt";
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
 * ADDING AN ITEM USED TO RE-ROLL THE WHOLE DAY, and the review that found it
 * checked rather than argued: `testItems.ts` changed on sixteen of the last
 * twenty-seven days, five times in one of them. A shuffle over the bank makes
 * every draw a function of the bank's SIZE, so one new item moved all eight.
 * The claim that a frozen list was not yet worth the machinery did not survive
 * its own commit history.
 *
 * So the draw is not a shuffle. Each item is scored by hashing its id together
 * with the day, and the eight lowest scores are today's. That is stable under
 * insertion: a new item changes the day only if it happens to score into the
 * top eight, which is eight chances in a thousand rather than a certainty. It
 * is also independent of the bank's order outright, so the sort that used to be
 * needed to survive a reformat is no longer load-bearing.
 *
 * What remains, stated rather than buried: REMOVING an item that was in today's
 * eight does change that day, and there is no cheap way around that short of
 * pinning a list. It is rarer than adding and the consequence is cosmetic.
 */

/**
 * A 32-bit hash of one id under one day.
 *
 * FNV-1a over the id, then mixed with the day and avalanched, so two adjacent
 * days give unrelated orderings rather than a rotation of the same one. It has
 * to be a hash rather than a seeded stream because the whole property wanted
 * here is that an item's score does not depend on which other items exist.
 */
export function itemScore(day: number, id: string): number {
  let h = 0x811c9dc5 ^ (day | 0);
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  h = Math.imul(h ^ (h >>> 15), 0x2545f491);
  return (h ^ (h >>> 13)) >>> 0;
}

/**
 * Today's eight, or any given day's. Pure in `day`, and independent of both the
 * bank's order and, for an insertion, its size.
 */
export function drawDailyRun(day: number, size = ROUND_SIZE): TestItem[] {
  return [...TEST_ITEMS]
    .map((item) => ({ item, score: itemScore(day, item.id) }))
    // Ties broken by id so the order is total, since two ids can collide.
    .sort((a, b) => a.score - b.score || a.item.id.localeCompare(b.item.id))
    .slice(0, size)
    .map((x) => x.item);
}
