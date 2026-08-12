import { useT } from "../../app/i18n";
import type { DriftData } from "../../puzzles/schema";
import { declaredColors } from "./palette";
import { maxExcursion, seriesPoints } from "./drift";

/**
 * Signed movement from a baseline, drawn as bars either side of a zero line.
 *
 * `atfirst` draws the first checkpoint alone, which is how such a result is
 * always reported and reads as settled. `overtime` keeps those identical bars
 * and adds what the same people looked like later. Nothing is recomputed
 * between the two views.
 *
 * Both directions share one scale (see `maxExcursion`), so a fall of five and a
 * rise of five are the same length. Scaling each side to its own extreme would
 * make a small decline look like a large one, which for this shape would
 * misreport the finding rather than merely look odd.
 */
function Bar({
  percent,
  scale,
  color,
}: {
  percent: number;
  scale: number;
  color: string;
}) {
  const width = scale === 0 ? 0 : (Math.abs(percent) / scale) * 50;
  const negative = percent < 0;
  return (
    <div className="relative h-4 w-full" aria-hidden="true">
      {/* The zero line, drawn down the middle so the two directions are legible
          without reading the numbers. */}
      <div className="absolute inset-y-0 left-1/2 w-px bg-rule" />
      <div
        className="absolute inset-y-0 rounded-[2px]"
        style={{
          width: `${width}%`,
          backgroundColor: color,
          opacity: negative ? 0.55 : 1,
          left: negative ? `${50 - width}%` : "50%",
        }}
      />
    </div>
  );
}

export function DriftView({
  data,
  full,
  kind,
}: {
  data: DriftData;
  /**
   * The UNRESTRICTED data, for colour only. `restrictDrift` filters `series`,
   * so a series' position in `data.series` is a property of the beat rather
   * than of the puzzle. See `declaredColors`.
   */
  full: DriftData;
  kind: "atfirst" | "overtime";
}) {
  const t = useT();
  const scale = maxExcursion(data);
  const colorOf = declaredColors(full.series);
  const shown =
    kind === "atfirst" ? data.checkpoints.slice(0, 1) : data.checkpoints;

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] leading-snug text-ink-soft">
        {t(data.metricLabel)}
      </p>

      <div className="flex flex-col gap-2.5 rounded-md border border-rule bg-paper/50 px-2.5 py-2">
        {shown.map((c) => (
          <div key={c.id} className="flex flex-col gap-1">
            <p className="font-sans text-[10px] uppercase tracking-eyebrow text-ink-soft">
              {t(c.label)}
            </p>
            {data.series.map((s) => {
              const point = seriesPoints(data, s.id).find(
                (p) => p.checkpointId === c.id,
              );
              if (!point) return null;
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <span className="w-[38%] shrink-0 truncate text-[12px] leading-snug text-ink">
                    {t(s.short ?? s.label)}
                  </span>
                  <Bar percent={point.percent} scale={scale} color={colorOf(s.id)} />
                  <span className="w-11 shrink-0 text-right font-mono text-[11px] tabular-nums text-ink">
                    {point.percent > 0 ? "+" : ""}
                    {point.percent.toFixed(1)}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="text-[11px] leading-snug text-ink-mute">
        {t(data.baselineLabel)}
      </p>
    </div>
  );
}
