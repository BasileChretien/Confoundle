import type { FunctionContext } from "../../../src/server/cf";
import { createSession, LinkConflict, signInWithGoogle } from "../../../src/server/accounts";
import {
  handle,
  HttpError,
  publicAccount,
  readJson,
  requireDatabase,
  requireSameOrigin,
} from "../../../src/server/endpoint";
import { json, sessionCookie } from "../../../src/server/http";
import {
  makeGoogleKeyFetcher,
  TokenError,
  verifyGoogleIdToken,
} from "../../../src/server/googleToken";

/**
 * One-click sign-in: the browser hands us the ID token Google issued it, and we
 * check that token ourselves before believing a word of it.
 *
 * Note what is NOT stored. No access token, no refresh token, no profile
 * picture, no Google API scope at all. The ID token is used once, here, and
 * discarded; what survives is an opaque subject id and an email address. That
 * keeps this a sign-in button rather than a foothold in someone's Google
 * account, and it is why there is no client secret in this deployment.
 */

const fetchKeys = makeGoogleKeyFetcher();

export async function onRequestPost(ctx: FunctionContext): Promise<Response> {
  return handle(async () => {
    requireSameOrigin(ctx.request);
    const db = requireDatabase(ctx.env);
    const clientId = ctx.env.GOOGLE_CLIENT_ID;
    if (!clientId) throw new HttpError(503, "google-not-configured");

    const { credential } = await readJson<{ credential?: unknown }>(ctx.request);
    if (typeof credential !== "string" || credential.length > 8192) {
      throw new HttpError(400, "bad-credential");
    }

    const now = Date.now();
    let identity;
    try {
      identity = await verifyGoogleIdToken(credential, { clientId, now, fetchKeys });
    } catch (error) {
      // The reason a token failed is useful to an attacker probing which check
      // they tripped, and useless to a user who can only try again.
      if (error instanceof TokenError) throw new HttpError(401, "bad-credential");
      throw error;
    }

    let result;
    try {
      result = await signInWithGoogle(db, identity, now);
    } catch (error) {
      if (error instanceof LinkConflict) throw new HttpError(409, "email-already-linked");
      throw error;
    }

    const { token } = await createSession(db, result.account.id, now);
    return json(
      { account: publicAccount(result.account), created: result.created, linked: result.linked },
      200,
      { "set-cookie": sessionCookie(token) },
    );
  });
}
