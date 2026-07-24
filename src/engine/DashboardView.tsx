import { useEffect, useMemo, useState } from "react";
import { useLocale, useT } from "../app/i18n";
import { reviews } from "../app/reviews";
import { accuracyOf, lessonProgressFor, type LessonProgress } from "../app/lessonState";
import { getStats } from "../app/session";
import { UI } from "../app/ui";
import { puzzles } from "../puzzles";
import {
  BUCKETS,
  bucketCounts,
  reviewForecast,
  stageName,
  type BucketId,
} from "../srs/buckets";
import type { SkillProgress } from "../srs/schedule";
import { CONFIDENCE_LEVELS, type Confidence } from "./scoring";
import { Badge, Button, StageRungs } from "./ui";

/**
 * The progress screen, built the way WaniKani builds one, because the ladder
 * underneath already is WaniKani's: the stages in schedule.ts are Apprentice I
 * to IV, Guru I and II, Master, Enlightened, Burned.
 *
 * That means the same three questions get answered in the same order. What can
 * I do right now (the two tiles). Where does my knowledge actually sit (the
 * stage buckets). When does the next batch land (the forecast). Everything
 * Confoundle-specific, calibration above all, sits below that, because it is
 * the part you read occasionally rather than the part you act on.
 *
 * The colours are Confoundle's, not WaniKani's pink and purple, which would
 * fight the editorial palette. The structure is what was worth borrowing.
 */

const BUCKET_LABEL: Record<BucketId, keyof typeof UI> = {
  apprentice: "bucketApprentice",
  guru: "bucketGuru",
  master: "bucketMaster",
  enlightened: "bucketEnlightened",
  burned: "bucketBurned",
};

/** Warm to cool as knowledge sets: recent and shaky in rust, permanent in ink. */
const BUCKET_TONE: Record<BucketId, string> = {
  apprentice: "bg-rust/12 border-rust/35 text-rust",
  guru: "bg-gold/12 border-gold/40 text-ink",
  master: "bg-brand/10 border-brand/35 text-ink",
  enlightened: "bg-brand/16 border-brand/50 text-ink",
  burned: "bg-ink/8 border-ink/25 text-ink-soft",
};

const CONFIDENCE_LABEL: Record<Confidence, { en: string }> = {
  hunch: { en: "Hunch" },
  sure: { en: "Fairly sure" },
  certain: { en: "Certain" },
};

function pct(x: number | null): string {
  return x == null ? "—" : `${Math.round(x * 100)}%`;
}

function ActionTile({
  label,
  count,
  tone,
  onClick,
  disabled,
}: {
  label: string;
  count: number;
  tone: "gold" | "brand";
  onClick: () => void;
  disabled: boolean;
}) {
  const live = !disabled && count > 0;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!live}
      className={
        "flex flex-1 flex-col items-center rounded-lg border px-3 py-3 transition focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand " +
        (live
          ? tone === "gold"
            ? "border-gold/45 bg-gold/12 hover:bg-gold/20"
            : "border-brand/45 bg-brand/10 hover:bg-brand/18"
          : "border-rule bg-paper-2 opacity-55")
      }
    >
      <span className="font-display text-2xl font-semibold leading-none text-ink">
        {count}
      </span>
      <span className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {label}
      </span>
    </button>
  );
}

function useRelative(): (ms: number) => string {
  const locale = useLocale();
  const t = useT();
  return useMemo(() => {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    return (ms: number) => {
      if (ms <= 0) return t(UI.dueNow);
      const hours = Math.round(ms / 3_600_000);
      return hours < 24
        ? rtf.format(Math.max(hours, 1), "hour")
        : rtf.format(Math.round(hours / 24), "day");
    };
  }, [locale, t]);
}

function MasteryRow({ name, progress }: { name: string; progress: LessonProgress }) {
  const t = useT();
  const acc = accuracyOf(progress);
  return (
    <li className="rounded-lg border border-rule bg-paper-2 p-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-[14px] font-semibold leading-tight text-ink">
          {name}
        </span>
        <span className="shrink-0 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {stageName(progress.stage)}
        </span>
      </div>
      <StageRungs
        stage={progress.stage}
        max={progress.maxStage}
        tone={progress.state === "mastered" ? "brand" : "gold"}
        label={`${stageName(progress.stage)}, ${progress.stage} of ${progress.maxStage}`}
      />
      <div className="mt-1 flex items-center gap-2 text-[11px] text-ink-soft">
        {acc != null ? (
          <span>
            {pct(acc)} ({progress.lifetime.correct}/
            {progress.lifetime.correct + progress.lifetime.wrong})
          </span>
        ) : null}
        {progress.misconceived ? (
          <span className="font-semibold text-rust-ink">⚠ {t(UI.sureAndWrong)}</span>
        ) : null}
      </div>
    </li>
  );
}

export function DashboardView({
  onDone,
  onStartReviews,
  onPractise,
  onOpenLesson,
}: {
  onDone: () => void;
  onStartReviews: () => void;
  /** Practice ignores the schedule, so there is always something to do. */
  onPractise: () => void;
  onOpenLesson: (slug: string) => void;
}) {
  const t = useT();
  const relative = useRelative();
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

  const rows = useMemo(
    () =>
      puzzles
        .map((p) => ({
          slug: p.slug,
          name: t(p.lesson.skillName),
          progress: lessonProgressFor(p.reasoningSkill, all),
        }))
        .filter((r) => r.progress.state !== "new")
        .sort((a, b) => {
          if (a.progress.misconceived !== b.progress.misconceived) {
            return a.progress.misconceived ? -1 : 1;
          }
          return b.progress.stage - a.progress.stage;
        }),
    [all, t],
  );

  const counts = bucketCounts(all);
  const forecast = reviewForecast(all, Date.now());
  const dueNow = forecast[0]?.inMs === 0 ? forecast[0].count : 0;
  const unlearned = puzzles.filter(
    (p) => lessonProgressFor(p.reasoningSkill, all).state === "new",
  );

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <Badge tone="brand">{t(UI.progress)}</Badge>
        <h2 className="font-display text-[28px] font-semibold leading-[1.05] text-ink">
          {rows.length} / {puzzles.length}
        </h2>
      </header>

      {/* The two things you can act on, exactly where WaniKani puts them. */}
      <div className="flex gap-2">
        <ActionTile
          label={t(UI.lessons)}
          count={unlearned.length}
          tone="brand"
          disabled={false}
          onClick={() => unlearned[0] && onOpenLesson(unlearned[0].slug)}
        />
        <ActionTile
          label={t(UI.reviewsShort)}
          count={dueNow}
          tone="gold"
          disabled={false}
          onClick={onStartReviews}
        />
      </div>

      {rows.length > 0 && dueNow === 0 ? (
        // The screen used to offer a finished learner nothing at all: both
        // tiles grey, "nothing scheduled", and roughly half the authored
        // scenarios unreachable behind the scheduler. Practice is the way out.
        <button
          type="button"
          onClick={onPractise}
          className="flex w-full items-center justify-between gap-3 rounded-lg border border-brand/35 bg-brand/[0.07] px-3 py-3 text-start transition hover:bg-brand/[0.13] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        >
          <span className="flex flex-col">
            <span className="font-display text-[15px] font-semibold text-ink">
              {t(UI.practise)}
            </span>
            <span className="text-[12px] text-ink-soft">{t(UI.practiseBlurb)}</span>
          </span>
        </button>
      ) : null}

      <div>
        <h3 className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t(UI.mastery)}
        </h3>
        <div className="grid grid-cols-5 gap-1.5">
          {BUCKETS.map((b) => (
            <div
              key={b.id}
              className={`flex flex-col items-center rounded-md border px-1 py-2 ${BUCKET_TONE[b.id]}`}
            >
              <span className="font-display text-lg font-semibold leading-none">
                {counts[b.id]}
              </span>
              <span className="mt-1 text-center font-sans text-[9px] font-semibold uppercase leading-tight tracking-eyebrow">
                {t(UI[BUCKET_LABEL[b.id]])}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t(UI.nextReviews)}
        </h3>
        {forecast.length === 0 ? (
          <p className="rounded-lg border border-rule bg-paper-2 p-3 text-[13px] text-ink-soft">
            {t(UI.nothingScheduled)}
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {forecast.map((slot) => (
              <li
                key={slot.inMs}
                className="flex items-center justify-between rounded-md border border-rule bg-paper-2 px-3 py-1.5 text-[13px]"
              >
                <span className={slot.inMs === 0 ? "font-semibold text-ink" : "text-ink-soft"}>
                  {relative(slot.inMs)}
                </span>
                <span className="font-mono tabular-nums text-ink">{slot.count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {rows.length > 0 ? (
        <ol className="flex flex-col gap-2">
          {rows.map((r) => (
            <MasteryRow key={r.slug} name={r.name} progress={r.progress} />
          ))}
        </ol>
      ) : (
        <p className="rounded-lg border border-rule bg-paper-2 p-3 text-[14px] text-ink-soft">
          {t(UI.nothingLearnedYet)}
        </p>
      )}

      <div className="grid grid-cols-3 gap-2">
        <Metric label={t(UI.streak)} value={`🔥 ${stats.currentStreak}`} />
        <Metric label={t(UI.best)} value={String(stats.maxStreak)} />
        <Metric label={t(UI.caught)} value={pct(stats.catchRate)} />
      </div>

      {CONFIDENCE_LEVELS.some((c) => stats.byConfidence[c].played > 0) ? (
        <div>
          <h3 className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {t(UI.calibration)}
          </h3>
          <ul className="flex flex-col gap-1.5">
            {CONFIDENCE_LEVELS.filter((c) => stats.byConfidence[c].played > 0).map((c) => {
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
