import { useT } from "../app/i18n";
import { lessonProgressFor } from "../app/lessonState";
import { UI } from "../app/ui";
import { puzzles } from "../puzzles";
import type { SkillProgress } from "../srs/schedule";
import { LessonList } from "./LessonList";

/**
 * The home screen: what this is, and the one thing to do next.
 *
 * Opening the archive fixed "there is nothing else to play" and created a new
 * problem, which is that a first visit landed on seventeen equal cards with no
 * pitch and no starting point. A list answers "what else is there" and neither
 * "what is this" nor "what now".
 *
 * So exactly one primary action is offered, and which one depends on where the
 * learner is: reviews when the scheduler says so, because a due review is worth
 * more than a new lesson; otherwise the next unlearned lesson, labelled Start
 * here on a first visit and Continue afterwards. The full list stays underneath
 * for anyone who would rather browse.
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
        "flex w-full flex-col gap-1 rounded-lg border border-l-4 p-4 text-left transition focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand " +
        (tone === "gold"
          ? "border-gold/40 border-l-gold bg-gold/8 hover:bg-gold/[0.14]"
          : "border-brand/35 border-l-brand bg-brand/[0.07] hover:bg-brand/[0.13]")
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
}: {
  progress: readonly SkillProgress[];
  dueCount: number;
  onOpenLesson: (slug: string) => void;
  onStartReviews: () => void;
  onOpenProgress: () => void;
}) {
  const t = useT();

  const learned = progress.length;
  const next = puzzles.find(
    (p) => lessonProgressFor(p.reasoningSkill, progress).state === "new",
  );

  return (
    <div className="flex flex-col gap-4">
      {learned === 0 ? (
        // Only a newcomer needs telling what this is. Once you have played,
        // the pitch is wasted space above the thing you came back for.
        <p className="font-display text-[19px] font-semibold leading-snug text-ink">
          {t(UI.pitch)}
        </p>
      ) : null}

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
          eyebrow={learned === 0 ? t(UI.startHere) : t(UI.continueLabel)}
          title={t(next.setup.headline)}
          onClick={() => onOpenLesson(next.slug)}
        />
      ) : null}

      {learned > 0 ? (
        <button
          type="button"
          onClick={onOpenProgress}
          className="flex w-full items-center justify-between gap-3 rounded-lg border border-rule bg-paper-2 px-3 py-2.5 text-left transition hover:border-ink/40 hover:bg-paper-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        >
          <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {t(UI.progress)}
          </span>
          <span className="font-display text-sm font-semibold text-ink">
            {learned} / {puzzles.length} →
          </span>
        </button>
      ) : null}

      <LessonList onOpen={onOpenLesson} progress={progress} />
    </div>
  );
}
