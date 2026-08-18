import type { Choice, Puzzle } from "../puzzles/schema";
import { useT } from "../app/i18n";
import { Badge } from "./ui";
import { CommitView } from "./CommitView";
import {
  DataViewRenderer,
  dataTitle,
  scopeLabel,
} from "./charts/DataViewRenderer";
import { Legend } from "./charts/RateChart";
import { TagChips } from "./TagChips";
import type { Confidence } from "./scoring";

function humanize(category: string): string {
  const spaced = category.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * Beat 1+2: the setup (framing + data plate) and the commit, on one screen.
 * The plate renders the puzzle's authored `initialView`, never the answer.
 */
export function SetupView({
  puzzle,
  onCommit,
}: {
  puzzle: Puzzle;
  onCommit: (choice: Choice, confidence: Confidence) => void;
}) {
  const t = useT();
  const data = puzzle.setup.data;

  return (
    <section className="flex flex-col gap-3">
      {/*
        THE READING REGION, and the reason it is a wrapper rather than nothing.

        The commit bar used to be `sticky bottom-0` with the question inside it,
        so everything a player had to read was read through whatever the bar
        left over. Measured on a 375x812 phone that was 626px of 812 on
        `back-where-it-started`, a 77% bar over a 188px slot, and the choices
        are what fill it: four answers written as whole sentences come to 496px
        on their own. The figure is 384px, so it could not be seen entire at any
        scroll position, on a deck whose whole method is that the setup and the
        reveal are two views of one figure.

        So the question stays pinned and the answers do not. What a reader needs
        while reading is the prose, the figure and the ask; four essay-length
        buttons are needed at the moment of deciding and not before. This
        wrapper is what makes that possible: `bottom-0` pins the question only
        while its containing block runs past the foot of the screen, so it rides
        above the figure during the read and settles into place directly over
        the choices as they arrive. Ending the block here rather than around the
        whole beat is the entire trick, since a sticky element pinned inside a
        block that also held the answers would hang over them instead.
      */}
      <div className="flex flex-col gap-3">
        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="rust">{t({ en: humanize(puzzle.category) })}</Badge>
            <TagChips tags={puzzle.tags} />
          </div>
          <h2 className="font-display text-[25px] font-semibold leading-[1.1] text-ink">
            {t(puzzle.setup.headline)}
          </h2>
          <p className="text-[15px] leading-snug text-ink-soft">
            {t(puzzle.setup.framing)}
          </p>
        </header>

        <figure className="rounded-lg border border-rule bg-paper-2 p-3.5">
          <figcaption className="mb-2.5 flex items-center justify-between border-b border-rule pb-2">
            <Badge tone="ink">{t(dataTitle(data))}</Badge>
            <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
              {puzzle.setup.initialView.caption
                ? t(puzzle.setup.initialView.caption)
                : t({ en: scopeLabel(puzzle.setup.initialView.kind) })}
            </span>
          </figcaption>
          <DataViewRenderer
            data={data}
            view={puzzle.setup.initialView}
            animate
            highlightWinner
          />
          {data.type === "rates" ? (
            <Legend data={data} view={puzzle.setup.initialView} />
          ) : null}
        </figure>

        <p className="sticky bottom-0 -mx-5 border-t border-rule bg-paper px-5 py-3 text-center font-display text-base font-medium text-ink shadow-[0_-10px_20px_-12px_rgba(34,29,21,0.22)]">
          {t(puzzle.setup.question)}
        </p>
      </div>

      <CommitView puzzle={puzzle} onCommit={onCommit} />
    </section>
  );
}
