import { useT } from "../app/i18n";
import { lessonProgressFor, type LessonProgress } from "../app/lessonState";
import { UI } from "../app/ui";
import type { Puzzle } from "../puzzles/schema";
import type { SkillProgress } from "../srs/schedule";
import { Badge, StageRungs } from "./ui";

/**
 * The lesson card and a list of them, reused by the home search results and the
 * All-lessons browse screen. The full flat catalogue no longer sits on the home
 * screen: it is reached through the All-lessons button and filtered by category,
 * or found by keyword search.
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

export function LessonCard({
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
          // The one flag worth interrupting the layout for: a skill the learner
          // got wrong while certain, the failure mode the project exists to catch.
          <span className="mt-1.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-rust-ink">
            {t(UI.sureAndWrong)}
          </span>
        ) : null}
        <StageBar progress={progress} />
      </button>
    </li>
  );
}

/** A ready-made list of cards, given the puzzles to show. */
export function LessonResults({
  puzzles,
  progress,
  onOpen,
}: {
  puzzles: readonly Puzzle[];
  progress: readonly SkillProgress[];
  onOpen: (slug: string) => void;
}) {
  return (
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
  );
}
