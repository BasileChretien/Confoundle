import type { FunctionContext } from "../../../../src/server/cf";
import { sweepExpired } from "../../../../src/server/accounts";
import {
  handle,
  HttpError,
  readJson,
  requireDatabase,
  requireSameOrigin,
  requireSecret,
} from "../../../../src/server/endpoint";
import { clientIp, json, normaliseEmail } from "../../../../src/server/http";
import { codeEmail, mailerFor } from "../../../../src/server/mail";
import {
  allow,
  CODE_TTL_MS,
  EMAIL_LIMIT,
  emailBucket,
  IP_LIMIT,
  ipBucket,
  issueCode,
} from "../../../../src/server/otp";

/**
 * Send a sign-in code.
 *
 * This is the one endpoint here that can make the service mail a stranger, so
 * it is the one with real abuse control: a per-address hourly cap, a per-client
 * hourly cap, and a minimum interval between two codes to the same address.
 *
 * It answers the same way whether or not the address has an account. Anything
 * else would turn the sign-in box into a tool for checking who has registered,
 * which is a fact about a person we are not entitled to hand out.
 */
export async function onRequestPost(ctx: FunctionContext): Promise<Response> {
  return handle(async () => {
    requireSameOrigin(ctx.request);
    const db = requireDatabase(ctx.env);
    const secret = requireSecret(ctx.env);
    const mailer = mailerFor(ctx.env);
    if (!mailer) throw new HttpError(503, "email-not-configured");

    const body = await readJson<{ email?: unknown }>(ctx.request);
    const email = normaliseEmail(body.email);
    if (!email) throw new HttpError(400, "bad-email");

    const now = Date.now();
    // Cheap and rare enough to piggyback: nothing swept here is data we have a
    // reason to keep, and this is the least-hit endpoint that runs regularly.
    await sweepExpired(db, now);

    if (!(await allow(db, await ipBucket(secret, clientIp(ctx.request)), IP_LIMIT, now))) {
      throw new HttpError(429, "too-many-requests");
    }
    if (!(await allow(db, await emailBucket(email), EMAIL_LIMIT, now))) {
      throw new HttpError(429, "too-many-requests");
    }

    const issued = await issueCode(db, email, now);
    if (!issued.ok) throw new HttpError(429, "code-just-sent");

    const { subject, text } = codeEmail(issued.code, CODE_TTL_MS / 60_000);
    await mailer.send(email, subject, text);

    return json({ sent: true, expiresInMs: CODE_TTL_MS });
  });
}
