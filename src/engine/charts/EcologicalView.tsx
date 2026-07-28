import { useT } from "../../app/i18n";
import type { EcologicalData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { formatR, personRates, slopeLine } from "./ecological";

/**
 * One relationship at two units of analysis.
 *
 * `byplace` draws the group level as a slope with its printed correlation, and
 * says on the figure that the slope is drawn rather than plotted, because the
 * source published the coefficient and never the per-place figures. `byperson`
 * drops to real counts and lets the bars fall where the arithmetic puts them,
 * which is the opposite way round.
 */
export function EcologicalView({
  data,
  kind,
}: {
  data: EcologicalData;
  kind: "byplace" | "byperson";
}) {
  const t = useT();

  if (kind === "byplace") {
    const line = slopeLine(data);
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-sans text-[11px] uppercase tracking-eyebrow text-ink-mute">
            {t(data.unitLabel)}
          </span>
          <span className="font-mono text-lg font-semibold tabular-nums text-ink">
            r = {formatR(data.groupCorrelation)}
          </span>
        </div>

        <div className="flex gap-2">
          {/* y axis label, rotated */}
          <div className="flex w-4 shrink-0 items-center justify-center">
            <span
              className="whitespace-nowrap font-sans text-[10px] uppercase tracking-eyebrow text-ink-mute"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {t(data.yLabel)}
            </span>
          </div>

          <div className="relative h-32 flex-1 rounded-md border border-rule bg-paper/50">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label={`Compared group by group, the relationship runs ${
                data.groupCorrelation < 0 ? "downward" : "upward"
              }, r equals ${formatR(data.groupCorrelation)}`}
            >
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={colorFor(0)}
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        <div className="ps-6 font-sans text-[10px] uppercase tracking-eyebrow text-ink-mute">
          {t(data.xLabel)}
        </div>
        <p className="text-[11px] leading-snug text-ink-mute">{t(data.schematicNote)}</p>
      </div>
    );
  }

  // Person level: real counts, real bars.
  const rates = personRates(data);
  const max = Math.max(...rates.map((r) => r.rate), 0.01);
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-[11px] uppercase tracking-eyebrow text-ink-mute">
          {t(data.outcomeLabel)}
        </span>
        <span className="font-mono text-lg font-semibold tabular-nums text-ink">
          r = {formatR(data.personCorrelation)}
        </span>
      </div>

      {rates.map((r, i) => (
        <div key={t(r.label)} className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-sans text-[12px] font-semibold text-ink">
              {t(r.short ?? r.label)}
            </span>
            <span className="font-mono text-[12px] tabular-nums text-ink-soft">
              {r.affected.toLocaleString()} / {r.total.toLocaleString()} (
              {(r.rate * 100).toFixed(1)}%)
            </span>
          </div>
          <div className="h-5 w-full overflow-hidden rounded-[3px] bg-rule/60">
            <div
              className="h-full rounded-[3px]"
              style={{
                width: `${(r.rate / max) * 100}%`,
                backgroundColor: colorFor(i),
              }}
              role="img"
              aria-label={`${t(r.label)}: ${(r.rate * 100).toFixed(1)} percent`}
            />
          </div>
        </div>
      ))}

      <p className="text-[11px] leading-snug text-ink-mute">{t(data.scaleNote)}</p>
    </div>
  );
}
