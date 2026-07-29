-- Opt-in email reminders for overdue reviews, D1 (SQLite).
--
-- Applied with:
--   npx wrangler d1 migrations apply confoundle-accounts --remote
--
-- Design notes that matter for data protection, not just for correctness:
--
--  * A row exists only for someone who opened the setting. No row means no
--    consent was ever given, which is a different state from consent withdrawn
--    (opted_in = 0), and the difference is worth keeping: it is the evidence
--    that we never mailed someone who did not ask.
--  * There is no unsubscribe token column. The token in each email is
--    HMAC(SESSION_SECRET, "unsubscribe:" + account_id), recomputed to verify.
--    Storing nothing means there is nothing extra to leak, and rotating
--    SESSION_SECRET invalidates every outstanding link at once.
--  * last_sent_at is the whole of the "at most one per day" guarantee. It is
--    written immediately after each successful send, per account, never batched
--    at the end of a run, so a crash mid-run cannot produce a second email.
--  * This table holds an email-adjacent preference tied to a person, so it is
--    personal data and MUST be in PERSONAL_TABLES in src/server/accounts.ts.
--    accounts.test.ts fails if it is not.

CREATE TABLE IF NOT EXISTS reminder_prefs (
  account_id   TEXT    PRIMARY KEY REFERENCES accounts(id) ON DELETE CASCADE,
  -- 0/1. Stored rather than inferred from the row's existence, so withdrawing
  -- consent is recorded as an act instead of as an absence.
  opted_in     INTEGER NOT NULL DEFAULT 0,
  -- The language the reminder is written in, captured when the box is ticked.
  -- Without it every reminder would arrive in English to an app that speaks ten
  -- languages. Nothing else reads it.
  locale       TEXT    NOT NULL DEFAULT 'en',
  -- NULL until the first reminder goes out.
  last_sent_at INTEGER,
  created_at   INTEGER NOT NULL,
  updated_at   INTEGER NOT NULL
);

-- The sender's query filters on opted_in and orders by last_sent_at. Small
-- table, but this is the one query that runs on a timer with nobody watching.
CREATE INDEX IF NOT EXISTS reminder_prefs_sendable
  ON reminder_prefs(opted_in, last_sent_at);
