import type { D1Database } from "./cf";
import { randomToken, sha256Hex } from "./crypto";
import { SESSION_TTL_MS } from "./http";

/**
 * Accounts, sessions and the linking rule.
 *
 * The shape of the problem: the same person can arrive two ways, through Google
 * or through a code sent to their email, and must land in the same account
 * either way. Both routes prove exactly one thing, control of an email address,
 * so an address is the identity and either proof of it is as good as the other.
 * That is what makes linking safe rather than a way to steal an account.
 *
 * Google's `sub` is still the key we match a returning Google user on, because
 * it survives the user changing their Google email. The address is the bridge
 * between the two routes; the sub is the anchor within one of them.
 */

export interface Account {
  id: string;
  email: string;
  googleSub: string | null;
  createdAt: number;
  updatedAt: number;
}

interface AccountRow {
  id: string;
  email: string;
  google_sub: string | null;
  created_at: number;
  updated_at: number;
}

function toAccount(row: AccountRow): Account {
  return {
    id: row.id,
    email: row.email,
    googleSub: row.google_sub,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Raised when linking would join two identities we cannot prove are one person. */
export class LinkConflict extends Error {}

const SELECT = "SELECT id, email, google_sub, created_at, updated_at FROM accounts";

export async function findByEmail(
  db: D1Database,
  email: string,
): Promise<Account | null> {
  const row = await db
    .prepare(`${SELECT} WHERE email = ?`)
    .bind(email)
    .first<AccountRow>();
  return row ? toAccount(row) : null;
}

export async function findByGoogleSub(
  db: D1Database,
  sub: string,
): Promise<Account | null> {
  const row = await db
    .prepare(`${SELECT} WHERE google_sub = ?`)
    .bind(sub)
    .first<AccountRow>();
  return row ? toAccount(row) : null;
}

async function insertAccount(
  db: D1Database,
  email: string,
  googleSub: string | null,
  now: number,
): Promise<Account> {
  const id = randomToken(16);
  await db
    .prepare(
      "INSERT INTO accounts (id, email, google_sub, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    )
    .bind(id, email, googleSub, now, now)
    .run();
  return { id, email, googleSub, createdAt: now, updatedAt: now };
}

export interface SignInResult {
  account: Account;
  /** True when this sign-in created the account rather than finding it. */
  created: boolean;
  /** True when this sign-in attached Google to an account that had no Google. */
  linked: boolean;
}

/**
 * Sign in (or up) with a Google identity we have already verified.
 *
 * Three cases, in order:
 *  1. We know this `sub`. Sign in. If Google now reports a different address,
 *     take it, because Google is authoritative for its own accounts.
 *  2. We do not know the `sub` but we know the address, and no Google account
 *     is attached to it yet. This is the linking case: the person signed up by
 *     email and is now using the Google button. Attach the sub.
 *  3. Neither is known. Create.
 *
 * The case deliberately left as an error is an address already attached to a
 * *different* `sub`. That means a Google address moved between Google accounts,
 * and merging on it would let whoever holds the address now take over the
 * history of whoever held it before. Refuse and say so.
 */
export async function signInWithGoogle(
  db: D1Database,
  identity: { sub: string; email: string },
  now: number,
): Promise<SignInResult> {
  const bySub = await findByGoogleSub(db, identity.sub);
  if (bySub) {
    if (bySub.email !== identity.email) {
      await db
        .prepare("UPDATE accounts SET email = ?, updated_at = ? WHERE id = ?")
        .bind(identity.email, now, bySub.id)
        .run();
      return {
        account: { ...bySub, email: identity.email, updatedAt: now },
        created: false,
        linked: false,
      };
    }
    return { account: bySub, created: false, linked: false };
  }

  const byEmail = await findByEmail(db, identity.email);
  if (byEmail) {
    if (byEmail.googleSub && byEmail.googleSub !== identity.sub) {
      throw new LinkConflict(
        "that address is already attached to a different Google account",
      );
    }
    await db
      .prepare("UPDATE accounts SET google_sub = ?, updated_at = ? WHERE id = ?")
      .bind(identity.sub, now, byEmail.id)
      .run();
    return {
      account: { ...byEmail, googleSub: identity.sub, updatedAt: now },
      created: false,
      linked: true,
    };
  }

  try {
    return {
      account: await insertAccount(db, identity.email, identity.sub, now),
      created: true,
      linked: false,
    };
  } catch {
    // Two sign-ins raced and the unique index rejected this one. The other
    // request has by now created exactly the account we were about to, so read
    // it rather than reporting a failure to a user who did nothing wrong.
    const raced =
      (await findByGoogleSub(db, identity.sub)) ??
      (await findByEmail(db, identity.email));
    if (!raced) throw new Error("could not create account");
    return { account: raced, created: false, linked: false };
  }
}

/**
 * Sign in (or up) with an email address whose one-time code has just checked
 * out. If a Google-created account already holds this address, this is the same
 * person arriving by the other door, so they simply sign in.
 */
export async function signInWithEmail(
  db: D1Database,
  email: string,
  now: number,
): Promise<SignInResult> {
  const existing = await findByEmail(db, email);
  if (existing) return { account: existing, created: false, linked: false };
  try {
    return {
      account: await insertAccount(db, email, null, now),
      created: true,
      linked: false,
    };
  } catch {
    const raced = await findByEmail(db, email);
    if (!raced) throw new Error("could not create account");
    return { account: raced, created: false, linked: false };
  }
}

/* -------------------------------------------------------------------------
 * Sessions
 * ---------------------------------------------------------------------- */

export interface IssuedSession {
  token: string;
  expiresAt: number;
}

export async function createSession(
  db: D1Database,
  accountId: string,
  now: number,
): Promise<IssuedSession> {
  const token = randomToken();
  const expiresAt = now + SESSION_TTL_MS;
  await db
    .prepare(
      "INSERT INTO sessions (token_hash, account_id, created_at, expires_at) VALUES (?, ?, ?, ?)",
    )
    .bind(await sha256Hex(token), accountId, now, expiresAt)
    .run();
  return { token, expiresAt };
}

/** The account a session cookie belongs to, or null for absent/expired/unknown. */
export async function resolveSession(
  db: D1Database,
  token: string | null,
  now: number,
): Promise<Account | null> {
  if (!token) return null;
  const row = await db
    .prepare(
      `SELECT a.id, a.email, a.google_sub, a.created_at, a.updated_at
         FROM sessions s JOIN accounts a ON a.id = s.account_id
        WHERE s.token_hash = ? AND s.expires_at > ?`,
    )
    .bind(await sha256Hex(token), now)
    .first<AccountRow>();
  return row ? toAccount(row) : null;
}

export async function revokeSession(
  db: D1Database,
  token: string | null,
): Promise<void> {
  if (!token) return;
  await db
    .prepare("DELETE FROM sessions WHERE token_hash = ?")
    .bind(await sha256Hex(token))
    .run();
}

/* -------------------------------------------------------------------------
 * Erasure
 * ---------------------------------------------------------------------- */

/**
 * Every table that holds anything keyed to an account. Erasure walks this list.
 *
 * accounts is deliberately last: the others carry a foreign key into it, so
 * deleting it first would rely on cascade behaviour this function exists not to
 * depend on.
 */
export const PERSONAL_TABLES = [
  "reminder_prefs",
  "progress",
  "sessions",
  "accounts",
] as const;
export type PersonalTable = (typeof PERSONAL_TABLES)[number];

/**
 * Delete an account and everything attached to it, and report what went.
 *
 * Written as an explicit delete per table rather than leaning on the foreign
 * keys' ON DELETE CASCADE, for two reasons. It does not depend on whether
 * foreign key enforcement happens to be on for this connection, and it returns
 * a count per table, so an erasure request can be answered with what actually
 * happened rather than with a shrug. Adding a table that holds personal data
 * means adding it to PERSONAL_TABLES, and the test in accounts.test.ts checks
 * nothing survives.
 */
export async function deleteAccount(
  db: D1Database,
  accountId: string,
): Promise<Record<PersonalTable, number>> {
  const deleted = {} as Record<PersonalTable, number>;
  for (const table of PERSONAL_TABLES) {
    const column = table === "accounts" ? "id" : "account_id";
    const result = await db
      .prepare(`DELETE FROM ${table} WHERE ${column} = ?`)
      .bind(accountId)
      .run();
    deleted[table] = result.meta?.changes ?? 0;
  }
  return deleted;
}

/**
 * Drop rows that have simply timed out: dead sessions, spent codes, stale
 * rate-limit windows. Called opportunistically from the code-sending endpoint,
 * which is rare enough that the sweep costs nothing and frequent enough that
 * nothing accumulates. Nothing here holds data we have a reason to keep.
 */
export async function sweepExpired(db: D1Database, now: number): Promise<void> {
  await db.batch([
    db.prepare("DELETE FROM sessions WHERE expires_at <= ?").bind(now),
    db.prepare("DELETE FROM email_codes WHERE expires_at <= ?").bind(now),
    db
      .prepare("DELETE FROM rate_limits WHERE window_start <= ?")
      .bind(now - 24 * 60 * 60 * 1000),
  ]);
}
