import { useT } from "../../app/i18n";
import type { CrossedData } from "../../puzzles/schema";
import { declaredColors } from "./palette";
import { axisFraction, cellsInA } from "./crossed";

/**
 * Four cell means from a crossed design, drawn as points on one shared axis,
 * grouped by the first factor.
 *
 * `astested` draws the cells a beat has been given, which for the setup is the
 * confounded diagonal; `allfourways` draws all of them. The restriction lives
 * in `restrictCrossed`, the same contract `yield` and `forest` use, so the
 * reveal differs only by carrying MORE points.
 *
 * POINTS, NOT BARS, and this is not a style preference. The outcomes this shape
 * suits sit far from zero, so the axis has to be a window (here 165 to 185
 * seconds). A bar drawn on a truncated axis is the figure `misleading-axis`
 * exists to teach against, and drawing one here while teaching that would be
 * indefensible. A point on a labelled axis carries a window honestly, and both
 * axis labels name their number so the reader can see it is one.
 *
 * The colour says which level of the SECOND factor a point belongs to, because
 * that is the factor the reveal splits each group by. The first factor is the
 * row grouping, which is why it needs no colour of its own.
 */
function Axis({ children }: { children: React.ReactNode }) {
  return (
    <div dir="ltr" className="relative h-6">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-rule" />
      {children}
    </div>
  );
}

export function CrossedView({
  data,
  full,
  kind: _kind,
}: {
  data: CrossedData;
  /**
   * The UNRESTRICTED data, for colour only. `restrictCrossed` slices CELLS
   * rather than levels, so `data.bLevels` already equals `full.bLevels` and
   * this changes nothing that currently ships. It is here so the rule holds
   * without an exception: a figure handed restricted data takes its colours
   * from the declared list, and nobody has to work out which lists the
   * restriction happened to spare. See `declaredColors`.
   */
  full: CrossedData;
  kind: "astested" | "allfourways";
}) {
  void _kind;
  const t = useT();
  const colorOf = declaredColors(full.bLevels);

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] leading-snug text-ink-soft">{t(data.metricLabel)}</p>

      {/* Which colour is which level of the second factor, said once. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {data.bLevels.map((l) => (
          <span key={l.id} className="flex items-center gap-1.5 text-[11px] text-ink">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: colorOf(l.id) }}
            />
            {t(l.short ?? l.label)}
          </span>
        ))}
      </div>

      <div className="relative flex flex-col gap-2 rounded-md border border-rule bg-paper/50 px-2.5 py-2">
        <p className="text-[11px] font-medium leading-snug text-ink">{t(data.factorALabel)}</p>

        {data.aLevels.map((level) => {
          const shown = cellsInA(data, level.id);
          return (
            <div key={level.id} className="flex flex-col gap-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] leading-snug text-ink">
                  {t(level.short ?? level.label)}
                </span>
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink-soft">
                  {shown.map((p) => p.mean.toFixed(1)).join(" · ")}
                </span>
              </div>
              <Axis>
                {data.reference ? (
                  <div
                    className="absolute inset-y-1 w-px bg-ink-soft/40"
                    style={{ left: `${axisFraction(data, data.reference.mean) * 100}%` }}
                    aria-hidden="true"
                  />
                ) : null}
                {shown.map((p) => (
                  <div
                    key={p.cellId}
                    className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                    style={{
                      left: `${axisFraction(data, p.mean) * 100}%`,
                      backgroundColor: colorOf(p.bId),
                      borderColor: colorOf(p.bId),
                    }}
                    aria-hidden="true"
                  />
                ))}
              </Axis>
              {shown.map((p) =>
                p.note ? (
                  <span key={p.cellId} className="text-[10px] leading-snug text-ink-soft">
                    {t(p.note)}
                  </span>
                ) : null,
              )}
            </div>
          );
        })}
      </div>

      {/*
        dir="ltr" IS LOAD-BEARING and must not be removed, for the reason
        `YieldView` spells out: the points above are positioned from the left
        and do not mirror, so without this the two ends would swap in Arabic
        while the geometry stayed put, labelling the axis backwards.
      */}
      <div
        dir="ltr"
        className="flex items-center justify-between gap-2 text-[10px] leading-snug text-ink-soft"
      >
        <span>{t(data.scale.minLabel)}</span>
        <span className="text-right">{t(data.scale.maxLabel)}</span>
      </div>
      {data.reference ? (
        <p className="text-[10px] leading-snug text-ink-soft">
          {t(data.reference.label)}
          {data.reference.note ? <>. {t(data.reference.note)}</> : null}
        </p>
      ) : null}
    </div>
  );
}
