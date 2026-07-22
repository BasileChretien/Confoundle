import { useEffect, useState } from "react";
import type { Choice, Puzzle } from "../puzzles/schema";
import { useT } from "../app/i18n";
import { track } from "../app/analytics";
import { useReducedMotion } from "./useReducedMotion";
import { Badge, Button } from "./ui";
import { DataViewRenderer } from "./charts/DataViewRenderer";
import { Legend } from "./charts/RateChart";

/**
 * Beat 3: the reveal. The plate opens on the same pooled view the user just
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
  const metric = data.type === "rates" ? t(data.metricLabel) : "Figure";

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-2.5">
        <Badge tone={caught ? "brand" : "rust"}>
          {caught ? "You caught it" : "Most people miss this"}
        </Badge>
        <h2 className="font-display text-[26px] font-semibold leading-[1.14] text-ink">
          {t(puzzle.reveal.headline)}
        </h2>
        <p className="text-sm text-ink-soft">
          You picked{" "}
          <span className="font-semibold text-ink">{t(committed.label)}</span>.{" "}
          {caught
            ? "You saw past the pooled number."
            : "So does most everyone — the overall rate is built to mislead."}
        </p>
      </header>

      <figure className="rounded-lg border border-rule bg-paper-2 p-4">
        <figcaption className="mb-3 flex items-center justify-between border-b border-rule pb-2">
          <Badge tone="ink">{metric}</Badge>
          <div className="flex items-center gap-3">
            <span
              className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute"
              aria-live="polite"
            >
              {view === "aggregate" ? "Overall" : "By subgroup"}
            </span>
            {!reduced ? (
              <button
                type="button"
                onClick={replay}
                className="rounded font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-brand-ink hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                ↺ Replay
              </button>
            ) : null}
          </div>
        </figcaption>

        <div key={view} className="cf-enter-sm">
          <DataViewRenderer data={data} view={view} animate highlightWinner />
        </div>

        {data.type === "rates" ? <Legend data={data} /> : null}
      </figure>

      <div className="rounded-lg border border-gold/40 border-l-4 border-l-gold bg-gold/[0.08] p-4">
        <Badge tone="gold">The lurking variable</Badge>
        <h3 className="mt-1.5 font-display text-lg font-semibold text-ink">
          {t(puzzle.reveal.confounderName)}
        </h3>
        <p className="mt-1 text-[15px] leading-relaxed text-ink">
          {t(puzzle.reveal.explanation)}
        </p>
      </div>

      {puzzle.reveal.body ? (
        <p className="text-sm leading-relaxed text-ink-soft">
          {t(puzzle.reveal.body)}
        </p>
      ) : null}

      <Button onClick={onNext}>
        {caught ? "Name the skill →" : "So what's the skill? →"}
      </Button>
    </section>
  );
}
