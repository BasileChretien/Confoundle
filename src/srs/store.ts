import type { SkillProgress } from "./schedule";

/**
 * Where SRS progress lives.
 *
 * Deliberately an async interface even though today's only implementation is
 * synchronous localStorage. When accounts land, a remote store becomes a
 * drop-in: nothing that calls this has to change, and the scheduler never
 * learns that storage exists at all.
 *
 * `clear()` is not housekeeping. It is the deletion primitive that a GDPR
 * erasure request resolves to, and `exportAll` / `importAll` are the
 * portability pair. Both are cheaper to design in now than to retrofit onto
 * live data.
 */
export interface ProgressStore {
  load(): Promise<SkillProgress[]>;
  save(all: SkillProgress[]): Promise<void>;
  clear(): Promise<void>;
}

const STORAGE_KEY = "confoundle:srs:v1";
const SCHEMA_VERSION = 1;

interface Envelope {
  version: number;
  updatedAt: number;
  skills: SkillProgress[];
}

/**
 * Reject anything that is not a progress record rather than trusting whatever
 * is in localStorage. A user can edit it, an old build can have written it, and
 * a half-valid record would corrupt scheduling silently.
 */
function isProgress(value: unknown): value is SkillProgress {
  if (value === null || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.skill === "string" &&
    typeof p.stage === "number" &&
    Number.isFinite(p.stage) &&
    typeof p.dueAt === "number" &&
    Array.isArray(p.seenItemIds) &&
    p.seenItemIds.every((id) => typeof id === "string") &&
    typeof p.misconceived === "boolean" &&
    typeof p.updatedAt === "number"
  );
}

export function parseStored(raw: string | null): SkillProgress[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Partial<Envelope>;
    if (parsed?.version !== SCHEMA_VERSION) return [];
    const skills = Array.isArray(parsed.skills) ? parsed.skills : [];
    return skills.filter(isProgress);
  } catch {
    return [];
  }
}

export function serialise(all: SkillProgress[], now: number): string {
  const envelope: Envelope = {
    version: SCHEMA_VERSION,
    updatedAt: now,
    skills: all,
  };
  return JSON.stringify(envelope);
}

/**
 * Reconcile two sets of progress, keeping whichever record for a skill was
 * touched last.
 *
 * Last write wins is the right trade here. The alternative, merging stage and
 * interval field by field, produces records that never actually happened. The
 * cost is that a review done offline on one device can be overwritten by a
 * newer one from another; for spaced repetition that means at worst one
 * repetition scheduled slightly wrong, which self-corrects at the next review.
 */
export function mergeProgress(
  a: readonly SkillProgress[],
  b: readonly SkillProgress[],
): SkillProgress[] {
  const bySkill = new Map<string, SkillProgress>();
  for (const p of [...a, ...b]) {
    const existing = bySkill.get(p.skill);
    if (!existing || p.updatedAt > existing.updatedAt) bySkill.set(p.skill, p);
  }
  return [...bySkill.values()].sort((x, y) => x.skill.localeCompare(y.skill));
}

/** The browser-local store. Degrades to in-memory when storage is unavailable. */
export class LocalProgressStore implements ProgressStore {
  private readonly clock: () => number;

  constructor(clock: () => number = () => Date.now()) {
    this.clock = clock;
  }

  async load(): Promise<SkillProgress[]> {
    try {
      return parseStored(localStorage.getItem(STORAGE_KEY));
    } catch {
      return [];
    }
  }

  async save(all: SkillProgress[]): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEY, serialise(all, this.clock()));
    } catch {
      // private mode or quota; the session still works, it just will not persist
    }
  }

  async clear(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // nothing to do; there is no state we could have failed to remove
    }
  }
}

/**
 * Everything this app holds about a learner's SRS progress, as one JSON string.
 * Serves three purposes at once: the portability half of a data-rights request,
 * a backup a user can keep themselves, and the migration path when a
 * local-only learner first signs in and wants their history carried over.
 */
export async function exportAll(store: ProgressStore, now: number): Promise<string> {
  return serialise(await store.load(), now);
}

export async function importAll(
  store: ProgressStore,
  raw: string,
): Promise<SkillProgress[]> {
  const incoming = parseStored(raw);
  const merged = mergeProgress(await store.load(), incoming);
  await store.save(merged);
  return merged;
}
