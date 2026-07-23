import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { clearProgress, loadProgress, parseProgressPayload, saveProgress } from "./progress";
import { signInWithEmail } from "./accounts";
import { createTestDatabase, type TestDatabase } from "./testing/sqliteD1";
import { loadMigration } from "./testing/schema";
import { STAGES, type SkillProgress } from "../srs/schedule";

const NOW = 1_760_000_000_000;

function record(over: Partial<SkillProgress> = {}): SkillProgress {
  return {
    skill: "simpsons-paradox",
    stage: 3,
    dueAt: NOW + 86_400_000,
    seenItemIds: ["sp-schools"],
    misconceived: false,
    lifetime: { correct: 2, wrong: 1 },
    updatedAt: NOW,
    ...over,
  };
}

describe("validating what a client sends", () => {
  it("accepts a well-formed record and hands back a copy", () => {
    const parsed = parseProgressPayload([record()]);
    expect(parsed).toEqual([record()]);
  });

  it("rejects rather than repairing", () => {
    // A half-accepted record corrupts scheduling silently, and in a spaced
    // repetition system that surfaces weeks later as reviews that never come.
    const bad: unknown[] = [
      "not an object",
      [{ ...record(), skill: "" }],
      [{ ...record(), stage: STAGES.length }],
      [{ ...record(), stage: -1 }],
      [{ ...record(), stage: 1.5 }],
      [{ ...record(), dueAt: Number.NaN }],
      [{ ...record(), dueAt: "soon" }],
      [{ ...record(), misconceived: 1 }],
      [{ ...record(), seenItemIds: "sp-schools" }],
      [{ ...record(), seenItemIds: [42] }],
      [{ ...record(), lifetime: { correct: -1, wrong: 0 } }],
      [{ ...record(), lifetime: undefined }],
      [{ ...record(), updatedAt: Number.POSITIVE_INFINITY }],
      // the same skill twice would make the merge order-dependent
      [record(), record()],
    ];
    for (const payload of bad) {
      expect({ payload, parsed: parseProgressPayload(payload) }).toEqual({
        payload,
        parsed: null,
      });
    }
  });

  it("refuses payloads big enough to be an attack rather than a learner", () => {
    const many = Array.from({ length: 501 }, (_, i) => record({ skill: `s-${i}` }));
    expect(parseProgressPayload(many)).toBeNull();
    expect(
      parseProgressPayload([
        record({ seenItemIds: Array.from({ length: 501 }, (_, i) => `i-${i}`) }),
      ]),
    ).toBeNull();
  });
});

describe("storing progress", () => {
  let db: TestDatabase;
  let accountId: string;

  beforeEach(async () => {
    db = createTestDatabase(loadMigration());
    accountId = (await signInWithEmail(db, "learner@example.org", NOW)).account.id;
  });
  afterEach(() => db.close());

  it("round-trips a record unchanged", async () => {
    await saveProgress(db, accountId, [record()]);
    expect(await loadProgress(db, accountId)).toEqual([record()]);
  });

  it("keeps the newer record when two devices disagree", async () => {
    await saveProgress(db, accountId, [record({ stage: 5, updatedAt: NOW + 1000 })]);
    // An older upload must not roll the skill back.
    await saveProgress(db, accountId, [record({ stage: 2, updatedAt: NOW })]);
    expect((await loadProgress(db, accountId))[0].stage).toBe(5);

    await saveProgress(db, accountId, [record({ stage: 6, updatedAt: NOW + 2000 })]);
    expect((await loadProgress(db, accountId))[0].stage).toBe(6);
  });

  it("never deletes a skill just because an upload did not mention it", async () => {
    // The offline phone knows about one skill; the laptop learned another
    // meanwhile. Treating absence as deletion would let the stalest device win.
    await saveProgress(db, accountId, [
      record({ skill: "berksons-bias" }),
      record({ skill: "lead-time-bias" }),
    ]);
    await saveProgress(db, accountId, [record({ skill: "berksons-bias", stage: 4, updatedAt: NOW + 1 })]);

    const stored = await loadProgress(db, accountId);
    expect(stored.map((p) => p.skill)).toEqual(["berksons-bias", "lead-time-bias"]);
  });

  it("keeps accounts apart", async () => {
    const other = (await signInWithEmail(db, "other@example.org", NOW)).account.id;
    await saveProgress(db, accountId, [record()]);
    expect(await loadProgress(db, other)).toEqual([]);
  });

  it("clears everything for one account and nothing for the other", async () => {
    const other = (await signInWithEmail(db, "other@example.org", NOW)).account.id;
    await saveProgress(db, accountId, [record()]);
    await saveProgress(db, other, [record()]);

    await clearProgress(db, accountId);
    expect(await loadProgress(db, accountId)).toEqual([]);
    expect(await loadProgress(db, other)).toHaveLength(1);
  });

  it("survives a seen-item list that got corrupted in storage", async () => {
    await saveProgress(db, accountId, [record()]);
    await db
      .prepare("UPDATE progress SET seen_item_ids = ? WHERE account_id = ?")
      .bind("{not json", accountId)
      .run();
    // The learner keeps their stage and at worst sees a repeated scenario,
    // which is better than a sync that fails forever.
    const stored = await loadProgress(db, accountId);
    expect(stored[0].stage).toBe(3);
    expect(stored[0].seenItemIds).toEqual([]);
  });
});
