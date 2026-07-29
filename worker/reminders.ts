import type { D1Database } from "../src/server/cf";
import { mailerFor } from "../src/server/mail";
import { sendDueReminders } from "../src/server/reminders";

/**
 * The daily sender.
 *
 * A separate Worker rather than a Pages Function because **Pages Functions have
 * no cron trigger**. Nothing else about it wants to be separate: the logic all
 * lives in src/server/reminders.ts where tsc and vitest reach it, and this file
 * is the same kind of thin adapter as the files under functions/.
 *
 * It shares the Pages project's D1 database through its own binding, so there
 * is one accounts database with two things attached to it, not two databases.
 *
 * Deployed on its own:
 *   npx wrangler deploy -c wrangler.reminders.toml
 * and its secrets are set once, on the Worker, not on Pages:
 *   npx wrangler secret put RESEND_API_KEY -c wrangler.reminders.toml
 *   npx wrangler secret put MAIL_FROM      -c wrangler.reminders.toml
 *   npx wrangler secret put SESSION_SECRET -c wrangler.reminders.toml
 * SESSION_SECRET must be the SAME value the Pages project uses, or the
 * unsubscribe links this Worker mints will not verify when they come back to
 * the Pages function. That is the one way to get this subtly wrong.
 */

interface ScheduledEnv {
  DB: D1Database;
  RESEND_API_KEY?: string;
  MAIL_FROM?: string;
  SESSION_SECRET?: string;
  /** Absolute origin, no trailing slash. Set as a plain var in the toml. */
  SITE_ORIGIN?: string;
}

interface ScheduledController {
  scheduledTime: number;
}

export default {
  async scheduled(
    controller: ScheduledController,
    env: ScheduledEnv,
  ): Promise<void> {
    const mailer = mailerFor(env);
    if (!mailer || !env.DB || !env.SESSION_SECRET) {
      // Fail loudly in the log and do nothing. A half-configured sender that
      // silently sends no mail looks identical to one with nobody due.
      console.error("reminders: not configured, nothing sent", {
        hasMailer: Boolean(mailer),
        hasDb: Boolean(env.DB),
        hasSecret: Boolean(env.SESSION_SECRET),
      });
      return;
    }

    const report = await sendDueReminders(env.DB, {
      mailer,
      secret: env.SESSION_SECRET,
      origin: (env.SITE_ORIGIN ?? "https://confoundle.org").replace(/\/$/, ""),
      // The scheduled time, not Date.now(), so a run that was queued behind
      // something else still stamps rows with the tick it belongs to.
      now: controller.scheduledTime,
    });

    // Counts only, never an address: this log is the one place a scheduled job
    // would otherwise quietly accumulate personal data.
    console.log("reminders", report);
    if (report.truncated) {
      console.warn(
        "reminders: batch cap reached, more were waiting. Raise the limit or " +
          "run the trigger more often.",
      );
    }
  },
};
