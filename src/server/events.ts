import type { D1Database } from "./cf";

/**
 * The funnel counter: which step of a puzzle was reached, how many times.
 *
 * WHY THE NAMES LIVE HERE rather than in `src/app/analytics.ts`, where they
 * were. The server has to refuse a name it does not know, or a caller could
 * invent dimensions nobody chose and this table would stop meaning what its
 * migration says. Two copies of the list would drift, and the copy that
 * mattered would be whichever one was wrong. So the list is here, the client
 * imports it, and there is exactly one.
 *
 * WHAT IT CANNOT TELL YOU, stated because a funnel usually can. There is no
 * session id, so this cannot say that one person went commit then reveal_view.
 * It counts events, not journeys. That is a real loss and it is the price of a
 * table that cannot describe anybody: a session id is precisely the field that
 * would make these rows a record of a person's evening. Comparing counts at
 * each step still shows where a step loses people, which is the question worth
 * a table.
 */
export const EVENT_NAMES = [
  "puzzle_view",
  "commit",
  "reveal_view",
  "lesson_view",
  "share_open",
  "share_caption_select",
  "share_export",
  "replay",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

export class InvalidEvent extends Error {}

/** Same shape the puzzle registry enforces, so an unknown key cannot be written. */
const SLUG = /^[a-z0-9][a-z0-9-]{0,63}$/;

export interface EventSubmission {
  event: EventName;
  /** "" for a step that belongs to no puzzle. */
  slug: string;
  day: number;
}

function isEventName(v: unknown): v is EventName {
  return typeof v === "string" && (EVENT_NAMES as readonly string[]).includes(v);
}

/**
 * Read a posted body, or throw.
 *
 * THE DAY COMES FROM THE SERVER, never from the body. A client-supplied day
 * would let anybody write into yesterday, or into 1970, and the whole value of
 * this table is that a row's date means what it says. `answer_tally` takes its
 * day the same way for the same reason.
 */
export function parseEvent(body: unknown, day: number): EventSubmission {
  if (typeof body !== "object" || body === null) throw new InvalidEvent("body");
  const { event, slug } = body as { event?: unknown; slug?: unknown };
  if (!isEventName(event)) throw new InvalidEvent("event");
  if (slug !== undefined && (typeof slug !== "string" || !SLUG.test(slug))) {
    throw new InvalidEvent("slug");
  }
  return { event, slug: typeof slug === "string" ? slug : "", day };
}

/** Add one, atomically, so a busy minute cannot lose a count. */
export async function recordEvent(
  db: D1Database,
  e: EventSubmission,
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO event_tally (event, slug, day, count) VALUES (?, ?, ?, 1)
       ON CONFLICT (event, slug, day) DO UPDATE SET count = count + 1`,
    )
    .bind(e.event, e.slug, e.day)
    .run();
}

export interface EventCount {
  event: string;
  slug: string;
  day: number;
  count: number;
}

/**
 * Everything counted in a window, for whoever is reading the funnel.
 *
 * There is no endpoint behind this yet and deliberately so: the counts are for
 * the person building the deck, not for a player, and publishing them would
 * invite exactly the "68% of people quit here" claim this project spends its
 * whole content budget arguing against. It exists so the table can be read in a
 * test, and by a query.
 */
export async function eventCounts(
  db: D1Database,
  fromDay: number,
  toDay: number,
): Promise<EventCount[]> {
  const rows = await db
    .prepare(
      `SELECT event, slug, day, count FROM event_tally
       WHERE day >= ? AND day <= ?
       ORDER BY day, event, slug`,
    )
    .bind(fromDay, toDay)
    .all<EventCount>();
  return rows.results ?? [];
}
