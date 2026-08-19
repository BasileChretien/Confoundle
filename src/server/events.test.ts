import { describe, it, expect, beforeEach, afterEach } from "vitest";

import {
  EVENT_NAMES,
  eventCounts,
  InvalidEvent,
  parseEvent,
  recordEvent,
} from "./events";
import { createTestDatabase, type TestDatabase } from "./testing/sqliteD1";
import { loadMigration } from "./testing/schema";

const TODAY = 20_680;

/**
 * This endpoint takes input from anybody on the internet and writes it to a
 * table whose entire claim is that it holds nothing identifying. So these are
 * not hygiene tests: the validation IS the privacy boundary, exactly as in
 * `answers.test.ts`.
 */
describe("what an unauthenticated caller may write", () => {
  it("accepts a named step, with or without a puzzle", () => {
    expect(parseEvent({ event: "commit", slug: "kidney-stones" }, TODAY)).toEqual({
      event: "commit",
      slug: "kidney-stones",
      day: TODAY,
    });
    // A step that belongs to no puzzle stores "" rather than null, so the
    // primary key never has to reason about it.
    expect(parseEvent({ event: "replay" }, TODAY)).toEqual({
      event: "replay",
      slug: "",
      day: TODAY,
    });
  });

  it("refuses a name nobody chose", () => {
    // An unknown name would create a dimension the migration does not describe,
    // which is how a table stops meaning what its own comment says.
    expect(() => parseEvent({ event: "scrolled_a_bit" }, TODAY)).toThrow(InvalidEvent);
    expect(() => parseEvent({ event: "" }, TODAY)).toThrow(InvalidEvent);
    expect(() => parseEvent({ event: 7 }, TODAY)).toThrow(InvalidEvent);
    expect(() => parseEvent({}, TODAY)).toThrow(InvalidEvent);
    expect(() => parseEvent(null, TODAY)).toThrow(InvalidEvent);
    expect(() => parseEvent("commit", TODAY)).toThrow(InvalidEvent);
  });

  it("refuses a slug that is not registry-shaped", () => {
    for (const slug of ["Upper", "has space", "../escape", "-lead", "x".repeat(65)]) {
      expect(() => parseEvent({ event: "commit", slug }, TODAY)).toThrow(InvalidEvent);
    }
  });

  it("takes the day from the server and never from the caller", () => {
    /*
      A client-supplied day would let anybody write into yesterday, or into
      1970, and the only value this table has is that a row's date means what
      it says.
    */
    const e = parseEvent({ event: "commit", slug: "p", day: 1 }, TODAY);
    expect(e.day).toBe(TODAY);
  });

  it("stores no field the migration does not have a column for", () => {
    // The client's prop type already narrows this, but the client is not the
    // only thing that can POST here.
    const e = parseEvent(
      { event: "commit", slug: "p", choiceId: "a", sessionId: "abc", ua: "..." },
      TODAY,
    );
    expect(Object.keys(e).sort()).toEqual(["day", "event", "slug"]);
  });
});

describe("counting", () => {
  let db: TestDatabase;

  beforeEach(() => {
    db = createTestDatabase(loadMigration());
  });
  afterEach(() => db.close());

  const send = (event: string, slug = "p", day = TODAY) =>
    recordEvent(db, { event: event as (typeof EVENT_NAMES)[number], slug, day });

  it("adds one per event rather than storing a row per visit", async () => {
    await send("puzzle_view");
    await send("puzzle_view");
    await send("puzzle_view");
    const rows = await eventCounts(db, TODAY, TODAY);
    expect(rows).toEqual([
      { event: "puzzle_view", slug: "p", day: TODAY, count: 3 },
    ]);
  });

  it("keeps each step, puzzle and day apart", async () => {
    await send("puzzle_view", "a");
    await send("commit", "a");
    await send("puzzle_view", "b");
    await send("puzzle_view", "a", TODAY + 1);
    const rows = await eventCounts(db, TODAY, TODAY + 1);
    expect(rows).toHaveLength(4);
    expect(rows.every((r) => r.count === 1)).toBe(true);
  });

  it("shows a step losing people, which is the whole point", async () => {
    for (let i = 0; i < 10; i++) await send("puzzle_view");
    for (let i = 0; i < 6; i++) await send("commit");
    for (let i = 0; i < 2; i++) await send("reveal_view");
    const rows = await eventCounts(db, TODAY, TODAY);
    const at = (e: string) => rows.find((r) => r.event === e)?.count;
    expect(at("puzzle_view")).toBe(10);
    expect(at("commit")).toBe(6);
    expect(at("reveal_view")).toBe(2);
  });

  it("reads only the window asked for", async () => {
    await send("commit", "p", TODAY - 5);
    await send("commit", "p", TODAY);
    expect(await eventCounts(db, TODAY, TODAY)).toHaveLength(1);
    expect(await eventCounts(db, TODAY - 5, TODAY)).toHaveLength(2);
  });

  it("has no column that could hold an identifier", async () => {
    /*
      The migration argues that this table cannot describe anybody because of
      its SHAPE rather than because of how it is used. That argument is only
      worth anything if the shape is what the argument says, so this asserts it
      against the real migration file rather than against a copy.
    */
    await send("commit");
    const rows = await eventCounts(db, TODAY, TODAY);
    expect(Object.keys(rows[0]!).sort()).toEqual(["count", "day", "event", "slug"]);
  });
});

describe("the list of names", () => {
  it("is the one the client imports, and has no duplicates", () => {
    expect(new Set(EVENT_NAMES).size).toBe(EVENT_NAMES.length);
    expect(EVENT_NAMES).toContain("reveal_view");
  });

  it("accepts every name it publishes", () => {
    // A name in the list that the parser rejects would be a step the app fires
    // and the server silently drops, which looks exactly like nobody reaching it.
    for (const event of EVENT_NAMES) {
      expect(() => parseEvent({ event }, TODAY)).not.toThrow();
    }
  });
});
