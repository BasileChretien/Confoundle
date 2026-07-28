import type { D1Database } from "./cf";
import { hmacHex, timingSafeEqual } from "./crypto";
import type { Mailer } from "./mail";
import { reminderEmail } from "./reminderEmail";

/**
 * Opt-in email reminders for overdue reviews.
 *
 * The whole feature is one sentence: if you asked for it, and a review has been
 * sitting overdue, you get at most one plain-text email a day saying so. Every
 * constant below exists to keep that sentence true in the awkward cases.
 *
 * Why this is defensible in a project that promises almost no email: it is
 * consent-first (no row until somebody ticks the box), it is the only thing an
 * account has ever been for (making the schedule follow you), and it is
 * unsubscribable from inside the message without signing in. It is not
 * marketing and it never becomes marketing: there is exactly one template and
 * it is in this repo.
 */

/**
 * How overdue a review has to be before it counts as late.
 *
 * Not zero. A review becomes due at a moment, and mailing somebody the instant
 * that moment passes turns a study aid into a nag, which is how people learn to
 * filter you. Twelve hours means "you did not get to it today", which is the
 * thing actually worth saying.
 */
export const LATE_AFTER_MS = 12 * 60 * 60 * 1000;

/**
 * Do not mail somebody who has used the app very recently.
 *
 * They know. The reminder exists for the person who has drifted away, not for
 * the person who reviewed four skills this morning and left one for tonight.
 * Measured on progress.updated_at, which is written by the sync.
 */
export const ACTIVE_WITHIN_MS = 20 * 60 * 60 * 1000;

/**
 * The "at most one per day" guarantee, in milliseconds.
 *
 * Twenty hours rather than twenty-four, deliberately. A daily cron does not
 * fire at the same instant every day, and at exactly 24h a run that landed
 * three minutes late would skip a day for everybody, every time it drifted. The
 * promise on the page is "at most one a day"; twenty hours keeps that promise
 * and still tolerates jitter.
 */
export const MIN_INTERVAL_MS = 20 * 60 * 60 * 1000;

/**
 * Most accounts touched in one run.
 *
 * A ceiling rather than a target. Cloudflare's scheduled invocations have a CPU
 * budget, and mail providers rate-limit; both fail in ways that are much easier
 * to reason about if the batch is bounded. `sendDueReminders` reports when it
 * hit the cap, and the caller logs it, because a silent truncation would read
 * as "everybody was mailed" when it was not.
 */
export const DEFAULT_BATCH = 200;

export interface ReminderPrefs {
  optedIn: boolean;
  locale: string;
  lastSentAt: number | null;
}

interface PrefsRow {
  opted_in: number;
  locale: string;
  last_sent_at: number | null;
}

/**
 * What the account panel shows. Never null: somebody who has never opened the
 * setting is opted out, which is the same answer as having switched it off.
 */
export async function getReminderPrefs(
  db: D1Database,
  accountId: string,
): Promise<ReminderPrefs> {
  const row = await db
    .prepare(
      "SELECT opted_in, locale, last_sent_at FROM reminder_prefs WHERE account_id = ?",
    )
    .bind(accountId)
    .first<PrefsRow>();
  if (!row) return { optedIn: false, locale: "en", lastSentAt: null };
  return {
    optedIn: row.opted_in === 1,
    locale: row.locale,
    lastSentAt: row.last_sent_at,
  };
}

/**
 * Record the choice.
 *
 * Switching off keeps the row rather than deleting it. The row is the record
 * that consent was given and then withdrawn, and last_sent_at survives with it,
 * so somebody who opts out and back in on the same day does not get a second
 * email that day.
 */
export async function setReminderOptIn(
  db: D1Database,
  accountId: string,
  optedIn: boolean,
  locale: string,
  now: number,
): Promise<ReminderPrefs> {
  await db
    .prepare(
      `INSERT INTO reminder_prefs (account_id, opted_in, locale, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(account_id) DO UPDATE SET
         opted_in = excluded.opted_in,
         locale = excluded.locale,
         updated_at = excluded.updated_at`,
    )
    .bind(accountId, optedIn ? 1 : 0, locale, now, now)
    .run();
  return getReminderPrefs(db, accountId);
}

/* -------------------------------------------------------------------------
 * Unsubscribing without signing in
 * ---------------------------------------------------------------------- */

/**
 * The token in the unsubscribe link.
 *
 * Derived, not stored. HMAC of the account id under the same server secret the
 * rate limiter uses, which means: nothing extra in the database to leak, the
 * same link works in every email we ever send, and rotating SESSION_SECRET
 * invalidates every outstanding link at once.
 *
 * It authorises exactly one thing, switching these emails off. It is not a
 * session and cannot be turned into one.
 */
export function unsubscribeToken(
  secret: string,
  accountId: string,
): Promise<string> {
  return hmacHex(secret, `unsubscribe:${accountId}`);
}

export async function verifyUnsubscribeToken(
  secret: string,
  accountId: string,
  token: string,
): Promise<boolean> {
  return timingSafeEqual(await unsubscribeToken(secret, accountId), token);
}

/**
 * `l` is the locale, so the page the link opens speaks the same language the
 * email did. It is a display hint and nothing authorises on it, so a tampered
 * or missing value can only ever change which translation is shown.
 */
export function unsubscribeUrl(
  origin: string,
  accountId: string,
  token: string,
  locale = "en",
): string {
  const params = new URLSearchParams({ a: accountId, t: token, l: locale });
  return `${origin}/api/reminders/unsubscribe?${params.toString()}`;
}

/**
 * Switch the emails off for whoever holds a valid link.
 *
 * Returns false for a bad token so the caller can answer identically either
 * way: telling a stranger whether an account id exists would make this endpoint
 * a membership oracle for any address they wanted to test.
 */
export async function unsubscribeWithToken(
  db: D1Database,
  secret: string,
  accountId: string,
  token: string,
  now: number,
): Promise<boolean> {
  if (!(await verifyUnsubscribeToken(secret, accountId, token))) return false;
  await db
    .prepare(
      "UPDATE reminder_prefs SET opted_in = 0, updated_at = ? WHERE account_id = ?",
    )
    .bind(now, accountId)
    .run();
  return true;
}

/* -------------------------------------------------------------------------
 * Finding and sending
 * ---------------------------------------------------------------------- */

export interface DueReminder {
  accountId: string;
  email: string;
  locale: string;
  /** How many skills are overdue by more than LATE_AFTER_MS. */
  dueCount: number;
}

interface DueRow {
  account_id: string;
  email: string;
  locale: string;
  due_count: number;
}

/**
 * Everyone who should get an email right now.
 *
 * One query rather than a loop over accounts, because the interesting failure
 * here is not slowness, it is a partial pass that mails half the list twice.
 *
 * The three filters, in the order they matter:
 *   opted_in = 1                     consent
 *   last_sent_at older than the gap  the once-a-day promise
 *   due_at older than the grace      actually late, not merely due
 * and then, after grouping, HAVING on the most recent sync: somebody who used
 * the app in the last day does not need telling.
 */
export async function findDueReminders(
  db: D1Database,
  now: number,
  limit = DEFAULT_BATCH,
): Promise<DueReminder[]> {
  const { results } = await db
    .prepare(
      `SELECT r.account_id AS account_id,
              a.email      AS email,
              r.locale     AS locale,
              COUNT(p.skill) AS due_count
         FROM reminder_prefs r
         JOIN accounts a ON a.id = r.account_id
         JOIN progress p ON p.account_id = r.account_id AND p.due_at <= ?
        WHERE r.opted_in = 1
          AND (r.last_sent_at IS NULL OR r.last_sent_at <= ?)
        GROUP BY r.account_id, a.email, r.locale
       HAVING MAX(p.updated_at) <= ?
        ORDER BY r.last_sent_at IS NOT NULL, r.last_sent_at
        LIMIT ?`,
    )
    .bind(
      now - LATE_AFTER_MS,
      now - MIN_INTERVAL_MS,
      now - ACTIVE_WITHIN_MS,
      limit,
    )
    .all<DueRow>();
  return results.map((row) => ({
    accountId: row.account_id,
    email: row.email,
    locale: row.locale,
    dueCount: row.due_count,
  }));
}

export interface SendReport {
  considered: number;
  sent: number;
  failed: number;
  /** True when the batch cap was reached, so more were waiting. */
  truncated: boolean;
}

export interface SendOptions {
  mailer: Mailer;
  /** Server secret, for deriving unsubscribe tokens. */
  secret: string;
  /** Absolute origin, no trailing slash. */
  origin: string;
  now: number;
  limit?: number;
}

/**
 * Send this run's reminders.
 *
 * last_sent_at is written immediately after each successful send, one account
 * at a time. Batching those writes to the end would be one round trip instead
 * of N, and would also mean that a crash or a CPU-limit kill halfway through
 * left everybody already mailed looking unmailed, so the next run would mail
 * them again. One extra write per email is a cheap price for a promise that
 * holds under failure.
 *
 * A send that throws does NOT stamp the row, so that person is retried on the
 * next run. That is the right trade for a transient provider error; for a
 * permanently bad address it means one attempt a day, which the failure count
 * makes visible in the log rather than hiding.
 */
export async function sendDueReminders(
  db: D1Database,
  options: SendOptions,
): Promise<SendReport> {
  const limit = options.limit ?? DEFAULT_BATCH;
  const due = await findDueReminders(db, options.now, limit);
  let sent = 0;
  let failed = 0;

  for (const person of due) {
    try {
      const token = await unsubscribeToken(options.secret, person.accountId);
      const { subject, text } = reminderEmail({
        locale: person.locale,
        count: person.dueCount,
        origin: options.origin,
        unsubscribeUrl: unsubscribeUrl(
          options.origin,
          person.accountId,
          token,
          person.locale,
        ),
      });
      await options.mailer.send(person.email, subject, text, {
        // RFC 8058. Without these two headers a recurring message is bulk mail
        // with no machine-readable way out, which is both worse for the reader
        // and the fastest route into a spam folder, taking the sign-in codes
        // from the same domain down with it.
        "List-Unsubscribe": `<${unsubscribeUrl(options.origin, person.accountId, token, person.locale)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      });
      await db
        .prepare(
          "UPDATE reminder_prefs SET last_sent_at = ? WHERE account_id = ?",
        )
        .bind(options.now, person.accountId)
        .run();
      sent += 1;
    } catch {
      // Swallowed on purpose: one undeliverable address must not stop the run
      // for everybody queued behind it. Counted rather than logged, because the
      // provider's error message can quote the address back and a scheduled
      // Worker's log is the last place that should hold one.
      failed += 1;
    }
  }

  return {
    considered: due.length,
    sent,
    failed,
    truncated: due.length >= limit,
  };
}
