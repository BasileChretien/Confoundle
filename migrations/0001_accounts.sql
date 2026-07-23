-- Confoundle accounts, D1 (SQLite).
--
-- Applied with:
--   npx wrangler d1 migrations apply confoundle-accounts --remote
--
-- Design notes that matter for data protection, not just for correctness:
--
--  * There is no password column and never will be. Sign-in is proof of control
--    over an email address, either through Google or through a one-time code we
--    send. Nothing here is worth stealing to attack another site.
--  * Every table hangs off accounts.id, so erasure is a fixed, enumerable list
--    of deletes rather than a hunt for keys. See deleteAccount in
--    src/server/accounts.ts, which deletes from each table explicitly and
--    returns the row counts, so an erasure can be shown to have happened.
--  * Session tokens are stored as SHA-256 digests. A dump of this database does
--    not let anyone sign in as a user.

CREATE TABLE IF NOT EXISTS accounts (
  -- Opaque and random. Deliberately not derived from the email, so the primary
  -- key carries no personal data and can appear in logs.
  id           TEXT    PRIMARY KEY,
  -- Normalised: trimmed and lowercased. The only identifier we ask a human for.
  email        TEXT    NOT NULL,
  -- Google's opaque subject id. NULL until (and unless) Google is linked.
  -- Stable across email changes, which is why it, not the email, is the key we
  -- match a returning Google user on.
  google_sub   TEXT,
  created_at   INTEGER NOT NULL,
  updated_at   INTEGER NOT NULL
);

-- Uniqueness is enforced here rather than checked in application code: two
-- sign-ups racing for the same address must not both win. SQLite treats NULLs
-- as distinct, so many accounts may have no google_sub.
CREATE UNIQUE INDEX IF NOT EXISTS accounts_email      ON accounts(email);
CREATE UNIQUE INDEX IF NOT EXISTS accounts_google_sub ON accounts(google_sub);

CREATE TABLE IF NOT EXISTS sessions (
  -- SHA-256 of the bearer token. The token itself is only ever in the cookie.
  token_hash TEXT    PRIMARY KEY,
  account_id TEXT    NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_account ON sessions(account_id);
CREATE INDEX IF NOT EXISTS sessions_expiry  ON sessions(expires_at);

-- One row per skill per account: the same shape as SkillProgress in
-- src/srs/schedule.ts, flattened. updated_at is what the last-write-wins merge
-- compares, so it is authored by the client and carried through unchanged.
CREATE TABLE IF NOT EXISTS progress (
  account_id    TEXT    NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  skill         TEXT    NOT NULL,
  stage         INTEGER NOT NULL,
  due_at        INTEGER NOT NULL,
  seen_item_ids TEXT    NOT NULL,  -- JSON array of item ids
  misconceived  INTEGER NOT NULL,  -- 0/1
  correct       INTEGER NOT NULL,
  wrong         INTEGER NOT NULL,
  updated_at    INTEGER NOT NULL,
  PRIMARY KEY (account_id, skill)
);

-- Transient. Holds an as-yet-unverified email for at most a few minutes, which
-- is the only place an address exists before it belongs to an account. Rows are
-- deleted on successful verification and swept when expired.
CREATE TABLE IF NOT EXISTS email_codes (
  email      TEXT    PRIMARY KEY,
  code_hash  TEXT    NOT NULL,     -- SHA-256; the code itself only ever goes in the email
  expires_at INTEGER NOT NULL,
  attempts   INTEGER NOT NULL DEFAULT 0,
  sent_at    INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS email_codes_expiry ON email_codes(expires_at);

-- Abuse control for the code sender, which would otherwise mail anyone on
-- request. Buckets are keyed by an HMAC of the client IP under a server secret,
-- never the address itself, and rows are swept once their window has passed.
CREATE TABLE IF NOT EXISTS rate_limits (
  bucket       TEXT    PRIMARY KEY,
  count        INTEGER NOT NULL,
  window_start INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS rate_limits_window ON rate_limits(window_start);
