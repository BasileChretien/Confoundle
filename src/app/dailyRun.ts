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
