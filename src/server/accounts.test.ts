import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  createSession,
  deleteAccount,
  findByEmail,
  LinkConflict,
  PERSONAL_TABLES,
  resolveSession,
  revokeSession,
  signInWithEmail,
  signInWithGoogle,
  sweepExpired,
} from "./accounts";
import { saveProgress } from "./progress";
import { createTestDatabase, type TestDatabase } from "./testing/sqliteD1";
import { loadMigration } from "./testing/schema";
import { SESSION_TTL_MS } from "./http";

const NOW = 1_760_000_000_000;

let db: TestDatabase;

beforeEach(() => {
  db = createTestDatabase(loadMigration());
});
afterEach(() => db.close());

function progressFor(skill: string, updatedAt: number) {
  return {
    skill,
    stage: 3,
    dueAt: updatedAt + 1000,
    seenItemIds: ["sp-schools"],
    misconceived: false,
    lifetime: { correct: 1, wrong: 0 },
    updatedAt,
  };
}

describe("signing in with Google", () => {
  it("creates an account the first time and finds it the second", async () => {
    const identity = { sub: "google-1", email: "a@example.org" };
    const first = await signInWithGoogle(db, identity, NOW);
    expect(first.created).toBe(true);

    const second = await signInWithGoogle(db, identity, NOW + 1000);
    expect(second.created).toBe(false);
    expect(second.account.id).toBe(first.account.id);
  });

  it("follows the subject id, not the address, when Google's email changes", async () => {
    const first = await signInWithGoogle(db, { sub: "g", email: "old@example.org" }, NOW);
    const second = await signInWithGoogle(db, { sub: "g", email: "new@example.org" }, NOW + 1);

    expect(second.account.id).toBe(first.account.id);
    expect(second.account.email).toBe("new@example.org");
    expect(await findByEmail(db, "old@example.org")).toBeNull();
  });
});

describe("the linking path", () => {
  it("attaches Google to an account that started as email-only", async () => {
    const byEmail = await signInWithEmail(db, "same@example.org", NOW);
    expect(byEmail.account.googleSub).toBeNull();

    const byGoogle = await signInWithGoogle(
      db,
      { sub: "google-9", email: "same@example.org" },
      NOW + 5000,
    );

    expect(byGoogle.linked).toBe(true);
    expect(byGoogle.created).toBe(false);
    expect(byGoogle.account.id).toBe(byEmail.account.id);
    expect(byGoogle.account.googleSub).toBe("google-9");
  });

  it("lands an email code on the account Google already created", async () => {
    const byGoogle = await signInWithGoogle(
      db,
      { sub: "google-9", email: "same@example.org" },
      NOW,
    );
    const byEmail = await signInWithEmail(db, "same@example.org", NOW + 5000);

    expect(byEmail.created).toBe(false);
    expect(byEmail.account.id).toBe(byGoogle.account.id);
    // Linking by the other door must not detach Google.
    expect(byEmail.account.googleSub).toBe("google-9");
  });

  it("keeps the learner's progress across the link", async () => {
    const byEmail = await signInWithEmail(db, "same@example.org", NOW);
    await saveProgress(db, byEmail.account.id, [progressFor("lead-time-bias", NOW)]);

    const byGoogle = await signInWithGoogle(
      db,
      { sub: "google-9", email: "same@example.org" },
      NOW + 1,
    );
    const { results } = await db
      .prepare("SELECT skill FROM progress WHERE account_id = ?")
      .bind(byGoogle.account.id)
      .all<{ skill: string }>();
    expect(results.map((r) => r.skill)).toEqual(["lead-time-bias"]);
  });

  it("refuses to merge when the address moved to a different Google account", async () => {
    await signInWithGoogle(db, { sub: "first-owner", email: "reused@example.org" }, NOW);
    await expect(
      signInWithGoogle(db, { sub: "second-owner", email: "reused@example.org" }, NOW + 1),
    ).rejects.toBeInstanceOf(LinkConflict);
  });

  it("never lets two accounts hold the same address", async () => {
    await signInWithEmail(db, "one@example.org", NOW);
    await signInWithEmail(db, "one@example.org", NOW + 1);
    const { results } = await db
      .prepare("SELECT id FROM accounts WHERE email = ?")
      .bind("one@example.org")
      .all();
    expect(results).toHaveLength(1);
  });
});

describe("sessions", () => {
  it("resolves a fresh token to its account and nothing else to anything", async () => {
    const { account } = await signInWithEmail(db, "s@example.org", NOW);
    const { token } = await createSession(db, account.id, NOW);

    expect((await resolveSession(db, token, NOW + 1000))?.id).toBe(account.id);
    expect(await resolveSession(db, null, NOW)).toBeNull();
    expect(await resolveSession(db, "not-a-token", NOW)).toBeNull();
  });

  it("stores only a digest, so the database cannot sign anyone in", async () => {
    const { account } = await signInWithEmail(db, "s@example.org", NOW);
    const { token } = await createSession(db, account.id, NOW);
    const { results } = await db
      .prepare("SELECT token_hash FROM sessions")
      .all<{ token_hash: string }>();
    expect(results[0].token_hash).not.toBe(token);
    expect(results[0].token_hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("stops working once expired, and once revoked", async () => {
    const { account } = await signInWithEmail(db, "s@example.org", NOW);
    const { token } = await createSession(db, account.id, NOW);
    expect(await resolveSession(db, token, NOW + SESSION_TTL_MS + 1)).toBeNull();

    await revokeSession(db, token);
    expect(await resolveSession(db, token, NOW + 1000)).toBeNull();
  });

  it("sweeps expired rows without touching live ones", async () => {
    const { account } = await signInWithEmail(db, "s@example.org", NOW);
    const dead = await createSession(db, account.id, NOW - SESSION_TTL_MS - 1);
    const live = await createSession(db, account.id, NOW);

    await sweepExpired(db, NOW);
    expect(await resolveSession(db, dead.token, NOW)).toBeNull();
    expect(await resolveSession(db, live.token, NOW)).not.toBeNull();
  });
});

describe("erasure", () => {
  it("leaves nothing behind in any table that holds personal data", async () => {
    const { account } = await signInWithGoogle(db, { sub: "g", email: "e@example.org" }, NOW);
    await createSession(db, account.id, NOW);
    await createSession(db, account.id, NOW);
    await saveProgress(db, account.id, [
      progressFor("berksons-bias", NOW),
      progressFor("lead-time-bias", NOW),
    ]);

    const deleted = await deleteAccount(db, account.id);
    expect(deleted).toEqual({ progress: 2, sessions: 2, accounts: 1 });

    for (const table of PERSONAL_TABLES) {
      const column = table === "accounts" ? "id" : "account_id";
      const { results } = await db
        .prepare(`SELECT 1 FROM ${table} WHERE ${column} = ?`)
        .bind(account.id)
        .all();
      expect({ table, rows: results.length }).toEqual({ table, rows: 0 });
    }
  });

  it("does not touch anyone else's account", async () => {
    const mine = await signInWithEmail(db, "mine@example.org", NOW);
    const theirs = await signInWithEmail(db, "theirs@example.org", NOW);
    await saveProgress(db, theirs.account.id, [progressFor("spectrum-bias", NOW)]);

    await deleteAccount(db, mine.account.id);
    expect(await findByEmail(db, "theirs@example.org")).not.toBeNull();
    const { results } = await db
      .prepare("SELECT skill FROM progress WHERE account_id = ?")
      .bind(theirs.account.id)
      .all();
    expect(results).toHaveLength(1);
  });

  it("lets the same person sign up again afterwards, as a stranger", async () => {
    const before = await signInWithGoogle(db, { sub: "g", email: "e@example.org" }, NOW);
    await deleteAccount(db, before.account.id);

    const after = await signInWithGoogle(db, { sub: "g", email: "e@example.org" }, NOW + 1);
    expect(after.created).toBe(true);
    expect(after.account.id).not.toBe(before.account.id);
  });
});
