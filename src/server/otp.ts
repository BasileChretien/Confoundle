import type { D1Database } from "./cf";
import { hmacHex, randomDigits, sha256Hex, timingSafeEqual } from "./crypto";

/**
 * One-time codes for email sign-in, and the abuse control around them.
 *
 * There is no password anywhere in this app, so this is the whole of the
 * non-Google half of authentication: we mail a six digit code and signing in is
 * proving you received it. That makes the endpoint that sends the mail the one
 * genuinely dangerous surface, because left open it will mail strangers on
 * anyone's behalf. Hence the three limits below, all of which have to hold at
 * once: how often one address can be mailed, how often one client can ask, and
 * how many guesses a code will take before it dies.
 */

export const CODE_LENGTH = 6;
export const CODE_TTL_MS = 10 * 60 * 1000;
export const MAX_ATTEMPTS = 5;
/** Refuse to send a second code to the same address inside this window. */
export const RESEND_INTERVAL_MS = 60 * 1000;

export const IP_LIMIT = { max: 10, windowMs: 60 * 60 * 1000 };
export const EMAIL_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 };

interface LimitRow {
  count: number;
  window_start: number;
}

/**
 * A fixed-window counter. Returns false when the caller is over its limit.
 *
 * Fixed windows let a burst straddle a boundary and briefly double the
 * nominal rate. For "how many emails may one address be sent" that is
 * irrelevant, and the alternative costs a row per event.
 */
export async function allow(
  db: D1Database,
  bucket: string,
  limit: { max: number; windowMs: number },
  now: number,
): Promise<boolean> {
  const row = await db
    .prepare("SELECT count, window_start FROM rate_limits WHERE bucket = ?")
    .bind(bucket)
    .first<LimitRow>();

  if (!row || row.window_start + limit.windowMs <= now) {
    await db
      .prepare(
        `INSERT INTO rate_limits (bucket, count, window_start) VALUES (?, 1, ?)
           ON CONFLICT(bucket) DO UPDATE SET count = 1, window_start = excluded.window_start`,
      )
      .bind(bucket, now)
      .run();
    return true;
  }
  if (row.count >= limit.max) return false;
  await db
    .prepare("UPDATE rate_limits SET count = count + 1 WHERE bucket = ?")
    .bind(bucket)
    .run();
  return true;
}

/**
 * The rate-limit bucket for a client address.
 *
 * The address itself is never stored. An HMAC under a server secret is enough
 * to count requests from one client and useless for anything else: it cannot be
 * reversed, and without the secret it cannot even be checked against a guess.
 */
export async function ipBucket(secret: string, ip: string): Promise<string> {
  return `ip:${(await hmacHex(secret, ip)).slice(0, 32)}`;
}

export async function emailBucket(email: string): Promise<string> {
  return `email:${(await sha256Hex(email)).slice(0, 32)}`;
}

interface CodeRow {
  code_hash: string;
  expires_at: number;
  attempts: number;
  sent_at: number;
}

export type IssueResult =
  | { ok: true; code: string }
  | { ok: false; reason: "too-soon" };

/** Mint a code for an address, replacing any code it already had. */
export async function issueCode(
  db: D1Database,
  email: string,
  now: number,
): Promise<IssueResult> {
  const existing = await db
    .prepare("SELECT code_hash, expires_at, attempts, sent_at FROM email_codes WHERE email = ?")
    .bind(email)
    .first<CodeRow>();
  if (existing && existing.sent_at + RESEND_INTERVAL_MS > now) {
    return { ok: false, reason: "too-soon" };
  }

  const code = randomDigits(CODE_LENGTH);
  await db
    .prepare(
      `INSERT INTO email_codes (email, code_hash, expires_at, attempts, sent_at)
         VALUES (?, ?, ?, 0, ?)
         ON CONFLICT(email) DO UPDATE SET
           code_hash = excluded.code_hash,
           expires_at = excluded.expires_at,
           attempts = 0,
           sent_at = excluded.sent_at`,
    )
    .bind(email, await sha256Hex(code), now + CODE_TTL_MS, now)
    .run();
  return { ok: true, code };
}

export type VerifyResult = "ok" | "wrong" | "expired" | "locked" | "none";

/**
 * Check a code and, on success, consume it. A code is single use: verifying
 * deletes the row, so a code cannot be replayed even inside its ten minutes.
 */
export async function verifyCode(
  db: D1Database,
  email: string,
  code: string,
  now: number,
): Promise<VerifyResult> {
  const row = await db
    .prepare("SELECT code_hash, expires_at, attempts, sent_at FROM email_codes WHERE email = ?")
    .bind(email)
    .first<CodeRow>();
  if (!row) return "none";

  const drop = () => db.prepare("DELETE FROM email_codes WHERE email = ?").bind(email).run();

  if (row.expires_at <= now) {
    await drop();
    return "expired";
  }
  if (row.attempts >= MAX_ATTEMPTS) {
    await drop();
    return "locked";
  }
  if (!timingSafeEqual(await sha256Hex(code), row.code_hash)) {
    await db
      .prepare("UPDATE email_codes SET attempts = attempts + 1 WHERE email = ?")
      .bind(email)
      .run();
    return "wrong";
  }
  await drop();
  return "ok";
}
