import type { D1Database } from "./cf";

/**
 * The anonymous answer tally.
 *
 * All the logic lives here rather than in `functions/api/answers.ts` so that
 * `tsc` and Vitest cover it, which is the same split the rest of `src/server`
 * uses.
 *
 * THE VALIDATION IS THE PRIVACY BOUNDARY, not just hygiene. This endpoint takes
 * unauthenticated input from anybody on the internet and writes it to a table
 * whose whole claim is that it holds nothing identifying. An unbounded `slug`
 * would let a caller write an arbitrary string of arbitrary length into that
 * table, which is a place to smuggle an identifier into a schema designed not
 * to have one. So every field is checked for shape and length before it is
 * stored, and anything unrecognised is refused rather than coerced.
 */

/** The three stakes the app offers. Anything else is not from our client. */
const CONFIDENCE = new Set(["hunch", "sure", "certain"]);

/**
 * Slugs and choice ids are authored in this repo and are lowercase kebab. The
 * bound is deliberately tight: it is long enough for every id the deck has and
 * far too short to carry anything interesting.
 */
const ID = /^[a-z0-9][a-z0-9-]{0,63}$/;

export interface AnswerSubmission {
  slug: string;
  choiceId: string;
  confidence: string;
  day: number;
}

export class InvalidAnswer extends Error {}

/**
 * Narrow unknown input to a submission, or throw. Returns a fresh object so no
 * extra property from the caller's JSON can travel any further: whatever else
 * was in the body is dropped here rather than trusted to be ignored later.
 */
export function parseSubmission(body: unknown, today: number): AnswerSubmission {
  if (typeof body !== "object" || body === null)
    throw new InvalidAnswer("body must be an object");
  const b = body as Record<string, unknown>;

  const slug = b.slug;
  const choiceId = b.choiceId;
  const confidence = b.confidence;
  const day = b.day;

  if (typeof slug !== "string" || !ID.test(slug))
    throw new InvalidAnswer("slug");
  if (typeof choiceId !== "string" || !ID.test(choiceId))
    throw new InvalidAnswer("choiceId");
  if (typeof confidence !== "string" || !CONFIDENCE.has(confidence))
    throw new InvalidAnswer("confidence");
  if (typeof day !== "number" || !Number.isInteger(day))
    throw new InvalidAnswer("day");

  /**
   * A client whose clock is wrong, or a caller trying to stuff a distant day,
   * is clamped to the window the daily puzzle can actually be played in. One
   * day either side covers every timezone; anything beyond it is refused, so
   * nobody can seed a future day or rewrite last year.
   */
  if (day < today - 1 || day > today + 1) throw new InvalidAnswer("day out of range");

  return { slug, choiceId, confidence, day };
}

/**
 * Increment the tally. Atomic, because the number is shown to players as a
 * claim about what people did, and this project does not overstate evidence.
 */
export async function recordAnswer(
  db: D1Database,
  submission: AnswerSubmission,
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO answer_tally (slug, choice_id, confidence, day, count)
       VALUES (?, ?, ?, ?, 1)
       ON CONFLICT (slug, choice_id, confidence, day)
       DO UPDATE SET count = count + 1`,
    )
    .bind(submission.slug, submission.choiceId, submission.confidence, submission.day)
    .run();
}

export interface ChoiceTally {
  choiceId: string;
  count: number;
}

export interface Distribution {
  slug: string;
  total: number;
  choices: ChoiceTally[];
  /** Of the people who said `certain`, how many picked each option. */
  certain: ChoiceTally[];
}

/**
 * What the reveal draws. Collapses confidence for the headline number and keeps
 * the certain-only split beside it, because "most people picked this" and "most
 * of the people who were sure picked this" are different claims and the second
 * is the one this deck is actually about.
 */
export async function answerDistribution(
  db: D1Database,
  slug: string,
  day?: number,
): Promise<Distribution> {
  if (!ID.test(slug)) throw new InvalidAnswer("slug");

  const rows =
    day === undefined
      ? await db
          .prepare(
            `SELECT choice_id, confidence, SUM(count) AS n
             FROM answer_tally WHERE slug = ? GROUP BY choice_id, confidence`,
          )
          .bind(slug)
          .all<{ choice_id: string; confidence: string; n: number }>()
      : await db
          .prepare(
            `SELECT choice_id, confidence, SUM(count) AS n
             FROM answer_tally WHERE slug = ? AND day = ?
             GROUP BY choice_id, confidence`,
          )
          .bind(slug, day)
          .all<{ choice_id: string; confidence: string; n: number }>();

  const all = new Map<string, number>();
  const certain = new Map<string, number>();
  let total = 0;
  for (const r of rows.results ?? []) {
    const n = Number(r.n) || 0;
    all.set(r.choice_id, (all.get(r.choice_id) ?? 0) + n);
    if (r.confidence === "certain")
      certain.set(r.choice_id, (certain.get(r.choice_id) ?? 0) + n);
    total += n;
  }

  const toList = (m: Map<string, number>): ChoiceTally[] =>
    [...m.entries()]
      .map(([choiceId, count]) => ({ choiceId, count }))
      .sort((a, b) => b.count - a.count || a.choiceId.localeCompare(b.choiceId));

  return { slug, total, choices: toList(all), certain: toList(certain) };
}

/**
 * Below this many answers the app shows nothing at all.
 *
 * Two reasons, and the second is the one that matters. A percentage of four
 * people is noise dressed as evidence, on a deck whose subject is exactly that
 * mistake. And a tally with one or two entries is the only state in which the
 * aggregate could say something about an individual, so the floor is a privacy
 * property as much as a statistical one.
 */
export const MIN_ANSWERS_TO_SHOW = 20;

export function isShowable(d: Distribution): boolean {
  return d.total >= MIN_ANSWERS_TO_SHOW;
}
