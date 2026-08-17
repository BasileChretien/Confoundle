import type { FunctionContext } from "../../../src/server/cf";
import {
  handle,
  HttpError,
  readJson,
  requireAccount,
  requireDatabase,
  requireSameOrigin,
} from "../../../src/server/endpoint";
import { json } from "../../../src/server/http";
import {
  getReminderPrefs,
  setReminderOptIn,
} from "../../../src/server/reminders";
import { REMINDER_TEXT } from "../../../src/server/reminderEmail";

/**
 * The reminder setting, read and written by the account panel.
 *
 * There is nothing here but a boolean and a language, because that is the whole
 * feature. No frequency, no quiet hours, no digest: every one of those is a
 * setting somebody has to understand before they can say yes, and the thing
 * being offered is "tell me when I fall behind".
 */

export async function onRequestGet(ctx: FunctionContext): Promise<Response> {
  return handle(async () => {
    const db = requireDatabase(ctx.env);
    const account = await requireAccount(ctx.request, db, Date.now());
    const prefs = await getReminderPrefs(db, account.id);
    return json({
      optedIn: prefs.optedIn,
      // Never asked is a different state from declined, and only the panel
      // can act on the difference.
      chosen: prefs.chosen,
      locale: prefs.locale,
      // Exposed so the panel can say when the last one went out. It is the
      // person's own data and it is the only way to check the once-a-day
      // promise from the outside.
      lastSentAt: prefs.lastSentAt,
      // Absent mail configuration the toggle would accept a choice that can
      // never be honoured, so the panel hides it instead of lying.
      available: Boolean(ctx.env.RESEND_API_KEY && ctx.env.MAIL_FROM),
    });
  });
}

export async function onRequestPut(ctx: FunctionContext): Promise<Response> {
  return handle(async () => {
    requireSameOrigin(ctx.request);
    const db = requireDatabase(ctx.env);
    const account = await requireAccount(ctx.request, db, Date.now());
    const payload = await readJson<{ optedIn?: unknown; locale?: unknown }>(
      ctx.request,
    );
    if (typeof payload.optedIn !== "boolean") {
      throw new HttpError(400, "bad-payload");
    }
    // Validated against the table we can actually write in, not against the
    // app's locale list, because an unknown value here would mean an email
    // silently falling back to English forever with nothing to show why.
    const locale =
      typeof payload.locale === "string" && payload.locale in REMINDER_TEXT
        ? payload.locale
        : "en";
    const prefs = await setReminderOptIn(
      db,
      account.id,
      payload.optedIn,
      locale,
      Date.now(),
    );
    return json({ optedIn: prefs.optedIn, locale: prefs.locale });
  });
}
