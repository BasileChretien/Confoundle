import { useT } from "../app/i18n";
import { lessonProgressFor } from "../app/lessonState";
import { UI } from "../app/ui";
import { puzzles } from "../puzzles";
import type { SkillProgress } from "../srs/schedule";
import { AboutContent } from "./AboutView";
import { LessonList } from "./LessonList";

/**
 * The home screen: what this is, and the one thing to do next.
 *
 * A first visit needs the pitch, so a newcomer (nothing learned yet) gets the
 * full About content inline, with its own "play today" call to action, and the
 * archive underneath for anyone who would rather browse. A returning learner has
 * heard the pitch, so home collapses to exactly one primary action (reviews when
 * the scheduler says so, otherwise the next unlearned lesson), a progress link,
 * and the list, with a small About link for anyone who wants the pitch again.
 */

function PrimaryCard({
  eyebrow,
  title,
  blurb,
  tone,
  onClick,
}: {
  eyebrow: string;
  title: string;
  blurb?: string;
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
      {blurb ? <span className="text-[13px] text-ink-soft">{blurb}</span> : null}
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
}: {
  progress: readonly SkillProgress[];
  dueCount: number;
  onOpenLesson: (slug: string) => void;
  onStartReviews: () => void;
  onOpenProgress: () => void;
  onOpenAbout: () => void;
}) {
  const t = useT();

  const learned = progress.length;
  const next = puzzles.find(
    (p) => lessonProgressFor(p.reasoningSkill, progress).state === "new",
  );
  const start = () => (next ? onOpenLesson(next.slug) : onStartReviews());

  // A newcomer gets the whole pitch, then the archive to browse.
  if (learned === 0) {
    return (
      <div className="flex flex-col gap-6">
        <AboutContent onStart={start} onOpenLesson={onOpenLesson} />
        <LessonList onOpen={onOpenLesson} progress={progress} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {dueCount > 0 ? (
        <PrimaryCard
          tone="gold"
          eyebrow={`🎯 ${t(UI.reviewsDue)}: ${dueCount}`}
          title={t(UI.reviewsBlurb)}
          onClick={onStartReviews}
        />
      ) : next ? (
        <PrimaryCard
          tone="brand"
          eyebrow={t(UI.continueLabel)}
          title={t(next.setup.headline)}
          onClick={() => onOpenLesson(next.slug)}
        />
      ) : null}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onOpenProgress}
          className="flex flex-1 items-center justify-between gap-3 rounded-lg border border-rule bg-paper-2 px-3 py-2.5 text-start transition hover:border-ink/40 hover:bg-paper-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        >
          <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {t(UI.progress)}
          </span>
          <span className="font-display text-sm font-semibold text-ink">
            {learned} / {puzzles.length}
          </span>
        </button>
        <button
          type="button"
          onClick={onOpenAbout}
          className="rounded-lg border border-rule bg-paper-2 px-3 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute transition hover:border-ink/40 hover:bg-paper-3 hover:text-ink focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        >
          {t(UI.aboutLink)}
        </button>
      </div>

      <LessonList onOpen={onOpenLesson} progress={progress} />
    </div>
  );
}
