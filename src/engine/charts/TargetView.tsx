import { useLocale, useT } from "../../app/i18n";
import type { TargetData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { lateBand, targetShape } from "./targets";

/**
 * Two performers against one imposed deadline.
 *
 * The axis is everyone who came through the door, ordered by how long they
 * took, so a bar reads left to right as finished early, finished in the final
 * stretch, missed the deadline. The dashed rule is the target.
 *
 * `oncompliance` splits each bar once, at the deadline. The two performers are
 * nearly identical there, which is the point: this is the only number anybody
 * reports. `insidewindow` splits the compliant part again, at the start of the
 * final stretch, and one performer turns out to have a crowd jammed against the
 * line. No bar changes length between the two views and nothing is recomputed;
 * the reveal is a second cut through bars that were already on screen.
 */
function Bar({
  name,
  withinPercent,
  band,
  showsBand,
  meetsTarget,
  targetPercent,
  format,
  lateValue,
}: {
  name: string;
  withinPercent: number;
  band: { start: number; end: number };
  showsBand: boolean;
  meetsTarget: boolean;
  targetPercent: number;
  format: (n: number) => string;
  lateValue: number;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-[10px] leading-none text-ink-mute">
          {name}
        </span>
        <span className="shrink-0 font-mono text-[9px] tabular-nums leading-none text-ink-soft">
          {format(showsBand ? lateValue : withinPercent)}
        </span>
      </div>

      <div className="relative h-4 w-full overflow-hidden rounded-[2px] bg-rule/40">
        {/* Finished in time. Drawn in both views, identical in both. */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${withinPercent}%`,
            backgroundColor: colorFor(meetsTarget ? 0 : 2),
          }}
        />
        {/* The final stretch, drawn as the tail of the compliant part so it
            sits hard against the deadline rather than floating. */}
        {showsBand ? (
          <div
            className="absolute inset-y-0"
            style={{
              left: `${band.start * 100}%`,
              width: `${(band.end - band.start) * 100}%`,
              backgroundColor: colorFor(1),
            }}
          />
        ) : null}
        {/* The imposed target. */}
        <div
          className="absolute inset-y-0 w-px bg-ink"
          style={{ left: `${targetPercent}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function TargetView({
  data,
  kind,
}: {
  data: TargetData;
  kind: "oncompliance" | "insidewindow";
}) {
  const t = useT();
  const { rows, targetPercent } = targetShape(data);
  const showsBand = kind === "insidewindow";

  // `toLocaleString(undefined, ...)` followed the JavaScript runtime's default
  // locale, not the one the reader chose, so the decimal separator in 88.75%
  // was a point for a French or Russian reader who writes it as a comma.
  const locale = useLocale();
  const nf = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const format = (n: number) => `${nf.format(n)}%`;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="flex items-center gap-1.5 text-[10px] leading-none text-ink-soft">
          <span
            className="h-2 w-2 rounded-[1px]"
            style={{ backgroundColor: colorFor(0) }}
            aria-hidden="true"
          />
          {t(data.withinLabel)}
        </span>
        {showsBand ? (
          <span className="flex items-center gap-1.5 text-[10px] leading-none text-ink-soft">
            <span
              className="h-2 w-2 rounded-[1px]"
              style={{ backgroundColor: colorFor(1) }}
              aria-hidden="true"
            />
            {t(data.lateLabel)}
          </span>
        ) : null}
        <span className="flex items-center gap-1.5 text-[10px] leading-none text-ink-soft">
          <span
            className="h-2 w-2 rounded-[1px] bg-rule/40"
            aria-hidden="true"
          />
          {t(data.breachedLabel)}
        </span>
      </div>

      <div className="flex flex-col gap-3 rounded-md border border-rule bg-paper/50 px-2.5 py-2.5">
        {rows.map((row) => (
          <Bar
            key={row.id}
            name={t(row.short ?? row.label)}
            withinPercent={row.withinPercent}
            band={lateBand(row)}
            showsBand={showsBand}
            meetsTarget={row.meetsTarget}
            targetPercent={targetPercent}
            format={format}
            lateValue={row.lateSharePercent}
          />
        ))}
      </div>

      <p className="text-center font-sans text-[9px] uppercase tracking-eyebrow text-ink-mute">
        {t(data.targetLabel)}
      </p>

      <p className="text-[11px] leading-snug text-ink-mute">
        {t(data.percentNote)}
      </p>
    </div>
  );
}
