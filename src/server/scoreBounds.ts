/**
 * The range of scores the histogram endpoint will accept.
 *
 * WHY THESE LIVE HERE RATHER THAN IN THE FUNCTION. `functions/api/score.ts` is
 * meant to be a thin adapter, and this project's rule is that logic lives in
 * `src/server/` so `tsc` and Vitest actually cover it. These two numbers were
 * the exception: bare constants inside the adapter, invisible to the suite,
 * and duplicated by hand into a test that asserts the wager stays inside them.
 *
 * That duplication is the shape of defect this repo keeps catching, and it has
 * a list of tests written specifically because a hand-copied value drifted
 * from its source (`declaredColors`, `scopeLabels`, `localeNumerals`). A
 * change to the ceiling here would not have reached the test asserting the
 * payoff table respects it, so the two could disagree silently while both
 * looked correct.
 *
 * THE CEILING IS ABOUT A SINGLE PUZZLE, not a day's play. Nothing in the app
 * sums scores across puzzles today, and `global.ts` posts one per day. If a
 * mode is ever added that banks a total, this bound is the first thing that
 * has to move, and the silence is what makes it dangerous: `global.ts` turns a
 * rejected submission into `null` rather than an error, so an overflow would
 * make the percentile quietly disappear rather than fail.
 */

export const MIN_SCORE = -50;
export const MAX_SCORE = 200;

/** A submitted score the endpoint is willing to record. */
export function isAcceptableScore(score: number): boolean {
  return Number.isFinite(score) && score >= MIN_SCORE && score <= MAX_SCORE;
}
