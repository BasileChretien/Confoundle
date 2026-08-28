import { useLocale, useT } from "../../app/i18n";
import type { CompetingData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { colorFor, declaredColors, WINNER_GOLD } from "./palette";
import { finalGap, gapsOverTime, hasSecondCurve } from "./competing";

/**
 * One cohort, one outcome, two estimators of it.
 *
 * `asestimated` (setup) draws the naive curve alone, and it looks like every
 * survival curve in every paper: a line climbing to 21 per 100 by ten years.
 * There is nothing on screen to suggest a second reading, which is the trap.
 * `aseveryone` (reveal) adds the competing-risk curve underneath, fills the
 * band between them, and puts the cohort's actual fates below the axis.
 *
 * THE FATES ARE THE POINT OF THE REVEAL, not the second line. Two lines alone
 * would read as two opinions, and a reader could reasonably wonder which
 * method to believe. The stacked fates answer that with counting rather than
 * with method: 73 of every 100 died without a second fracture, so a curve that
 * keeps them in the risk set for ten years is describing people who were not
 * there. That is why the shape carries `fates` at all.
 *
 * COLOUR. The two curves take FIXED slots, 0 for the naive estimate and 1 for
 * the adjusted one, because those are roles rather than positions in a list
 * the beat happens to draw. The fates ARE a declared list and the setup draws
 * none of them, so they resolve through `declaredColors(full.fates)`: a card
 * whose reveal drew a subset would otherwise recolour them.
 *
 * THE SCALE IS READ FROM `full`, AND TODAY THAT IS BELT AND BRACES. Said
 * plainly because a mutation test caught the claim: swapping it to `data`
 * changes nothing anywhere, since `restrictCompeting` flattens the adjusted
 * series onto the naive one and never touches `naive` itself, so the maximum
 * is the same at both beats either way. What actually holds the naive line
 * still between the beats is `competing.test.ts`'s "leaves the naive curve
 * exactly as published", not this line.
 *
 * It still reads from `full`, for one reason worth writing down: the moment a
 * beat restricts the POINTS rather than the estimators, say a setup drawing
 * only the first three follow-up times, the axis would rescale and the curve
 * would visibly move as the reveal extended it. Reading from `full` is free
 * and is already right for that day.
 */

const W = 320;
const H = 148;
const PAD_LEFT = 30;
const PAD_RIGHT = 10;
const PAD_TOP = 10;
const PAD_BOTTOM = 24;
const AXIS = "#DCD2BC";

export function CompetingView({
  data,
  full,
  kind,
}: {
  data: CompetingData;
  /** The unrestricted data, so neither the scale nor the colours drift. */
  full: CompetingData;
  kind: "asestimated" | "aseveryone";
}) {
  const t = useT();
  const locale = useLocale();
  const colorOfFate = declaredColors(full.fates);

  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  const plain = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });

  const naiveColor = colorFor(0);
  const adjustedColor = colorFor(1);

  const maxT = Math.max(...full.points.map((p) => p.t));
  const rawMax = Math.max(...full.points.map((p) => p.naive));
  // Round the ceiling up to the next five, so the axis reads in round numbers
  // and the top of the curve is not flush against the frame.
  const maxY = Math.max(5, Math.ceil(rawMax / 5) * 5);

  const px = (time: number) => PAD_LEFT + (time / maxT) * (W - PAD_LEFT - PAD_RIGHT);
  const py = (value: number) =>
    PAD_TOP + (1 - value / maxY) * (H - PAD_TOP - PAD_BOTTOM);

  const gaps = gapsOverTime(data);
  const path = (pick: (g: (typeof gaps)[number]) => number) =>
    gaps.map((g, i) => `${i === 0 ? "M" : "L"}${px(g.t)},${py(pick(g))}`).join(" ");

  const showAdjusted = hasSecondCurve(data);
  const band =
    showAdjusted
      ? `${gaps.map((g, i) => `${i === 0 ? "M" : "L"}${px(g.t)},${py(g.naive)}`).join(" ")} ` +
        `${[...gaps]
          .reverse()
          .map((g) => `L${px(g.t)},${py(g.adjusted)}`)
          .join(" ")} Z`
      : "";

  const last = finalGap(full);
  const duration = fillSlots(t({ en: "{n} {unit}" }), {
    n: plain.format(maxT),
    unit: t(full.timeUnit),
  });

  /*
    AN AUTHORED SENTENCE WITH SLOTS, never a template literal assembled from
    fragments, so a translator chooses their own clause order. The duration and
    its unit travel as ONE slot, because splitting them only lets a translation
    put a word between a number and the thing it counts. Every figure a slot
    carries is formatted for the reader's locale, including the ones repeated
    from the drawing.
  */
  const announce =
    kind === "asestimated"
      ? fillSlots(
          t({
            en: "A single estimate of {metric}, climbing to {final} by {duration}.",
          }),
          {
            metric: t(full.metricLabel),
            final: percent.format(last.naive / 100),
            duration,
          },
        )
      : fillSlots(
          t({
            en: "The same estimate beside one that counts the deaths, {naive} against {adjusted} by {duration}.",
          }),
          {
            naive: percent.format(last.naive / 100),
            adjusted: percent.format(last.adjusted / 100),
            duration,
          },
        );

  return (
    <figure className="w-full" aria-label={announce}>
      <figcaption className="mb-1 text-[11px] font-semibold text-ink">
        {t(full.label)}
      </figcaption>

      <div className="mb-1.5 flex flex-wrap gap-3">
        <Key color={naiveColor} label={t(full.naiveLabel)} />
        {showAdjusted && <Key color={adjustedColor} label={t(full.adjustedLabel)} />}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="presentation">
        {/* The frame, stated rather than implied. */}
        <line x1={PAD_LEFT} y1={PAD_TOP} x2={PAD_LEFT} y2={H - PAD_BOTTOM} stroke={AXIS} />
        <line
          x1={PAD_LEFT}
          y1={H - PAD_BOTTOM}
          x2={W - PAD_RIGHT}
          y2={H - PAD_BOTTOM}
          stroke={AXIS}
        />
        <text x={2} y={py(maxY) + 4} className="fill-ink-mute" fontSize={9}>
          {percent.format(maxY / 100)}
        </text>
        <text x={2} y={py(0) + 4} className="fill-ink-mute" fontSize={9}>
          {percent.format(0)}
        </text>

        {showAdjusted && (
          <path d={band} fill={WINNER_GOLD} opacity={0.16} />
        )}

        {showAdjusted && (
          <path d={path((g) => g.adjusted)} fill="none" stroke={adjustedColor} strokeWidth={2} />
        )}
        <path d={path((g) => g.naive)} fill="none" stroke={naiveColor} strokeWidth={2} />

        {gaps.map((g) => (
          <g key={g.t}>
            <circle cx={px(g.t)} cy={py(g.naive)} r={2.5} fill={naiveColor} />
            {showAdjusted && (
              <circle cx={px(g.t)} cy={py(g.adjusted)} r={2.5} fill={adjustedColor} />
            )}
            <text
              x={px(g.t)}
              y={H - PAD_BOTTOM + 11}
              textAnchor="middle"
              className="fill-ink-mute"
              fontSize={9}
            >
              {plain.format(g.t)}
            </text>
          </g>
        ))}

        <text
          x={W - PAD_RIGHT}
          y={H - 3}
          textAnchor="end"
          className="fill-ink-mute"
          fontSize={9}
        >
          {t(full.timeUnit)}
        </text>
      </svg>

      {/* The numbers the curves end on, so nothing has to be read off pixels. */}
      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
        <Readout
          color={naiveColor}
          label={t(full.naiveLabel)}
          value={percent.format(last.naive / 100)}
        />
        {showAdjusted && (
          <Readout
            color={adjustedColor}
            label={t(full.adjustedLabel)}
            value={percent.format(last.adjusted / 100)}
          />
        )}
      </div>

      {showAdjusted && (
        <p className="mt-1 text-[10px] leading-snug text-ink-mute">{t(full.gapLabel)}</p>
      )}

      {data.fates.length > 0 && (
        <div className="mt-2.5">
          <div className="flex h-3.5 w-full overflow-hidden rounded-sm">
            {data.fates.map((f) => (
              <span
                key={f.id}
                style={{ width: `${f.share}%`, backgroundColor: colorOfFate(f.id) }}
              />
            ))}
          </div>
          <div className="mt-1 flex flex-col gap-0.5">
            {data.fates.map((f) => (
              <div key={f.id} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 shrink-0 rounded-sm"
                  style={{ backgroundColor: colorOfFate(f.id) }}
                  aria-hidden="true"
                />
                <span className="text-[10px] text-ink">{t(f.label)}</span>
                <span className="ml-auto font-mono text-[10px] tabular-nums text-ink">
                  {percent.format(f.share / 100)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-1.5 border-t pt-1 text-[10px] leading-snug text-ink-mute" style={{ borderColor: AXIS }}>
        {t(full.cohortNote)}
      </p>
    </figure>
  );
}

function Key({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="h-2.5 w-2.5 rounded-sm"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="text-[11px] text-ink">{label}</span>
    </span>
  );
}

function Readout({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="text-[10px] text-ink-mute">{label}</span>
      <span className="font-mono text-[11px] font-semibold tabular-nums" style={{ color }}>
        {value}
      </span>
    </span>
  );
}
