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

import { isAcceptableScore } from "./scoreBounds";

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
      if (typeof count === "number" && Number.isFinite(count) && count > 0) {
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
 * The share of recorded scores strictly below this one, or null when there is
 * nobody to compare against.
 *
 * NULL RATHER THAN 0 OR 100 ON A SINGLE ENTRY, because the only entry is the
 * player's own: "you beat 0% of players" would be a claim about a population
 * of one, drawn by a deck whose subject is exactly that.
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
    percentile: total > 1 ? Math.round((below / total) * 100) : null,
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
