/**
 * Anonymous global percentile endpoint (Cloudflare Pages Function).
 *
 * Privacy contract: this stores ONLY an aggregate histogram of scores per day
 * ("how many people scored 30 on day 20657"). No identifiers, no nicknames, no
 * cookies, nothing that could single a player out. That is deliberate: it gives
 * a global comparison without abandoning the app's no-user-data promise, and it
 * is the same shape of anonymous aggregate that research use would want.
 *
 * Deployed with the site by `wrangler pages deploy`. Requires a KV namespace
 * bound as SCORES (see README). Until that binding exists the endpoint errors
 * and the client silently shows nothing.
 *
 * Note: reads and writes are not atomic, so under heavy concurrent traffic a
 * few increments can be lost. For an approximate percentile that is harmless;
 * move to D1 or a Durable Object if exactness ever matters.
 */

import { isAcceptableScore } from "../../src/server/scoreBounds";

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
  let body: { day?: unknown; score?: unknown };
  try {
    body = (await ctx.request.json()) as typeof body;
  } catch {
    return json({ error: "bad json" }, 400);
  }

  const day = Math.trunc(Number(body.day));
  const score = Math.trunc(Number(body.score));
  if (
    !Number.isFinite(day) ||
    // Bounds live in src/server so tsc and Vitest cover them, and so the
    // test asserting the wager fits inside them imports the same numbers.
    !isAcceptableScore(score)
  ) {
    return json({ error: "bad input" }, 400);
  }

  const key = `day:${day}`;
  const raw = await ctx.env.SCORES.get(key);
  const histogram: Record<string, number> = raw ? JSON.parse(raw) : {};
  const bucket = String(score);
  histogram[bucket] = (histogram[bucket] ?? 0) + 1;
  await ctx.env.SCORES.put(key, JSON.stringify(histogram));

  let below = 0;
  let total = 0;
  for (const [value, count] of Object.entries(histogram)) {
    total += count;
    if (Number(value) < score) below += count;
  }

  // With nobody else yet, a percentile would be meaningless.
  const percentile = total > 1 ? Math.round((below / total) * 100) : null;
  return json({ percentile, n: total });
}
