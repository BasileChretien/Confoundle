-- Anonymous answer tally, D1 (SQLite).
--
-- Applied with:
--   npx wrangler d1 migrations apply confoundle-accounts --remote
--
-- WHAT THIS IS FOR. Every puzzle wants to tell the player what most people did,
-- and that number has to come from somewhere. This table is the somewhere.
--
-- WHY IT IS NOT PERSONAL DATA, stated as a property of the schema rather than
-- as a promise about behaviour:
--
--  * There is no account_id column, and there is deliberately no foreign key
--    to accounts. A row cannot be attributed to anybody because nothing in it
--    identifies anybody.
--  * There is no row per answer. An answer increments a counter shared with
--    every other person who picked the same option at the same confidence on
--    the same day, so one submission is indistinguishable from another and
--    nothing links two answers by the same player.
--  * Day granularity and no finer. There is no clock time, which is the field
--    that would make correlating a tally write against a request log easy.
--
--  * CONSEQUENTLY this table is NOT in PERSONAL_TABLES in
--    src/server/accounts.ts, and must not be added to it. Erasure has nothing
--    to erase here: there is no way to find "this person's" rows, because the
--    concept does not exist in this schema. public/privacy.html says exactly
--    this in the "How answers are counted" section, and the two must stay in
--    step.
--
-- WHY D1 AND NOT KV. functions/api/score.ts keeps its histogram in KV and says
-- in its own header that concurrent increments can be lost. For an approximate
-- percentile that is harmless. Here the number is shown as a claim about what
-- people did, on a site about not overstating evidence, so the increment is an
-- atomic UPSERT instead.

CREATE TABLE IF NOT EXISTS answer_tally (
  -- The puzzle. Not a foreign key: puzzles live in the client bundle, not in
  -- the database, and a tally for a retired slug should survive its retirement.
  slug        TEXT    NOT NULL,
  -- Which option was picked. Opaque to the server, which never needs to know
  -- whether it was the correct one.
  choice_id   TEXT    NOT NULL,
  -- "hunch" | "sure" | "certain". Kept because the interesting claim is about
  -- calibration ("of those who were certain, most were wrong"), not popularity.
  confidence  TEXT    NOT NULL,
  -- Days since the epoch, UTC. Integer rather than a date string so the daily
  -- puzzle's own day number and this agree without parsing.
  day         INTEGER NOT NULL,
  count       INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (slug, choice_id, confidence, day)
);

-- The read path is always "one puzzle, one day", so the primary key's leading
-- columns already serve it. This index serves the all-time variant without
-- forcing a scan once the table is large.
CREATE INDEX IF NOT EXISTS answer_tally_by_slug ON answer_tally (slug);
