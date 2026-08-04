import { useT } from "../../app/i18n";
import type { MagnitudeData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { magnitudeShape } from "./magnitudes";

/**
 * What people think a set of sizes are, against what they are.
 *
 * `asnumbers` draws the guesses alone. They are correctly ordered, so they read
 * as a sensible ranking and give nothing away. `againsttruth` adds the real
 * value under each guess.
 *
 * Nothing moves between the two views. Both scale against the largest number
 * anywhere in the data rather than the largest one currently drawn, so the
 * guess bars are already at their final length in the setup. That leaves empty
 * space on the right of the setup, which is the honest cost of letting the
 * reader see it is one set of numbers shown twice.
 *
 * Values are printed beside every bar, because the whole lesson is the size of
 * the discrepancy and the smallest true values are a hairline at this scale.
 * Reading them off bar lengths would be asking the eye to do the arithmetic
 * that the puzzle is about.
 */
function Track({
  width,
  color,
  value,
  format,
}: {
  width: number;
  color: string;
  value: number;
  format: (n: number) => string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <div className="h-2 min-w-0 flex-1">
        <div
          className="h-full rounded-r-[2px]"
          style={{
            // A true value of 5 against a peak of 1,088 is under half a percent
            // wide, which would vanish. Keep a sliver so the row still reads as
            // a bar rather than as missing data.
            width: `${Math.max(width * 100, 0.8)}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <span className="w-10 shrink-0 text-right font-mono text-[9px] tabular-nums leading-none text-ink-soft">
        {format(value)}
      </span>
    </div>
  );
}

export function MagnitudeView({
  data,
  kind,
}: {
  data: MagnitudeData;
  kind: "asnumbers" | "againsttruth";
}) {
  const t = useT();
  const { rows } = magnitudeShape(data);
  const showsTruth = kind === "againsttruth";

  // Locale-aware grouping, and no decimals on a figure this dense. The true
  // values are fractional in the source; rounding them for display cannot
  // contradict anything, because every number the puzzle reasons about is
  // derived from the authored values rather than from what is drawn.
  const format = (n: number) =>
    n >= 10
      ? Math.round(n).toLocaleString()
      : n.toLocaleString(undefined, { maximumFractionDigits: 1 });

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="flex items-center gap-1.5 text-[10px] leading-none text-ink-soft">
          <span
            className="h-2 w-2 rounded-[1px]"
            style={{ backgroundColor: colorFor(0) }}
            aria-hidden="true"
          />
          {t(data.estimatedLabel)}
        </span>
        {showsTruth ? (
          <span className="flex items-center gap-1.5 text-[10px] leading-none text-ink-soft">
            <span
              className="h-2 w-2 rounded-[1px]"
              style={{ backgroundColor: colorFor(1) }}
              aria-hidden="true"
            />
            {t(data.actualLabel)}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 rounded-md border border-rule bg-paper/50 px-2.5 py-2">
        {rows.map((row) => (
          <div key={row.id} className="flex min-w-0 items-center gap-2">
            <span className="w-16 shrink-0 truncate text-[10px] leading-none text-ink-mute">
              {t(row.short ?? row.label)}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <Track
                width={row.estimatedWidth}
                color={colorFor(0)}
                value={row.estimated}
                format={format}
              />
              {showsTruth ? (
                <Track
                  width={row.actualWidth}
                  color={colorFor(1)}
                  value={row.actual}
                  format={format}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center font-sans text-[9px] uppercase tracking-eyebrow text-ink-mute">
        {t(data.scaleLabel)}
      </p>

      <p className="text-[11px] leading-snug text-ink-mute">{t(data.statNote)}</p>
    </div>
  );
}
