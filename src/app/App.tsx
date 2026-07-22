import { useState } from "react";
import { getPuzzleBySlug, getTodaysPuzzle, puzzles } from "../puzzles";
import { PuzzleFlow } from "../engine/PuzzleFlow";
import { hasPlayedToday } from "./session";
import { LocaleProvider, useT } from "./i18n";

/** Which puzzle to open first: an explicit ?p=<slug>, else today's daily. */
function initialSlug(): string {
  const requested = new URLSearchParams(window.location.search).get("p");
  if (requested && getPuzzleBySlug(requested)) return requested;
  // Demo build opens on the flagship (Simpson's); real build follows the daily.
  return __DEMO__ ? puzzles[0].slug : getTodaysPuzzle().slug;
}

export default function App() {
  const [slug, setSlug] = useState(initialSlug);
  const puzzle = getPuzzleBySlug(slug) ?? getTodaysPuzzle();
  const played = hasPlayedToday(puzzle.slug);

  return (
    <LocaleProvider locale="en">
      <div className="min-h-[100dvh] bg-paper">
        <main className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pb-6 pt-4">
          <header className="mb-4 flex items-end justify-between border-b border-rule pb-3">
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
                Daily · reasoning
              </div>
            </div>
            {played ? (
              <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                Played today
              </span>
            ) : null}
          </header>

          {__DEMO__ ? <DemoPicker current={slug} onPick={setSlug} /> : null}

          <div className="flex-1">
            {/* Re-key on slug so switching puzzles resets the flow to its first beat. */}
            <PuzzleFlow key={slug} puzzle={puzzle} />
          </div>

          <footer className="mt-6 border-t border-rule pt-3 text-center font-sans text-[10px] uppercase tracking-eyebrow text-ink-mute">
            No accounts · no tracking · just the reasoning
          </footer>
        </main>
      </div>
    </LocaleProvider>
  );
}

interface DemoPickerProps {
  current: string;
  onPick: (slug: string) => void;
}

/**
 * Demo-only affordance (single-file build): jump between all puzzles so a
 * one-off visitor can try every reasoning trap. The real daily build ships
 * without this — one puzzle a day is the point.
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
