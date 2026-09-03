/**
 * Trap Hunt's own small record, deliberately not the SRS and deliberately not
 * the daily streak.
 *
 * WHY A THIRD STORE RATHER THAN REUSING EITHER. Writing Trap Hunt into the SRS
 * would feed unscheduled repetitions into spaced repetition and corrupt the
 * intervals that make it work. Counting it towards the daily streak would make
 * the streak mean two different things, so a player could keep a "streak" alive
 * without ever meeting the day's puzzle. Both would trade a number that means
 * something for a number that goes up.
 *
 * So it keeps a best run, a count of rounds, and the ids most recently seen.
 * That is enough to show progress and to avoid repeating items, and it is
 * nothing that any other part of the app reads.
 */

const KEY = "confoundle:traphunt:v1";

/** How many recent item ids to remember, so a round does not repeat itself. */
const RECENT_CAP = 120;

export interface TrapHuntStats {
  bestRun: number;
  rounds: number;
  /** Most recently seen first. */
  recent: string[];
}

const EMPTY: TrapHuntStats = { bestRun: 0, rounds: 0, recent: [] };

export function readTrapHunt(): TrapHuntStats {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<TrapHuntStats>;
    return {
      bestRun: typeof parsed.bestRun === "number" ? parsed.bestRun : 0,
      rounds: typeof parsed.rounds === "number" ? parsed.rounds : 0,
      recent: Array.isArray(parsed.recent)
        ? parsed.recent.filter((x): x is string => typeof x === "string")
        : [],
    };
  } catch {
    return EMPTY;
  }
}

/**
 * Record a finished round. Returns the stats as they now stand, and whether
 * this round set a new best, since the summary says so and should not have to
 * compare two numbers itself.
 */
/**
 * `continued` records a session that has already been counted once.
 *
 * WHY IT EXISTS. Trap Hunt can now be extended at the end rather than stopping
 * dead, and an extension is the same sitting rather than a second one. Writing
 * an ordinary record for it would count one session as two, so a player who
 * pressed "one more" three times would be told they had played four rounds. The
 * best run and the seen list still update, because those are facts about the
 * items answered; only the tally of sittings is held.
 */
export function recordRound(
  run: number,
  seenIds: readonly string[],
  read: () => TrapHuntStats = readTrapHunt,
  { continued = false }: { continued?: boolean } = {},
): { stats: TrapHuntStats; isBest: boolean } {
  const before = read();
  // Strictly greater, so equalling your best is not announced as beating it.
  const isBest = run > before.bestRun;
  const next: TrapHuntStats = {
    bestRun: Math.max(before.bestRun, run),
    rounds: before.rounds + (continued ? 0 : 1),
    recent: [...seenIds, ...before.recent].slice(0, RECENT_CAP),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable. The round still counted for the player who just
    // played it; only the record is lost, which is the right thing to drop.
  }
  return { stats: next, isBest };
}

export function recentlySeen(): Set<string> {
  return new Set(readTrapHunt().recent);
}
