import { useLocale, useT } from "../../app/i18n";
import type { ConditionalData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { rowSeries, scaleFraction } from "./conditional";

/**
 * One factor's effect, measured at each level of another, on a rating scale.
 *
 * Each row is drawn as its own track: the columns are points on a shared scale,
 * so a row where the factor did nothing is visibly flat and a row where it did
 * a lot is visibly stretched. The setup draws one row and the reveal adds the
 * rest, and because the scale is authored rather than derived from the data,
 * nothing moves under the first row when the second arrives. That is the point:
 * if the axis rescaled, the reveal would look like the setup had changed.
 */
export function ConditionalView({
  data,
  kind: _kind,
}: {
  data: ConditionalData;
  kind: "onerow" | "bothrows";
}) {
  void _kind;
  const t = useT();
  const locale = useLocale();
  const num = (v: number, digits: number) =>
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);
  const nf = new Intl.NumberFormat(locale);

  const series = rowSeries(data);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] leading-snug text-ink-soft">{t(data.metricLabel)}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {data.columns.map((c, i) => (
          <span key={c.id} className="flex items-center gap-1.5 text-[11px] text-ink">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: colorFor(i) }}
            />
            {t(c.short ?? c.label)}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-md border border-rule bg-paper/50 px-2.5 py-2.5">
        {series.map((s) => {
          const row = data.rows.find((r) => r.id === s.rowId);
          if (!row) return null;
          return (
            <div key={s.rowId} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] leading-snug text-ink">
                  {t(row.short ?? row.label)}
                </span>
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink-soft">
                  {s.points.map((p) => num(p.mean, 1)).join(" · ")}
                </span>
              </div>

              {/*
                dir="ltr" IS LOAD-BEARING, for the reason `YieldView` spells
                out: the scale runs low to high left to right in every locale
                because the marks are positioned from the left and do not
                mirror. Without it the ends would swap in Arabic while the
                geometry stayed put.
              */}
              <div dir="ltr" className="relative h-5" aria-hidden="true">
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-rule" />
                {s.points.map((p, i) => (
                  <div
                    key={p.columnId}
                    className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper"
                    style={{
                      left: `${scaleFraction(data, p.mean) * 100}%`,
                      backgroundColor: colorFor(i),
                    }}
                  />
                ))}
              </div>

              <span className="font-mono text-[10px] tabular-nums text-ink-soft">
                {s.points.map((p) => `n = ${nf.format(p.n)}`).join(" · ")}
              </span>
              {row.note ? (
                <span className="text-[10px] leading-snug text-ink-soft">{t(row.note)}</span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div
        dir="ltr"
        className="flex items-center justify-between gap-2 text-[10px] leading-snug text-ink-soft"
      >
        <span>
          {num(data.scale.min, 0)} {t(data.scale.minLabel)}
        </span>
        <span>
          {num(data.scale.max, 0)} {t(data.scale.maxLabel)}
        </span>
      </div>

      {data.dispersionLabel ? (
        <p className="text-[10px] leading-snug text-ink-soft">{t(data.dispersionLabel)}</p>
      ) : null}
      <p className="text-[10px] leading-snug text-ink-soft">{t(data.meanNote)}</p>
    </div>
  );
}
