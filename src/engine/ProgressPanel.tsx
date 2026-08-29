import { useMemo } from "react";
import { useLocale, useT } from "../app/i18n";
import { accuracyOf, lessonProgressFor, type LessonProgress } from "../app/lessonState";
import { getActivity, getStats } from "../app/session";
import { UI } from "../app/ui";
import { puzzles } from "../puzzles";
import {
  BUCKETS,
  bucketCounts,
  reviewForecast,
  stageName,
  weeklyForecast,
  type BucketId,
} from "../srs/buckets";
import type { SkillProgress } from "../srs/schedule";
import { CONFIDENCE_LEVELS, type Confidence } from "./scoring";
import { StageRungs } from "./ui";

/**
 * The progress panel: the standing strip, the SRS buckets, the week ahead, the
 * activity heatmap, the nemeses and conquests, the per-skill list and
 * calibration.
 *
 * IT IS THE REPORTING AND NOTHING ELSE, and it lives on its own route rather
 * than on the home screen. It used to render inline on home, which meant the
 * first thing a returning player saw was eleven measurements of themselves
 * above the one thing they could do. Two pieces left when it moved: the
 * Confounder, because a character that names an adversary is a hook rather
 * than a report, and the practice prompt, because it is an action and actions
 * belong with the other actions. Both now live in `HomeView`, which derives
 * the creature's numbers through `confounderStateFor` so the two screens
 * cannot disagree about them.
 *
 * Takes `progress` as a prop (the caller already has it loaded), so there is no
 * second async fetch and no loading flicker.
 *
 * Renders nothing at all when no skill has been started, so a player who
 * reaches the route directly gets the route's own empty state rather than a
 * column of zeroes.
 */

const BUCKET_LABEL: Record<BucketId, keyof typeof UI> = {
  apprentice: "bucketApprentice",
  guru: "bucketGuru",
  master: "bucketMaster",
  enlightened: "bucketEnlightened",
  burned: "bucketBurned",
};

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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-rule bg-paper-2 px-2 py-2.5">
      <span className="font-display text-lg font-semibold text-ink">{value}</span>
      <span className="mt-0.5 text-center font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {label}
      </span>
    </div>
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

/** The week ahead as seven bars, weekday-labelled in the reader's locale. */
function WeekAhead({ all }: { all: readonly SkillProgress[] }) {
  const locale = useLocale();
  const now = Date.now();
  const days = weeklyForecast(all, now, 7);
  const max = Math.max(1, ...days.map((d) => d.count));
  const wd = new Intl.DateTimeFormat(locale, { weekday: "short" });

  return (
    <div className="flex items-end justify-between gap-1.5">
      {days.map((d) => {
        const label = wd.format(new Date(now + d.inDays * 86_400_000));
        return (
          <div key={d.inDays} className="flex flex-1 flex-col items-center gap-1">
            <span className="font-mono text-[10px] tabular-nums text-ink-soft">
              {d.count > 0 ? d.count : ""}
            </span>
            <div className="flex h-16 w-full items-end justify-center">
              <div
                className={
                  "w-full rounded-t-[2px] " +
                  (d.inDays === 0 ? "bg-gold/70" : "bg-brand/50")
                }
                style={{
                  height: `${(d.count / max) * 100}%`,
                  minHeight: d.count > 0 ? "3px" : "0",
                }}
              />
            </div>
            <span className="font-sans text-[9px] uppercase tracking-eyebrow text-ink-mute">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Ten-week activity heatmap. */
function Heatmap() {
  const days = getActivity(70);
  const tone = (n: number): string => {
    if (n <= 0) return "bg-rule/50";
    if (n <= 2) return "bg-gold/25";
    if (n <= 5) return "bg-gold/50";
    return "bg-gold/80";
  };
  return (
    <div
      className="grid grid-flow-col gap-[3px]"
      style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
    >
      {days.map((d) => (
        <span
          key={d.date}
          title={`${d.date}: ${d.count}`}
          className={`h-2.5 w-2.5 rounded-[2px] ${tone(d.count)}`}
        />
      ))}
    </div>
  );
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
          <span className="font-semibold uppercase tracking-eyebrow text-[10px] text-rust-ink">
            {t(UI.sureAndWrong)}
          </span>
        ) : null}
      </div>
    </li>
  );
}

export function ProgressPanel({
  progress,
}: {
  progress: readonly SkillProgress[];
}) {
  const t = useT();
  const relative = useRelative();
  const stats = getStats();

  const rows = useMemo(
    () =>
      puzzles()
        .map((p) => ({
          slug: p.slug,
          name: t(p.lesson.skillName),
          progress: lessonProgressFor(p.reasoningSkill, progress),
        }))
        .filter((r) => r.progress.state !== "new")
        .sort((a, b) => {
          if (a.progress.misconceived !== b.progress.misconceived) {
            return a.progress.misconceived ? -1 : 1;
          }
          return b.progress.stage - a.progress.stage;
        }),
    [progress, t],
  );

  // Nothing learned yet: the panel would be all empty states, so show nothing.
  if (rows.length === 0) return null;

  const counts = bucketCounts(progress);
  const forecast = reviewForecast(progress, Date.now());
  const dueNow = forecast[0]?.inMs === 0 ? forecast[0].count : 0;
  const nextSlot = forecast.find((f) => f.inMs > 0);

  const nemeses = rows.filter((r) => {
    const acc = accuracyOf(r.progress);
    const attempts = r.progress.lifetime.correct + r.progress.lifetime.wrong;
    return r.progress.misconceived || (acc != null && acc < 0.6 && attempts >= 2);
  });
  const conquered = rows.filter((r) => r.progress.state === "mastered");

  return (
    <div className="flex flex-col gap-5">
      {/*
        THE MASCOT AND THE PRACTICE PROMPT BOTH LEFT THIS FILE, for opposite
        reasons.

        The Confounder is a hook rather than a report. It names an adversary and
        it is the only character in the interface, so it belongs on the screen a
        returning player actually lands on. The practice prompt is an ACTION,
        and actions belong beside the other actions rather than buried under
        eleven data displays.

        What is left here is the reporting, which is the part that moved behind
        a tap.
      */}
      {/* Standing: the satisfying numbers. */}
      <div className="grid grid-cols-4 gap-2">
        <Metric label={t(UI.streak)} value={String(stats.currentStreak)} />
        <Metric label={t(UI.best)} value={String(stats.maxStreak)} />
        <Metric label={t(UI.caught)} value={pct(stats.catchRate)} />
        <Metric label={t(UI.bucketBurned)} value={String(counts.burned)} />
      </div>

      {/* Where knowledge sits. */}
      <div>
        <h3 className="mb-2 flex items-baseline justify-between font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          <span>{t(UI.mastery)}</span>
          <span className="tabular-nums">
            {rows.length} / {puzzles().length}
          </span>
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

      {/* The week ahead. */}
      <div>
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <h3 className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {t(UI.weekAhead)}
          </h3>
          {dueNow === 0 && nextSlot ? (
            <span className="font-sans text-[11px] text-ink-soft">
              {relative(nextSlot.inMs)}
            </span>
          ) : null}
        </div>
        <WeekAhead all={progress} />
      </div>

      {/* Turning up. */}
      <div>
        <h3 className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t(UI.activityTitle)}
        </h3>
        <Heatmap />
      </div>

      {/* Nemeses: the traps still winning. */}
      <div>
        <h3 className="mb-1 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t(UI.nemesesTitle)}
        </h3>
        {nemeses.length > 0 ? (
          <>
            <p className="mb-2 text-[12px] text-ink-soft">{t(UI.nemesesBlurb)}</p>
            <ol className="flex flex-col gap-2">
              {nemeses.slice(0, 3).map((r) => (
                <MasteryRow key={r.slug} name={r.name} progress={r.progress} />
              ))}
            </ol>
          </>
        ) : (
          <p className="rounded-lg border border-brand/30 bg-brand/[0.06] p-3 text-[13px] text-ink-soft">
            {t(UI.nemesesNone)}
          </p>
        )}
      </div>

      {/* Conquered: burned for good. */}
      {conquered.length > 0 ? (
        <div>
          <h3 className="mb-1 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {t(UI.conquestsTitle)}
          </h3>
          <p className="mb-2 text-[12px] text-ink-soft">{t(UI.conquestsBlurb)}</p>
          <ul className="flex flex-wrap gap-1.5">
            {conquered.map((r) => (
              <li
                key={r.slug}
                className="rounded-md border border-ink/20 bg-ink/[0.05] px-2 py-1 text-[12px] font-medium text-ink-soft"
              >
                {r.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Every learned skill. */}
      <ol className="flex flex-col gap-2">
        {rows.map((r) => (
          <MasteryRow key={r.slug} name={r.name} progress={r.progress} />
        ))}
      </ol>

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
    </div>
  );
}
