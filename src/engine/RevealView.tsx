import { useEffect, useRef, useState } from "react";
import type { Choice, Puzzle } from "../puzzles/schema";
import { useT } from "../app/i18n";
import { track } from "../app/analytics";
import { useReducedMotion } from "./useReducedMotion";
import { Badge, Button } from "./ui";
import {
  canScrub,
  DataViewRenderer,
  dataTitle,
  scopeLabel,
  viewKey,
} from "./charts/DataViewRenderer";
import { Legend } from "./charts/RateChart";
import { CaseMixBars } from "./charts/CaseMixBars";
import { scoreFor, reactionFor, type Confidence } from "./scoring";
import { CrowdLines } from "./CrowdLines";
import { ConfounderMark } from "./Confounder";

/**
 * Beat 3: the reveal. The plate opens on the same view the player committed
 * against, and THEY pull the lever that flips it to the one where the trend
 * reverses.
 *
 * WHAT THIS REPLACED, AND WHY IT WAS THE WORST BEAT IN THE APP. The flip used
 * to happen on a `setTimeout(1100)` with no input, while the verdict badge,
 * the score, the reveal headline and the reaction line all rendered ON MOUNT,
 * a full second before the chart moved. So the app printed the punchline in
 * words and then animated a picture at somebody who had already read it. The
 * single moment the whole product exists to deliver was spent as ambient
 * motion with the answer sitting above it.
 *
 * Under `prefers-reduced-motion` it was worse than that: the figure opened
 * ALREADY FLIPPED, so those players never saw the before state at all. Two
 * views of one dataset collapsed into one view, which is the entire mechanism
 * gone. A reduced-motion preference is a request for less movement, never for
 * less information.
 *
 * THREE RULES NOW HOLD.
 *
 * The transition is an action. Nothing flips on a timer, for anybody, so the
 * player is the author of the reversal rather than its audience. Reduced
 * motion changes only whether the change is animated, which is what the CSS
 * media query on `.cf-enter-sm` already handles, so the branch that used to
 * pre-flip is gone rather than reworked.
 *
 * Everything that interprets the result waits behind that action. The verdict,
 * the score, the headline, the reaction, the crowd line and the mechanism are
 * all withheld until the flip has happened. Before it, the screen says only
 * which answer the player gave.
 *
 * The figure does not move. It sits in the same place in both states and the
 * commentary appears BELOW it, so the eye stays on the chart at the moment it
 * changes instead of tracking a block that grew above it. That is also why the
 * verdict is no longer the first thing on the screen: the insight arrives
 * first and the scoring of it second.
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

  /*
    Two pieces of state, not one, because "has the player pulled the lever" and
    "which view is the figure drawing" stop being the same question once Replay
    exists. Replay walks the figure back and forward again; it must not take
    the explanation away with it.
  */
  /**
   * How far the reader has dragged, 0 the setup view and 1 the reveal. Only
   * meaningful for a shape that opted into scrubbing; everything else keeps
   * the single tap. The scrub is the same beat rather than a different one: it
   * still withholds every word of commentary until the reader arrives, and it
   * still refuses to move on its own.
   */
  const [phase, setPhase] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showingReveal, setShowingReveal] = useState(false);

  /*
    THE LEVER REMOVES ITSELF, SO FOCUS HAS TO GO SOMEWHERE DELIBERATE.

    Activating the button unmounts it and replaces it with the verdict and the
    explanation. Without this, a keyboard or screen-reader user presses a
    button, focus falls back to `document.body`, and nothing announces that a
    screenful of new content arrived: they are left tabbing to find out whether
    anything happened. `App.tsx` already moves focus to the page heading on
    every view change for exactly this reason, so this is the same rule applied
    one level down, where this PR created a new instance of the problem.

    `tabIndex={-1}` makes the heading programmatically focusable without adding
    it to the tab order.
  */
  const revealHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (revealed) revealHeadingRef.current?.focus();
  }, [revealed]);

  /*
    Cleared on unmount, following the `live` flag in `CrowdLines`. The player
    can hit Replay and then "Name the skill" inside the 650ms, which unmounts
    this component while the timer is still armed. React 19 makes the late
    setState a silent no-op rather than a warning, so this is tidiness rather
    than a live bug, but leaving a timer running against a dead component is
    the kind of thing that stops being harmless the moment the callback grows.
  */
  const replayTimer = useRef<number | undefined>(undefined);
  useEffect(() => {
    return () => {
      if (replayTimer.current !== undefined) {
        window.clearTimeout(replayTimer.current);
      }
    };
  }, []);

  function pull() {
    /*
      `reveal_view` moved here from `PuzzleFlow.commit`, where it fired the
      instant the player answered. It now marks the reveal actually being
      looked at, so the gap between `commit` and `reveal_view` becomes the
      measurable share of players who commit and then never pull the lever.
      Same fixed event name, a truer meaning.
    */
    track("reveal_view", { slug: puzzle.slug });
    setRevealed(true);
    setShowingReveal(true);
  }

  function replay() {
    track("replay", { slug: puzzle.slug });
    setShowingReveal(false);
    window.clearTimeout(replayTimer.current);
    replayTimer.current = window.setTimeout(() => setShowingReveal(true), 650);
  }

  /*
    Asked of the PUZZLE, not the shape. A capability that depended only on the
    data type claimed 31 rates puzzles and was correct for one of them: the
    other 30 either restrict which groups or strata each beat draws, or run
    the pooled and split views the other way round.
  */
  const scrubbable = canScrub(data, puzzle.setup.initialView, puzzle.reveal.view);

  /*
    TWO VIEWS, BECAUSE THEY ANSWER TWO DIFFERENT QUESTIONS, and collapsing them
    into one was a real defect rather than a tidy simplification.

    `renderView` is what the chart is handed. A scrubbed figure needs the
    REVEAL view, because the renderer interpolates between the two itself from
    `phase`.

    `shownView` is the state the reader is actually looking at, and it is what
    labels the figure. Passing the reveal view to both meant the caption read
    "Compared to the people" from the very first paint, while the chart was
    still visibly drawing the relative layout, for the whole first half of
    every drag. A figure captioned as something it is not is a small version of
    exactly the dishonesty this whole feature exists to avoid.

    The midpoint is where it switches, matching `riskFrameAt`'s own `framed`
    flip, so the caption changes at the same instant the frame appears rather
    than at some second threshold of its own.
  */
  const renderView = scrubbable || showingReveal
    ? puzzle.reveal.view
    : puzzle.setup.initialView;
  const shownView = scrubbable
    ? phase >= 0.5
      ? puzzle.reveal.view
      : puzzle.setup.initialView
    : renderView;
  const caught = committed.isCorrect;
  const score = scoreFor(caught, confidence);
  const metric = t(dataTitle(data));

  return (
    <section className="flex flex-col gap-4">
      {/*
        The only thing on screen before the pull: which answer they gave. No
        verdict, no score, no headline. Its height does not change when the
        rest arrives, so the figure below it stays put.
      */}
      <header className="flex flex-col gap-2">
        <p className="text-sm text-ink-soft">
          {t({ en: "You picked" })}{" "}
          <span className="font-semibold text-ink">{t(committed.label)}</span>.
        </p>
      </header>

      <figure className="rounded-lg border border-rule bg-paper-2 p-3.5">
        <figcaption className="mb-2.5 flex items-center justify-between border-b border-rule pb-2">
          <Badge tone="ink">{metric}</Badge>
          <div className="flex items-center gap-3">
            <span
              className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute"
              aria-live="polite"
            >
              {shownView.caption
                ? t(shownView.caption)
                : t({ en: scopeLabel(shownView.kind) })}
            </span>
            {/*
              REPLAY IS FOR THE FLIP, AND A SCRUBBED FIGURE HAS NO FLIP.

              It toggles `showingReveal`, which a scrubbed figure does not read:
              that figure follows `phase`. So on a scrubbable shape this button
              fired its analytics event and changed nothing on screen at all,
              which is worse than not offering it. The drag itself is the better
              affordance anyway, so the slider stays mounted after the reveal
              instead and this is hidden.
            */}
            {revealed && !reduced && !scrubbable ? (
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

        {/*
          Keyed on the whole view, not just its kind: a beat can flip to the
          same kind with a different slice of the data (setup shows one
          stratum, the reveal shows them all).

          NOT KEYED AT ALL WHILE SCRUBBING. A key change remounts the subtree,
          and remounting mid-drag tears out the element the pointer is captured
          on, so the bars would jump once and then stop following the thumb.
          The entry animation goes with it, which is right: under a scrub the
          reader is the animation.
        */}
        <div
          key={scrubbable ? "scrubbed" : viewKey(renderView)}
          className={scrubbable ? undefined : "cf-enter-sm"}
        >
          <DataViewRenderer
            data={data}
            view={renderView}
            animate
            highlightWinner
            scrub={
              scrubbable
                ? {
                    from: puzzle.setup.initialView,
                    to: puzzle.reveal.view,
                    phase,
                  }
                : undefined
            }
          />
        </div>

        {data.type === "rates" ? <Legend data={data} view={shownView} /> : null}
      </figure>

      {/*
        THE LEVER. One control, and until it is pulled this is the whole rest
        of the screen: no verdict, no score, no headline, nothing that
        interprets a chart the player has not yet seen change.

        It is a real button rather than a gesture so it is reachable by
        keyboard and by a screen reader, and so the reduced-motion path is the
        same path rather than a second one that skips the beat.
      */}
      {!revealed || scrubbable ? (
        scrubbable ? (
          /*
            A NATIVE RANGE INPUT RATHER THAN A CUSTOM DRAG, and the choice is
            mostly about who can use it. A hand-rolled pointer handler would
            have to reimplement keyboard control, the slider role, the value
            announcements and touch capture, and would get some of them wrong.
            This has all of it: arrow keys step, Home and End jump to the two
            authored views, and a screen reader reads it as a slider.

            It also makes the reduced-motion question disappear. There is no
            animation to suppress, because the reader is the one moving it.
          */
          <div className="flex flex-col gap-2">
            <label
              htmlFor="reveal-scrub"
              className="text-center font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute"
            >
              {t({ en: "Drag to see the same data the other way" })}
            </label>
            <input
              id="reveal-scrub"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={phase}
              aria-label={t({ en: "Drag to see the same data the other way" })}
              onChange={(e) => {
                const next = Number(e.target.value);
                setPhase(next);
                // Arriving is what earns the commentary, exactly as the tap
                // does on every other shape. It is one-way: letting it lapse
                // when the reader drags back would snatch away the
                // explanation they just uncovered.
                if (next >= 1) pull();
              }}
              className="w-full accent-brand focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
            />
          </div>
        ) : (
          <Button onClick={pull}>{t({ en: "Reveal the answer" })}</Button>
        )
      ) : null}

      {revealed ? (
        <div className="cf-enter flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            {/*
              A FACT ABOUT THIS PLAYER, NEVER ABOUT THE POPULATION.

              This read "Most people miss this" on every wrong answer, on every
              puzzle, unconditionally, with no tally behind it, while
              `CrowdLines` below renders the real distribution and can say
              "18% of players fell for the same one". `answerStats` sets
              MIN_ANSWERS_TO_SHOW = 20 and argues in its own comment that
              drawing a percentage the server considers too small to be
              evidence "would be the deck making exactly the mistake it teaches
              against"; this badge was the one place bypassing that.

              It now says only what the app knows: the trap worked on the
              person reading it. Blaming the trap rather than the reader is
              also the honest attribution, since the setup was built to make
              the wrong answer feel obvious.
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

          <h2
            ref={revealHeadingRef}
            tabIndex={-1}
            className="font-display text-[24px] font-semibold leading-[1.12] text-ink focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
          >
            {t(puzzle.reveal.headline)}
          </h2>

          {/*
            THE ONE CHARACTER IN THE APP, FINALLY IN THE ROOM WHERE IT MATTERS.
            It had two surfaces, both on the way in: a line on the home screen
            before the player had done anything, and its mark on the About page.
            It set every trap in the deck and was absent from all of them.

            The mark carries its own translated accessible name, so the line
            beside it needs no attribution written into the copy, in any
            language. It is the register made legible rather than decoration:
            without it, "Those are the ones I keep" is the app talking about
            itself.
          */}
          <div className="flex items-start gap-2">
            <span className="mt-px shrink-0">
              <ConfounderMark size={20} />
            </span>
            <p className="text-sm text-ink-soft">
              {t({ en: reactionFor(caught, confidence) })}
            </p>
          </div>

          <CrowdLines
            slug={puzzle.slug}
            choiceId={committed.id}
            correctChoiceId={puzzle.choices.find((c) => c.isCorrect)?.id}
            wasCorrect={Boolean(committed.isCorrect)}
          />

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
            {/* The case mix is the confounder made visible, so it only earns
                its place when there is more than one stratum to mix. */}
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
            {caught
              ? t({ en: "Name the skill →" })
              : t({ en: "So what's the skill? →" })}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
