import type { Choice, Puzzle } from "../puzzles/schema";
import { useT } from "../app/i18n";

/**
 * The commit step. Selecting a choice is the commitment that makes the reveal
 * land — there is deliberately no "skip" or "peek". Choices render as real
 * buttons (keyboard-navigable, large tap targets) in authored order.
 */
export function CommitView({
  puzzle,
  onCommit,
}: {
  puzzle: Puzzle;
  onCommit: (choice: Choice) => void;
}) {
  const t = useT();
  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-lg font-semibold text-white">
        {t(puzzle.setup.question)}
      </p>
      <div className="grid gap-3">
        {puzzle.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => onCommit(choice)}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-left transition hover:border-white/25 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[.99]"
          >
            <span className="text-base font-semibold text-white">
              {t(choice.label)}
            </span>
            {choice.sublabel ? (
              <span className="shrink-0 text-sm tabular-nums text-slate-400">
                {t(choice.sublabel)}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-slate-500">
        Commit to see the reveal — no peeking.
      </p>
    </div>
  );
}
