import { useT } from "../app/i18n";
import { lessonProgressFor, type LessonProgress } from "../app/lessonState";
import { UI } from "../app/ui";
import { puzzles } from "../puzzles";
import type { Puzzle } from "../puzzles/schema";
import type { SkillProgress } from "../srs/schedule";
import { Badge, StageRungs } from "./ui";

/**
 * The course, browsable.
 *
 * Confoundle used to serve exactly one puzzle a day and hide the other sixteen,
 * which meant a first-time visitor played for ninety seconds and then hit a
 * wall. That gate never made sense next to the lesson pages, which have always
 * published every lesson at /l/<slug>: the content was already public, it just
 * was not playable. So the list is open, and where you are on each one is the
 * only progression that remains.
 */

function StateBadge({ progress }: { progress: LessonProgress }) {
  const t = useT();
  if (progress.state === "mastered") {
    return <Badge tone="brand">{t(UI.stateMastered)}</Badge>;
  }
  if (progress.state === "learned") {
    return <Badge tone="gold">{t(UI.stateLearned)}</Badge>;
  }
  return <Badge>{t(UI.stateNew)}</Badge>;
}

/**
 * A thin ladder bar. Drawn only once a skill is on the schedule, because a bar
 * at zero on every unplayed lesson reads as failure rather than as an invitation.
 */
function StageBar({ progress }: { progress: LessonProgress }) {
  if (progress.state === "new") return null;
  return (
    <StageRungs
      stage={progress.stage}
      max={progress.maxStage}
      tone={progress.state === "mastered" ? "brand" : "gold"}
      label={`${progress.stage} / ${progress.maxStage}`}
    />
  );
}

function LessonCard({
  puzzle,
  progress,
  onOpen,
}: {
  puzzle: Puzzle;
  progress: LessonProgress;
  onOpen: (slug: string) => void;
}) {
  const t = useT();
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(puzzle.slug)}
        className="flex w-full flex-col rounded-lg border border-rule bg-paper-2 p-3.5 text-start transition hover:border-ink/40 hover:bg-paper-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand active:scale-[.995]"
      >
        <div className="flex items-start justify-between gap-3">
          {/* The hook, never the skill name: naming the bias here would hand
              over the answer, and being fooled first is the entire mechanic. */}
          <span className="font-display text-base font-semibold leading-snug text-ink">
            {t(puzzle.setup.headline)}
          </span>
          <span className="shrink-0">
            <StateBadge progress={progress} />
          </span>
        </div>
        {progress.state !== "new" ? (
          // Safe to name once it has been taught, and useful: this is how you
          // find the lesson you half-remember and want to redo.
          <span className="mt-1.5 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {t(puzzle.lesson.skillName)}
          </span>
        ) : null}
        {progress.misconceived ? (
          // The one flag worth interrupting the layout for: this is a skill the
          // learner got wrong while certain, which is the failure mode the whole
          // project exists to catch.
          <span className="mt-1.5 text-[12px] font-semibold text-rust-ink">
            ⚠ {t(UI.sureAndWrong)}
          </span>
        ) : null}
        <StageBar progress={progress} />
      </button>
    </li>
  );
}

export function LessonList({
  onOpen,
  progress,
}: {
  onOpen: (slug: string) => void;
  /** Loaded once by the home screen, so list and header cannot disagree. */
  progress: readonly SkillProgress[];
}) {
  const t = useT();

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {t(UI.allLessons)}
      </h2>
      <ol className="flex flex-col gap-2.5">
        {puzzles.map((p) => (
          <LessonCard
            key={p.slug}
            puzzle={p}
            progress={lessonProgressFor(p.reasoningSkill, progress)}
            onOpen={onOpen}
          />
        ))}
      </ol>
    </section>
  );
}
