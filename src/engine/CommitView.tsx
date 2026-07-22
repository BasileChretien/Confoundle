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
    <div className="flex flex-col gap-2.5">
      <p className="text-center font-display text-lg font-medium text-ink">
        {t(puzzle.setup.question)}
      </p>
      <div className="grid gap-2">
        {puzzle.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => onCommit(choice)}
            className="group flex items-center justify-between gap-3 rounded-lg border border-rule bg-paper-2 px-5 py-3.5 text-left transition-[transform,background-color,border-color] duration-200 hover:border-ink/40 hover:bg-paper-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[.99]"
          >
            <span className="text-base font-semibold text-ink">
              {t(choice.label)}
            </span>
            {choice.sublabel ? (
              <span className="shrink-0 tabular-nums text-sm text-ink-soft">
                {t(choice.sublabel)}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <p className="text-center font-sans text-[11px] uppercase tracking-eyebrow text-ink-mute">
        Commit to see the reveal — no peeking
      </p>
    </div>
  );
}
