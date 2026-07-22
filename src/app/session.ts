/**
 * Day/session state in localStorage. Privacy-respecting by design: this records
 * only which choice was made on which local date, keyed by puzzle slug. No
 * identifiers, no network, no personal data (PROJECT_PLAN §10).
 */
const STORAGE_KEY = "confoundle:progress:v1";

export interface PlayRecord {
  choiceId: string;
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

export function recordPlay(slug: string, choiceId: string): void {
  const map = readAll();
  map[keyFor(slug)] = { choiceId, playedAt: new Date().toISOString() };
  writeAll(map);
}

export function getTodaysPlay(slug: string): PlayRecord | undefined {
  return readAll()[keyFor(slug)];
}

export function hasPlayedToday(slug: string): boolean {
  return getTodaysPlay(slug) !== undefined;
}
