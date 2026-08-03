import { useT } from "../../app/i18n";
import type { RatingsData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { anchorPosition, points } from "./ratings";

/**
 * Mean ratings placed on the scale they were measured on.
 *
 * `onerating` draws the first series alone, which is how such a number is
 * usually quoted. `bothratings` keeps that identical marker and adds the
 * others. Nothing is recomputed between the two views.
 *
 * The scale is drawn in full with its endpoints named, because a mean is
 * meaningless without it: 3.23 is not a quantity of anything, it is a position
 * between "large positive effect" and "large negative effect". The anchor line
 * is what makes the lesson legible, since the finding here is not that one mean
 * exceeds another but that one of them sits on "no effect at all".
 */
function Row({
  name,
  position,
  low,
  high,
  mean,
  color,
}: {
  name: string;
  position: number;
  low?: number;
  high?: number;
  mean: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-[34%] shrink-0 truncate text-[12px] leading-snug text-ink">
        {name}
      </span>
      <div className="relative h-5 flex-1" aria-hidden="true">
        {low !== undefined && high !== undefined ? (
          <div
            className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full"
            style={{
              left: `${low * 100}%`,
              width: `${(high - low) * 100}%`,
              backgroundColor: color,
              opacity: 0.28,
            }}
          />
        ) : null}
        <div
          className="absolute top-1/2 h-3 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ left: `${position * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-9 shrink-0 text-right font-mono text-[11px] tabular-nums text-ink">
        {mean.toFixed(2)}
      </span>
    </div>
  );
}

export function RatingsView({
  data,
  kind,
}: {
  data: RatingsData;
  kind: "onerating" | "bothratings";
}) {
  const t = useT();
  const all = points(data);
  const shown = kind === "onerating" ? all.slice(0, 1) : all;
  const anchor = anchorPosition(data);

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] leading-snug text-ink-soft">{t(data.metricLabel)}</p>

      <div className="rounded-md border border-rule bg-paper/50 px-2.5 py-2">
        <div className="flex flex-col gap-2">
          {shown.map((p) => {
            const series = data.series.find((s) => s.id === p.seriesId);
            const index = data.series.findIndex((s) => s.id === p.seriesId);
            if (!series) return null;
            return (
              <Row
                key={p.seriesId}
                name={t(series.short ?? series.label)}
                position={p.position}
                low={p.low}
                high={p.high}
                mean={p.mean}
                color={colorFor(index)}
              />
            );
          })}
        </div>

        {/* The axis, drawn once beneath the markers so both views share it. */}
        <div className="mt-1 flex items-center gap-2">
          <span className="w-[34%] shrink-0" aria-hidden="true" />
          <div className="relative h-4 flex-1">
            <div className="absolute top-0 h-px w-full bg-rule" />
            {anchor === undefined ? null : (
              <span
                className="absolute top-0 h-2 w-px bg-ink-mute"
                style={{ left: `${anchor * 100}%` }}
                aria-hidden="true"
              />
            )}
          </div>
          <span className="w-9 shrink-0" aria-hidden="true" />
        </div>

        <div className="flex items-center gap-2">
          <span className="w-[34%] shrink-0" aria-hidden="true" />
          <div className="flex flex-1 justify-between font-sans text-[9px] uppercase tracking-eyebrow text-ink-mute">
            <span>{t(data.scale.minLabel)}</span>
            <span>{t(data.scale.maxLabel)}</span>
          </div>
          <span className="w-9 shrink-0" aria-hidden="true" />
        </div>
      </div>

      <p className="text-[11px] leading-snug text-ink-mute">
        {data.scale.anchorLabel ? `${t(data.scale.anchorLabel)}. ` : ""}
        {data.dispersionLabel ? t(data.dispersionLabel) : ""}
      </p>
    </div>
  );
}
