import {
  answerDistribution,
  InvalidAnswer,
  parseSubmission,
  recordAnswer,
} from "../../src/server/answers";
import type { D1Database } from "../../src/server/cf";
import { allow, ipBucket } from "../../src/server/otp";
import { clientIp } from "../../src/server/http";

/**
 * The anonymous answer tally (Cloudflare Pages Function).
 *
 * A thin adapter on purpose: everything worth testing lives in
 * `src/server/answers.ts`, which `tsc` and Vitest cover, and this file only
 * turns a Request into arguments and a result into a Response.
 *
 * THREE THINGS THIS DELIBERATELY DOES NOT DO, each of which would quietly turn
 * an anonymous counter into something that can describe a person:
 *
 *  * It does not read or set a cookie, and it does not call requireAccount.
 *    The tally must be identical whether the caller is signed in or not.
 *  * It does not log the request. No IP, no user agent, no body. The platform
 *    sees the connection because it has to route it, and that is disclosed in
 *    public/privacy.html; nothing here adds to it.
 *  * It does not return an error the caller can learn from beyond the shape of
 *    their own request, and it never echoes the body back.
 *
 * It also does not require the same origin. That check exists elsewhere to
 * protect a session, and there is no session here.
 *
 * IT IS RATE LIMITED ALL THE SAME, and the reason is worth stating because an
 * earlier version of this comment argued its way out of it: a forged submission
 * only adds one to a counter, so who cares. The answer is that adding one to a
 * counter IS the whole attack. The number this endpoint feeds is published to
 * every player as "68% picked that", and an unlimited anonymous writer can set
 * it to whatever they like, on a deck whose entire subject is not believing a
 * statistic more than its collection method supports. A limit does not make the
 * tally trustworthy against a determined forger, and nothing cheap would; it
 * removes the case where one script quietly rewrites it.
 *
 * The bucket is an HMAC of the client address under the server secret, exactly
 * as the sign-in path does it, so no address is stored here either. It is
 * namespaced with a prefix so that playing puzzles and requesting sign-in codes
 * cannot exhaust each other's allowance: sharing one counter would let a busy
 * classroom lock itself out of signing in by answering puzzles.
 */

interface Env {
  DB?: D1Database;
  SESSION_SECRET?: string;
}

/**
 * Generous, because the honest ceiling is low and shared addresses are real.
 * A player now sends at most one answer per puzzle per day (replays are not
 * counted), so sixty an hour is far above any single human and far below what
 * makes a forged tally cheap.
 */
const IP_LIMIT = { max: 60, windowMs: 3_600_000 };

interface Context {
  request: Request;
  env: Env;
}

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      // The tally moves slowly and the client tolerates staleness, so let the
      // edge absorb the reads rather than waking D1 for every reveal.
      "cache-control": status === 200 ? "public, max-age=60" : "no-store",
    },
  });

/** Days since the epoch, UTC, which is what the client and the table both use. */
const today = (): number => Math.floor(Date.now() / 86_400_000);

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  const db = env.DB;
  const secret = env.SESSION_SECRET;
  // With no database bound the feature simply does not exist. The client
  // ignores a failure here, so the puzzle plays exactly as before.
  //
  // The secret is required for the same reason, and failing closed is the point:
  // without it there is no bucket to count into, and an endpoint that silently
  // dropped its only limit because a binding was missing is exactly the kind of
  // configuration failure nobody notices until the numbers are already wrong.
  if (!db || !secret) return json({ ok: false }, 503);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }

  try {
    const bucket = await ipBucket(secret, `answers:${clientIp(request)}`);
    if (!(await allow(db, bucket, IP_LIMIT, Date.now()))) {
      return json({ ok: false }, 429);
    }
    await recordAnswer(db, parseSubmission(body, today()));
  } catch (err) {
    if (err instanceof InvalidAnswer) return json({ ok: false }, 400);
    // A storage failure must never cost the player their answer or their beat.
    return json({ ok: false }, 500);
  }

  return json({ ok: true });
}

export async function onRequestGet({ request, env }: Context): Promise<Response> {
  const db = env.DB;
  if (!db) return json({ total: 0, choices: [], certain: [] }, 503);

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") ?? "";
  const dayParam = url.searchParams.get("day");
  const day = dayParam === null ? undefined : Number(dayParam);
  if (day !== undefined && !Number.isInteger(day)) return json({ ok: false }, 400);

  try {
    return json(await answerDistribution(db, slug, day));
  } catch (err) {
    if (err instanceof InvalidAnswer) return json({ ok: false }, 400);
    return json({ ok: false }, 500);
  }
}
