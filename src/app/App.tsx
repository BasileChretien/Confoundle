import { useCallback, useEffect, useRef, useState } from "react";
import { getPuzzleBySlug } from "../puzzles";
import { PuzzleFlow } from "../engine/PuzzleFlow";
import { ReviewView } from "../engine/ReviewView";
import { HomeView } from "../engine/HomeView";
import { DashboardView } from "../engine/DashboardView";
import { reviews } from "./reviews";
import { HOME, sameView, searchForView, viewFromSearch, type View } from "./navigation";
import type { SkillProgress } from "../srs/schedule";
import { LocaleProvider, useT } from "./i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AccountPanel } from "./AccountPanel";
import { AuthProvider } from "./auth";
import { UI } from "./ui";

/**
 * Navigation, on the History API rather than in component state.
 *
 * Every transition pushes an entry, so the phone back button goes up a level
 * instead of leaving the app, the address bar names the open lesson (which is
 * what makes a shared link possible), and a refresh returns you where you were.
 * `popstate` is the only path that sets the view without pushing, otherwise
 * going back would push a new entry and trap the user.
 */
function useViewNavigation(): [View, (next: View) => void] {
  const [view, setView] = useState<View>(() => viewFromSearch(window.location.search));

  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const restored = (e.state as { view?: View } | null)?.view;
      setView(restored ?? viewFromSearch(window.location.search));
    };
    window.addEventListener("popstate", onPop);
    // Make the entry the app opened on carry its own state, so the first back
    // out of a lesson has something to restore rather than a null.
    window.history.replaceState({ view }, "", window.location.href);
    return () => window.removeEventListener("popstate", onPop);
    // Runs once: the listener reads live state via setView.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = useCallback(
    (next: View) => {
      setView((current) => {
        if (sameView(current, next)) return current;
        window.history.pushState({ view: next }, "", searchForView(next));
        return next;
      });
    },
    [],
  );

  return [view, go];
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
  const [view, go] = useViewNavigation();
  const [dueCount, setDueCount] = useState(0);
  const [progress, setProgress] = useState<SkillProgress[]>([]);
  // Bumped each time a session ends, so the next one draws a different scenario.
  const [round, setRound] = useState(0);
  const puzzle = view.name === "lesson" ? getPuzzleBySlug(view.slug) : undefined;

  /**
   * Move focus to the page heading on every view change. Swapping the subtree
   * destroyed the focused element, dumping keyboard users back to the top of
   * the document and telling screen reader users nothing had happened.
   */
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [view]);

  // How many skills the scheduler says are due. Rechecked when a session ends
  // (progress changed) and when the open lesson changes (finishing one can
  // enrol a new skill onto the ladder).
  useEffect(() => {
    let alive = true;
    void reviews.reviewsDue().then((n) => {
      if (alive) setDueCount(n);
    });
    void reviews.progress().then((p) => {
      if (alive) setProgress(p);
    });
    return () => {
      alive = false;
    };
  }, [view]);

  return (
    <div className="min-h-dvh bg-paper">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-6 pt-4">
        <header className="mb-4 flex items-start justify-between gap-3 border-b border-rule pb-3">
          <div>
            <div className="flex items-center gap-1.5">
              {/* The app had no h1 at all: every screen began at level 2. It
                  doubles as the focus target after a view change, so keyboard
                  and screen reader users land somewhere meaningful. */}
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="font-display text-xl font-semibold tracking-tight text-ink outline-hidden"
              >
                Confoundle
              </h1>
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
          {view.name === "review" ? (
            <ReviewView
              seed={round}
              practice={view.practice}
              onDone={() => {
                setRound((r) => r + 1);
                go(HOME);
              }}
            />
          ) : puzzle ? (
            <>
              <button
                type="button"
                onClick={() => go(HOME)}
                className="mb-3 -ms-2 inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute transition hover:text-ink focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
              >
                {t(UI.allLessons)}
              </button>
              {/* Re-key on slug so switching lessons resets the flow to its first beat. */}
              <PuzzleFlow key={puzzle.slug} puzzle={puzzle} />
            </>
          ) : view.name === "progress" ? (
            <DashboardView
              onDone={() => go(HOME)}
              onStartReviews={() => go({ name: "review", practice: false })}
              onPractise={() => go({ name: "review", practice: true })}
              onOpenLesson={(next) => go({ name: "lesson", slug: next })}
            />
          ) : (
            <HomeView
              progress={progress}
              dueCount={dueCount}
              onOpenLesson={(next) => go({ name: "lesson", slug: next })}
              onStartReviews={() => go({ name: "review", practice: false })}
              onOpenProgress={() => go({ name: "progress" })}
            />
          )}
        </div>

        <footer className="mt-6 border-t border-rule pt-3 text-center font-sans text-[10px] uppercase tracking-eyebrow text-ink-mute">
          {t(UI.footer)}
        </footer>
      </main>
    </div>
  );
}
