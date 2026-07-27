import { useLocale, useT } from "../../app/i18n";
import { UI } from "../../app/ui";
import type { EffectData } from "../../puzzles/schema";
import { colorFor, WINNER_GOLD } from "./palette";
import { effectReading, significanceAxis } from "./effect";

/**
 * One estimate, drawn against two yardsticks.
 *
 * The significance view measures it against zero: the interval sits clear of
 * no-difference, so the effect is certainly real. The magnitude view measures
 * the very same number against the thing it is meant to fix, where it turns out
 * to be a sliver. Nothing is recomputed between the two, only the ruler changes.
 */
export function EffectView({
  data,
  kind,
}: {
  data: EffectData;
  kind: "significance" | "magnitude";
}) {
  const t = useT();
  const locale = useLocale();
  const r = effectReading(data);
  const unit = t(data.unit);
  // Numbers the app derives are formatted for the reader's locale, so a French
  // chart does not read "16.8" beside a French "P < 0,001". Authored strings
  // keep whatever the translator wrote.
  const num = (v: number) =>
    new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(v);

  if (kind === "significance") {
    const axis = significanceAxis(data);
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-2xl font-semibold tabular-nums text-ink">
            {num(r.estimate)} {unit}
          </span>
          <span className="font-mono text-[12px] tabular-nums text-ink-soft">
            {num(r.ciLow)} {t(UI.rangeTo)} {num(r.ciHigh)}
          </span>
        </div>

        {/* The interval, against a no-difference line. */}
        <div className="relative h-12">
          {/* no-difference line */}
          <div
            className="absolute inset-y-0 w-px bg-ink/50"
            style={{ left: `${axis.zero}%` }}
            aria-hidden="true"
          />
          {/* the confidence interval */}
          <div
            className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full"
            style={{
              left: `${axis.left}%`,
              width: `${axis.width}%`,
              backgroundColor: colorFor(0),
            }}
            role="img"
            aria-label={`Interval from ${num(r.ciLow)} to ${num(
              r.ciHigh,
            )} ${unit}, ${
              r.excludesNoEffect ? "not touching no difference" : "crossing no difference"
            }`}
          />
          {/* the point estimate */}
          <div
            className="absolute top-1/2 h-4 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-[1px] bg-ink"
            style={{ left: `${axis.point}%` }}
            aria-hidden="true"
          />
          {/* label under the no-difference line */}
          <span
            className="absolute bottom-0 -translate-x-1/2 whitespace-nowrap font-sans text-[10px] uppercase tracking-eyebrow text-ink-mute"
            style={{ left: `${axis.zero}%` }}
          >
            {t(data.noEffectLabel)}
          </span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-rule pt-2">
          <span className="font-mono text-[13px] font-semibold tabular-nums text-ink">
            {t(data.pValueLabel)}
          </span>
          <span className="text-[11px] text-ink-mute">{t(data.sampleLabel)}</span>
        </div>
      </div>
    );
  }

  // Magnitude: the same number as a slice of what it is supposed to fix.
  const savedPct = r.share * 100;
  const Row = ({
    label,
    value,
    width,
    tone,
  }: {
    label: string;
    value: number;
    width: number;
    tone: string;
  }) => (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-[12px] font-semibold text-ink">{label}</span>
        <span className="font-mono text-[12px] tabular-nums text-ink-soft">
          {num(value)} {unit}
        </span>
      </div>
      <div className="h-5 w-full overflow-hidden rounded-[3px] bg-rule/60">
        <div
          className="h-full rounded-[3px]"
          style={{ width: `${width}%`, backgroundColor: tone }}
          role="img"
          aria-label={`${label}: ${num(value)} ${unit}`}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      <Row
        label={t(data.referenceLabel)}
        value={r.reference}
        width={100}
        tone={colorFor(1)}
      />
      <Row
        label={t(data.treatedLabel)}
        value={r.treated}
        width={(r.treated / r.reference) * 100}
        tone={colorFor(0)}
      />

      {/* The saving, named, so the sliver is not left for the eye to guess. */}
      <div className="flex items-center gap-2 rounded-md border border-gold/40 bg-gold/[0.08] px-2.5 py-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
          style={{ backgroundColor: WINNER_GOLD }}
          aria-hidden="true"
        />
        <span className="text-[12px] leading-snug text-ink">
          {num(r.estimate)} {unit} ({Math.round(savedPct)}%)
        </span>
        <span className="text-[11px] leading-snug text-ink-mute">
          {t(data.scaleLabel)}
        </span>
      </div>
    </div>
  );
}
