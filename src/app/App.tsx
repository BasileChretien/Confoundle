import { getTodaysPuzzle } from "../puzzles";
import { PuzzleFlow } from "../engine/PuzzleFlow";
import { hasPlayedToday } from "./session";
import { LocaleProvider } from "./i18n";

export default function App() {
  const puzzle = getTodaysPuzzle();
  const played = hasPlayedToday(puzzle.slug);

  return (
    <LocaleProvider locale="en">
      <div className="min-h-[100dvh] bg-gradient-to-b from-slate-950 via-indigo-950/40 to-slate-950">
        <main className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pb-8 pt-5">
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-indigo-400 to-violet-500"
                aria-hidden="true"
              />
              <span className="text-lg font-extrabold tracking-tight text-white">
                Confoundle
              </span>
            </div>
            {played ? (
              <span className="text-[11px] text-slate-500">Played today</span>
            ) : null}
          </header>

          <div className="flex-1">
            <PuzzleFlow puzzle={puzzle} />
          </div>

          <footer className="mt-8 text-center text-[11px] text-slate-600">
            No accounts. No tracking. Just the reasoning.
          </footer>
        </main>
      </div>
    </LocaleProvider>
  );
}
