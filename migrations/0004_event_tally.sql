-- Anonymous funnel tally, D1 (SQLite).
--
-- Applied with:
--   npx wrangler d1 migrations apply confoundle-accounts --remote
--
-- WHAT THIS IS FOR. The app has named the steps of a puzzle since Phase 0 and
-- sent them nowhere: `src/app/analytics.ts` was a stub with eight fixed event
-- names and every call site already wired to it. So nobody could answer the one
-- question that decides what to build next, which is where people stop. The
-- reveal became something you drag rather than something you wait for, and
-- there was no way to tell whether anybody drags it.
--
-- WHY IT IS ITS OWN TABLE AND NOT A THIRD PARTY. Sending the funnel to a
-- hosted analytics service would put every visitor's traffic in front of a new
-- company, add a processor to disclose, and hand a script tag to a page that
-- currently loads none. This is the same shape as `answer_tally` one file over,
-- so it costs a table and a Function instead.
--
-- WHY IT IS NOT PERSONAL DATA, as a property of the schema rather than a
-- promise about behaviour, in the same terms as 0003:
--
--  * No account_id, and deliberately no foreign key to accounts.
--  * No row per visit. An event increments a counter shared with everybody who
--    reached the same step of the same puzzle on the same day, so one player's
--    contribution is indistinguishable from another's and nothing links two
--    events by the same person. There is no session id, and adding one would
--    turn this table into exactly the thing it was built to avoid.
--  * Day granularity and no finer. No clock time, which is the field that would
--    make correlating a write against a request log easy.
--  * No ordering. The table cannot say that one person did commit then
--    reveal_view; it can say how many commits and how many reveal_views
--    happened. That is weaker than a funnel with sessions, on purpose, and it
--    is enough to see where a step loses people.
--
--  * CONSEQUENTLY this table is NOT in PERSONAL_TABLES in
--    src/server/accounts.ts and must not be added to it. Erasure has nothing to
--    erase: there is no way to find "this person's" rows because the concept
--    does not exist here. public/privacy.html says exactly this and the two
--    must stay in step.
--
-- WHY D1 AND NOT KV, same as 0003: the increment is an atomic UPSERT, because a
-- lost write here is a silently wrong denominator, and this is a deck about not
-- believing a number more than its collection method supports.

CREATE TABLE IF NOT EXISTS event_tally (
  -- One of the eight names fixed in src/server/events.ts. Validated against
  -- that list before any write, so an unknown name cannot create a dimension
  -- nobody chose.
  event TEXT    NOT NULL,
  -- The puzzle the step happened in, or "" for a step that has none. Not a
  -- foreign key, for the same reason as answer_tally: puzzles live in the
  -- client bundle, and a count for a retired slug should survive it.
  slug  TEXT    NOT NULL,
  -- Days since the epoch, UTC. Integer so this and the answer tally agree
  -- without parsing.
  day   INTEGER NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (event, slug, day)
);

-- The read is always "this event, over time" or "this day, every event", and
-- the primary key's leading column serves the first. This serves the second.
CREATE INDEX IF NOT EXISTS event_tally_by_day ON event_tally (day);
