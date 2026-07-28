import { useEffect, useState } from "react";
import { useLocale, useT } from "./i18n";
import { ACCOUNT } from "./ui";

/**
 * The one email this app will ever send you that you did not just ask for.
 *
 * Off unless switched on, and the copy states the whole contract on the same
 * line as the checkbox: at most one a day, only when something is overdue.
 * Somebody deciding whether to tick a box should not have to go and find out
 * what they are agreeing to.
 *
 * The control hides itself entirely on a deployment with no mail provider
 * configured, rather than accepting a preference that can never be honoured.
 * That is the same rule the sign-in panel already follows.
 */

interface Prefs {
  optedIn: boolean;
  lastSentAt: number | null;
  available: boolean;
}

export function ReminderToggle() {
  const t = useT();
  const locale = useLocale();
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

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
        // Offline, or no functions behind this build. Either way the control
        // simply does not appear; nothing here is worth an error message.
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  if (!prefs?.available) return null;

  async function choose(optedIn: boolean) {
    setBusy(true);
    setFailed(false);
    // Optimistic, then corrected by the server's answer. The failure path puts
    // the checkbox back where it was, because a control that shows a state the
    // server does not hold is how somebody ends up believing they unsubscribed.
    setPrefs((p) => (p ? { ...p, optedIn } : p));
    try {
      const response = await fetch("/api/reminders", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        // The locale travels with the choice so the email is written in the
        // language the app is being read in right now.
        body: JSON.stringify({ optedIn, locale }),
      });
      if (!response.ok) throw new Error("rejected");
      const data = (await response.json()) as { optedIn: boolean };
      setPrefs((p) => (p ? { ...p, optedIn: data.optedIn } : p));
    } catch {
      setPrefs((p) => (p ? { ...p, optedIn: !optedIn } : p));
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="border-t border-rule pt-3">
      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={prefs.optedIn}
          disabled={busy}
          onChange={(e) => void choose(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-brand focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        />
        <span className="min-w-0">
          <span className="block font-sans text-[13px] font-semibold text-ink">
            {t(ACCOUNT.remindMe)}
          </span>
          <span className="block font-sans text-[12px] leading-snug text-ink-soft">
            {t(ACCOUNT.remindMeBlurb)}
          </span>
        </span>
      </label>
      {failed ? (
        <p className="mt-2 font-sans text-[12px] text-rust">
          {t(ACCOUNT.errGeneric)}
        </p>
      ) : null}
    </div>
  );
}
