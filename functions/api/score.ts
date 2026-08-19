/**
 * Anonymous global percentile endpoint (Cloudflare Pages Function).
 *
 * Privacy contract: this stores ONLY an aggregate histogram of scores per
 * PUZZLE ("how many people scored 30 on kidney-stones"). No identifiers, no
 * nicknames, no cookies, nothing that could single a player out. That is
 * deliberate: it gives a global comparison without abandoning the app's
 * no-user-data promise, and it is the same shape of anonymous aggregate that
 * research use would want.
 *
 * It bucketed by DAY until a review found that a day is not a comparison: a
 * score is earned on one card out of 73, so ranking it against a day's scores
 * ranked it against different puzzles. See `src/server/scores.ts`. Old `day:*`
 * keys are simply never read again; nothing migrates, because what card a
 * stored score belonged to was never recorded.
 *
 * Deployed with the site by `wrangler pages deploy`. Requires a KV namespace
 * bound as SCORES (see README). Until that binding exists the endpoint errors
 * and the client silently shows nothing.
 *
 * Everything with a decision in it lives in `src/server/scores.ts`, because
 * `tsconfig.json` includes only `src` and so nothing in this directory is
 * typechecked or tested. This file is wiring.
 *
 * Note: reads and writes are not atomic, so under heavy concurrent traffic a
 * few increments can be lost. For an approximate percentile that is harmless;
 * move to D1 or a Durable Object if exactness ever matters.
 */

import {
  addScore,
  histogramKey,
  parseHistogram,
  percentileOf,
  readSubmission,
} from "../../src/server/scores";

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

interface Env {
  SCORES: KVNamespace;
}

interface Context {
  request: Request;
  env: Env;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}

export async function onRequestPost(ctx: Context): Promise<Response> {
  let body: unknown;
  try {
    body = await ctx.request.json();
  } catch {
    return json({ error: "bad json" }, 400);
  }

  const sub = readSubmission(body);
  if (sub === null) return json({ error: "bad input" }, 400);

  const key = histogramKey(sub.slug);
  const histogram = addScore(
    parseHistogram(await ctx.env.SCORES.get(key)),
    sub.score,
  );
  await ctx.env.SCORES.put(key, JSON.stringify(histogram));

  return json(percentileOf(histogram, sub.score));
}
