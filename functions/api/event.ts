import { InvalidEvent, parseEvent, recordEvent } from "../../src/server/events";
import type { D1Database } from "../../src/server/cf";
import { allow, ipBucket } from "../../src/server/otp";
import { clientIp } from "../../src/server/http";

/**
 * The anonymous funnel tally (Cloudflare Pages Function).
 *
 * A thin adapter on purpose: everything worth testing lives in
 * `src/server/events.ts`, which `tsc` and Vitest cover, and this file only
 * turns a Request into arguments and a result into a Response. `tsconfig.json`
 * includes only `src`, so nothing here is typechecked.
 *
 * IT IS WRITE ONLY. There is no GET. The counts are for the person building the
 * deck, and publishing them would invite exactly the "68% of people quit here"
 * claim this project spends its content budget arguing against. Read them with
 * a query.
 *
 * THE SAME THREE REFUSALS AS `answers.ts`, and for the same reasons: no cookie,
 * no account, no request logging, and no error a caller can learn anything from
 * beyond the shape of what they sent. The tally must be identical whether the
 * caller is signed in or not, because otherwise it is not anonymous, it is
 * pseudonymous with the key held elsewhere.
 *
 * RATE LIMITED, with a higher ceiling than the answer tally and a lower stake.
 * A forged answer moves a number shown to every player as "68% picked that"; a
 * forged event moves a number shown to nobody but the maintainer. The limit is
 * still here because an unbounded anonymous writer can make the one measurement
 * that decides what gets built next say whatever it likes, and finding that out
 * later is expensive. The bucket is an HMAC of the client address under the
 * server secret, so no address is stored, and it is namespaced so that playing
 * puzzles cannot exhaust the sign-in allowance.
 */

interface Env {
  DB?: D1Database;
  SESSION_SECRET?: string;
}

/**
 * Eight events per puzzle at the very most, so this is about forty puzzles an
 * hour: far above any real reader, far below what makes a forged funnel cheap.
 */
const IP_LIMIT = { max: 300, windowMs: 3_600_000 };

interface Context {
  request: Request;
  env: Env;
}

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

/** Days since the epoch, UTC, which is what the table uses. */
const today = (): number => Math.floor(Date.now() / 86_400_000);

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  const db = env.DB;
  const secret = env.SESSION_SECRET;
  // With no database bound the feature does not exist, and the client already
  // ignores a failure, so the puzzle plays exactly as before. The secret is
  // required for the same reason it is in `answers.ts`: without it there is no
  // bucket to count into, and an endpoint that dropped its only limit because a
  // binding was missing is the configuration failure nobody notices until the
  // numbers are already wrong.
  if (!db || !secret) return json({ ok: false }, 503);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }

  try {
    const bucket = await ipBucket(secret, `events:${clientIp(request)}`);
    if (!(await allow(db, bucket, IP_LIMIT, Date.now()))) {
      return json({ ok: false }, 429);
    }
    await recordEvent(db, parseEvent(body, today()));
  } catch (err) {
    if (err instanceof InvalidEvent) return json({ ok: false }, 400);
    // A storage failure must never cost the player their beat.
    return json({ ok: false }, 500);
  }

  return json({ ok: true });
}
