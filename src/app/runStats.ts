/**
 * The calibration run's own small record, deliberately not the SRS, not the
 * daily streak, and not the account.
 *
 * The same argument `trapHuntStats.ts` makes, for the same reasons. Writing an
 * unscheduled mode into spaced repetition corrupts the intervals that make it
 * work; counting it towards the daily streak makes the streak mean two things
 * at once, so a player could keep one alive without ever meeting the day's
 * puzzle. Both trade a number that means something for a number that goes up.
 *
 * IT KEEPS TWO RECORDS BECAUSE THE MODE HAS TWO CURRENCIES, and they are
 * deliberately not combined. The best score says how well somebody staked; the
 * best streak says how long they went without claiming more than they had. A
 * cautious player and a bold one can each top one of them, which is the honest
 * description of two different readers and would be destroyed by adding them
 * together.
 *
 * Nothing else in the app reads this, and it syncs nowhere: the account's
 * published promise is that signing in makes the SRS schedule follow you, and
 * quietly widening that would make `docs/data-inventory.md` and the privacy
 * policy wrong.
 */

/**
 * BUMPED TO v2 BECAUSE BOTH STORED RECORDS WERE WRONG, in opposite directions.
 *
 * `bestStreak` was the longest run of well-calibrated calls, and a call counts
 * as calibrated if it was right OR staked at `hunch`. Stake `hunch` eight times
 * and the streak is eight, every run, guaranteed. The record paid for refusing
 * to commit.
 *
 * `bestScore` looks safe, because the payoff table is a proper scoring rule and
 * honest reporting maximises its EXPECTATION. A record is not an expectation.
 * It keeps only the maximum, and the maxima are 320 always-certain, 288
 * always-sure, 208 always-hunch: strictly ordered by stake, because a maximum
 * never touches the penalty column. So chasing a best score pays for
 * overclaiming exactly as the streak paid for underclaiming, and the two
 * together aimed the mode's only two persistent rewards in opposite wrong
 * directions.
 *
 * What replaces them is confidence-blind by construction. There is nothing to
 * migrate: both old numbers describe strategies rather than reading, and
 * `recent` is a 120-item anti-repeat cache whose loss costs a player at most a
 * few repeated items, once.
 */
const KEY = "confoundle:run:v2";

/** How many recent item ids to remember, so a run does not repeat itself. */
const RECENT_CAP = 120;

export interface RunStats {
  /**
   * Most calls got right in a single run. A function of `correct` alone, so no
   * stake can move it and chasing it can only mean reading the evidence better.
   */
  bestCorrect: number;
  runs: number;
  /** Most recently seen first. */
  recent: string[];
}

const EMPTY: RunStats = { bestCorrect: 0, runs: 0, recent: [] };

const num = (v: unknown, fallback: number): number =>
  typeof v === "number" && Number.isFinite(v) ? v : fallback;

export function readRunStats(): RunStats {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<RunStats>;
    return {
      bestCorrect: num(parsed.bestCorrect, 0),
      runs: num(parsed.runs, 0),
      recent: Array.isArray(parsed.recent)
        ? parsed.recent.filter((x): x is string => typeof x === "string")
        : [],
    };
  } catch {
    // Unreadable storage means no history, never a crash on the way into a mode.
    return EMPTY;
  }
}

/** Item ids to avoid drawing again, most recent first. */
export function recentlySeen(): ReadonlySet<string> {
  return new Set(readRunStats().recent);
}

export interface RunRecorded {
  stats: RunStats;
  /** Did this run beat the stored best? */
  isBest: boolean;
}

/**
 * Record a finished run.
 *
 * ONLY A CONFIDENCE-BLIND NUMBER IS KEPT. The run's score is still shown for
 * the run just played, where the proper scoring rule makes it a fair signal:
 * honest reporting maximises it in expectation. It is storing a MAXIMUM of it
 * across runs that breaks the rule, because a maximum discards the penalty half
 * of the table. See the note on `KEY`.
 */
export function recordRun(
  correct: number,
  itemIds: readonly string[],
): RunRecorded {
  const before = readRunStats();
  // The first-run guard the score and streak both needed, for the same reason:
  // without it a first run reports "your best is 0" against a record nobody has
  // ever set.
  const isBest = before.runs === 0 || correct > before.bestCorrect;

  const stats: RunStats = {
    bestCorrect: isBest ? correct : before.bestCorrect,
    runs: before.runs + 1,
    recent: [...itemIds, ...before.recent].slice(0, RECENT_CAP),
  };

  try {
    localStorage.setItem(KEY, JSON.stringify(stats));
  } catch {
    // A full or blocked store costs the record, never the run just played.
  }
  return { stats, isBest };
}
