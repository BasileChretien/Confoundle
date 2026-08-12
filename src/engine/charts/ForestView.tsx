import { useT } from "../../app/i18n";
import type { ForestData } from "../../puzzles/schema";
import { declaredColors } from "./palette";
import { axisFraction, forestRows } from "./forest";

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
        {estimate.toFixed(2)}
      </span>
      <span className="w-8 shrink-0 text-right font-mono text-[10px] tabular-nums text-ink-soft">
        {k}
      </span>
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
  // Both kinds draw whatever rows the view handed over. The reveal differs by
  // carrying MORE rows, not by drawing the same ones differently, so the
  // restriction lives in `restrictForest` and the kind only names the beat.
  const shown = forestRows(data);
  const colorOf = declaredColors(full.rows);
  const nullAt = axisFraction(data, data.nullValue);

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
      <p className="text-[10px] leading-snug text-ink-soft">{t(data.unit)}</p>
    </div>
  );
}
