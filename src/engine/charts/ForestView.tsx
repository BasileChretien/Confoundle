import { useLocale, useT } from "../../app/i18n";
import type { ForestData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { declaredColors } from "./palette";
import { axisFraction, benchmarkRow, forestRows } from "./forest";

/**
 * A forest plot: several pooled estimates, each with its interval, against the
 * line that means no effect.
 *
 * `whatisknown` draws the rows a beat has been given; `themissingrow` draws all
 * of them. Nothing is recomputed between the two views, exactly as with
 * `onerating` / `bothratings`.
 *
 * THE NULL LINE IS THE POINT, so it is drawn first, labelled, and flanked by
 * the two side names. A reader has to be able to see, without arithmetic, that
 * a row is short rather than the other side of the line. Rows whose interval
 * clears the line are drawn solid; a row whose interval still touches it is
 * drawn hollow, because "compatible with no effect" is a different claim from
 * "smaller" and the figure should not flatten them together.
 */
function Row({
  name,
  left,
  width,
  point,
  estimate,
  color,
  clearsNull,
  k,
  isPooled,
  nullAt,
  benchmarkAt,
  benchmarkColor,
  heterogeneity,
  showHeterogeneity,
  number,
  count,
  percent,
}: {
  name: string;
  left: number;
  width: number;
  point: number;
  estimate: number;
  color: string;
  clearsNull: boolean;
  k: number;
  isPooled: boolean;
  nullAt: number;
  /** Where the benchmark line falls, or null on a beat that has no benchmark. */
  benchmarkAt: number | null;
  benchmarkColor: string;
  heterogeneity: number | undefined;
  /** Whether the column exists at all, so rows without a value still line up. */
  showHeterogeneity: boolean;
  number: Intl.NumberFormat;
  count: Intl.NumberFormat;
  percent: Intl.NumberFormat;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-[36%] shrink-0 truncate text-[12px] leading-snug ${
          isPooled ? "font-semibold text-ink" : "text-ink"
        }`}
      >
        {name}
      </span>
      <div className="relative h-5 flex-1" aria-hidden="true">
        {/* The null line, drawn in the SAME coordinate space as the bars.
            An earlier version positioned it once against the outer container
            with a hand-written calc that duplicated the flex layout, and it
            landed at 52 per cent of the plot where the data said 39. Anything
            that recomputes this geometry a second time will drift from the
            bars; this cannot. It overhangs the row so consecutive segments
            join across the 8px gap into one continuous line. */}
        <div
          className="absolute -top-1.5 -bottom-1.5 w-px bg-ink/35"
          style={{ left: `${nullAt * 100}%` }}
        />
        {/* The benchmark, in the SAME coordinate space and for the same reason
            the comment above gives. Drawn dashed and in the benchmark row's own
            colour so it reads as that row extended across the plot rather than
            as a second null. It exists only on a beat that draws its row, which
            `restrictForest` decides, so nothing here needs to know the beat. */}
        {benchmarkAt !== null && (
          <div
            className="absolute -top-1.5 -bottom-1.5 w-0"
            style={{
              left: `${benchmarkAt * 100}%`,
              borderLeft: `1px dashed ${benchmarkColor}`,
            }}
          />
        )}
        <div
          className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full"
          style={{
            left: `${left * 100}%`,
            width: `${Math.max(width, 0.004) * 100}%`,
            backgroundColor: color,
            opacity: clearsNull ? 0.32 : 0.2,
          }}
        />
        {isPooled ? (
          <div
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45"
            style={{ left: `${point * 100}%`, backgroundColor: color }}
          />
        ) : (
          <div
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${point * 100}%`,
              backgroundColor: clearsNull ? color : "transparent",
              border: `2px solid ${color}`,
            }}
          />
        )}
      </div>
      <span className="w-11 shrink-0 text-right font-mono text-[11px] tabular-nums text-ink">
        {number.format(estimate)}
      </span>
      <span className="w-8 shrink-0 text-right font-mono text-[10px] tabular-nums text-ink-soft">
        {count.format(k)}
      </span>
      {showHeterogeneity && (
        <span className="w-9 shrink-0 text-right font-mono text-[10px] tabular-nums text-ink-soft">
          {heterogeneity === undefined ? "" : percent.format(heterogeneity / 100)}
        </span>
      )}
    </div>
  );
}

export function ForestView({
  data,
  full,
  kind: _kind,
}: {
  data: ForestData;
  /**
   * The UNRESTRICTED data, for colour only. `restrictForest` filters `rows`, so
   * a row's position in `data.rows` is a property of the beat. An earlier
   * version looked the index up with `data.rows.findIndex`, which reads like a
   * fix and is not one: it resolves against the same restricted list the map
   * would have given. See `declaredColors`.
   */
  full: ForestData;
  kind: "whatisknown" | "themissingrow";
}) {
  void _kind;
  const t = useT();
  const locale = useLocale();
  // Both kinds draw whatever rows the view handed over. The reveal differs by
  // carrying MORE rows, not by drawing the same ones differently, so the
  // restriction lives in `restrictForest` and the kind only names the beat.
  const shown = forestRows(data);
  const colorOf = declaredColors(full.rows);
  const nullAt = axisFraction(data, data.nullValue);

  /*
    THE WHOLE FIGURE'S NUMERALS, converted together.

    This view drew `estimate.toFixed(2)` and a bare `k`, which localise nothing
    but were at least uniformly unlocalised. Adding a per cent through `Intl`
    beside them would have made it half-converted, which `localeNumerals`
    argues is worse than either choice held consistently, so the estimate and
    the study count come with it. Two fraction digits kept exactly, so an
    English reader sees what `toFixed(2)` drew and everyone else stops seeing
    English separators.
  */
  const number = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const count = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });

  // Null on the setup, because the beat was not given the row. Colour is
  // resolved through `declaredColors` like every other row's, so the line and
  // the row it belongs to always match.
  const mark = benchmarkRow(data);
  const benchmarkAt = mark ? axisFraction(data, mark.estimate) : null;
  const showHeterogeneity = data.heterogeneityLabel !== undefined;

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] leading-snug text-ink-soft">{t(data.metricLabel)}</p>

      <div className="relative rounded-md border border-rule bg-paper/50 px-2.5 py-2">
        <div className="flex flex-col gap-2">
          {shown.map((r) => (
            <Row
              key={r.id}
              name={t(r.short ?? r.label)}
              left={axisFraction(data, r.ciLow)}
              width={axisFraction(data, r.ciHigh) - axisFraction(data, r.ciLow)}
              point={axisFraction(data, r.estimate)}
              estimate={r.estimate}
              color={colorOf(r.id)}
              clearsNull={r.clearsNull}
              k={r.k}
              nullAt={nullAt}
              isPooled={r.isPooled}
              benchmarkAt={benchmarkAt}
              benchmarkColor={mark ? colorOf(mark.id) : "transparent"}
              heterogeneity={r.heterogeneity}
              showHeterogeneity={showHeterogeneity}
              number={number}
              count={count}
              percent={percent}
            />
          ))}
        </div>
      </div>

      {/*
        The two sides of the line, named, so the sign is readable without
        knowing what the unit means.

        dir="ltr" IS LOAD-BEARING and must not be removed. The plot itself is a
        numeric axis that does not mirror under RTL: low values stay left, high
        values stay right, in every locale. Without this the flex row reverses
        in Arabic while the bars do not, which put "backfired" on the side where
        the benefit actually is and made the figure state the opposite of the
        data. Each label still renders its own text RTL; only their left-to-right
        ORDER is pinned, so it keeps matching the geometry above.
      */}
      <div
        dir="ltr"
        className="mt-2 flex items-start justify-between gap-2 text-[10px] leading-tight text-ink-soft"
      >
        <span className="max-w-[42%] text-left">
          ← {t(data.higherIsWorse ? data.betterLabel : data.worseLabel)}
        </span>
        <span className="shrink-0 text-center font-medium">{t(data.nullLabel)}</span>
        <span className="max-w-[42%] text-right">
          {t(data.higherIsWorse ? data.worseLabel : data.betterLabel)} →
        </span>
      </div>
      {/*
        The dashed line, named. A line a reader cannot name is decoration, and
        this one carries the card's whole claim, so it says whose estimate it
        is. One authored sentence with a slot rather than a fragment plus a
        variable, because the row's name does not fall at the end of the
        sentence in Japanese, Hindi or Arabic.
      */}
      {mark && (
        <p className="text-[10px] leading-snug text-ink-soft">
          {fillSlots(t({ en: "The dashed line is {row}." }), {
            row: t(mark.short ?? mark.label),
          })}
        </p>
      )}
      {data.heterogeneityLabel && (
        <p className="text-[10px] leading-snug text-ink-soft">{t(data.heterogeneityLabel)}</p>
      )}
      <p className="text-[10px] leading-snug text-ink-soft">{t(data.unit)}</p>
    </div>
  );
}
