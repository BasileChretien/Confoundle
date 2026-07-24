import { useState } from "react";
import type { Choice, Puzzle } from "../puzzles/schema";
import { useT } from "../app/i18n";
import { CONFIDENCE_LEVELS, type Confidence } from "./scoring";

const CONFIDENCE_LABEL: Record<Confidence, string> = {
  hunch: "Hunch",
  sure: "Fairly sure",
  certain: "Certain",
};

/**
 * The commit step, now a wager. First pick a choice, then stake how sure you
 * are. Conviction is what makes the reveal land: being confidently wrong stings,
 * being right and certain feels earned. Committing has no "skip" or "peek".
 */
export function CommitView({
  puzzle,
  onCommit,
}: {
  puzzle: Puzzle;
  onCommit: (choice: Choice, confidence: Confidence) => void;
}) {
  const t = useT();
  const [selected, setSelected] = useState<Choice | null>(null);

  return (
    <div
      className="sticky bottom-0 z-10 -mx-5 flex flex-col gap-2 border-t border-rule bg-paper px-5 pt-3 shadow-[0_-10px_20px_-12px_rgba(34,29,21,0.22)]"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <p className="text-center font-display text-base font-medium text-ink">
        {t(puzzle.setup.question)}
      </p>

      <div className="grid gap-2">
        {puzzle.choices.map((choice) => {
          const active = selected?.id === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => setSelected(choice)}
              aria-pressed={active}
              className={
                "group flex items-center justify-between gap-3 rounded-lg border px-5 py-3 text-left transition-[transform,background-color,border-color] duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[.99] " +
                (active
                  ? "border-ink bg-paper-3 ring-1 ring-ink"
                  : "border-rule bg-paper-2 hover:border-ink/40 hover:bg-paper-3")
              }
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
          );
        })}
      </div>

      {selected ? (
        <div className="cf-enter-sm flex flex-col gap-1.5 pt-0.5">
          <span className="text-center font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {t({ en: "How sure are you?" })}
          </span>
          <div className="grid grid-cols-3 gap-2">
            {CONFIDENCE_LEVELS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onCommit(selected, c)}
                className="rounded-lg border border-rule bg-paper-2 px-2 py-2.5 font-sans text-[13px] font-semibold text-ink transition hover:border-ink/40 hover:bg-paper-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand active:scale-[.98]"
              >
                {t({ en: CONFIDENCE_LABEL[c] })}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center font-sans text-[11px] uppercase tracking-eyebrow text-ink-mute">
          {t({ en: "Pick one, then stake how sure you are" })}
        </p>
      )}
    </div>
  );
}
