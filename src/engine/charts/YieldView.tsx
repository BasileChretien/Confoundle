import { useT } from "../../app/i18n";
import type { YieldData } from "../../puzzles/schema";
import { declaredColors } from "./palette";
import { axisFraction, yieldPairs } from "./yield";

/**
 * Two populations measured on several outcomes, each row a pair of published
 * rates with their intervals on one shared axis.
 *
 * `whatitfound` draws the rows a beat has been given; `whatitchanged` draws all
 * of them. Nothing is recomputed between the two views, the same contract
 * `forest` and `ratings` use: the reveal differs by carrying MORE rows, so the
 * restriction lives in `restrictYield` and the kind only names the beat.
 *
 * THE PAIRING IS THE POINT, so the two arms sit on stacked tracks inside one
 * row rather than in separate panels, and both tracks share the row's baseline
 * grid. A reader has to be able to see, without arithmetic, that one row's pair
 * is far apart and the next row's pair is on top of each other. Rows whose
 * intervals clear one another are drawn solid; a row whose intervals still
 * overlap is drawn hollow, because "these overlap" is a weaker claim than
 * "these differ" and the figure must not flatten them together. Note the
 * asymmetry that matters: solid means the two are apart, hollow means only that
 * the picture cannot separate them, NOT that they are equal.
 */
function Track({
  left,
  width,
  point,
  color,
  solid,
}: {
  left: number;
  width: number;
  point: number;
  color: string;
  solid: boolean;
}) {
  return (
    <div className="relative h-3.5">
      <div
        className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full"
        style={{
          left: `${left * 100}%`,
          width: `${Math.max(width, 0.004) * 100}%`,
          backgroundColor: color,
          opacity: solid ? 0.32 : 0.2,
        }}
      />
      <div
        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `${point * 100}%`,
          backgroundColor: solid ? color : "transparent",
          border: `2px solid ${color}`,
        }}
      />
    </div>
  );
}

export function YieldView({
  data,
  full,
  kind: _kind,
}: {
  data: YieldData;
  /**
   * The UNRESTRICTED data, for colour only. `restrictYield` slices ROWS rather
   * than arms today, so `data.arms` happens to equal `full.arms` and this
   * changes nothing that currently ships. It is here because the day this shape
   * learns to hold an arm back is the day indexing the drawn list starts
   * recolouring a population between the beats, and that failure is silent.
   * See `declaredColors`.
   */
  full: YieldData;
  kind: "whatitfound" | "whatitchanged";
}) {
  void _kind;
  const t = useT();
  const shown = yieldPairs(data);
  const colorOf = declaredColors(full.arms);

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] leading-snug text-ink-soft">{t(data.metricLabel)}</p>

      {/*
        Which colour is which population, said once at the top. Without this the
        two tracks in a row are unlabelled and the figure is unreadable.
      */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {data.arms.map((a) => (
          <span key={a.id} className="flex items-center gap-1.5 text-[11px] text-ink">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: colorOf(a.id) }}
            />
            {t(a.short ?? a.label)}
          </span>
        ))}
      </div>

      <div className="relative rounded-md border border-rule bg-paper/50 px-2.5 py-2">
        <div className="flex flex-col gap-2.5">
          {shown.map((p) => (
            <div key={p.rowId} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] leading-snug text-ink">{t(p.short ?? p.label)}</span>
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink-soft">
                  {p.values.map((v) => v.rate.toFixed(1)).join(" · ")}
                </span>
              </div>
              <div aria-hidden="true">
                {p.values.map((v) => (
                  <Track
                    key={v.armId}
                    left={axisFraction(data, v.ciLow)}
                    width={axisFraction(data, v.ciHigh) - axisFraction(data, v.ciLow)}
                    point={axisFraction(data, v.rate)}
                    color={colorOf(v.armId)}
                    solid={p.separated}
                  />
                ))}
              </div>
              {p.note ? (
                <span className="text-[10px] leading-snug text-ink-soft">{t(p.note)}</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/*
        dir="ltr" IS LOAD-BEARING and must not be removed. The plot is a numeric
        axis that does not mirror under RTL: zero stays left and the maximum
        stays right, in every locale. Without this the flex row reverses in
        Arabic while the bars do not, so the axis would be labelled backwards
        and every pair would appear to sit at the opposite rate. Each label
        still renders its own text RTL; only their left-to-right ORDER is
        pinned, so it keeps matching the geometry above.
      */}
      <div
        dir="ltr"
        className="flex items-center justify-between gap-2 font-mono text-[10px] tabular-nums text-ink-soft"
      >
        <span>0</span>
        <span>{data.axisMax}</span>
      </div>
      <p className="text-[10px] leading-snug text-ink-soft">{t(data.perLabel)}</p>
      <p className="text-[10px] leading-snug text-ink-soft">{t(data.rateNote)}</p>
    </div>
  );
}
