import type { PuzzleData } from "../../puzzles/schema";
import { canMix } from "./mixer";
import { canScreen } from "./screen";
import { canSlice } from "./subgroups";

/**
 * Does this puzzle have anything to play with in its lesson beat?
 *
 * ONE SOURCE, READ BY BOTH THE VIEW AND ITS GUARD. `LessonView` uses this to
 * decide whether the fold advertises a toy, and `toyBadge.test.ts` uses it to
 * decide what the badge should say, so the two cannot disagree.
 *
 * That is not tidiness, it is the whole reason the badge test is trustworthy.
 * Written out separately in each place, adding a third toy left the view
 * correct and the test asserting the old answer, so the suite went red on a
 * change that was right. The next author would have "fixed" it by editing the
 * expectation, which is how a guard turns into a formality. Reading the
 * enumeration off a runtime source is the same rule `declaredColors.test.ts`
 * and `scopeLabels.test.ts` follow, applied one level up.
 */
export function hasToy(data: PuzzleData): boolean {
  return canMix(data) || canScreen(data) || canSlice(data);
}
