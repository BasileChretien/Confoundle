import { useEffect, useState } from "react";
import type { Choice, Puzzle } from "../puzzles/schema";
import { useT } from "../app/i18n";
import { track } from "../app/analytics";
import { useReducedMotion } from "./useReducedMotion";
import { Badge, Button } from "./ui";
import { DataViewRenderer } from "./charts/DataViewRenderer";
import { Legend } from "./charts/RateChart";

/**
 * Beat 3: the reveal. The chart opens on the same pooled view the user just
 * committed against, then flips to the stratified breakdown where the trend
 * reverses. Under reduced motion it opens directly on the breakdown with no
 * animation and no auto-transition.
 */
export function RevealView({
  puzzle,
  committed,
  onNext,
}: {
  puzzle: Puzzle;
  committed: Choice;
  onNext: () => void;
}) {
  const t = useT();
  const reduced = useReducedMotion();
  const data = puzzle.setup.data;
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (reduced) {
      setFlipped(true);
      return;
    }
    const id = window.setTimeout(() => setFlipped(true), 1100);
    return () => window.clearTimeout(id);
  }, [reduced]);

  function replay() {
    track("replay", { slug: puzzle.slug });
    setFlipped(false);
    window.setTimeout(() => setFlipped(true), 650);
  }

  const view = flipped ? "stratified" : "aggregate";
  const caught = committed.isCorrect;

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <Badge>{caught ? "You caught it" : "You're in good company"}</Badge>
        <h2 className="text-2xl font-extrabold leading-tight text-white">
          {t(puzzle.reveal.headline)}
        </h2>
        <p className="text-sm text-slate-400">
          You picked{" "}
          <span className="font-semibold text-slate-200">
            {t(committed.label)}
          </span>
          .{" "}
          {caught
            ? "You saw through the pooled number."
            : "So does most everyone — the overall rate is built to mislead."}
        </p>
      </header>

      <div className="rounded-2xl bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
          <span aria-live="polite">
            {view === "aggregate"
              ? `${t(data.metricLabel)}, overall`
              : `Split by ${t(puzzle.reveal.confounderName).toLowerCase()}`}
          </span>
          {!reduced ? (
            <button
              type="button"
              onClick={replay}
              className="rounded-md px-2 py-1 text-slate-300 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              ↺ Replay
            </button>
          ) : null}
        </div>

        <div key={view} className="cf-enter-sm">
          <DataViewRenderer data={data} view={view} animate highlightWinner />
        </div>

        {data.type === "rates" ? <Legend data={data} /> : null}
      </div>

      <div className="rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-4">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-indigo-200">
          The lurking variable
        </div>
        <h3 className="text-lg font-bold text-white">
          {t(puzzle.reveal.confounderName)}
        </h3>
        <p className="mt-1 text-[15px] leading-relaxed text-slate-200">
          {t(puzzle.reveal.explanation)}
        </p>
      </div>

      {puzzle.reveal.body ? (
        <p className="text-sm leading-relaxed text-slate-400">
          {t(puzzle.reveal.body)}
        </p>
      ) : null}

      <Button onClick={onNext}>
        {caught ? "Name the skill →" : "So what's the skill? →"}
      </Button>
    </section>
  );
}
