import React from "react";
import { initialLocale, translate } from "./i18n";
import { UI } from "./ui";

/**
 * The one thing standing between a thrown render and a blank installed app.
 *
 * THERE WAS NOTHING HERE. No `componentDidCatch`, no
 * `getDerivedStateFromError`, anywhere in the source. React unmounts the entire
 * tree when a render throws, so any single mistake in any component, in any
 * beat, took the whole product to a white screen with no message and no way
 * back. In a browser tab that is a refresh; in an installed PWA opened from a
 * home screen it looks like the app is broken.
 *
 * IT SITS ABOVE `LocaleProvider`, which is why it cannot use `useT`. Put it
 * inside and a failure in the provider itself, or in the dictionary loading it
 * does, is exactly the failure nothing catches. So it resolves the locale the
 * same way the provider's first render does, from the stored choice and then
 * the browser, and translates through `UI`, which carries all ten languages
 * inline and needs no fetch. A fallback that could only speak English would
 * tell nine readers in ten that something broke, in a language they did not
 * choose, at the one moment the app has nothing else to offer.
 *
 * IT PROMISES WHAT IT CAN KEEP. Everything a player has done lives in this
 * device's own storage, so a crash cannot cost them their streak or their
 * schedule, and the message says so. It does not offer to report anything:
 * there is no error-reporting service in this project and adding one here
 * would be collecting personal data at the moment somebody is least able to
 * consent to it.
 */
/**
 * The screen itself, exported because nothing else can reach it.
 *
 * `renderToStaticMarkup` does not invoke error boundaries: a throw propagates
 * straight out of it, so a test of `ErrorBoundary` can only prove that the
 * happy path passes children through. Splitting the fallback out makes the
 * failed state renderable, which is the same seam `CrowdLinesView`,
 * `StakeReadout` and `RunStripShare` all needed for the same reason.
 */
export function CrashScreen() {
  const locale = initialLocale();
  const t = (key: keyof typeof UI) => translate(UI[key]!, locale);

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 px-5 py-10 text-ink">
      <h1 className="font-display text-[26px] font-semibold leading-tight">
        {t("crashTitle")}
      </h1>
      <p className="text-[15px] leading-relaxed text-ink-soft">
        {t("crashBody")}
      </p>
      <button
        type="button"
        // A full reload rather than a state reset: whatever put the tree in a
        // bad state may still be in memory, and a player wants the app back
        // rather than a second attempt at the same crash.
        onClick={() => window.location.reload()}
        className="rounded-lg border border-ink bg-ink px-5 py-3 font-sans text-[15px] font-semibold text-paper focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        {t("crashReload")}
      </button>
    </div>
  );
}

interface State {
  failed: boolean;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown): void {
    // The console and nowhere else. A developer opening devtools sees it; no
    // request leaves the device, because the alternative is transmitting a
    // stack trace, which can carry anything that was on screen.
    // eslint-disable-next-line no-console
    console.error("[confoundle] render failed", error);
  }

  render(): React.ReactNode {
    return this.state.failed ? <CrashScreen /> : this.props.children;
  }
}
