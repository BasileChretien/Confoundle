import type { Confidence } from "../engine/scoring";
import type { ResultData } from "../engine/result";

/**
 * Day/session state in localStorage. Privacy-respecting by design: this records
 * only what was played on which local date, keyed by puzzle slug. No
 * identifiers, no network, no personal data (PROJECT_PLAN §10). It also powers
 * streaks and stats, all derived locally.
 */
const STORAGE_KEY = "confoundle:progress:v1";

export interface PlayRecord {
  choiceId: string;
  correct: boolean;
  confidence: Confidence;
  playedAt: string; // ISO timestamp
}

type ProgressMap = Record<string, PlayRecord>; // key: `${slug}@${YYYY-MM-DD}`

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

function keyFor(slug: string): string {
  return `${slug}@${todayISODate()}`;
}

function readAll(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function writeAll(map: ProgressMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // storage unavailable (private mode, quota), degrade silently
  }
}

/**
 * Record a commit, and report whether it was the player's FIRST for this puzzle
 * today.
 *
 * The return value exists so callers cannot get the ordering wrong. Asking "was
 * this blind?" means reading the store before this function writes to it, and a
 * caller doing that itself is one reordered line away from always answering no,
 * with nothing failing: the replay would look like a first play forever. The
 * anonymous tally depends on the distinction (a replay is made by somebody who
 * has just read the reveal, so counting it would bias the published number
 * towards the correct answer), so the check belongs where the write is.
 */
export function recordPlay(
  slug: string,
  choiceId: string,
  correct: boolean,
  confidence: Confidence,
): { first: boolean } {
  const map = readAll();
  const key = keyFor(slug);
  const first = map[key] === undefined;
  map[key] = {
    choiceId,
    correct,
    confidence,
    playedAt: new Date().toISOString(),
  };
  writeAll(map);
  return { first };
}

export function getTodaysPlay(slug: string): PlayRecord | undefined {
  return readAll()[keyFor(slug)];
}

/**
 * Review outcomes, kept separately from puzzle plays and aggregated by day.
 *
 * Until this existed, every number on the progress screen came from
 * `recordPlay`, which only fires when a PUZZLE is opened. So a learner who did
 * their reviews faithfully every day had a streak of zero, while someone
 * replaying a puzzle they had already solved inflated both their streak and
 * their catch rate with answers they already knew. The incentive was exactly
 * backwards: the behaviour that teaches nothing was the only one measured.
 *
 * Aggregated per day rather than logged per review, so this stays small, stays
 * bounded by the number of active days, and holds no item identifiers. It is
 * local-only, like the rest of session state.
 */
const REVIEW_KEY = "confoundle:reviews:v1";

type ConfidenceTally = Record<Confidence, { played: number; caught: number }>;
type ReviewMap = Record<string, ConfidenceTally>; // key: YYYY-MM-DD

function emptyTally(): ConfidenceTally {
  return {
    hunch: { played: 0, caught: 0 },
    sure: { played: 0, caught: 0 },
    certain: { played: 0, caught: 0 },
  };
}

function readReviews(): ReviewMap {
  try {
    const raw = localStorage.getItem(REVIEW_KEY);
    return raw ? (JSON.parse(raw) as ReviewMap) : {};
  } catch {
    return {};
  }
}

export function recordReviewOutcomes(
  outcomes: ReadonlyArray<{ correct: boolean; confidence: Confidence }>,
  todayIso: string = todayISODate(),
): void {
  if (outcomes.length === 0) return;
  const map = readReviews();
  const day = map[todayIso] ?? emptyTally();
  for (const o of outcomes) {
    const bucket = day[o.confidence];
    if (!bucket) continue;
    bucket.played += 1;
    if (o.correct) bucket.caught += 1;
  }
  try {
    localStorage.setItem(REVIEW_KEY, JSON.stringify({ ...map, [todayIso]: day }));
  } catch {
    // storage unavailable, degrade silently
  }
}

export function hasPlayedToday(slug: string): boolean {
  return getTodaysPlay(slug) !== undefined;
}

export interface Stats {
  played: number;
  caught: number;
  catchRate: number; // 0..1
  currentStreak: number;
  maxStreak: number;
  /** Accuracy split by how confident the player was, for calibration. */
  byConfidence: Record<Confidence, { played: number; caught: number }>;
}

function dayNumber(iso: string): number {
  return Math.floor(Date.parse(`${iso}T00:00:00Z`) / 86_400_000);
}

/**
 * Pure so it can be unit-tested: derive streaks and rates from both records.
 *
 * Reviews count for everything a play counts for. Retrieval practice is the
 * behaviour worth measuring, and a screen that ignored it told the learner
 * their reviews were worthless.
 */
export function computeStats(
  map: ProgressMap,
  todayIso: string,
  reviewMap: ReviewMap = {},
): Stats {
  const recs = Object.entries(map).map(([key, v]) => ({
    date: key.slice(key.indexOf("@") + 1),
    ...v,
  }));

  const byConfidence = {
    hunch: { played: 0, caught: 0 },
    sure: { played: 0, caught: 0 },
    certain: { played: 0, caught: 0 },
  } as Stats["byConfidence"];
  for (const r of recs) {
    const bucket = byConfidence[r.confidence];
    if (bucket) {
      bucket.played += 1;
      if (r.correct) bucket.caught += 1;
    }
  }
  for (const tally of Object.values(reviewMap)) {
    for (const level of ["hunch", "sure", "certain"] as Confidence[]) {
      const from = tally[level];
      if (!from) continue;
      byConfidence[level].played += from.played;
      byConfidence[level].caught += from.caught;
    }
  }

  // Totals are derived from the merged breakdown, so they can never drift from
  // the calibration panel that is drawn beside them.
  const played = Object.values(byConfidence).reduce((n, b) => n + b.played, 0);
  const caught = Object.values(byConfidence).reduce((n, b) => n + b.caught, 0);

  const reviewDays = Object.entries(reviewMap)
    .filter(([, t]) => Object.values(t).some((b) => b.played > 0))
    .map(([date]) => date);
  const days = [...new Set([...recs.map((r) => r.date), ...reviewDays])]
    .map(dayNumber)
    .sort((a, b) => a - b);

  let maxStreak = 0;
  let run = 0;
  let prev: number | null = null;
  for (const d of days) {
    run = prev !== null && d === prev + 1 ? run + 1 : 1;
    if (run > maxStreak) maxStreak = run;
    prev = d;
  }

  const daySet = new Set(days);
  const todayNum = dayNumber(todayIso);
  // A streak stays alive through today even if today isn't played yet.
  let cursor = daySet.has(todayNum)
    ? todayNum
    : daySet.has(todayNum - 1)
      ? todayNum - 1
      : null;
  let currentStreak = 0;
  while (cursor !== null && daySet.has(cursor)) {
    currentStreak += 1;
    cursor -= 1;
  }

  return {
    played,
    caught,
    catchRate: played ? caught / played : 0,
    currentStreak,
    maxStreak,
    byConfidence,
  };
}

export function getStats(): Stats {
  return computeStats(readAll(), todayISODate(), readReviews());
}

/**
 * Has anything ever been answered on this device?
 *
 * Used by the landing rule in `App.tsx` to decide whether a visitor arriving
 * at the bare root is new enough to be dropped straight into a puzzle.
 *
 * SYNCHRONOUS AND LOCAL ON PURPOSE. The alternative is waiting on the SRS
 * store, which is async and may be account-backed, and that would mean a frame
 * of the home screen before the puzzle replaced it: the worst of both outcomes,
 * since a newcomer would watch the pitch flash past on the way to the thing
 * that replaces it. This reads the same two local logs everything else here
 * derives from and adds no storage of its own.
 *
 * It becomes true at the first COMMIT rather than at the first lesson learned,
 * which is the earliest point at which somebody has genuinely used the app and
 * therefore the earliest honest moment to stop treating them as new.
 */
export function hasEverPlayed(): boolean {
  if (Object.keys(readAll()).length > 0) return true;
  return Object.keys(readReviews()).length > 0;
}

export interface DayActivity {
  /** YYYY-MM-DD, local. */
  date: string;
  /** Puzzles played plus reviews answered that day. */
  count: number;
}

/**
 * Activity per calendar day for the last `days` days (oldest first, today
 * last), for a GitHub-style heatmap. Pure so it can be unit-tested, and derived
 * from the same two local logs everything else uses, so it invents no new
 * storage and holds no item identifiers, only per-day totals.
 */
export function activityByDay(
  days: number,
  todayIso: string = todayISODate(),
  map: ProgressMap = readAll(),
  reviewMap: ReviewMap = readReviews(),
): DayActivity[] {
  const perDay = new Map<string, number>();
  for (const key of Object.keys(map)) {
    const date = key.slice(key.indexOf("@") + 1);
    perDay.set(date, (perDay.get(date) ?? 0) + 1);
  }
  for (const [date, tally] of Object.entries(reviewMap)) {
    const played = (["hunch", "sure", "certain"] as Confidence[]).reduce(
      (n, c) => n + (tally[c]?.played ?? 0),
      0,
    );
    if (played > 0) perDay.set(date, (perDay.get(date) ?? 0) + played);
  }

  const todayNum = dayNumber(todayIso);
  const out: DayActivity[] = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const iso = new Date((todayNum - i) * 86_400_000).toISOString().slice(0, 10);
    out.push({ date: iso, count: perDay.get(iso) ?? 0 });
  }
  return out;
}

export function getActivity(days: number): DayActivity[] {
  return activityByDay(days);
}

/**
 * The calibration week: for each of the last N days, what was staked and
 * whether it paid. This is what the share card draws, and it is deliberately
 * NOT a score.
 *
 * Two things it must never leak, because the card is public and the puzzle is
 * still live for everyone who has not played it yet. It carries no puzzle slug
 * and no choice id, only the outcome and the stake. A reader of somebody's card
 * learns how well calibrated they were and nothing whatever about the answer.
 *
 * A day with more than one play (a puzzle plus a replay, or several reviews)
 * reports the FIRST play of that day, because the first commit is the one made
 * without hindsight and is therefore the only one whose confidence means
 * anything.
 */
export type DayOutcome = "caught" | "fooled" | "skipped";

export interface CalibrationDay {
  /** YYYY-MM-DD, local, oldest first. */
  date: string;
  outcome: DayOutcome;
  /** Absent on a skipped day, since nothing was staked. */
  confidence?: Confidence;
}

export function calibrationByDay(
  days: number,
  todayIso: string = todayISODate(),
  map: ProgressMap = readAll(),
): CalibrationDay[] {
  /** First play of each date, by timestamp, so a replay cannot overwrite it. */
  const firstOfDay = new Map<string, PlayRecord>();
  for (const [key, rec] of Object.entries(map)) {
    const date = key.slice(key.indexOf("@") + 1);
    const held = firstOfDay.get(date);
    if (!held || rec.playedAt < held.playedAt) firstOfDay.set(date, rec);
  }

  const out: CalibrationDay[] = [];
  const todayNum = dayNumber(todayIso);
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date((todayNum - i) * 86_400_000).toISOString().slice(0, 10);
    const rec = firstOfDay.get(date);
    if (!rec) {
      out.push({ date, outcome: "skipped" });
      continue;
    }
    out.push({
      date,
      outcome: rec.correct ? "caught" : "fooled",
      confidence: rec.confidence,
    });
  }
  return out;
}

/**
 * How many of the last N days were actually played. The card uses this to
 * decide whether to draw the strip at all: one lonely bar reads as a broken
 * chart rather than as a first day, so the strip waits until there is a shape
 * to show.
 */
export function calibrationDaysPlayed(week: CalibrationDay[]): number {
  return week.filter((d) => d.outcome !== "skipped").length;
}

export function getCalibrationWeek(days = 7): CalibrationDay[] {
  return calibrationByDay(days);
}

// ---- nickname (local only, for the friends board) ----
const NAME_KEY = "confoundle:name";

export function getNickname(): string {
  try {
    return localStorage.getItem(NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export function setNickname(name: string): void {
  try {
    localStorage.setItem(NAME_KEY, name.trim().slice(0, 24));
  } catch {
    // storage unavailable, degrade silently
  }
}

// ---- puzzle number: same local day is the same number for everyone ----
const LAUNCH_ISO = "2026-07-01";

export function puzzleNumber(todayIso: string = todayISODate()): number {
  return dayNumber(todayIso) - dayNumber(LAUNCH_ISO) + 1;
}

// ---- friends board: a local tally of results friends paste in ----
const FRIENDS_KEY = "confoundle:friends:v1";
type FriendEntry = { caught: boolean; score: number; streak: number };
type FriendsStore = Record<string, Record<string, FriendEntry>>; // [puzzleNo][name]

function readFriends(): FriendsStore {
  try {
    const raw = localStorage.getItem(FRIENDS_KEY);
    return raw ? (JSON.parse(raw) as FriendsStore) : {};
  } catch {
    return {};
  }
}

function writeFriends(store: FriendsStore): void {
  try {
    localStorage.setItem(FRIENDS_KEY, JSON.stringify(store));
  } catch {
    // storage unavailable, degrade silently
  }
}

/** Merge parsed result lines into the board (latest wins per name per day). */
export function addFriendResults(results: ResultData[]): void {
  const store = readFriends();
  for (const r of results) {
    const day = String(r.puzzleNo);
    if (!store[day]) store[day] = {};
    store[day][r.name] = {
      caught: r.caught,
      score: r.score,
      streak: r.streak,
    };
  }
  writeFriends(store);
}

export interface BoardRow extends FriendEntry {
  name: string;
}

// ---- learned biases and Trap Hunt state ----
const LEARNED_KEY = "confoundle:learned:v1";

export function getLearned(): string[] {
  try {
    const raw = localStorage.getItem(LEARNED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/** Called when a player reaches a puzzle's lesson: that bias is now "taught". */
export function markLearned(skill: string): void {
  try {
    const current = getLearned();
    if (!current.includes(skill)) {
      localStorage.setItem(LEARNED_KEY, JSON.stringify([...current, skill]));
    }
  } catch {
    // storage unavailable, degrade silently
  }
}

// The old Trap Hunt kept its own cadence state here (a checkpoint counter and a
// weekly review day). It was replaced by the spaced-repetition scheduler in
// src/srs, driven through src/app/reviews.ts, which schedules per skill and
// syncs to an account, so that state and its helpers are gone. `markLearned`
// stays: reaching a lesson still records the skill, and enrolling it on the
// SRS ladder now happens alongside that in PuzzleFlow.

export function todayDayNumber(): number {
  return dayNumber(todayISODate());
}

/** Today's board, ranked by score then streak. */
export function getFriendsBoard(puzzleNo: number): BoardRow[] {
  const day = readFriends()[String(puzzleNo)] ?? {};
  return Object.entries(day)
    .map(([name, e]) => ({ name, ...e }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.streak - a.streak ||
        a.name.localeCompare(b.name),
    );
}
