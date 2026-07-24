import { useEffect, useState } from "react";
import { getPuzzleBySlug, puzzles } from "../puzzles";
import { PuzzleFlow } from "../engine/PuzzleFlow";
import { ReviewView } from "../engine/ReviewView";
import { LessonList } from "../engine/LessonList";
import { DashboardView } from "../engine/DashboardView";
import { reviews } from "./reviews";
import { LocaleProvider, useT } from "./i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AccountPanel } from "./AccountPanel";
import { AuthProvider } from "./auth";
import { UI } from "./ui";

/**
 * Which lesson to open on arrival, or null for the list.
 *
 * A shared `?p=<slug>` link still opens straight into that lesson, which is the
 * whole point of a shareable link. Everything else starts on the list now: the
 * daily gate is gone, so there is no single puzzle the app can claim is today's.
 */
function initialSlug(): string | null {
  const requested = new URLSearchParams(window.location.search).get("p");
  if (requested && getPuzzleBySlug(requested)) return requested;
  return __DEMO__ ? puzzles[0].slug : null;
}

export default function App() {
  // The provider must wrap the content so the switcher and useT below it react.
  return (
    <LocaleProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </LocaleProvider>
  );
}

function AppShell() {
  const t = useT();
  const [slug, setSlug] = useState<string | null>(initialSlug);
  const [reviewing, setReviewing] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [dueCount, setDueCount] = useState(0);
  const [learnedCount, setLearnedCount] = useState(0);
  // Bumped each time a session ends, so the next one draws a different scenario.
  const [round, setRound] = useState(0);
  const puzzle = slug ? getPuzzleBySlug(slug) : undefined;

  // How many skills the scheduler says are due. Rechecked when a session ends
  // (progress changed) and when the open lesson changes (finishing one can
  // enrol a new skill onto the ladder).
  useEffect(() => {
    let alive = true;
    void reviews.reviewsDue().then((n) => {
      if (alive) setDueCount(n);
    });
    void reviews.progress().then((p) => {
      if (alive) setLearnedCount(p.length);
    });
    return () => {
      alive = false;
    };
  }, [reviewing, slug, showProgress]);

  return (
    <div className="min-h-dvh bg-paper">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-6 pt-4">
        <header className="mb-4 flex items-start justify-between gap-3 border-b border-rule pb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xl font-semibold tracking-tight text-ink">
                Confoundle
              </span>
              <span
                className="h-1.5 w-1.5 rounded-[1px] bg-rust"
                aria-hidden="true"
              />
            </div>
            <div className="mt-0.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
              {t(UI.lessons)} · {t(UI.reasoning)}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <LanguageSwitcher />
          </div>
        </header>

        <AccountPanel />

        <div className="flex-1">
          {reviewing ? (
            <ReviewView
              seed={round}
              onDone={() => {
                setReviewing(false);
                setRound((r) => r + 1);
              }}
            />
          ) : puzzle ? (
            <>
              <button
                type="button"
                onClick={() => setSlug(null)}
                className="mb-3 -ml-1 inline-flex items-center gap-1.5 rounded-md px-1 py-1 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute transition hover:text-ink focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
              >
                ← {t(UI.allLessons)}
              </button>
              {/* Re-key on slug so switching lessons resets the flow to its first beat. */}
              <PuzzleFlow key={slug} puzzle={puzzle} />
            </>
          ) : showProgress ? (
            <DashboardView onDone={() => setShowProgress(false)} />
          ) : (
            <>
              {learnedCount > 0 ? (
                <button
                  type="button"
                  onClick={() => setShowProgress(true)}
                  className="mb-3 flex w-full items-center justify-between gap-3 rounded-lg border border-rule bg-paper-2 px-3 py-2.5 text-left transition hover:border-ink/40 hover:bg-paper-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                    {t(UI.progress)}
                  </span>
                  <span className="font-display text-sm font-semibold text-ink">
                    {learnedCount} / {puzzles.length} →
                  </span>
                </button>
              ) : null}
              {dueCount > 0 ? (
                <button
                  type="button"
                  onClick={() => setReviewing(true)}
                  className="mb-4 flex w-full items-center gap-3 rounded-lg border border-gold/40 border-l-4 border-l-gold bg-gold/8 p-3 text-left transition hover:bg-gold/[0.14] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span className="text-xl">🎯</span>
                  <span className="flex flex-col">
                    <span className="font-display text-base font-semibold text-ink">
                      {t(UI.reviewsDue)}: {dueCount}
                    </span>
                    <span className="text-[13px] text-ink-soft">
                      {t(UI.reviewsBlurb)}
                    </span>
                  </span>
                </button>
              ) : null}
              <LessonList onOpen={setSlug} />
            </>
          )}
        </div>

        <footer className="mt-6 border-t border-rule pt-3 text-center font-sans text-[10px] uppercase tracking-eyebrow text-ink-mute">
          {t(UI.footer)}
        </footer>
      </main>
    </div>
  );
}
