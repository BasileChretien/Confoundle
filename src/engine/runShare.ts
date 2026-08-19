import type { RunAnswer } from "../srs/calibrationRun";

/**
 * The daily run as something you can paste into a group chat.
 *
 * A DAILY NOBODY CAN SHOW ANYONE IS HALF A MECHANISM. The shared draw exists so
 * that two people can have done the same thing; this is the part where they
 * find out. Wordle's grid is the model: it carries the SHAPE of a result and
 * none of its content, so it is safe to post in front of somebody who has not
 * played yet.
 *
 * WHAT THE GLYPHS ENCODE, and what they deliberately do not. One mark per call,
 * right or wrong, in the order they were answered. Correctness is the one fact
 * about a run that no stake can move, which is the same reason it is what the
 * run stores as a record: a strip encoding the stakes would publish a number
 * that rewards a staking pattern, and this mode has already had two of those
 * removed.
 *
 * It names no item, no skill and no verdict, so a reader who has not played
 * today learns nothing except how somebody else did.
 *
 * IT MUST NOT PARSE AS A PUZZLE RESULT. `engine/result.ts` carries the other
 * shareable line, `Name · Confoundle #7 · 🎯 +36 · 🔥5`, whose number names a
 * card in the registry, and `FriendsBoard` groups by that number. A run strip
 * carrying a day number in the same shape would be filed as puzzle number
 * 20680 and pooled with whoever played card 20680, which does not exist. That
 * is the cross-denominator defect this project has now removed three times, so
 * the format is deliberately different and `runShare.test.ts` asserts the
 * puzzle parser refuses it.
 */

const RIGHT = "🎯";
const WRONG = "🫠";

export interface RunStrip {
  /**
   * The number a player sees, from `app/dailyRun.runNumber`, never the seed.
   * The seed is days since the Unix epoch and reads as a glitch; this is the
   * number two people compare, so it is the one that goes in the chat.
   */
  day: number;
  answers: readonly RunAnswer[];
}

/** The marks alone, in the order the calls were made. */
export function stripGlyphs(answers: readonly RunAnswer[]): string {
  return answers.map((a) => (a.correct ? RIGHT : WRONG)).join("");
}

/**
 * The whole pasteable line.
 *
 * Two lines rather than one: the glyphs are the thing worth looking at, and a
 * chat client that truncates will keep the first line, which is the one that
 * says which day it was.
 */
export function buildRunStrip({ day, answers }: RunStrip): string {
  const right = answers.filter((a) => a.correct).length;
  return `Confoundle run ${day} · ${right}/${answers.length}\n${stripGlyphs(answers)}`;
}
