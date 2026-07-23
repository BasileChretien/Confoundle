import type { FunctionContext } from "../../../src/server/cf";
import { resolveSession, revokeSession } from "../../../src/server/accounts";
import { handle, publicAccount, requireDatabase, requireSameOrigin } from "../../../src/server/endpoint";
import { json, readSessionToken, sessionCookie } from "../../../src/server/http";
import { mailerFor } from "../../../src/server/mail";

/**
 * Who am I, and what sign-in methods does this deployment actually have?
 *
 * Both in one call, because the account panel needs both before it can draw
 * anything, and a second round trip at the edge is a second chance to show a
 * button that does not work. `methods` reflects the bindings that are really
 * present: a deployment with no mail provider says so rather than offering an
 * email box that will answer 503.
 *
 * The Google client id is served from here rather than baked into the bundle at
 * build time. It is public either way, and this way there is one place to
 * configure it. A build-time copy could disagree with the audience the server
 * checks tokens against, which fails as "sign-in is broken" with no clue why.
 */
export async function onRequestGet(ctx: FunctionContext): Promise<Response> {
  return handle(async () => {
    const methods = {
      googleClientId: ctx.env.DB ? (ctx.env.GOOGLE_CLIENT_ID ?? null) : null,
      email: Boolean(mailerFor(ctx.env) && ctx.env.DB && ctx.env.SESSION_SECRET),
    };
    if (!ctx.env.DB) return json({ account: null, methods });

    const account = await resolveSession(
      ctx.env.DB,
      readSessionToken(ctx.request),
      Date.now(),
    );
    return json({ account: account ? publicAccount(account) : null, methods });
  });
}

/** Sign out: the session row goes, so the cookie is dead even if it is kept. */
export async function onRequestDelete(ctx: FunctionContext): Promise<Response> {
  return handle(async () => {
    requireSameOrigin(ctx.request);
    const db = requireDatabase(ctx.env);
    await revokeSession(db, readSessionToken(ctx.request));
    return json({ ok: true }, 200, { "set-cookie": sessionCookie(null) });
  });
}
