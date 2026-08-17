import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { signInWithEmail } from "./accounts";
import { saveProgress } from "./progress";
import type { Mailer } from "./mail";
import { MailError } from "./mail";
import {
  ACTIVE_WITHIN_MS,
  findDueReminders,
  getReminderPrefs,
  LATE_AFTER_MS,
  MIN_INTERVAL_MS,
  sendDueReminders,
  setReminderOptIn,
  unsubscribeToken,
  unsubscribeWithToken,
  verifyUnsubscribeToken,
} from "./reminders";
import { reminderEmail, REMINDER_TEXT } from "./reminderEmail";
import { createTestDatabase, type TestDatabase } from "./testing/sqliteD1";
import { loadMigration } from "./testing/schema";

const NOW = 1_760_000_000_000;
const SECRET = "test-secret";
const ORIGIN = "https://confoundle.org";

let db: TestDatabase;

beforeEach(() => {
  db = createTestDatabase(loadMigration());
});
afterEach(() => db.close());

interface SentMail {
  to: string;
  subject: string;
  text: string;
  headers?: Record<string, string>;
}

function recordingMailer(): Mailer & { sent: SentMail[] } {
  const sent: SentMail[] = [];
  return {
    sent,
    async send(to, subject, text, headers) {
      sent.push({ to, subject, text, headers });
    },
  };
}

/**
 * An account that opted in, with one skill overdue and no recent activity, i.e.
 * exactly the person a reminder is for. Every test then perturbs one dimension.
 */
async function enrolledLearner(
  email: string,
  {
    dueAt = NOW - LATE_AFTER_MS - 1000,
    updatedAt = NOW - ACTIVE_WITHIN_MS - 1000,
    optedIn = true,
    locale = "en",
    skills = ["simpsons-paradox"],
  } = {},
): Promise<string> {
  const { account } = await signInWithEmail(db, email, NOW - 100_000_000);
  await saveProgress(
    db,
    account.id,
    skills.map((skill) => ({
      skill,
      stage: 3,
      dueAt,
      seenItemIds: [],
      misconceived: false,
      lifetime: { correct: 1, wrong: 0 },
      updatedAt,
    })),
  );
  await setReminderOptIn(db, account.id, optedIn, locale, NOW - 100_000_000);
  return account.id;
}

describe("the preference itself", () => {
  it("tells never asked apart from asked and declined", async () => {
    /**
     * The whole reason the account panel can ask once and then never again.
     * Declining writes a row, so chosen becomes true while optedIn stays
     * false; if these ever collapse into one flag, somebody who said no gets
     * asked again every time they sign in.
     */
    const { account } = await signInWithEmail(db, "choosy@example.org", NOW);
    expect((await getReminderPrefs(db, account.id)).chosen).toBe(false);

    await setReminderOptIn(db, account.id, false, "en", NOW);
    const after = await getReminderPrefs(db, account.id);
    expect(after.optedIn).toBe(false);
    expect(after.chosen).toBe(true);
  });
  it("treats someone who never opened the setting as opted out", async () => {
    const { account } = await signInWithEmail(db, "new@example.org", NOW);
    expect(await getReminderPrefs(db, account.id)).toEqual({
      optedIn: false,
      locale: "en",
      lastSentAt: null,
      // Never asked, which the panel needs to tell apart from declined.
      chosen: false,
    });
  });

  it("keeps last_sent_at across an opt-out and a same-day opt-in", async () => {
    const id = await enrolledLearner("a@example.org");
    await sendDueReminders(db, {
      mailer: recordingMailer(),
      secret: SECRET,
      origin: ORIGIN,
      now: NOW,
    });
    expect((await getReminderPrefs(db, id)).lastSentAt).toBe(NOW);

    await setReminderOptIn(db, id, false, "en", NOW + 1000);
    await setReminderOptIn(db, id, true, "en", NOW + 2000);
    // The stamp survived, so the toggle cannot be used to get a second email.
    expect((await getReminderPrefs(db, id)).lastSentAt).toBe(NOW);
    expect(await findDueReminders(db, NOW + 3000)).toHaveLength(0);
  });
});

describe("who is due", () => {
  it("finds an opted-in learner whose review went late", async () => {
    await enrolledLearner("late@example.org");
    const due = await findDueReminders(db, NOW);
    expect(due).toHaveLength(1);
    expect(due[0].email).toBe("late@example.org");
    expect(due[0].dueCount).toBe(1);
  });

  it("does not mail anyone who never opted in", async () => {
    await enrolledLearner("quiet@example.org", { optedIn: false });
    expect(await findDueReminders(db, NOW)).toHaveLength(0);
  });

  it("does not mail a review that is merely due, only one that is late", async () => {
    // Due an hour ago, which is inside the grace period.
    await enrolledLearner("justnow@example.org", {
      dueAt: NOW - 60 * 60 * 1000,
    });
    expect(await findDueReminders(db, NOW)).toHaveLength(0);
  });

  it("does not mail someone who used the app in the last day", async () => {
    await enrolledLearner("active@example.org", {
      updatedAt: NOW - 60 * 60 * 1000,
    });
    expect(await findDueReminders(db, NOW)).toHaveLength(0);
  });

  it("counts every overdue skill, and ignores the ones not yet late", async () => {
    const { account } = await signInWithEmail(db, "several@example.org", NOW);
    const stale = NOW - ACTIVE_WITHIN_MS - 1000;
    await saveProgress(db, account.id, [
      { ...base("a", stale), dueAt: NOW - LATE_AFTER_MS - 5000 },
      { ...base("b", stale), dueAt: NOW - LATE_AFTER_MS - 4000 },
      { ...base("c", stale), dueAt: NOW + 100_000 }, // not due at all
    ]);
    await setReminderOptIn(db, account.id, true, "en", NOW);
    const due = await findDueReminders(db, NOW);
    expect(due[0].dueCount).toBe(2);
  });
});

function base(skill: string, updatedAt: number) {
  return {
    skill,
    stage: 3,
    dueAt: updatedAt,
    seenItemIds: [] as string[],
    misconceived: false,
    lifetime: { correct: 1, wrong: 0 },
    updatedAt,
  };
}

describe("at most one email a day", () => {
  it("sends one, then nothing on an immediate second run", async () => {
    await enrolledLearner("once@example.org");
    const mailer = recordingMailer();
    const opts = { mailer, secret: SECRET, origin: ORIGIN, now: NOW };

    expect((await sendDueReminders(db, opts)).sent).toBe(1);
    expect((await sendDueReminders(db, opts)).sent).toBe(0);
    expect(mailer.sent).toHaveLength(1);
  });

  it("stays silent for the whole interval and speaks again after it", async () => {
    await enrolledLearner("gap@example.org");
    const mailer = recordingMailer();
    await sendDueReminders(db, {
      mailer,
      secret: SECRET,
      origin: ORIGIN,
      now: NOW,
    });

    const justBefore = NOW + MIN_INTERVAL_MS - 1000;
    expect(
      (
        await sendDueReminders(db, {
          mailer,
          secret: SECRET,
          origin: ORIGIN,
          now: justBefore,
        })
      ).sent,
    ).toBe(0);

    const justAfter = NOW + MIN_INTERVAL_MS + 1000;
    expect(
      (
        await sendDueReminders(db, {
          mailer,
          secret: SECRET,
          origin: ORIGIN,
          now: justAfter,
        })
      ).sent,
    ).toBe(1);
    expect(mailer.sent).toHaveLength(2);
  });

  it("does not stamp the row when the send fails, so it retries", async () => {
    const id = await enrolledLearner("bounce@example.org");
    const failing: Mailer = {
      async send() {
        throw new MailError("provider said no");
      },
    };
    const report = await sendDueReminders(db, {
      mailer: failing,
      secret: SECRET,
      origin: ORIGIN,
      now: NOW,
    });
    expect(report).toMatchObject({ considered: 1, sent: 0, failed: 1 });
    expect((await getReminderPrefs(db, id)).lastSentAt).toBeNull();

    // The next run reaches them again rather than treating them as done.
    const mailer = recordingMailer();
    expect(
      (
        await sendDueReminders(db, {
          mailer,
          secret: SECRET,
          origin: ORIGIN,
          now: NOW + 1000,
        })
      ).sent,
    ).toBe(1);
  });

  it("keeps going after one bad address and reports the failure", async () => {
    await enrolledLearner("good@example.org");
    await enrolledLearner("bad@example.org");
    let calls = 0;
    const flaky: Mailer = {
      async send() {
        calls += 1;
        if (calls === 1) throw new MailError("first one bounced");
      },
    };
    const report = await sendDueReminders(db, {
      mailer: flaky,
      secret: SECRET,
      origin: ORIGIN,
      now: NOW,
    });
    expect(report).toMatchObject({ considered: 2, sent: 1, failed: 1 });
  });

  it("reports truncation rather than hiding it", async () => {
    await enrolledLearner("one@example.org");
    await enrolledLearner("two@example.org");
    const report = await sendDueReminders(db, {
      mailer: recordingMailer(),
      secret: SECRET,
      origin: ORIGIN,
      now: NOW,
      limit: 1,
    });
    expect(report).toMatchObject({ sent: 1, truncated: true });
  });
});

describe("unsubscribing", () => {
  it("switches the emails off with a valid token and no session", async () => {
    const id = await enrolledLearner("out@example.org");
    const token = await unsubscribeToken(SECRET, id);
    expect(await unsubscribeWithToken(db, SECRET, id, token, NOW)).toBe(true);
    expect((await getReminderPrefs(db, id)).optedIn).toBe(false);
    expect(await findDueReminders(db, NOW)).toHaveLength(0);
  });

  it("rejects a forged token and changes nothing", async () => {
    const id = await enrolledLearner("safe@example.org");
    expect(await unsubscribeWithToken(db, SECRET, id, "deadbeef", NOW)).toBe(
      false,
    );
    expect((await getReminderPrefs(db, id)).optedIn).toBe(true);
  });

  it("rejects another account's token", async () => {
    const mine = await enrolledLearner("mine@example.org");
    const yours = await enrolledLearner("yours@example.org");
    const yourToken = await unsubscribeToken(SECRET, yours);
    expect(await verifyUnsubscribeToken(SECRET, mine, yourToken)).toBe(false);
  });

  it("invalidates every outstanding link when the secret rotates", async () => {
    const id = await enrolledLearner("rotate@example.org");
    const old = await unsubscribeToken(SECRET, id);
    expect(await verifyUnsubscribeToken("a-new-secret", id, old)).toBe(false);
  });

  it("puts a one-click unsubscribe in the headers of every reminder", async () => {
    const id = await enrolledLearner("headers@example.org");
    const mailer = recordingMailer();
    await sendDueReminders(db, {
      mailer,
      secret: SECRET,
      origin: ORIGIN,
      now: NOW,
    });
    const headers = mailer.sent[0].headers ?? {};
    expect(headers["List-Unsubscribe-Post"]).toBe(
      "List-Unsubscribe=One-Click",
    );
    expect(headers["List-Unsubscribe"]).toContain(
      `${ORIGIN}/api/reminders/unsubscribe`,
    );
    // The link in the header has to be one that actually works.
    const url = new URL(headers["List-Unsubscribe"].replace(/^<|>$/g, ""));
    expect(url.searchParams.get("a")).toBe(id);
    expect(
      await unsubscribeWithToken(
        db,
        SECRET,
        url.searchParams.get("a")!,
        url.searchParams.get("t")!,
        NOW,
      ),
    ).toBe(true);
  });
});

describe("the message", () => {
  it("is written in the language the learner chose", async () => {
    await enrolledLearner("jp@example.org", { locale: "ja" });
    const mailer = recordingMailer();
    await sendDueReminders(db, {
      mailer,
      secret: SECRET,
      origin: ORIGIN,
      now: NOW,
    });
    expect(mailer.sent[0].subject).toBe(REMINDER_TEXT.ja.subject);
  });

  it("falls back to English for a locale it does not carry", () => {
    expect(
      reminderEmail({
        locale: "kl",
        count: 2,
        origin: ORIGIN,
        unsubscribeUrl: "https://x/y",
      }).subject,
    ).toBe(REMINDER_TEXT.en.subject);
  });

  it("carries every locale the app offers", async () => {
    const { LOCALES } = await import("../app/locales");
    for (const locale of LOCALES) {
      expect(REMINDER_TEXT[locale.code], `missing ${locale.code}`).toBeTruthy();
    }
  });

  it("never builds a sentence that depends on a plural", () => {
    // The count only ever appears after a colon, so 1 and 5 read the same way
    // in all ten languages. If that changes, this fails before a reader sees it.
    for (const count of [0, 1, 2, 5]) {
      const { text } = reminderEmail({
        locale: "ru",
        count,
        origin: ORIGIN,
        unsubscribeUrl: "https://x/y",
      });
      expect(text).toContain(`${REMINDER_TEXT.ru.ready}: ${count}`);
    }
  });

  it("links to the review screen and to the way out", () => {
    const { text } = reminderEmail({
      locale: "en",
      count: 3,
      origin: ORIGIN,
      unsubscribeUrl: "https://confoundle.org/api/reminders/unsubscribe?a=1&t=2",
    });
    expect(text).toContain(`${ORIGIN}/?review=1`);
    expect(text).toContain("unsubscribe?a=1&t=2");
  });
});
