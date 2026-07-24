import { useEffect, useMemo, useState } from "react";
import { useLocale, useT } from "../app/i18n";
import { reviews } from "../app/reviews";
import { accuracyOf, lessonProgressFor, type LessonProgress } from "../app/lessonState";
import { getStats } from "../app/session";
import { UI } from "../app/ui";
import { puzzles } from "../puzzles";
import type { SkillProgress } from "../srs/schedule";
import { CONFIDENCE_LEVELS, type Confidence } from "./scoring";
import { Badge, Button } from "./ui";

/**
 * The progress screen: what you have learned, how solid it is, and where your
 * confidence is miscalibrated.
 *
 * The mastery map goes on top because it is the thing nothing else showed. The
 * SRS has been quietly recording a stage, a due date, a lifetime tally and a
 * "was certain and wrong" flag per skill, and until now every bit of that was
 * invisible. Streaks and calibration sit underneath: they are the older, more
 * familiar numbers, and they are not the reason someone opens this screen.
 *
 * Calibration is the one panel worth the space it takes. Being wrong is
 * ordinary; being wrong while certain is the failure this whole project exists
 * to catch, so the screen states it plainly rather than burying it in an average.
 */

const CONFIDENCE_LABEL: Record<Confidence, { en: string }> = {
  hunch: { en: "Hunch" },
  sure: { en: "Fairly sure" },
  certain: { en: "Certain" },
};

function pct(x: number): string {
  return `${Math.round(x * 100)}%`;
}

/** Localised "in 3 days" without hand-translating time units in ten languages. */
function useDueLabel(): (dueAt: number | null) => string | null {
  const locale = useLocale();
  const t = useT();
  return useMemo(() => {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    return (dueAt: number | null) => {
      if (dueAt == null) return null;
      const ms = dueAt - Date.now();
      if (ms <= 0) return t(UI.dueNow);
      const hours = Math.round(ms / 3_600_000);
      if (hours < 24) return rtf.format(Math.max(hours, 1), "hour");
      return rtf.format(Math.round(hours / 24), "day");
    };
  }, [locale, t]);
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-rule bg-paper-2 px-2 py-2.5">
      <span className="font-display text-lg font-semibold text-ink">{value}</span>
      <span className="mt-0.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {label}
      </span>
    </div>
  );
}

function MasteryRow({
  name,
  progress,
  dueLabel,
}: {
  name: string;
  progress: LessonProgress;
  dueLabel: string | null;
}) {
  const t = useT();
  const acc = accuracyOf(progress);
  const width = Math.max(Math.round((progress.stage / progress.maxStage) * 100), 6);
  return (
    <li className="rounded-lg border border-rule bg-paper-2 p-3">
      <div className="flex items-start justify-between gap-3">
        <span className="font-display text-[15px] font-semibold leading-tight text-ink">
          {name}
        </span>
        {progress.state === "mastered" ? (
          <span className="shrink-0">
            <Badge tone="brand">{t(UI.stateMastered)}</Badge>
          </span>
        ) : dueLabel ? (
          <span className="shrink-0 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {dueLabel}
          </span>
        ) : null}
      </div>

      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-rule">
        <div
          className={
            "h-full rounded-full " +
            (progress.state === "mastered" ? "bg-brand" : "bg-gold")
          }
          style={{ width: `${width}%` }}
        />
      </div>

      <div className="mt-1.5 flex items-center gap-2 text-[12px] text-ink-soft">
        {acc != null ? (
          <span>
            {pct(acc)} ({progress.lifetime.correct}/
            {progress.lifetime.correct + progress.lifetime.wrong})
          </span>
        ) : null}
        {progress.misconceived ? (
          <span className="font-semibold text-rust">⚠ {t(UI.sureAndWrong)}</span>
        ) : null}
      </div>
    </li>
  );
}

export function DashboardView({ onDone }: { onDone: () => void }) {
  const t = useT();
  const dueLabel = useDueLabel();
  const [all, setAll] = useState<SkillProgress[]>([]);
  const stats = getStats();

  useEffect(() => {
    let alive = true;
    void reviews.progress().then((p) => {
      if (alive) setAll(p);
    });
    return () => {
      alive = false;
    };
  }, []);

  // One row per learned skill. Sorted so the things wanting attention come
  // first: shaky beliefs, then whatever is due soonest, then the finished ones.
  const rows = useMemo(() => {
    return puzzles
      .map((p) => ({
        name: t(p.lesson.skillName),
        progress: lessonProgressFor(p.reasoningSkill, all),
      }))
      .filter((r) => r.progress.state !== "new")
      .sort((a, b) => {
        if (a.progress.misconceived !== b.progress.misconceived) {
          return a.progress.misconceived ? -1 : 1;
        }
        return (a.progress.dueAt ?? Infinity) - (b.progress.dueAt ?? Infinity);
      });
  }, [all, t]);

  const mastered = rows.filter((r) => r.progress.state === "mastered").length;
  const calibration = CONFIDENCE_LEVELS.filter((c) => stats.byConfidence[c].played > 0);

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <Badge tone="brand">{t(UI.progress)}</Badge>
        <h2 className="font-display text-[28px] font-semibold leading-[1.05] text-ink">
          {rows.length} / {puzzles.length}
        </h2>
        <p className="text-[15px] text-ink-soft">
          {t(UI.stateLearned)}
          {mastered > 0 ? ` · ${mastered} ${t(UI.stateMastered).toLowerCase()}` : ""}
        </p>
      </header>

      <div>
        <h3 className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t(UI.mastery)}
        </h3>
        {rows.length === 0 ? (
          <p className="rounded-lg border border-rule bg-paper-2 p-3 text-[14px] text-ink-soft">
            {t(UI.nothingLearnedYet)}
          </p>
        ) : (
          <ol className="flex flex-col gap-2">
            {rows.map((r) => (
              <MasteryRow
                key={r.name}
                name={r.name}
                progress={r.progress}
                dueLabel={dueLabel(r.progress.dueAt)}
              />
            ))}
          </ol>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Metric label={t(UI.streak)} value={`🔥 ${stats.currentStreak}`} />
        <Metric label={t(UI.best)} value={String(stats.maxStreak)} />
        <Metric label={t(UI.caught)} value={pct(stats.catchRate)} />
      </div>

      {calibration.length > 0 ? (
        <div>
          <h3 className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {t(UI.calibration)}
          </h3>
          <ul className="flex flex-col gap-1.5">
            {calibration.map((c) => {
              const b = stats.byConfidence[c];
              return (
                <li
                  key={c}
                  className="flex items-center justify-between rounded-lg border border-rule bg-paper-2 px-3 py-2 text-[13px]"
                >
                  <span className="text-ink-soft">{t(CONFIDENCE_LABEL[c])}</span>
                  <span className="font-semibold text-ink">
                    {b.caught}/{b.played} ({pct(b.caught / b.played)})
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <Button onClick={onDone}>{t(UI.back)}</Button>
    </section>
  );
}
