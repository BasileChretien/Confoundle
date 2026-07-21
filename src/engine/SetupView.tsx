import type { Choice, Puzzle } from "../puzzles/schema";
import { useT } from "../app/i18n";
import { Badge } from "./ui";
import { CommitView } from "./CommitView";
import { DataViewRenderer } from "./charts/DataViewRenderer";
import { Legend } from "./charts/RateChart";

function humanize(category: string): string {
  const spaced = category.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * Beat 1+2: the setup (framing + data) and the commit, on one mobile screen.
 * The chart renders the puzzle's authored `initialView` — never the answer.
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
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <Badge>{humanize(puzzle.category)}</Badge>
        <h1 className="text-2xl font-extrabold leading-tight text-white">
          {t(puzzle.setup.headline)}
        </h1>
        <p className="text-[15px] leading-relaxed text-slate-300">
          {t(puzzle.setup.framing)}
        </p>
      </header>

      <div className="rounded-2xl bg-white/5 p-4">
        <DataViewRenderer
          data={data}
          view={puzzle.setup.initialView.kind}
          animate
          highlightWinner
        />
        {data.type === "rates" ? <Legend data={data} /> : null}
      </div>

      <CommitView puzzle={puzzle} onCommit={onCommit} />
    </section>
  );
}
