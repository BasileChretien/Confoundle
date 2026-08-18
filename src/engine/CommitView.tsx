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
 * The commit step, a wager. First pick a choice, then stake how sure you are.
 * Conviction is what makes the reveal land: being confidently wrong stings,
 * being right and certain feels earned. Committing has no "skip" or "peek".
 *
 * IT IS NO LONGER PINNED TO THE FOOT OF THE SCREEN, and the question it used to
 * carry now lives in `SetupView`, which explains why. In short: answers written
 * as whole sentences run to 496px on a phone, and pinning them left a 188px
 * slot to read a 229-word setup and a 384px figure through. The ask is what a
 * reader needs in view while reading, so the ask is what stayed pinned.
 *
 * Nothing here changed about the wager itself. The confidence row still appears
 * only once a choice is picked, and it appears directly beneath the button just
 * tapped, which is where the reader already is.
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
      className="flex flex-col gap-2"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
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
              <span className="min-w-0 text-base font-semibold text-ink">
                {t(choice.label)}
              </span>
              {choice.sublabel ? (
                // min-w-0 + shrink lets a long, descriptive sublabel wrap instead
                // of forcing the row wider than the phone; a short numeric one
                // still sits on a single line to the right.
                <span className="min-w-0 shrink text-right tabular-nums text-sm text-ink-soft">
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
