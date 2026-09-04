import { useLocale, useT } from "../../app/i18n";
import type { NoninferiorityData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { colorFor } from "./palette";
import {
  apparentChange,
  armRate,
  axisPosition,
  crossesNull,
  zones,
} from "./noninferiority.ts";

/**
 * One estimate against TWO reference lines: the null, and a margin that was
 * chosen before the trial ran.
 *
 * `asclaimed` (setup) draws the two arms, their rates, and the point estimate
 * as a single marker beside the line of no difference. That is the figure as a
 * press release presents it, and it is honestly drawn: the marker really does
 * sit on the favourable side. `againstmargin` (reveal) adds the confidence
 * interval, the margin, and the three zones the two lines cut the axis into,
 * at which point the interval is visibly sitting across the null.
 *
 * NOTHING IS FILTERED between the beats. Both receive the whole dataset and the
 * reveal is a superset by construction, so there is no slice to colour wrongly
 * and every palette slot here is a fixed number rather than a list position.
 *
 * THE ZONE ORDER COMES FROM `zones()`, never from an assumption about which
 * side is worse. A ratio of an adverse outcome puts the margin above the null;
 * a ratio of a good outcome puts it below, and the labels have to follow.
 */

const AXIS = "#DCD2BC";
const ESTIMATE = colorFor(0);
const MARGIN = colorFor(1);

/** How each zone tints the strip behind the interval. */
const ZONE_TINT: Record<string, string> = {
  superior: `${ESTIMATE}1f`,
  noninferior: "transparent",
  inferior: `${MARGIN}1f`,
};

export function NoninferiorityView({
  data,
  kind,
}: {
  data: NoninferiorityData;
  kind: "asclaimed" | "againstmargin";
}) {
  const t = useT();
  const locale = useLocale();
  const reveal = kind === "againstmargin";

  /*
    EVERY NUMERAL IN THIS FIGURE GOES THROUGH THE READER'S LOCALE, and they are
    converted together rather than one at a time. `ratio` and `rate` are both
    two-place decimals but they are different quantities, so they get their own
    formatters and neither borrows the other's precision by accident.
  */
  const ratio = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const rate = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const count = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  const nullAt = axisPosition(data, data.nullValue);
  const marginAt = axisPosition(data, data.margin);
  const pointAt = axisPosition(data, data.estimate);
  const lowAt = axisPosition(data, data.ciLow);
  const highAt = axisPosition(data, data.ciHigh);
  const band = zones(data);

  const arms = [data.intervention, data.control] as const;

  /*
    AN AUTHORED SENTENCE WITH SLOTS. The reveal's version names both reference
    lines, because a figure whose whole argument is "these are two different
    lines" announces nothing if it mentions one. Slot names are lowercase
    letters only, which is what the retention check in `inlineChrome.test.ts`
    matches; `nought` rather than `null` for the same reason it is not `0`.
  */
  const announce = reveal
    ? fillSlots(
        t({
          en: "The same {metric} of {estimate}, now drawn with its confidence interval running from {low} to {high}, against a line of no difference at {nought} and a non-inferiority margin at {margin}.",
        }),
        {
          metric: t(data.metricLabel),
          estimate: ratio.format(data.estimate),
          low: ratio.format(data.ciLow),
          high: ratio.format(data.ciHigh),
          nought: ratio.format(data.nullValue),
          margin: ratio.format(data.margin),
        },
      )
    : fillSlots(
        t({
          en: "A {metric} of {estimate} for {outcome}, drawn as a single marker against the line of no difference at {nought}.",
        }),
        {
          metric: t(data.metricLabel),
          estimate: ratio.format(data.estimate),
          outcome: t(data.outcomeLabel),
          nought: ratio.format(data.nullValue),
        },
      );

  return (
    <figure className="w-full" aria-label={announce}>
      <figcaption className="mb-2 text-[11px] font-semibold text-ink">
        {t(data.label)}
      </figcaption>

      {/* The two arms, as counts, with the rate each implies. On both beats. */}
      <div className="mb-3 flex flex-col gap-1">
        {arms.map((arm) => (
          <div key={arm.id} className="flex items-baseline gap-2">
            <span className="text-[11px] text-ink">{t(arm.label)}</span>
            <span className="ml-auto shrink-0 font-mono text-[10px] tabular-nums text-ink-mute">
              {fillSlots(t({ en: "{events} of {n}" }), {
                events: count.format(arm.events),
                n: count.format(arm.n),
              })}
            </span>
            <span className="w-14 shrink-0 text-right font-mono text-[11px] font-semibold tabular-nums text-ink">
              {rate.format(armRate(arm, data.per))}
            </span>
          </div>
        ))}
        <p className="text-right text-[10px] leading-snug text-ink-mute">
          {t(data.perLabel)}
        </p>
      </div>

      {/* The plot. One coordinate space, so the lines and the bar cannot drift
          apart the way ForestView's null line once did. */}
      <div className="rounded-md border border-rule bg-paper/50 px-2.5 py-3">
        <p className="mb-2 text-[10px] leading-snug text-ink-soft">{t(data.metricLabel)}</p>
        <div className="relative h-7" aria-hidden="true">
          {reveal &&
            band.map((z) => (
              <div
                key={z.kind}
                className="absolute inset-y-0"
                style={{
                  left: `${z.from * 100}%`,
                  width: `${(z.to - z.from) * 100}%`,
                  backgroundColor: ZONE_TINT[z.kind],
                }}
              />
            ))}

          {/* No difference. Drawn on both beats: it is what makes the setup's
              marker readable as "on the favourable side" at all. */}
          <div
            className="absolute inset-y-0 w-px bg-ink/45"
            style={{ left: `${nullAt * 100}%` }}
          />

          {/* The margin, dashed and in its own colour so it never reads as a
              second null. It arrives at the reveal because it is the thing the
              trial was actually testing against. */}
          {reveal && (
            <div
              className="absolute inset-y-0 w-0"
              style={{ left: `${marginAt * 100}%`, borderLeft: `1px dashed ${MARGIN}` }}
            />
          )}

          {reveal && (
            <div
              className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full"
              style={{
                left: `${lowAt * 100}%`,
                width: `${Math.max(highAt - lowAt, 0.004) * 100}%`,
                backgroundColor: ESTIMATE,
                opacity: 0.42,
              }}
            />
          )}

          {/* The point estimate. Solid while it is the only thing on screen,
              hollow once the interval is drawn, because "the best single guess"
              and "what the trial established" are different claims and the
              reveal is about the gap between them. */}
          <div
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${pointAt * 100}%`,
              backgroundColor: reveal ? "transparent" : ESTIMATE,
              border: `2px solid ${ESTIMATE}`,
            }}
          />
        </div>

        {/* Axis ends, converted like every other numeral here. */}
        <div
          className="mt-1 flex justify-between border-t pt-1"
          style={{ borderColor: AXIS }}
          dir="ltr"
        >
          <span className="font-mono text-[9px] tabular-nums text-ink-mute">
            {ratio.format(data.axisMin)}
          </span>
          <span className="font-mono text-[9px] tabular-nums text-ink-mute">
            {ratio.format(data.axisMax)}
          </span>
        </div>
      </div>

      {/*
        The zones, named, in the order the axis draws them.

        dir="ltr" IS LOAD-BEARING, for the reason ForestView records: the plot
        above is a numeric axis that does not mirror under RTL, so pinning the
        left-to-right ORDER of these labels is what keeps them over the zones
        they name. Each label still renders its own text right-to-left.
      */}
      {reveal && (
        <div
          dir="ltr"
          className="mt-2 flex items-start justify-between gap-2 text-[10px] leading-tight text-ink-soft"
        >
          {band.map((z, i) => (
            <span
              key={z.kind}
              className={
                i === 0
                  ? "max-w-[34%] text-left"
                  : i === band.length - 1
                    ? "max-w-[34%] text-right"
                    : "max-w-[34%] text-center font-medium"
              }
            >
              {t(
                z.kind === "superior"
                  ? data.superiorLabel
                  : z.kind === "inferior"
                    ? data.inferiorLabel
                    : data.noninferiorLabel,
              )}
            </span>
          ))}
        </div>
      )}

      {/* What the release quotes, on the setup. One authored sentence. */}
      {!reveal && (
        <p className="mt-2 text-[10px] leading-snug text-ink-mute">
          {fillSlots(
            t({
              en: "A {metric} of {estimate}: {change} fewer than the comparison arm.",
            }),
            {
              metric: t(data.metricLabel),
              estimate: ratio.format(data.estimate),
              change: percent.format(apparentChange(data)),
            },
          )}
        </p>
      )}

      {reveal && (
        <div className="mt-2 flex flex-col gap-1">
          <p className="text-[10px] leading-snug text-ink-mute">
            {fillSlots(t({ en: "{estimate}, interval {low} to {high}." }), {
              estimate: ratio.format(data.estimate),
              low: ratio.format(data.ciLow),
              high: ratio.format(data.ciHigh),
            })}
            {data.pLabel !== undefined && ` ${t(data.pLabel)}`}
          </p>
          {/* The punchline, stated only when it is true, and derived rather
              than authored so it cannot contradict the interval beside it. */}
          {crossesNull(data) && (
            <p className="text-[10px] leading-snug text-ink">
              {fillSlots(
                t({ en: "The interval contains {nought}, which means no difference." }),
                { nought: ratio.format(data.nullValue) },
              )}
            </p>
          )}
          <p className="text-[10px] leading-snug text-ink-mute">
            {fillSlots(
              t({ en: "{marginname} was fixed at {margin} before the trial began." }),
              {
                marginname: t(data.marginLabel),
                margin: ratio.format(data.margin),
              },
            )}
          </p>
        </div>
      )}

      <p
        className="mt-2 border-t pt-1 text-[10px] leading-snug text-ink-mute"
        style={{ borderColor: AXIS }}
      >
        {t(data.cohortNote)}
      </p>
    </figure>
  );
}
