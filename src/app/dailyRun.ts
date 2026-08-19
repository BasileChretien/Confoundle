import { todayDayNumber } from "./session";

/**
 * Which day's run this is, and whether it has already been played for score.
 *
 * ONE SCORED ATTEMPT, THEN PRACTICE THAT SAYS SO. A daily whose score can be
 * farmed by replaying until the draw goes well is not a measurement of
 * anything, and this app's whole subject is a number that means what it says.
 * Further attempts are allowed, because refusing them would make the mode
 * unavailable to somebody who simply wants practice, and they are unscored and
 * labelled rather than silently discarded.
 *
 * IT IS A FUNCTION OF WHETHER YOU PLAYED, NEVER OF WHAT YOU STAKED, which is
 * the rule `calibrationRun.ts` now states: anything that is a function of
 * `correct` is safe, anything that is a function of `confidence` is suspect. A
 * gate on having played at all touches neither.
 *
 * Local only. It syncs nowhere, for the same reason the run's own record does:
 * the account's published promise is that signing in makes the SRS schedule
 * follow you, and quietly widening that would make the privacy policy wrong.
 */
const KEY = "confoundle:dailyrun:v1";

/**
 * The number a player sees, which is not the number the draw is seeded with.
 *
 * The seed is days since the Unix epoch, because everything day-keyed in this
 * app already is and two of them agreeing without parsing is worth more than a
 * pretty integer. Shown raw, that reads "Today's run, #20680", which looks like
 * a bug rather than a counter and invites nobody to compare anything.
 *
 * So the label counts from the day the daily itself started. The two numbers
 * must never be confused: `todayRunDay()` seeds the draw and keys the record,
 * `runNumber` is for human eyes and for the strip people paste at each other.
 */
const FIRST_RUN_DAY = Math.floor(Date.UTC(2026, 7, 19) / 86_400_000);

export function runNumber(day: number): number {
  return day - FIRST_RUN_DAY + 1;
}

/** Days since the epoch, UTC, the same number every other day-keyed thing uses. */
export function todayRunDay(): number {
  return todayDayNumber();
}

/** The last day whose run was played for score, or null. */
function lastScored(): number | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) return null;
    const n = Number(raw);
    return Number.isInteger(n) ? n : null;
  } catch {
    // Unreadable storage means the run is scoreable, which is the generous
    // failure: it costs an extra counted attempt, never a lost one.
    return null;
  }
}

/** Has today's run already been played for score? */
export function playedDailyRun(day: number = todayRunDay()): boolean {
  const last = lastScored();
  return last !== null && last >= day;
}

/**
 * Mark today's run as played.
 *
 * Stores the day rather than a set of days, because nothing needs to know that
 * you played on the fourteenth: the only question is whether today is spent.
 * `>=` rather than `===` in the check above so that a clock moved backwards
 * cannot hand somebody a second scored attempt.
 */
export function recordDailyRun(day: number = todayRunDay()): void {
  try {
    const last = lastScored();
    if (last === null || day > last) localStorage.setItem(KEY, String(day));
  } catch {
    // A full or blocked store costs the record, never the run just played.
  }
}

/**
 * May this finished run touch the persisted record?
 *
 * A PREDICATE RATHER THAN AN `if` IN THE VIEW, because the `if` version had no
 * guard: the write happens after eight answers, which nothing can reach through
 * a component that holds its own state, so removing the check left every test
 * green. That is the same seam `StakeReadout` and `CrowdLinesView` needed, for
 * the same reason.
 *
 * WHAT IT REFUSES is the daily replayed after its scored attempt.
 * `drawDailyRun` is pure in the day, so that replay is the SAME EIGHT ITEMS IN
 * THE SAME ORDER, and the player has just been shown every answer. `recordRun`
 * stores a count of correct calls, which was the fix for two records reachable
 * by a staking pattern; it is confidence-blind and not memory-blind, so a
 * guaranteed 8 of 8 would go in as a personal best.
 *
 * The ordinary calibration run is safe without this, because it passes
 * `recentlySeen()` and essentially never repeats, and a first daily attempt is
 * a fresh draw like any other. Only the guaranteed repeat is refused.
 */
export function runCountsTowardRecord(daily: boolean, scored: boolean): boolean {
  return !daily || scored;
}
