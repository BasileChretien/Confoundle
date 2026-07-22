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

function humanize(category: string): string {
  const spaced = category.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * Beat 1+2: the setup (framing + data plate) and the commit, on one screen.
 * The plate renders the puzzle's authored `initialView` — never the answer.
 */
export function SetupView({
  puzzle,
  onCommit,
}: {
  puzzle: Puzzle;
  onCommit: (choice: Choice) => void;
}) {
  const t = useT();
  const data = puzzle.setup.data;

  return (
    <section className="flex flex-col gap-3">
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="rust">{humanize(puzzle.category)}</Badge>
          <TagChips tags={puzzle.tags} />
        </div>
        <h1 className="font-display text-[25px] font-semibold leading-[1.1] text-ink">
          {t(puzzle.setup.headline)}
        </h1>
        <p className="text-[15px] leading-snug text-ink-soft">
          {t(puzzle.setup.framing)}
        </p>
      </header>

      <figure className="rounded-lg border border-rule bg-paper-2 p-3.5">
        <figcaption className="mb-2.5 flex items-center justify-between border-b border-rule pb-2">
          <Badge tone="ink">{t(dataTitle(data))}</Badge>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {scopeLabel(puzzle.setup.initialView.kind)}
          </span>
        </figcaption>
        <DataViewRenderer
          data={data}
          view={puzzle.setup.initialView.kind}
          animate
          highlightWinner
        />
        {data.type === "rates" ? <Legend data={data} /> : null}
      </figure>

      <CommitView puzzle={puzzle} onCommit={onCommit} />
    </section>
  );
}
