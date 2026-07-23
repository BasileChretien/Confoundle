/**
 * The slice of the Cloudflare runtime this server code touches, declared by
 * hand.
 *
 * The alternative is a dependency on @cloudflare/workers-types, which would put
 * a second, competing set of DOM-ish globals into a project whose tsconfig
 * already has `lib: DOM` for the browser. functions/api/score.ts has declared
 * its own KVNamespace since the day it was written, for the same reason; this
 * is that habit, gathered into one place now that there is more than one
 * function.
 *
 * Only the members actually used are declared. Anything else would be a claim
 * about an API we never call.
 */

export interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: { changes?: number };
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<D1Result[]>;
}

export interface Env {
  /** D1 binding holding accounts, sessions and SRS progress. */
  DB: D1Database;
  /** Google OAuth client id; the audience an ID token must be issued for. */
  GOOGLE_CLIENT_ID?: string;
  /** Secret used to HMAC client IPs into rate-limit buckets. Required. */
  SESSION_SECRET?: string;
  /** Resend API key. Absent means email sign-in is switched off, not broken. */
  RESEND_API_KEY?: string;
  /** From address for the sign-in code, e.g. "Confoundle <hello@example.org>". */
  MAIL_FROM?: string;
}

export interface FunctionContext {
  request: Request;
  env: Env;
  /** Path segments captured by a `[slug]` route file. */
  params?: Record<string, string | string[]>;
}
