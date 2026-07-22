import { getTodaysPuzzle } from "../puzzles";
import { PuzzleFlow } from "../engine/PuzzleFlow";
import { hasPlayedToday } from "./session";
import { LocaleProvider } from "./i18n";

export default function App() {
  const puzzle = getTodaysPuzzle();
  const played = hasPlayedToday(puzzle.slug);

  return (
    <LocaleProvider locale="en">
      <div className="min-h-[100dvh] bg-paper">
        <main className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pb-8 pt-5">
          <header className="mb-5 flex items-end justify-between border-b border-rule pb-3">
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

          <div className="flex-1">
            <PuzzleFlow puzzle={puzzle} />
          </div>

          <footer className="mt-8 border-t border-rule pt-3 text-center font-sans text-[10px] uppercase tracking-eyebrow text-ink-mute">
            No accounts · no tracking · just the reasoning
          </footer>
        </main>
      </div>
    </LocaleProvider>
  );
}
