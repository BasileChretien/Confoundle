import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  allow,
  CODE_LENGTH,
  CODE_TTL_MS,
  EMAIL_LIMIT,
  emailBucket,
  ipBucket,
  issueCode,
  MAX_ATTEMPTS,
  RESEND_INTERVAL_MS,
  verifyCode,
} from "./otp";
import { createTestDatabase, type TestDatabase } from "./testing/sqliteD1";
import { loadMigration } from "./testing/schema";

const NOW = 1_760_000_000_000;
const EMAIL = "learner@example.org";

let db: TestDatabase;

beforeEach(() => {
  db = createTestDatabase(loadMigration());
});
afterEach(() => db.close());

async function issue(now = NOW): Promise<string> {
  const result = await issueCode(db, EMAIL, now);
  if (!result.ok) throw new Error(`expected a code, got ${result.reason}`);
  return result.code;
}

describe("one-time codes", () => {
  it("mints a numeric code and accepts it once", async () => {
    const code = await issue();
    expect(code).toMatch(new RegExp(`^\\d{${CODE_LENGTH}}$`));
    expect(await verifyCode(db, EMAIL, code, NOW + 1000)).toBe("ok");
    // Consumed: a replay inside the ten minutes must not work.
    expect(await verifyCode(db, EMAIL, code, NOW + 2000)).toBe("none");
  });

  it("never stores the code itself", async () => {
    const code = await issue();
    const row = await db
      .prepare("SELECT code_hash FROM email_codes WHERE email = ?")
      .bind(EMAIL)
      .first<{ code_hash: string }>();
    expect(row?.code_hash).not.toBe(code);
    expect(row?.code_hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("expires", async () => {
    const code = await issue();
    expect(await verifyCode(db, EMAIL, code, NOW + CODE_TTL_MS + 1)).toBe("expired");
  });

  it("dies after a handful of guesses", async () => {
    const code = await issue();
    for (let i = 0; i < MAX_ATTEMPTS; i += 1) {
      expect(await verifyCode(db, EMAIL, "000000", NOW + 1)).toBe("wrong");
    }
    // Even the right code is refused now, so guessing cannot outlast the limit.
    expect(await verifyCode(db, EMAIL, code, NOW + 2)).toBe("locked");
    expect(await verifyCode(db, EMAIL, code, NOW + 3)).toBe("none");
  });

  it("will not mail the same address twice in quick succession", async () => {
    await issue();
    expect(await issueCode(db, EMAIL, NOW + RESEND_INTERVAL_MS - 1)).toEqual({
      ok: false,
      reason: "too-soon",
    });
    expect((await issueCode(db, EMAIL, NOW + RESEND_INTERVAL_MS)).ok).toBe(true);
  });

  it("invalidates the previous code when a new one is sent", async () => {
    const first = await issue();
    const second = await issue(NOW + RESEND_INTERVAL_MS);
    expect(await verifyCode(db, EMAIL, first, NOW + RESEND_INTERVAL_MS + 1)).toBe("wrong");
    expect(await verifyCode(db, EMAIL, second, NOW + RESEND_INTERVAL_MS + 2)).toBe("ok");
  });

  it("says nothing about an address it has never seen", async () => {
    expect(await verifyCode(db, "stranger@example.org", "123456", NOW)).toBe("none");
  });
});

describe("rate limiting", () => {
  const limit = { max: 3, windowMs: 60_000 };

  it("allows up to the limit, then stops", async () => {
    for (let i = 0; i < limit.max; i += 1) {
      expect(await allow(db, "b", limit, NOW)).toBe(true);
    }
    expect(await allow(db, "b", limit, NOW)).toBe(false);
  });

  it("opens again in the next window", async () => {
    for (let i = 0; i < limit.max; i += 1) await allow(db, "b", limit, NOW);
    expect(await allow(db, "b", limit, NOW + limit.windowMs)).toBe(true);
  });

  it("counts buckets separately", async () => {
    for (let i = 0; i < limit.max; i += 1) await allow(db, "one", limit, NOW);
    expect(await allow(db, "one", limit, NOW)).toBe(false);
    expect(await allow(db, "two", limit, NOW)).toBe(true);
  });

  it("caps how many codes one address can be sent in an hour", async () => {
    const bucket = await emailBucket(EMAIL);
    for (let i = 0; i < EMAIL_LIMIT.max; i += 1) {
      expect(await allow(db, bucket, EMAIL_LIMIT, NOW)).toBe(true);
    }
    expect(await allow(db, bucket, EMAIL_LIMIT, NOW)).toBe(false);
  });

  it("stores no address and no IP, only a digest", async () => {
    await allow(db, await ipBucket("secret", "203.0.113.7"), { max: 2, windowMs: 1000 }, NOW);
    await allow(db, await emailBucket(EMAIL), { max: 2, windowMs: 1000 }, NOW);
    const { results } = await db
      .prepare("SELECT bucket FROM rate_limits")
      .all<{ bucket: string }>();
    const buckets = results.map((r) => r.bucket).join(" ");
    expect(buckets).not.toContain("203.0.113.7");
    expect(buckets).not.toContain(EMAIL);
    expect(buckets).not.toContain("example.org");
  });

  it("gives a different bucket under a different secret", async () => {
    // So the buckets in one deployment cannot be matched against another's.
    expect(await ipBucket("secret-a", "203.0.113.7")).not.toBe(
      await ipBucket("secret-b", "203.0.113.7"),
    );
  });
});
