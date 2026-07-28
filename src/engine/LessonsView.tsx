import { useMemo, useState } from "react";
import { useT } from "../app/i18n";
import { UI } from "../app/ui";
import { puzzles } from "../puzzles";
import { TAGS } from "../puzzles/tags";
import type { Puzzle, TagId } from "../puzzles/schema";
import type { SkillProgress } from "../srs/schedule";
import { LessonResults } from "./LessonList";
import { filterLessons, humanizeCategory } from "./lessons";
import {
  availableInterests,
  filterByInterests,
  readInterests,
  toggleInterest,
  writeInterests,
} from "../app/interests";

/**
 * Browse and search the whole catalogue: a keyword box and the interest
 * chooser, reached from the home screen's All-lessons button.
 *
 * The filter is by INTEREST (a tag: everyday, clinical, media) rather than by
 * the internal category, because a tag is what a learner actually chooses
 * along, and a lesson carries several at once. The choice persists and also
 * decides which lesson the home screen offers next, so picking an interest is
 * a statement about the course rather than a throwaway view setting.
 */
export function LessonsView({
  progress,
  onOpen,
  onBack,
}: {
  progress: readonly SkillProgress[];
  onOpen: (slug: string) => void;
  onBack: () => void;
}) {
  const t = useT();
  const [query, setQuery] = useState("");
  // Read once on mount, then kept here and mirrored to storage on every change.
  const [interests, setInterests] = useState(() => readInterests(puzzles));

  // Only interests some lesson actually carries, so no choice empties the screen.
  const offered = availableInterests(puzzles);

  const choose = (tag: (typeof offered)[number] | null) => {
    const next = tag === null ? [] : toggleInterest(interests, tag);
    setInterests(next);
    writeInterests(next);
  };

  // Locale-aware search text: headline, the skill name, the category and the
  // tag labels, all in the reader's language.
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

  const results = filterLessons(
    filterByInterests(puzzles, interests),
    { category: null, query },
    searchable,
  );

  const chip = (active: boolean) =>
    "rounded-full border px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-eyebrow transition focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand " +
    (active
      ? "border-ink bg-ink text-paper"
      : "border-rule bg-paper-2 text-ink-mute hover:border-ink/40 hover:text-ink");

  return (
    <section className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onBack}
        className="-ms-2 inline-flex min-h-11 items-center gap-1.5 self-start rounded-md px-2 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute transition hover:text-ink focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
      >
        ← {t(UI.back)}
      </button>

      <h2 className="font-display text-[24px] font-semibold leading-tight text-ink">
        {t(UI.allLessons)}
      </h2>

      <input
        type="search"
        inputMode="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t(UI.searchPlaceholder)}
        aria-label={t(UI.searchPlaceholder)}
        className="w-full rounded-lg border border-rule bg-paper-2 px-3.5 py-2.5 font-sans text-[14px] text-ink placeholder:text-ink-mute focus:border-ink/40 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
      />

      <div className="flex flex-col gap-1.5">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t(UI.interestsTitle)}
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => choose(null)}
            className={chip(interests.length === 0)}
          >
            {t(UI.interestsAll)}
          </button>
          {offered.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => choose(id)}
              aria-pressed={interests.includes(id)}
              className={chip(interests.includes(id))}
            >
              {t(TAGS[id].label)}
            </button>
          ))}
        </div>
      </div>

      {results.length > 0 ? (
        <LessonResults puzzles={results} progress={progress} onOpen={onOpen} />
      ) : (
        <p className="rounded-lg border border-rule bg-paper-2 p-4 text-[14px] text-ink-soft">
          {t(UI.searchNoResults)}
        </p>
      )}
    </section>
  );
}
