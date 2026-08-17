import { useEffect, useState } from "react";
import { useLocale, useT } from "./i18n";
import { ACCOUNT } from "./ui";

/**
 * The reminder question, asked once, at the moment somebody makes an account.
 *
 * WHY THIS EXISTS ALONGSIDE `ReminderToggle`. The toggle is a setting: it lives
 * in the panel and waits to be found. That is the right home for changing your
 * mind, and the wrong one for a first decision, because a setting nobody opens
 * is a feature nobody has. Asking once, at the only moment the person is
 * already thinking about what this account is for, is the difference between an
 * opt-in that works and one that technically exists.
 *
 * IT ASKS ONCE, AND ONLY EVER ONCE. The signal is `chosen`, which the server
 * derives from whether a preference row exists, not from whether the answer was
 * yes. Declining writes a row, so somebody who says no is never asked again.
 * That distinction is the whole reason `reminder_prefs` keeps a row for a
 * withdrawn consent instead of deleting it, and `reminders.test.ts` fails if
 * the two states ever collapse into one flag.
 *
 * BOTH ANSWERS ARE ONE CLICK, and neither is preselected. A dialogue with a
 * bright "yes" and a grey link is not a question, and this app has no business
 * nudging somebody into email it also promises not to send often.
 */

interface Prefs {
  optedIn: boolean;
  lastSentAt: number | null;
  available: boolean;
  chosen: boolean;
}

export function ReminderChoice({ onAnswered }: { onAnswered?: () => void }) {
  const t = useT();
  const locale = useLocale();
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [busy, setBusy] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let live = true;
    void (async () => {
      try {
        const response = await fetch("/api/reminders", {
          credentials: "same-origin",
        });
        if (!response.ok) return;
        const data = (await response.json()) as Prefs;
        if (live) setPrefs(data);
      } catch {
        // No functions behind this build, or offline. The question simply is
        // not asked, which is the safe direction for something that ends in us
        // sending email.
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  // Nothing to ask if mail is not configured, if they have already answered, or
  // if they have just answered here.
  if (!prefs?.available || prefs.chosen || dismissed) return null;

  async function answer(optedIn: boolean) {
    setBusy(true);
    try {
      await fetch("/api/reminders", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        // The locale travels with the choice so the email is written in the
        // language the app is being read in right now.
        body: JSON.stringify({ optedIn, locale }),
      });
    } catch {
      // A failed write leaves `chosen` false, so the question comes back next
      // time rather than silently recording an answer nobody gave. That is the
      // right failure for a consent decision.
    } finally {
      // Either way this instance stops asking, so a network problem cannot trap
      // somebody in a dialogue they have already answered.
      setDismissed(true);
      setBusy(false);
      // Unconditionally, including after a failure: the toggle beside this one
      // holds its own copy of the same preference and re-reads it on mount, so
      // what this signals is "go and look again", and looking again after a
      // failed write is how it ends up showing the truth rather than my guess
      // at it.
      onAnswered?.();
    }
  }

  return (
    <div className="mt-4 rounded-lg border border-rule bg-paper-2 p-3.5">
      <p className="font-sans text-[13px] font-semibold text-ink">
        {t(ACCOUNT.remindMe)}
      </p>
      <p className="mt-1 font-sans text-[12px] leading-snug text-ink-soft">
        {t(ACCOUNT.remindMeBlurb)}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => void answer(true)}
          className="flex-1 rounded-md border border-rule px-3 py-1.5 font-sans text-[13px] font-semibold text-ink hover:bg-paper focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-60"
        >
          {t(ACCOUNT.remindMeYes)}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void answer(false)}
          className="flex-1 rounded-md border border-rule px-3 py-1.5 font-sans text-[13px] font-semibold text-ink hover:bg-paper focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-60"
        >
          {t(ACCOUNT.remindMeNo)}
        </button>
      </div>
    </div>
  );
}
