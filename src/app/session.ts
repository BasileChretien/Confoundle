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

export function recordPlay(
  slug: string,
  choiceId: string,
  correct: boolean,
  confidence: Confidence,
): void {
  const map = readAll();
  map[keyFor(slug)] = {
    choiceId,
    correct,
    confidence,
    playedAt: new Date().toISOString(),
  };
  writeAll(map);
}

export function getTodaysPlay(slug: string): PlayRecord | undefined {
  return readAll()[keyFor(slug)];
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

/** Pure so it can be unit-tested: derive streaks and rates from the record map. */
export function computeStats(map: ProgressMap, todayIso: string): Stats {
  const recs = Object.entries(map).map(([key, v]) => ({
    date: key.slice(key.indexOf("@") + 1),
    ...v,
  }));
  const played = recs.length;
  const caught = recs.filter((r) => r.correct).length;

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

  const days = [...new Set(recs.map((r) => r.date))]
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
  return computeStats(readAll(), todayISODate());
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
