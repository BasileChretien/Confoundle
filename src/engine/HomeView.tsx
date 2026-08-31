import { useMemo, useState } from "react";
import { useLocale, useT } from "../app/i18n";
import { lessonProgressFor } from "../app/lessonState";
import { UI } from "../app/ui";
import { puzzles } from "../puzzles";
import { TAGS } from "../puzzles/tags";
import type { Puzzle, TagId } from "../puzzles/schema";
import type { SkillProgress } from "../srs/schedule";
import { getStats } from "../app/session";
import { playedDailyRun, runNumber, todayRunDay } from "../app/dailyRun";
import { fillSlots } from "./charts/announce";
import { AboutContent } from "./AboutView";
import { Confounder, confounderStateFor } from "./Confounder";
import { LessonResults } from "./LessonList";
import { filterLessons, humanizeCategory } from "./lessons";
import { filterByInterests, readInterests } from "../app/interests";

/**
 * The home screen: what to do next.
 *
 * WHAT THIS SCREEN USED TO OPEN WITH. `ProgressPanel` rendered inline, below
 * the primary card, as eleven stacked data displays: the mascot, a practice
 * prompt, four metrics, five SRS buckets, a seven-day review forecast, a
 * seventy-day activity heatmap, nemeses, conquests, a full per-skill mastery
 * list with accuracy percentages, and a calibration table. One thing to do,
 * eleven measurements of the person doing it. That ratio is what "the app feels
 * like studying" meant, rendered in DOM: a screen that opens on assessment
 * frames the whole activity as assessment before the player has read a
 * sentence.
 *
 * It was worse for a newcomer, because the panel only declined to render when
 * NOTHING had been learned. So the second puzzle was greeted by a seventy-day
 * heatmap that was sixty-nine empty squares and a calibration table with one
 * row: a gym showing you your attendance graph on day one. An empty progress
 * panel is not neutral, it is an accusation.
 *
 * The reporting now lives behind one tap, on its own route, and its entry point
 * does not appear at all until there is something worth reporting. Two things
 * stayed. The Confounder is a hook rather than a report, the only character in
 * the interface and one that names an adversary. And the practice prompt is an
 * action, so it belongs with the other actions.
 *
 * The panel itself is unchanged and nothing was deleted: everything it drew is
 * still one tap away for whoever wants it.
 *
 * A newcomer gets the full pitch and a way into the catalogue. A returning
 * learner gets one primary action (reviews when due, otherwise Learn now), the
 * Confounder's line, a keyword search, and the secondary ways in.
 */

/**
 * How many skills before the standing page is worth offering.
 *
 * Below this the numbers describe a sample too small to say anything, which is
 * the mistake this deck exists to teach against, and the screen would read as a
 * list of things not yet done. Five is a judgement rather than a measurement,
 * chosen so a player has met enough traps for a catch rate to mean anything at
 * all. The route still works if reached directly; this only governs whether the
 * app volunteers it.
 */
const STANDING_THRESHOLD = 5;

function PrimaryCard({
  eyebrow,
  title,
  tone,
  onClick,
}: {
  eyebrow: string;
  title: string;
  tone: "gold" | "brand";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex w-full flex-col gap-1 rounded-lg border border-s-4 p-4 text-start transition focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand " +
        (tone === "gold"
          ? "border-gold/40 border-s-gold bg-gold/8 hover:bg-gold/[0.14]"
          : "border-brand/35 border-s-brand bg-brand/[0.07] hover:bg-brand/[0.13]")
      }
    >
      <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {eyebrow}
      </span>
      <span className="font-display text-[17px] font-semibold leading-snug text-ink">
        {title}
      </span>
    </button>
  );
}

function SecondaryButton({
  label,
  onClick,
  grow,
}: {
  label: string;
  onClick: () => void;
  grow?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        (grow ? "flex-1 " : "") +
        "rounded-lg border border-rule bg-paper-2 px-3 py-2.5 text-center font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute transition hover:border-ink/40 hover:bg-paper-3 hover:text-ink focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
      }
    >
      {label}
    </button>
  );
}

export function HomeView({
  progress,
  dueCount,
  onOpenLesson,
  onStartReviews,
  onStartTrapHunt,
  onPractise,
  onOpenAbout,
  onOpenLessons,
  onOpenProgress,
  onStartRun,
  onStartDaily,
}: {
  progress: readonly SkillProgress[];
  dueCount: number;
  onOpenLesson: (slug: string) => void;
  onStartReviews: () => void;
  onStartTrapHunt: () => void;
  onPractise: () => void;
  onOpenAbout: () => void;
  onOpenLessons: () => void;
  onOpenProgress: () => void;
  onStartRun: () => void;
  onStartDaily: () => void;
}) {
  const t = useT();
  const nf = new Intl.NumberFormat(useLocale());
  // Read once per render of the home screen, which is where a player returns
  // to after finishing, so the card flips without a reload.
  const runDay = todayRunDay();
  const playedToday = playedDailyRun(runDay);
  const [query, setQuery] = useState("");

  const learned = progress.length;
  // What to learn next follows the interests chosen on the browse screen, so
  // the choice is about the course rather than one screen's view. Read on
  // render: this component remounts whenever the learner comes back here.
  const interests = readInterests(puzzles());
  const wanted = filterByInterests(puzzles(), interests);
  const next =
    wanted.find((p) => lessonProgressFor(p.reasoningSkill, progress).state === "new") ??
    // Everything in the chosen areas is done, so offer the rest rather than
    // dead-ending on a screen with nothing to do.
    puzzles().find((p) => lessonProgressFor(p.reasoningSkill, progress).state === "new");
  const start = () => (next ? onOpenLesson(next.slug) : onStartReviews());

  /*
    ONE DERIVATION, TWO CONSUMERS. The Confounder's line and the practice
    prompt both answer "is anything due right now", and they must never
    disagree: the creature saying "nothing due just now, practise anyway" above
    a screen with three reviews waiting is nonsense, and gating the button on
    the `dueCount` prop while the creature derived its own count would have
    allowed exactly that. `ProgressPanel` used to compute this once and feed
    both, which is the property being preserved rather than a new idea.
  */
  const standing = confounderStateFor(progress, getStats());

  const searchable = useMemo(() => {
    return (p: Puzzle): string =>
      [
        t(p.setup.headline),
        t(p.lesson.skillName),
        t({ en: humanizeCategory(p.category) }),
        ...p.tags.map((id: TagId) => t(TAGS[id].label)),
      ]
        .join(" ")
        .toLowerCase();
  }, [t]);

  const q = query.trim();
  const results = q
    ? filterLessons(puzzles(), { category: null, query: q }, searchable)
    : [];

  // A newcomer gets the whole pitch, then a way into the catalogue. There is no
  // progress to show yet, so the panel is skipped.
  if (learned === 0) {
    return (
      <div className="flex flex-col gap-6">
        <AboutContent onStart={start} onOpenLesson={onOpenLesson} />
        <SecondaryButton label={t(UI.allLessons)} onClick={onOpenLessons} grow />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/*
        THE CALIBRATION RUN IS THE HEADLINE, and what it displaced says more
        than what it is. This slot used to open on "Reviews due: 3", which is a
        debt notice: it tells a returning player what they owe rather than
        offering them something to do. The run is the thing worth doing most
        days, it is the same length every time, and it asks the question the
        whole deck is about.

        The schedule has not gone anywhere. It sits directly below, still
        carrying its count when something is genuinely due, so the minority who
        want the ladder lose nothing but the top slot.
      */}
      {/*
        THE DAILY LEADS UNTIL IT IS SPENT, then gets out of the way.

        It is the only thing in the product that two people can have done the
        same of. Every card is browsable at any time, on purpose, which is a
        feature of the catalogue and the reason the friends board is correct and
        permanently empty: across 73 puzzles two friends never collide. A shared
        eight manufactures the collision without locking anything, so this is a
        schelling point rather than a gate. Nothing below it is withheld, and
        the moment anybody proposes that yesterday's run costs a streak, the
        answer is no.
      */}
      {playedToday ? null : (
        <PrimaryCard
          tone="gold"
          eyebrow={fillSlots(t({ en: "Today's run, #{n}" }), { n: nf.format(runNumber(runDay)) })}
          title={t({ en: "The same eight calls as everybody else" })}
          onClick={onStartDaily}
        />
      )}

      <PrimaryCard
        tone={playedToday ? "gold" : "brand"}
        eyebrow={t({ en: "Calibration run" })}
        title={t({ en: "How sure are you?" })}
        onClick={onStartRun}
      />

      {playedToday ? (
        <PrimaryCard
          tone="brand"
          eyebrow={fillSlots(t({ en: "Today's run, #{n}" }), { n: nf.format(runNumber(runDay)) })}
          title={t({ en: "Played today. Play it again for practice." })}
          onClick={onStartDaily}
        />
      ) : null}

      {dueCount > 0 ? (
        <PrimaryCard
          tone="brand"
          eyebrow={`${t(UI.reviewsDue)}: ${dueCount}`}
          title={t(UI.reviewsBlurb)}
          onClick={onStartReviews}
        />
      ) : next ? (
        <PrimaryCard
          tone="brand"
          eyebrow={t(UI.learnNow)}
          title={t(next.setup.headline)}
          onClick={() => onOpenLesson(next.slug)}
        />
      ) : null}

      <input
        type="search"
        inputMode="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t(UI.searchPlaceholder)}
        aria-label={t(UI.searchPlaceholder)}
        className="w-full rounded-lg border border-rule bg-paper-2 px-3.5 py-2.5 font-sans text-[14px] text-ink placeholder:text-ink-mute focus:border-ink/40 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
      />

      {q ? (
        results.length > 0 ? (
          <LessonResults puzzles={results} progress={progress} onOpen={onOpenLesson} />
        ) : (
          <p className="rounded-lg border border-rule bg-paper-2 p-4 text-[14px] text-ink-soft">
            {t(UI.searchNoResults)}
          </p>
        )
      ) : (
        <>
          <div className="flex gap-2">
            <SecondaryButton label={t(UI.allLessons)} onClick={onOpenLessons} grow />
            <SecondaryButton label={t(UI.trapHunt)} onClick={onStartTrapHunt} grow />
            {learned >= STANDING_THRESHOLD ? (
              <SecondaryButton
                label={t(UI.progress)}
                onClick={onOpenProgress}
                grow
              />
            ) : null}
            <SecondaryButton label={t(UI.aboutLink)} onClick={onOpenAbout} grow />
          </div>

          {/*
            The character, and one action. The eleven data displays that used
            to sit here are now behind the Progress button above, and that
            button only appears once there is a sample worth describing.
          */}
          <Confounder state={standing} />

          {standing.dueNow === 0 ? (
            <button
              type="button"
              onClick={onPractise}
              className="flex w-full items-center justify-between gap-3 rounded-lg border border-brand/35 bg-brand/[0.07] px-3 py-3 text-start transition hover:bg-brand/[0.13] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span className="flex flex-col">
                <span className="font-display text-[15px] font-semibold text-ink">
                  {t(UI.practise)}
                </span>
                <span className="text-[12px] text-ink-soft">
                  {t(UI.practiseBlurb)}
                </span>
              </span>
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}
