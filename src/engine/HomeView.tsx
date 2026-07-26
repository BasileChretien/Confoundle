import { useMemo, useState } from "react";
import { useT } from "../app/i18n";
import { lessonProgressFor } from "../app/lessonState";
import { UI } from "../app/ui";
import { puzzles } from "../puzzles";
import { TAGS } from "../puzzles/tags";
import type { Puzzle, TagId } from "../puzzles/schema";
import type { SkillProgress } from "../srs/schedule";
import { AboutContent } from "./AboutView";
import { LessonResults } from "./LessonList";
import { filterLessons, humanizeCategory } from "./lessons";

/**
 * The home screen: what this is, and the one thing to do next.
 *
 * A newcomer gets the full pitch inline with a play call to action; a returning
 * learner gets one primary action (reviews when due, otherwise Learn now), a
 * keyword search, and a way into the full catalogue. The whole lesson list no
 * longer sits here: it is one tap away under All lessons, filtered by category.
 */

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
  onOpenProgress,
  onOpenAbout,
  onOpenLessons,
}: {
  progress: readonly SkillProgress[];
  dueCount: number;
  onOpenLesson: (slug: string) => void;
  onStartReviews: () => void;
  onOpenProgress: () => void;
  onOpenAbout: () => void;
  onOpenLessons: () => void;
}) {
  const t = useT();
  const [query, setQuery] = useState("");

  const learned = progress.length;
  const next = puzzles.find(
    (p) => lessonProgressFor(p.reasoningSkill, progress).state === "new",
  );
  const start = () => (next ? onOpenLesson(next.slug) : onStartReviews());

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
    ? filterLessons(puzzles, { category: null, query: q }, searchable)
    : [];

  // A newcomer gets the whole pitch, then a way into the catalogue.
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
      {dueCount > 0 ? (
        <PrimaryCard
          tone="gold"
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
        <div className="flex gap-2">
          <SecondaryButton label={t(UI.allLessons)} onClick={onOpenLessons} grow />
          <SecondaryButton
            label={`${t(UI.progress)} ${learned}/${puzzles.length}`}
            onClick={onOpenProgress}
            grow
          />
          <SecondaryButton label={t(UI.aboutLink)} onClick={onOpenAbout} />
        </div>
      )}
    </div>
  );
}
