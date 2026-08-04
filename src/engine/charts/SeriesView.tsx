import { useT } from "../../app/i18n";
import type { SeriesData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { crossoverPoint, seriesShape } from "./series";

/**
 * Two instruments counting the same thing over time.
 *
 * `oneinstrument` draws a single line, which reads as a plain trend. The reveal,
 * `bothinstruments`, adds the other and it crosses. Both views scale against
 * the largest count anywhere in the data rather than the largest one drawn, so
 * the first line does not move when the second arrives.
 *
 * A year with no observation is drawn as a break in the line rather than as a
 * zero or as a straight segment through it. A survey that was suspended did not
 * measure nothing; it measured nothing at all, and the chart has to say so.
 */
const W = 320;
const H = 150;
const PAD_X = 8;
const PAD_TOP = 10;
const PAD_BOTTOM = 22;

export function SeriesView({
  data,
  full,
  kind,
}: {
  data: SeriesData;
  full: SeriesData;
  kind: "oneinstrument" | "bothinstruments";
}) {
  const t = useT();
  const { lines } = seriesShape(data, full);
  const crossover = kind === "bothinstruments" ? crossoverPoint(full) : null;

  const px = (x: number) => PAD_X + x * (W - PAD_X * 2);
  const py = (y: number) => PAD_TOP + (1 - y) * (H - PAD_TOP - PAD_BOTTOM);

  const crossX =
    crossover !== null
      ? px(
          full.points.findIndex((p) => p.id === crossover) /
            Math.max(full.points.length - 1, 1),
        )
      : null;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {lines.map((l, i) => (
          <span
            key={l.id}
            className="flex items-center gap-1.5 text-[10px] leading-none text-ink-soft"
          >
            <span
              className="h-2 w-2 rounded-[1px]"
              style={{ backgroundColor: colorFor(i) }}
              aria-hidden="true"
            />
            {t(l.short ?? l.label)}
          </span>
        ))}
      </div>

      <div className="rounded-md border border-rule bg-paper/50 px-1 py-1">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t(data.metricLabel)}>
          {crossX !== null ? (
            <line
              x1={crossX}
              y1={PAD_TOP - 4}
              x2={crossX}
              y2={H - PAD_BOTTOM}
              stroke="currentColor"
              className="text-ink-mute"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          ) : null}

          {/* Baseline, so the reader can see the counts are drawn from zero. */}
          <line
            x1={PAD_X}
            y1={H - PAD_BOTTOM}
            x2={W - PAD_X}
            y2={H - PAD_BOTTOM}
            stroke="currentColor"
            className="text-rule"
            strokeWidth={1}
          />

          {lines.map((l, i) => {
            // Break the path wherever a year has no observation, so a gap
            // stays a gap. Consecutive dots only are joined.
            const segments: string[] = [];
            let current: string[] = [];
            let prevIndex = -2;
            for (const d of l.dots) {
              const idx = full.points.findIndex((p) => p.id === d.pointId);
              const cmd = `${px(d.x).toFixed(1)} ${py(d.y).toFixed(1)}`;
              if (idx !== prevIndex + 1 && current.length) {
                segments.push(`M${current.join("L")}`);
                current = [];
              }
              current.push(cmd);
              prevIndex = idx;
            }
            if (current.length) segments.push(`M${current.join("L")}`);
            return (
              <g key={l.id}>
                <path
                  d={segments.join("")}
                  fill="none"
                  stroke={colorFor(i)}
                  strokeWidth={2}
                  strokeLinejoin="round"
                />
                {l.dots.map((d) => (
                  <circle
                    key={d.pointId}
                    cx={px(d.x)}
                    cy={py(d.y)}
                    r={2}
                    fill={colorFor(i)}
                  />
                ))}
              </g>
            );
          })}

          {/* First and last year, so the axis is readable without a full scale. */}
          <text x={PAD_X} y={H - 8} fontSize="9" className="fill-ink-mute">
            {t(full.points[0].short ?? full.points[0].label)}
          </text>
          <text
            x={W - PAD_X}
            y={H - 8}
            fontSize="9"
            textAnchor="end"
            className="fill-ink-mute"
          >
            {t(
              full.points[full.points.length - 1].short ??
                full.points[full.points.length - 1].label,
            )}
          </text>
        </svg>
      </div>

      {/*
        No interpolated numbers here. A caption built from a fragment plus a
        variable cannot be translated, so anything the reader needs to read as a
        number is authored into the puzzle's own copy instead.
      */}
      <p className="text-[11px] leading-snug text-ink-soft">
        {t(data.metricLabel)}
      </p>

      {crossover && data.crossoverLabel ? (
        <p className="text-[11px] leading-snug text-ink-soft">
          {t(data.crossoverLabel)}
        </p>
      ) : null}

      <p className="text-[11px] leading-snug text-ink-mute">{t(data.statNote)}</p>
    </div>
  );
}
