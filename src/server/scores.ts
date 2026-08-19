/**
 * The anonymous score histogram, and what a percentile drawn from it may claim.
 *
 * IT USED TO BUCKET BY DAY, AND A DAY IS NOT A COMPARISON. The client posted
 * `{ day, score }`, the endpoint kept one histogram per calendar day, and the
 * app told the player "you beat 63% of players today". But a score is earned on
 * ONE card, out of 73 that anybody may open at any time, and the wager pays
 * differently depending on how sure the player was. So the number ranked a
 * score on one puzzle against scores on entirely different puzzles, and called
 * the result a percentile.
 *
 * That is the same defect removed from the friends board, which had grouped
 * results by days since launch for the same reason: a number that names WHEN
 * you played says nothing about WHAT you played. It survived there because the
 * two live one component apart on the same screen and only one of them was
 * being looked at.
 *
 * The histogram is therefore per puzzle. "You beat 63% of players on this card"
 * is a claim about a shared denominator, and it is the only version of this
 * sentence the data can support.
 *
 * The logic lives in src/server so `tsc` and Vitest cover it: `tsconfig.json`
 * includes only `src`, so anything under `functions/` is unchecked and untested
 * by construction. The file there is a thin adapter, exactly as `answers.ts`
 * and `scoreBounds.ts` already are.
 */

import { MIN_ANSWERS_TO_SHOW } from "./answers";
import { isAcceptableScore, MAX_SCORE, MIN_SCORE } from "./scoreBounds";

/** Same shape the puzzle registry enforces, so an unknown key cannot be written. */
const SLUG = /^[a-z0-9][a-z0-9-]{0,63}$/;

export type Histogram = Record<string, number>;

export function isValidSlug(slug: unknown): slug is string {
  return typeof slug === "string" && SLUG.test(slug);
}

/** The KV key for one puzzle's histogram. */
export function histogramKey(slug: string): string {
  return `puzzle:${slug}`;
}

/**
 * Parse whatever was stored, treating anything unexpected as an empty
 * histogram rather than throwing. A malformed value costs one comparison; a
 * throw would cost the request.
 */
export function parseHistogram(raw: string | null): Histogram {
  if (raw === null) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return {};
    }
    const out: Histogram = {};
    for (const [bucket, count] of Object.entries(parsed as Histogram)) {
      // THE KEY IS CHECKED TOO, not only the count. A bucket like "abc" passes
      // any test on its value, then `Number("abc")` is NaN in `percentileOf`,
      // so it never counts as below while still counting towards the total: a
      // silently deflated percentile. Unreachable through `addScore`, which
      // only ever writes a bounded integer, so this is the guard for a store
      // corrupted by something other than this endpoint.
      const value = Number(bucket);
      const usableBucket =
        Number.isInteger(value) && value >= MIN_SCORE && value <= MAX_SCORE;
      if (
        usableBucket &&
        typeof count === "number" &&
        Number.isFinite(count) &&
        count > 0
      ) {
        out[bucket] = count;
      }
    }
    return out;
  } catch {
    return {};
  }
}

export function addScore(histogram: Histogram, score: number): Histogram {
  const bucket = String(score);
  return { ...histogram, [bucket]: (histogram[bucket] ?? 0) + 1 };
}

/**
 * The share of recorded scores strictly below this one, or null when there are
 * too few to say.
 *
 * THE FLOOR IS THE SAME ONE THE ANSWER TALLY USES, imported rather than
 * repeated so the two cannot drift. It was `total > 1`, which published a
 * percentile off two entries, and `answers.ts` names that exact case as the
 * reason its own floor exists: "a tally with one or two entries is the only
 * state in which the aggregate could say something about an individual".
 *
 * MOVING THE HISTOGRAM PER PUZZLE IS WHAT MADE THAT BITE. The old day buckets
 * pooled every card played that day, so two entries was rare. Per puzzle, a
 * freshly shipped card or a quiet locale sits at one or two for a long time,
 * and at n=2 "you beat 0%" tells the reader exactly where one other identifiable
 * play fell against theirs. Fixing the denominator without moving the floor
 * would have traded one wrong number for a smaller, sharper disclosure.
 *
 * The cost is honest and is the same cost the crowd lines already pay: this
 * says nothing at all until twenty people have played the card.
 */
export function percentileOf(
  histogram: Histogram,
  score: number,
): { percentile: number | null; n: number } {
  let below = 0;
  let total = 0;
  for (const [value, count] of Object.entries(histogram)) {
    total += count;
    if (Number(value) < score) below += count;
  }
  return {
    percentile:
      total >= MIN_ANSWERS_TO_SHOW ? Math.round((below / total) * 100) : null,
    n: total,
  };
}

export interface ScoreSubmission {
  slug: string;
  score: number;
}

/** Validate a posted body, or say why it is not usable. */
export function readSubmission(body: unknown): ScoreSubmission | null {
  if (typeof body !== "object" || body === null) return null;
  const { slug, score } = body as { slug?: unknown; score?: unknown };
  if (!isValidSlug(slug)) return null;
  const n = Math.trunc(Number(score));
  if (!Number.isFinite(n) || !isAcceptableScore(n)) return null;
  return { slug, score: n };
}
