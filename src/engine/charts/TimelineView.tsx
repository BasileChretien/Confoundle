import type { DataViewKind, TimelineData, TimelineTrack } from "../../puzzles/schema";
import { useT } from "../../app/i18n";
import { useReducedMotion } from "../useReducedMotion";
import { useCountUp } from "../useCountUp";
import { colorFor, WINNER_GOLD } from "./palette";
import { deathsAligned, formatDuration, trackDurations } from "./timeline";

const RAIL = "#DCD2BC"; // the un-lived part of the axis
const ONSET = "#8A7E6A";

/**
 * One row of the `survival` view: the bar that survival statistics actually
 * draw, re-anchored at each person's own diagnosis. Finding the disease earlier
 * makes this bar longer without touching the life it measures.
 */
function SurvivalRow({
  track,
  colorHex,
  axisMax,
  unit,
  animate,
}: {
  track: TimelineTrack;
  colorHex: string;
  axisMax: number;
  unit: string;
  animate: boolean;
}) {
  const t = useT();
  const reduced = useReducedMotion();
  const years = trackDurations(track).survivalFromDiagnosis;
  const value = useCountUp(years, animate, 800, reduced);
  const width = axisMax > 0 ? (value / axisMax) * 100 : 0;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[11px] font-medium leading-tight text-ink">
          {t(track.label)}
        </span>
        <span className="shrink-0 text-sm font-semibold tabular-nums text-ink">
          {formatDuration(Math.round(value * 10) / 10)} {unit}
        </span>
      </div>
      <div
        className="h-5 w-full overflow-hidden rounded-[3px]"
        style={{ backgroundColor: RAIL }}
        role="img"
        aria-label={`${t(track.label)}: ${formatDuration(years)} ${unit} after diagnosis`}
      >
        <div
          className="h-full rounded-[3px]"
          style={{ width: `${width}%`, backgroundColor: colorHex }}
        />
      </div>
    </div>
  );
}

/**
 * One row of the `lifespan` view: the same life on a shared calendar. Onset,
 * the moment of diagnosis, and death all sit at their true positions, so the
 * death markers line up across tracks and the "extra years" vanish.
 */
function LifespanRow({
  track,
  colorHex,
  span,
  unit,
  data,
}: {
  track: TimelineTrack;
  colorHex: string;
  span: number;
  unit: string;
  data: TimelineData;
}) {
  const t = useT();
  const pct = (v: number) => (span > 0 ? (v / span) * 100 : 0);
  const lived = trackDurations(track).lifeFromOnset;
  const at = (v: number) => `${formatDuration(v)} ${unit}`;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[11px] font-medium leading-tight text-ink">
          {t(track.label)}
        </span>
        {/* The length of the disease itself, identical on every track. Putting
            it beside each bar is half the reveal; the shared death line is the
            other half. */}
        <span className="shrink-0 text-sm font-semibold tabular-nums text-ink">
          {at(lived)}
        </span>
      </div>
      <div
        className="relative h-5 w-full rounded-[3px]"
        style={{ backgroundColor: RAIL }}
        role="img"
        aria-label={`${t(track.label)}: ${t(data.onsetLabel)} at ${at(track.onsetAt)}, ${t(data.detectedLabel)} at ${at(track.detectedAt)}, ${t(data.diedLabel)} at ${at(track.diedAt)}`}
      >
        {/* onset to death: the life this disease actually ran for */}
        <div
          className="absolute inset-y-0 rounded-[3px]"
          style={{
            left: `${pct(track.onsetAt)}%`,
            width: `${pct(lived)}%`,
            backgroundColor: colorHex,
          }}
        />
        {/* the moment of onset */}
        <span
          className="absolute inset-y-0 w-[2px]"
          style={{ left: `${pct(track.onsetAt)}%`, backgroundColor: ONSET }}
          aria-hidden="true"
        />
        {/* the moment of diagnosis, the only thing screening moves */}
        <span
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white"
          style={{ left: `${pct(track.detectedAt)}%`, backgroundColor: "#221D15" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function TimelineView({
  data,
  view,
  animate,
}: {
  data: TimelineData;
  view: DataViewKind;
  animate: boolean;
}) {
  const t = useT();
  const unit = t(data.unit);

  if (view === "survival") {
    const axisMax = Math.max(
      ...data.tracks.map((tr) => trackDurations(tr).survivalFromDiagnosis),
      1,
    );
    return (
      <div className="flex flex-col gap-3">
        <div className="text-center font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t(data.survivalLabel)}
        </div>
        {data.tracks.map((tr, i) => (
          <SurvivalRow
            key={tr.id}
            track={tr}
            colorHex={colorFor(i)}
            axisMax={axisMax}
            unit={unit}
            animate={animate}
          />
        ))}
      </div>
    );
  }

  const aligned = deathsAligned(data);
  const deathAt = data.tracks[0]?.diedAt ?? 0;
  const deathPct = data.span > 0 ? (deathAt / data.span) * 100 : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex flex-col gap-3 pb-1">
        {data.tracks.map((tr, i) => (
          <LifespanRow
            key={tr.id}
            track={tr}
            colorHex={colorFor(i)}
            span={data.span}
            unit={unit}
            data={data}
          />
        ))}
        {/* The reveal: one death instant, shared. Drawn over both rows so the
            eye cannot avoid the alignment. */}
        {aligned ? (
          <span
            className="pointer-events-none absolute bottom-0 top-0 w-[2px]"
            style={{ left: `${deathPct}%`, backgroundColor: WINNER_GOLD }}
            aria-hidden="true"
          />
        ) : null}
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-3 w-[2px] shrink-0"
            style={{ backgroundColor: ONSET }}
            aria-hidden="true"
          />
          {t(data.onsetLabel)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-white"
            style={{ backgroundColor: "#221D15" }}
            aria-hidden="true"
          />
          {t(data.detectedLabel)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-3 w-[2px] shrink-0"
            style={{ backgroundColor: WINNER_GOLD }}
            aria-hidden="true"
          />
          {t(data.diedLabel)}
        </span>
      </div>
    </div>
  );
}
