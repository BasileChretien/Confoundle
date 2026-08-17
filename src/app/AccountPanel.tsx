import { useEffect, useRef, useState } from "react";
import type { LocalizedText } from "../puzzles/schema";
import { useT } from "./i18n";
import { useAuth } from "./auth";
import { renderGoogleButton } from "./googleSignIn";
import { ReminderToggle } from "./ReminderToggle";
import { ReminderChoice } from "./ReminderChoice";
import { ContributeToggle } from "./ContributeToggle";
import { ACCOUNT } from "./ui";

/**
 * The account panel: sign in, sync, take your data, delete everything.
 *
 * Two things it deliberately does NOT do. It never blocks a puzzle, and it
 * never appears unbidden. An account buys one thing, a review schedule that
 * follows you between devices, and nothing else in the app is gated on it.
 *
 * The deletion control sits at the same level as the rest, not buried three
 * screens down behind a support form. Erasure is a right, and a right that is
 * hard to find is most of the way to not existing.
 */

/** Server error codes to something a person can act on. */
function messageFor(code: string): LocalizedText {
  switch (code) {
    case "network":
      return ACCOUNT.errNetwork;
    case "bad-email":
      return ACCOUNT.errBadEmail;
    case "bad-code":
      return ACCOUNT.errBadCode;
    case "too-many-attempts":
      return ACCOUNT.errTooManyAttempts;
    case "too-many-requests":
      return ACCOUNT.errTooManyRequests;
    case "code-just-sent":
      return ACCOUNT.errCodeJustSent;
    case "email-already-linked":
      return ACCOUNT.errEmailLinked;
    case "email-not-configured":
      return ACCOUNT.errEmailUnavailable;
    default:
      return ACCOUNT.errGeneric;
  }
}

const buttonBase =
  "rounded-md px-3 py-2 font-sans text-[13px] font-semibold transition focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50";
const primaryButton = `${buttonBase} bg-ink text-paper hover:bg-ink-soft`;
const quietButton = `${buttonBase} border border-rule bg-paper text-ink hover:bg-paper-3`;
const inputStyle =
  "w-full rounded-md border border-rule bg-paper px-3 py-2 font-sans text-[14px] text-ink placeholder:text-ink-mute focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand";

export function AccountPanel() {
  const t = useT();
  const auth = useAuth();
  const [open, setOpen] = useState(false);

  // Nothing to offer on a build with no functions behind it.
  if (auth.status === "loading" || auth.status === "unavailable") return null;

  const signedIn = auth.status === "signed-in";

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute underline decoration-rule underline-offset-4 hover:text-ink focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
      >
        {signedIn ? t(ACCOUNT.signedIn) : t(ACCOUNT.signIn)}
      </button>
      {open ? (
        <div className="mt-2 rounded-lg border border-rule bg-paper-2 p-4">
          {signedIn ? <SignedIn onClose={() => setOpen(false)} /> : <SignedOut />}
        </div>
      ) : null}
    </div>
  );
}

function SignedOut() {
  const t = useT();
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"idle" | "sent">("idle");
  const [busy, setBusy] = useState(false);
  const googleSlot = useRef<HTMLDivElement>(null);

  const clientId = auth.methods.googleClientId;

  useEffect(() => {
    const slot = googleSlot.current;
    if (!clientId || !slot) return;
    let alive = true;
    renderGoogleButton(slot, clientId, (credential) => {
      if (!alive) return;
      setBusy(true);
      void auth.signInWithGoogle(credential).then((err) => {
        if (!alive) return;
        setBusy(false);
        setError(err);
      });
    }).catch(() => {
      // An ad blocker, an offline device, or a network that cannot reach
      // Google. Say so plainly and leave the email route working.
      if (alive) setError("google-blocked");
    });
    return () => {
      alive = false;
    };
  }, [clientId, auth]);

  async function send() {
    setBusy(true);
    const err = await auth.requestCode(email);
    setBusy(false);
    setError(err);
    if (!err) setStage("sent");
  }

  async function confirm() {
    setBusy(true);
    const err = await auth.submitCode(email, code);
    setBusy(false);
    setError(err);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-sans text-[13px] leading-snug text-ink-soft">
        {t(ACCOUNT.blurb)}
      </p>

      {clientId ? <div ref={googleSlot} className="flex justify-center" /> : null}

      {clientId && auth.methods.email ? (
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-rule" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {t(ACCOUNT.or)}
          </span>
          <span className="h-px flex-1 bg-rule" />
        </div>
      ) : null}

      {auth.methods.email ? (
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-1">
            <span className="sr-only">{t(ACCOUNT.emailLabel)}</span>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t(ACCOUNT.emailPlaceholder)}
              className={inputStyle}
            />
          </label>
          {stage === "sent" ? (
            <>
              <p className="font-sans text-[12px] text-ink-soft">{t(ACCOUNT.codeSent)}</p>
              <label className="flex flex-col gap-1">
                <span className="sr-only">{t(ACCOUNT.codeLabel)}</span>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  placeholder={t(ACCOUNT.codePlaceholder)}
                  className={`${inputStyle} tracking-[0.4em] tabular-nums`}
                />
              </label>
              <button
                type="button"
                className={primaryButton}
                disabled={busy || code.length !== 6}
                onClick={() => void confirm()}
              >
                {t(ACCOUNT.confirm)}
              </button>
            </>
          ) : (
            <button
              type="button"
              className={primaryButton}
              disabled={busy || email.length < 3}
              onClick={() => void send()}
            >
              {t(ACCOUNT.sendCode)}
            </button>
          )}
        </div>
      ) : null}

      {error ? <ErrorLine code={error} /> : null}
      <PrivacyNote />
    </div>
  );
}

function SignedIn({ onClose }: { onClose: () => void }) {
  const t = useT();
  const auth = useAuth();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /**
   * Bumped when the question below is answered, purely to remount the toggle.
   *
   * Both components read the same preference and each fetches it once on mount,
   * so answering "yes, remind me" wrote the new value and left the toggle
   * directly underneath still drawing the state it had loaded a moment earlier:
   * off. Somebody who had just consented was shown a switch saying they had
   * not, and flipping it to correct that would have turned the reminder back
   * off. Remounting is enough, and it keeps the two components from having to
   * know about each other.
   */
  const [prefsVersion, setPrefsVersion] = useState(0);

  async function erase() {
    setBusy(true);
    const err = await auth.eraseAccount();
    setBusy(false);
    if (err) setError(err);
    else onClose();
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t(ACCOUNT.signedInAs)}
        </span>
        <span className="break-all font-sans text-[14px] font-semibold text-ink">
          {auth.account?.email}
        </span>
        {auth.syncedSkills != null ? (
          <span className="font-sans text-[12px] text-ink-soft">
            {t(ACCOUNT.inSync).replace("{n}", String(auth.syncedSkills))}
          </span>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <a className={quietButton} href={auth.exportUrl} download="confoundle-data.json">
          {t(ACCOUNT.download)}
        </a>
        <button type="button" className={quietButton} onClick={() => void auth.signOut()}>
          {t(ACCOUNT.signOut)}
        </button>
      </div>

      <ReminderChoice onAnswered={() => setPrefsVersion((n) => n + 1)} />
      <ReminderToggle key={prefsVersion} />
      <ContributeToggle />

      <div className="border-t border-rule pt-3">
        {confirming ? (
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[13px] leading-snug text-ink">
              {t(ACCOUNT.deleteWarning)}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => void erase()}
                className={`${buttonBase} bg-rust text-paper hover:opacity-90`}
              >
                {t(ACCOUNT.deleteYes)}
              </button>
              <button
                type="button"
                className={quietButton}
                onClick={() => setConfirming(false)}
              >
                {t(ACCOUNT.cancel)}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="font-sans text-[12px] font-semibold text-rust underline underline-offset-4 hover:opacity-80 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
          >
            {t(ACCOUNT.delete)}
          </button>
        )}
      </div>

      {error ? <ErrorLine code={error} /> : null}
      <PrivacyNote />
    </div>
  );
}

function ErrorLine({ code }: { code: string }) {
  const t = useT();
  return (
    <p role="alert" className="font-sans text-[12px] font-semibold text-rust">
      {code === "google-blocked" ? t(ACCOUNT.errGoogleBlocked) : t(messageFor(code))}
    </p>
  );
}

function PrivacyNote() {
  const t = useT();
  return (
    <p className="border-t border-rule pt-3 font-sans text-[11px] leading-snug text-ink-mute">
      {t(ACCOUNT.privacyNote)}{" "}
      <a
        className="underline underline-offset-2 hover:text-ink"
        href="/privacy.html"
        target="_blank"
        rel="noreferrer"
      >
        {t(ACCOUNT.privacyLink)}
      </a>
    </p>
  );
}
