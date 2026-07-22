import { getStats } from "../app/session";
import { useT } from "../app/i18n";
import { CONFIDENCE_LEVELS, type Confidence } from "./scoring";

const CONFIDENCE_LABEL: Record<Confidence, string> = {
  hunch: "Hunch",
  sure: "Fairly sure",
  certain: "Certain",
};

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-display text-2xl font-semibold tabular-nums text-ink">
        {value}
      </span>
      <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {label}
      </span>
    </div>
  );
}

/**
 * The results panel shown after a play: today's score, the streak that pulls
 * you back tomorrow, and how well your confidence tracked reality (calibration).
 * All derived from localStorage, nothing leaves the device.
 */
export function StatsPanel({ todayScore }: { todayScore?: number }) {
  const t = useT();
  const s = getStats();
  const pct = (n: number) => Math.round(n * 100);
  const played = CONFIDENCE_LEVELS.filter((c) => s.byConfidence[c].played > 0);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-rule bg-paper-2 p-4">
      {todayScore != null ? (
        <div className="flex items-center justify-between border-b border-rule pb-2.5">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {t({ en: "Today" })}
          </span>
          <span className="font-display text-xl font-semibold tabular-nums text-gold-ink">
            {todayScore >= 0 ? `+${todayScore}` : todayScore} {t({ en: "pts" })}
          </span>
        </div>
      ) : null}

      <div className="grid grid-cols-3 gap-2">
        <Metric label={t({ en: "Streak" })} value={`🔥 ${s.currentStreak}`} />
        <Metric label={t({ en: "Best" })} value={String(s.maxStreak)} />
        <Metric label={t({ en: "Caught" })} value={`${pct(s.catchRate)}%`} />
      </div>

      {played.length > 0 ? (
        <div className="flex flex-col gap-1.5 border-t border-rule pt-2.5">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {t({ en: "Calibration" })}
          </span>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-ink-soft">
            {played.map((c) => {
              const b = s.byConfidence[c];
              return (
                <span key={c} className="tabular-nums">
                  {t({ en: CONFIDENCE_LABEL[c] })}{" "}
                  <span className="font-semibold text-ink">
                    {b.caught}/{b.played}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      ) : null}

      <p className="text-center font-sans text-[11px] text-ink-mute">
        {t({ en: "A new puzzle every day. Keep the streak alive." })}
      </p>
    </div>
  );
}
