import type { DataViewKind, TimelineData, TimelineTrack } from "../../puzzles/schema";
import { useT } from "../../app/i18n";
import { useReducedMotion } from "../useReducedMotion";
import { useCountUp } from "../useCountUp";
import { fillSlots } from "./announce";
import { colorFor, WINNER_GOLD } from "./palette";
import {
  atRiskTime,
  countedTime,
  deathsAligned,
  formatDuration,
  immortalTime,
  trackDurations,
} from "./timeline";

const RAIL = "#DCD2BC"; // the un-lived part of the axis
const ONSET = "#8A7E6A";

/**
 * One row of the `counted` and `immortal` views: the stretch of time a study
 * credited to a group, drawn from the person's entry to their death.
 *
 * The two views draw the SAME bar. The only difference is that `immortal`
 * hatches the part of it during which the person could not have died, because
 * dying would have kept them out of the group being credited. That is the whole
 * reveal, and it is why this is one component with a flag rather than two: if
 * the bars differed in any other way, the puzzle would be comparing two
 * pictures instead of showing one picture twice.
 */
function CountedRow({
  track,
  colorHex,
  span,
  unit,
  shadeImmortal,
}: {
  track: TimelineTrack;
  colorHex: string;
  span: number;
  unit: string;
  shadeImmortal: boolean;
}) {
  const t = useT();
  const pct = (v: number) => (span > 0 ? (v / span) * 100 : 0);
  const immortal = immortalTime(track);
  const shown = shadeImmortal && immortal > 0 ? atRiskTime(track) : countedTime(track);
  // The unit travels with its number into the slot, rather than being a slot of
  // its own, so a translation can put "3 years" wherever the sentence needs it
  // without the two halves drifting apart. It is the same pairing the row above
  // already draws.
  const dur = (v: number) => `${formatDuration(v)} ${unit}`;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[11px] font-medium leading-tight text-ink">
          {t(track.label)}
        </span>
        <span className="shrink-0 text-sm font-semibold tabular-nums text-ink">
          {formatDuration(Math.round(shown * 10) / 10)} {unit}
        </span>
      </div>
      <div
        className="relative h-5 w-full rounded-[3px]"
        style={{ backgroundColor: RAIL }}
        role="img"
        aria-label={
          shadeImmortal && immortal > 0
            ? fillSlots(
                t({
                  en: "{track}: {immortal} counted but not at risk, then {atrisk} at risk",
                }),
                {
                  track: t(track.label),
                  immortal: dur(immortal),
                  atrisk: dur(atRiskTime(track)),
                },
              )
            : fillSlots(t({ en: "{track}: {counted} counted" }), {
                track: t(track.label),
                counted: dur(countedTime(track)),
              })
        }
      >
        {shadeImmortal && immortal > 0 ? (
          <>
            {/* Counted, but guaranteed death-free by the way the group was
                defined. Hatched rather than merely paler, so it reads as "this
                does not count" even in greyscale or on a screenshot. */}
            <div
              className="absolute inset-y-0 rounded-l-[3px]"
              style={{
                left: `${pct(track.onsetAt)}%`,
                width: `${pct(immortal)}%`,
                backgroundImage: `repeating-linear-gradient(45deg, ${colorHex} 0 3px, transparent 3px 6px)`,
                opacity: 0.55,
              }}
            />
            <div
              className="absolute inset-y-0 rounded-r-[3px]"
              style={{
                left: `${pct(track.immortalUntil ?? track.onsetAt)}%`,
                width: `${pct(atRiskTime(track))}%`,
                backgroundColor: colorHex,
              }}
            />
            {/* The instant the person actually joined the group. */}
            <span
              className="absolute inset-y-0 w-[2px]"
              style={{
                left: `${pct(track.immortalUntil ?? track.onsetAt)}%`,
                backgroundColor: "#221D15",
              }}
              aria-hidden="true"
            />
          </>
        ) : (
          <div
            className="absolute inset-y-0 rounded-[3px]"
            style={{
              left: `${pct(track.onsetAt)}%`,
              width: `${pct(countedTime(track))}%`,
              backgroundColor: colorHex,
            }}
          />
        )}
      </div>
    </div>
  );
}

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
        aria-label={fillSlots(t({ en: "{track}: {survival} after diagnosis" }), {
          track: t(track.label),
          survival: `${formatDuration(years)} ${unit}`,
        })}
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
        // Six slots, because the three milestones are named by the puzzle and
        // their three times are derived. Every "at" in the English is a
        // preposition a translator has to be free to move or drop: Japanese
        // marks the time with a particle after it, not a word before it.
        aria-label={fillSlots(
          t({
            en: "{track}: {onset} at {onsetwhen}, {detected} at {detectedwhen}, {died} at {diedwhen}",
          }),
          {
            track: t(track.label),
            onset: t(data.onsetLabel),
            onsetwhen: at(track.onsetAt),
            detected: t(data.detectedLabel),
            detectedwhen: at(track.detectedAt),
            died: t(data.diedLabel),
            diedwhen: at(track.diedAt),
          },
        )}
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

  if (view === "counted" || view === "immortal") {
    const shade = view === "immortal";
    return (
      <div className="flex flex-col gap-3">
        {/* No heading of its own: the figure title and the scope tag beside it
            already name this view, and a third label saying the same thing was
            just noise on a phone. */}
        {data.tracks.map((tr, i) => (
          <CountedRow
            key={tr.id}
            track={tr}
            colorHex={colorFor(i)}
            span={data.span}
            unit={unit}
            shadeImmortal={shade}
          />
        ))}
        {shade ? (
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-3 w-6 shrink-0 rounded-[2px]"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, ${colorFor(0)} 0 3px, transparent 3px 6px)`,
                  opacity: 0.55,
                }}
                aria-hidden="true"
              />
              {t(data.immortalLabel ?? data.survivalLabel)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-3 w-[2px] shrink-0"
                style={{ backgroundColor: "#221D15" }}
                aria-hidden="true"
              />
              {t(data.detectedLabel)}
            </span>
          </div>
        ) : null}
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
