import type { FunctionContext } from "../../../../src/server/cf";
import { createSession, signInWithEmail } from "../../../../src/server/accounts";
import {
  handle,
  HttpError,
  publicAccount,
  readJson,
  requireDatabase,
  requireSameOrigin,
} from "../../../../src/server/endpoint";
import { json, normaliseEmail, sessionCookie } from "../../../../src/server/http";
import { CODE_LENGTH, verifyCode } from "../../../../src/server/otp";

/**
 * Check the code and sign in, creating the account if this address has never
 * been here. The account is created HERE rather than when the code was sent,
 * so an address someone typed by mistake never becomes a record of a person.
 */
export async function onRequestPost(ctx: FunctionContext): Promise<Response> {
  return handle(async () => {
    requireSameOrigin(ctx.request);
    const db = requireDatabase(ctx.env);

    const body = await readJson<{ email?: unknown; code?: unknown }>(ctx.request);
    const email = normaliseEmail(body.email);
    const code = typeof body.code === "string" ? body.code.trim() : "";
    if (!email || code.length !== CODE_LENGTH) throw new HttpError(400, "bad-code");

    const now = Date.now();
    const outcome = await verifyCode(db, email, code, now);
    if (outcome !== "ok") {
      // "wrong" and "none" answer identically so a caller cannot use this to
      // learn which addresses have a code outstanding.
      const status = outcome === "locked" ? 429 : 401;
      throw new HttpError(status, outcome === "locked" ? "too-many-attempts" : "bad-code");
    }

    const result = await signInWithEmail(db, email, now);
    const { token } = await createSession(db, result.account.id, now);
    return json(
      { account: publicAccount(result.account), created: result.created, linked: false },
      200,
      { "set-cookie": sessionCookie(token) },
    );
  });
}
