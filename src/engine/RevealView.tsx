import { useEffect, useState } from "react";
import type { Choice, Puzzle } from "../puzzles/schema";
import { useT } from "../app/i18n";
import { track } from "../app/analytics";
import { useReducedMotion } from "./useReducedMotion";
import { Badge, Button } from "./ui";
import {
  DataViewRenderer,
  dataTitle,
  scopeLabel,
  viewKey,
} from "./charts/DataViewRenderer";
import { Legend } from "./charts/RateChart";
import { CaseMixBars } from "./charts/CaseMixBars";
import { scoreFor, reactionFor, type Confidence } from "./scoring";
import { CompanyLine } from "./CompanyLine";

/**
 * Beat 3: the reveal. The plate opens on the same pooled view the user just
 * committed against, then flips to the stratified breakdown where the trend
 * reverses. Under reduced motion it opens directly on the breakdown with no
 * animation and no auto-transition.
 */
export function RevealView({
  puzzle,
  committed,
  confidence,
  onNext,
}: {
  puzzle: Puzzle;
  committed: Choice;
  confidence: Confidence;
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

  const view = flipped ? puzzle.reveal.view : puzzle.setup.initialView;
  const caught = committed.isCorrect;
  const score = scoreFor(caught, confidence);
  const metric = t(dataTitle(data));

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          {/*
            A FACT ABOUT THIS PLAYER, NEVER ABOUT THE POPULATION.

            This read "Most people miss this" on every wrong answer, on every
            puzzle, unconditionally, with no tally behind it. Eighteen lines
            below, `CompanyLine` renders the real distribution and can say "18%
            of players fell for the same one", so the deck could contradict its
            own unsourced claim inside one screen.

            The discipline was already written next door and this badge was the
            one place bypassing it: `answerStats` sets MIN_ANSWERS_TO_SHOW = 20
            and argues in its own comment that drawing a percentage the server
            considers too small to be evidence "would be the deck making
            exactly the mistake it teaches against", and `CompanyLine` has four
            states of which three deliberately render nothing.

            So the badge now says only what the app actually knows: the trap
            worked on the person reading it. Blaming the trap rather than the
            reader is also the honest attribution, since the setup was built to
            make the wrong answer feel obvious. The population claim belongs to
            `CompanyLine`, which has the numbers, or to nobody.
          */}
          <Badge tone={caught ? "brand" : "rust"}>
            {caught ? t({ en: "You caught it" }) : t({ en: "The trap worked" })}
          </Badge>
          <span
            className={
              "font-display text-base font-semibold tabular-nums " +
              (score >= 0 ? "text-brand-ink" : "text-rust-ink")
            }
          >
            {score >= 0 ? `+${score}` : score} {t({ en: "pts" })}
          </span>
        </div>
        <h2 className="font-display text-[24px] font-semibold leading-[1.12] text-ink">
          {t(puzzle.reveal.headline)}
        </h2>
        <p className="text-sm text-ink-soft">
          {t({ en: "You picked" })}{" "}
          <span className="font-semibold text-ink">{t(committed.label)}</span>.{" "}
          {t({ en: reactionFor(caught, confidence) })}
        </p>
        <CompanyLine
          slug={puzzle.slug}
          choiceId={committed.id}
          wasCorrect={Boolean(committed.isCorrect)}
        />
      </header>

      <figure className="rounded-lg border border-rule bg-paper-2 p-3.5">
        <figcaption className="mb-2.5 flex items-center justify-between border-b border-rule pb-2">
          <Badge tone="ink">{metric}</Badge>
          <div className="flex items-center gap-3">
            <span
              className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute"
              aria-live="polite"
            >
              {view.caption ? t(view.caption) : t({ en: scopeLabel(view.kind) })}
            </span>
            {!reduced ? (
              <button
                type="button"
                onClick={replay}
                className="rounded font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-brand-ink hover:text-brand focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
              >
                ↺ {t({ en: "Replay" })}
              </button>
            ) : null}
          </div>
        </figcaption>

        {/* Keyed on the whole view, not just its kind: a beat can flip to the
            same kind with a different slice of the data (setup shows one
            stratum, the reveal shows them all). */}
        <div key={viewKey(view)} className="cf-enter-sm">
          <DataViewRenderer data={data} view={view} animate highlightWinner />
        </div>

        {data.type === "rates" ? <Legend data={data} view={view} /> : null}
      </figure>

      <div className="rounded-lg border border-gold/40 border-l-4 border-l-gold bg-gold/8 p-3.5">
        <Badge tone="gold">
          {puzzle.reveal.mechanismLabel
            ? t(puzzle.reveal.mechanismLabel)
            : t({ en: "The lurking variable" })}
        </Badge>
        <h3 className="mt-1 font-display text-lg font-semibold text-ink">
          {t(puzzle.reveal.mechanismName)}
        </h3>
        <p className="mt-1 text-[15px] leading-snug text-ink">
          {t(puzzle.reveal.explanation)}
        </p>
        {/* The case mix is the confounder made visible, so it only earns its
            place when there is more than one stratum to mix. */}
        {data.type === "rates" &&
        data.strata.length > 1 &&
        !data.strataAreSeparateSamples ? (
          <div className="mt-3">
            <div className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
              {puzzle.reveal.caseMixLabel
                ? t(puzzle.reveal.caseMixLabel)
                : t({ en: "Who each treatment actually treated" })}
            </div>
            <CaseMixBars data={data} />
          </div>
        ) : null}
      </div>

      {puzzle.reveal.body ? (
        <p className="text-sm leading-snug text-ink-soft">
          {t(puzzle.reveal.body)}
        </p>
      ) : null}

      <Button onClick={onNext}>
        {caught ? t({ en: "Name the skill →" }) : t({ en: "So what's the skill? →" })}
      </Button>
    </section>
  );
}
