import type { Account } from "./accounts";
import { resolveSession } from "./accounts";
import type { D1Database, Env } from "./cf";
import { json, readSessionToken, sameOrigin } from "./http";

/**
 * The bits every account endpoint repeats: config checks, the origin guard,
 * "who is this", and turning a thrown failure into a response.
 *
 * Error bodies carry a stable machine-readable `error` code and nothing else.
 * No address, no account id, no message from a mail provider. An error body is
 * the easiest place to leak something into somebody's browser history or a
 * screenshot, and there is nothing a client could do with the detail anyway.
 */

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
  ) {
    super(code);
  }
}

export async function handle(fn: () => Promise<Response>): Promise<Response> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof HttpError) return json({ error: error.code }, error.status);
    // Deliberately not echoed to the client: an unexpected failure's message
    // can quote whatever input caused it.
    return json({ error: "server-error" }, 500);
  }
}

/**
 * The bindings the account layer cannot run without.
 *
 * Missing configuration fails closed and says which piece is missing, rather
 * than degrading into something that half works. A deployment without
 * SESSION_SECRET could still sign people in, but its rate-limit buckets would
 * be derivable by anyone who could guess the fallback, which is worse than
 * being switched off.
 */
export function requireDatabase(env: Env): D1Database {
  if (!env.DB) throw new HttpError(503, "accounts-not-configured");
  return env.DB;
}

export function requireSecret(env: Env): string {
  if (!env.SESSION_SECRET) throw new HttpError(503, "accounts-not-configured");
  return env.SESSION_SECRET;
}

/** Refuse a state-changing request that did not come from our own page. */
export function requireSameOrigin(request: Request): void {
  if (!sameOrigin(request)) throw new HttpError(403, "bad-origin");
}

export async function requireAccount(
  request: Request,
  db: D1Database,
  now: number,
): Promise<Account> {
  const account = await resolveSession(db, readSessionToken(request), now);
  if (!account) throw new HttpError(401, "not-signed-in");
  return account;
}

export async function readJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new HttpError(400, "bad-json");
  }
}

/** What the client is told about an account. Nothing it did not already send us. */
export function publicAccount(account: Account) {
  return {
    email: account.email,
    hasGoogle: account.googleSub !== null,
    createdAt: account.createdAt,
  };
}
