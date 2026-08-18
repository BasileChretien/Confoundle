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

const KEY = "confoundle:run:v1";

/** How many recent item ids to remember, so a run does not repeat itself. */
const RECENT_CAP = 120;

export interface RunStats {
  bestScore: number;
  bestStreak: number;
  runs: number;
  /** Most recently seen first. */
  recent: string[];
}

const EMPTY: RunStats = { bestScore: 0, bestStreak: 0, runs: 0, recent: [] };

const num = (v: unknown, fallback: number): number =>
  typeof v === "number" && Number.isFinite(v) ? v : fallback;

export function readRunStats(): RunStats {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<RunStats>;
    return {
      bestScore: num(parsed.bestScore, 0),
      bestStreak: num(parsed.bestStreak, 0),
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
  /** Did this run beat the stored best score? */
  isBestScore: boolean;
  /** Did it beat the stored best streak? */
  isBestStreak: boolean;
}

/**
 * Record a finished run.
 *
 * BEST SCORE IS COMPARED BEFORE IT IS STORED, and a negative run cannot lower
 * it. A player can genuinely score below zero here, because the wager takes
 * points off for overclaiming, and a record that fell after a bad afternoon
 * would be a record of the last thing that happened rather than of the best.
 */
export function recordRun(
  score: number,
  streak: number,
  itemIds: readonly string[],
): RunRecorded {
  const before = readRunStats();
  const isBestScore = before.runs === 0 || score > before.bestScore;
  // The same first-run guard as the score above, and for the same reason.
  // Without it, a first run whose every call overclaimed reports "your best
  // is 0" against a record nobody has ever set. A streak cannot go negative,
  // so the stored value is right either way; what was wrong was the message.
  const isBestStreak = before.runs === 0 || streak > before.bestStreak;

  const stats: RunStats = {
    bestScore: isBestScore ? score : before.bestScore,
    bestStreak: isBestStreak ? streak : before.bestStreak,
    runs: before.runs + 1,
    recent: [...itemIds, ...before.recent].slice(0, RECENT_CAP),
  };

  try {
    localStorage.setItem(KEY, JSON.stringify(stats));
  } catch {
    // A full or blocked store costs the record, never the run just played.
  }
  return { stats, isBestScore, isBestStreak };
}
