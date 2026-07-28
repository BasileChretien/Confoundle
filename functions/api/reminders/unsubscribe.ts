import type { FunctionContext } from "../../../src/server/cf";
import { handle, requireDatabase, requireSecret } from "../../../src/server/endpoint";
import { unsubscribeWithToken } from "../../../src/server/reminders";
import {
  unsubscribeConfirmPage,
  unsubscribeDonePage,
} from "../../../src/server/unsubscribePage";

/**
 * Leaving the reminder list, without signing in.
 *
 * Requiring a session here would be a mistake dressed up as security. The
 * person clicking is, by definition, someone who does not want to deal with
 * this app right now, and an unsubscribe that first demands a sign-in is the
 * reason people press "report spam" instead. The HMAC in the link is proof
 * enough for an action whose entire power is to send less email.
 *
 * GET confirms, POST acts. See unsubscribePage.ts for why that split is not
 * optional.
 */

function readParams(request: Request) {
  const url = new URL(request.url);
  return {
    accountId: url.searchParams.get("a") ?? "",
    token: url.searchParams.get("t") ?? "",
    locale: url.searchParams.get("l") ?? "en",
  };
}

export async function onRequestGet(ctx: FunctionContext): Promise<Response> {
  const { accountId, token, locale } = readParams(ctx.request);
  return unsubscribeConfirmPage(locale, accountId, token);
}

export async function onRequestPost(ctx: FunctionContext): Promise<Response> {
  return handle(async () => {
    // A form POST carries the fields in the body; a one-click POST from a mail
    // provider carries them in the query string and sends an empty body. Accept
    // both, preferring the body.
    let params = readParams(ctx.request);
    try {
      const form = await ctx.request.formData();
      const fromBody = {
        accountId: String(form.get("a") ?? ""),
        token: String(form.get("t") ?? ""),
        locale: String(form.get("l") ?? params.locale),
      };
      if (fromBody.accountId && fromBody.token) params = fromBody;
    } catch {
      // No parseable body. The query string already covers the one-click case.
    }

    const db = requireDatabase(ctx.env);
    const secret = requireSecret(ctx.env);
    await unsubscribeWithToken(
      db,
      secret,
      params.accountId,
      params.token,
      Date.now(),
    );
    // The result is not reported. See unsubscribeDonePage: answering
    // differently for a bad token would make this an account-existence oracle,
    // and there is nothing the reader could do with the distinction.
    return unsubscribeDonePage(params.locale);
  });
}
