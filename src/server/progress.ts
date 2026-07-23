import type { D1Database } from "./cf";
import { STAGES, type SkillProgress } from "../srs/schedule";
import { mergeProgress } from "../srs/store";

/**
 * SRS progress, stored per account.
 *
 * Two decisions worth stating out loud.
 *
 * The merge rule is imported from the client's own store rather than
 * reimplemented here. Two copies of "which record wins" that drift apart would
 * produce a learner whose progress depends on which device they opened, and the
 * bug would be invisible until someone lost a month of reviews.
 *
 * A save never deletes. The client sends everything it knows about, but a
 * device that has been offline knows about less, and treating absence as
 * deletion would let the stalest device win. Removal happens only through
 * `clear`, which is the deletion primitive the whole account layer resolves to.
 */

const MAX_SKILLS = 500;
const MAX_SEEN_ITEMS = 500;
const MAX_ID_LENGTH = 64;
const MAX_LIFETIME = 1_000_000;

interface ProgressRow {
  skill: string;
  stage: number;
  due_at: number;
  seen_item_ids: string;
  misconceived: number;
  correct: number;
  wrong: number;
  updated_at: number;
}

function isFiniteInt(value: unknown, min: number, max: number): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= min &&
    value <= max
  );
}

function isId(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= MAX_ID_LENGTH;
}

/**
 * Validate a payload from a client we do not control.
 *
 * Returns null rather than repairing what it finds. A half-accepted progress
 * record would corrupt scheduling quietly, and quiet corruption in a spaced
 * repetition system surfaces weeks later as reviews that never arrive.
 */
export function parseProgressPayload(value: unknown): SkillProgress[] | null {
  if (!Array.isArray(value) || value.length > MAX_SKILLS) return null;
  const out: SkillProgress[] = [];
  const seen = new Set<string>();

  for (const entry of value) {
    if (entry === null || typeof entry !== "object") return null;
    const p = entry as Record<string, unknown>;
    if (!isId(p.skill) || seen.has(p.skill)) return null;
    seen.add(p.skill);
    if (!isFiniteInt(p.stage, 0, STAGES.length - 1)) return null;
    if (typeof p.dueAt !== "number" || !Number.isFinite(p.dueAt)) return null;
    if (typeof p.updatedAt !== "number" || !Number.isFinite(p.updatedAt)) return null;
    if (typeof p.misconceived !== "boolean") return null;
    if (!Array.isArray(p.seenItemIds) || p.seenItemIds.length > MAX_SEEN_ITEMS) {
      return null;
    }
    if (!p.seenItemIds.every(isId)) return null;
    const lifetime = p.lifetime as Record<string, unknown> | undefined;
    if (!lifetime || typeof lifetime !== "object") return null;
    if (!isFiniteInt(lifetime.correct, 0, MAX_LIFETIME)) return null;
    if (!isFiniteInt(lifetime.wrong, 0, MAX_LIFETIME)) return null;

    out.push({
      skill: p.skill,
      stage: p.stage,
      dueAt: p.dueAt,
      seenItemIds: [...(p.seenItemIds as string[])],
      misconceived: p.misconceived,
      lifetime: { correct: lifetime.correct, wrong: lifetime.wrong },
      updatedAt: p.updatedAt,
    });
  }
  return out;
}

function toProgress(row: ProgressRow): SkillProgress {
  let seenItemIds: string[] = [];
  try {
    const parsed: unknown = JSON.parse(row.seen_item_ids);
    if (Array.isArray(parsed)) seenItemIds = parsed.filter(isId);
  } catch {
    // A row we cannot read is a row we drop the history from, not a request we
    // fail: the learner keeps their stage and simply may see a repeat scenario.
  }
  return {
    skill: row.skill,
    stage: row.stage,
    dueAt: row.due_at,
    seenItemIds,
    misconceived: row.misconceived === 1,
    lifetime: { correct: row.correct, wrong: row.wrong },
    updatedAt: row.updated_at,
  };
}

export async function loadProgress(
  db: D1Database,
  accountId: string,
): Promise<SkillProgress[]> {
  const { results } = await db
    .prepare(
      `SELECT skill, stage, due_at, seen_item_ids, misconceived, correct, wrong, updated_at
         FROM progress WHERE account_id = ? ORDER BY skill`,
    )
    .bind(accountId)
    .all<ProgressRow>();
  return results.map(toProgress);
}

/**
 * Merge the client's records into the account's and write the result back.
 *
 * The merge happens here, not on the client, because only the server sees every
 * device. A phone that has been offline for a week sends a set missing whatever
 * the laptop did meanwhile; merging server-side means the laptop's newer records
 * survive that upload instead of being overwritten by silence.
 */
export async function saveProgress(
  db: D1Database,
  accountId: string,
  incoming: SkillProgress[],
): Promise<SkillProgress[]> {
  const merged = mergeProgress(await loadProgress(db, accountId), incoming);
  if (merged.length === 0) return merged;

  const statement = db.prepare(
    `INSERT INTO progress
       (account_id, skill, stage, due_at, seen_item_ids, misconceived, correct, wrong, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(account_id, skill) DO UPDATE SET
       stage = excluded.stage,
       due_at = excluded.due_at,
       seen_item_ids = excluded.seen_item_ids,
       misconceived = excluded.misconceived,
       correct = excluded.correct,
       wrong = excluded.wrong,
       updated_at = excluded.updated_at`,
  );

  await db.batch(
    merged.map((p) =>
      statement.bind(
        accountId,
        p.skill,
        p.stage,
        p.dueAt,
        JSON.stringify(p.seenItemIds),
        p.misconceived ? 1 : 0,
        p.lifetime.correct,
        p.lifetime.wrong,
        p.updatedAt,
      ),
    ),
  );
  return merged;
}

export async function clearProgress(
  db: D1Database,
  accountId: string,
): Promise<void> {
  await db.prepare("DELETE FROM progress WHERE account_id = ?").bind(accountId).run();
}
