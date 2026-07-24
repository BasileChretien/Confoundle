import { useState } from "react";
import { getPuzzleBySlug, getTodaysPuzzle, puzzles } from "../puzzles";
import { PuzzleFlow } from "../engine/PuzzleFlow";
import {
  hasPlayedToday,
  getLearned,
  getHuntState,
  todayDayNumber,
} from "./session";
import { TrapHuntView } from "../engine/TrapHuntView";
import { checkpointDue, reviewDue } from "../engine/trapHunt";
import { LocaleProvider, useT } from "./i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AccountPanel } from "./AccountPanel";
import { AuthProvider } from "./auth";
import { UI } from "./ui";

/** Which puzzle to open first: an explicit ?p=<slug>, else today's daily. */
function initialSlug(): string {
  const requested = new URLSearchParams(window.location.search).get("p");
  if (requested && getPuzzleBySlug(requested)) return requested;
  // Demo build opens on the flagship (Simpson's); real build follows the daily.
  return __DEMO__ ? puzzles[0].slug : getTodaysPuzzle().slug;
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
  const [slug, setSlug] = useState(initialSlug);
  const [hunting, setHunting] = useState(false);
  const puzzle = getPuzzleBySlug(slug) ?? getTodaysPuzzle();
  const played = hasPlayedToday(puzzle.slug);

  // A checkpoint opens once enough biases are learned; a review comes weekly.
  const learned = getLearned();
  const hunt = getHuntState();
  const huntDue =
    learned.length > 0 &&
    (checkpointDue(learned.length, hunt.lastCheckpointAt) ||
      reviewDue(hunt.lastReviewDay, todayDayNumber()));

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
              {t(UI.daily)} · {t(UI.reasoning)}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <LanguageSwitcher />
            {played ? (
              <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                {t(UI.playedToday)}
              </span>
            ) : null}
          </div>
        </header>

        <AccountPanel />

        {__DEMO__ ? <DemoPicker current={slug} onPick={setSlug} /> : null}

        <div className="flex-1">
          {hunting ? (
            <TrapHuntView onDone={() => setHunting(false)} />
          ) : (
            <>
              {huntDue ? (
                <button
                  type="button"
                  onClick={() => setHunting(true)}
                  className="mb-4 flex w-full items-center gap-3 rounded-lg border border-gold/40 border-l-4 border-l-gold bg-gold/8 p-3 text-left transition hover:bg-gold/[0.14] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span className="text-xl">🎯</span>
                  <span className="flex flex-col">
                    <span className="font-display text-base font-semibold text-ink">
                      {t({ en: "Trap Hunt unlocked" })}
                    </span>
                    <span className="text-[13px] text-ink-soft">
                      {t({ en: "Can you still spot the traps?" })}
                    </span>
                  </span>
                </button>
              ) : null}
              {/* Re-key on slug so switching puzzles resets the flow to its first beat. */}
              <PuzzleFlow key={slug} puzzle={puzzle} />
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

interface DemoPickerProps {
  current: string;
  onPick: (slug: string) => void;
}

/**
 * Demo-only affordance (single-file build): jump between all puzzles so a
 * one-off visitor can try every reasoning trap. The real daily build ships
 * without this, one puzzle a day is the point.
 */
function DemoPicker({ current, onPick }: DemoPickerProps) {
  const t = useT();
  return (
    <div className="mb-5 flex flex-col gap-2 rounded-lg border border-rule bg-paper-2 p-3">
      <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        Demo · try any puzzle
      </span>
      <div className="flex flex-wrap gap-1.5">
        {puzzles.map((p) => {
          const active = p.slug === current;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => onPick(p.slug)}
              aria-pressed={active}
              className={
                "rounded-md px-2.5 py-1 font-sans text-[12px] font-semibold transition " +
                (active
                  ? "bg-ink text-paper"
                  : "border border-rule bg-paper text-ink hover:bg-paper-3")
              }
            >
              {t(p.lesson.skillName)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
