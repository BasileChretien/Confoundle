import { useLocale, useT } from "../../app/i18n";
import type { EcologicalData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { colorFor } from "./palette";
import { formatR, personRates, slopeLine } from "./ecological";

/**
 * One relationship at two units of analysis.
 *
 * `byplace` draws the group level as a slope with its printed correlation, and
 * says on the figure that the slope is drawn rather than plotted, because the
 * source published the coefficient and never the per-place figures. `byperson`
 * drops to real counts and lets the bars fall where the arithmetic puts them,
 * which is the opposite way round.
 */
export function EcologicalView({
  data,
  kind,
}: {
  data: EcologicalData;
  kind: "byplace" | "byperson";
}) {
  const t = useT();
  /**
   * Every numeral in this figure, drawn or announced, in the reader's locale.
   *
   * The person-level row was the half-localised case `SurrogateView` warns
   * about, and it was half-localised inside a SINGLE span: the counts went
   * through `toLocaleString()` while the percentage beside them went through
   * `toFixed(1)`, so a Bengali reader read "৪২,০০০ / ৫,৭০,০০০ (7.4%)", with the
   * two counts in Bengali numerals and the percentage they summarise in Western
   * ones. (`toLocaleString()` with no argument was separately wrong: it follows
   * the runtime's default locale, not the app's.)
   *
   * The announced channel uses the same formatters as the drawn one, so a
   * screen reader hears the figure it is describing rather than a second,
   * differently-formatted one.
   */
  const locale = useLocale();
  const nf = new Intl.NumberFormat(locale);
  const oneDecimal = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  if (kind === "byplace") {
    const line = slopeLine(data);
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-sans text-[11px] uppercase tracking-eyebrow text-ink-mute">
            {t(data.unitLabel)}
          </span>
          <span className="font-mono text-lg font-semibold tabular-nums text-ink">
            r = {formatR(data.groupCorrelation, locale)}
          </span>
        </div>

        <div className="flex gap-2">
          {/* y axis label, rotated */}
          <div className="flex w-4 shrink-0 items-center justify-center">
            <span
              className="whitespace-nowrap font-sans text-[10px] uppercase tracking-eyebrow text-ink-mute"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {t(data.yLabel)}
            </span>
          </div>

          <div className="relative h-32 flex-1 rounded-md border border-rule bg-paper/50">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              role="img"
              // The direction is the whole content of this announcement, so it
              // is two sentences rather than one with the word "downward"
              // slotted in: a bare direction word has no case, and several of
              // these languages inflect it.
              aria-label={fillSlots(
                t(
                  data.groupCorrelation < 0
                    ? {
                        en: "Compared group by group, the relationship runs downward. Correlation r equals {r}.",
                      }
                    : {
                        en: "Compared group by group, the relationship runs upward. Correlation r equals {r}.",
                      },
                ),
                { r: formatR(data.groupCorrelation, locale) },
              )}
            >
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={colorFor(0)}
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        <div className="ps-6 font-sans text-[10px] uppercase tracking-eyebrow text-ink-mute">
          {t(data.xLabel)}
        </div>
        <p className="text-[11px] leading-snug text-ink-mute">{t(data.schematicNote)}</p>
      </div>
    );
  }

  // Person level: real counts, real bars.
  const rates = personRates(data);
  const max = Math.max(...rates.map((r) => r.rate), 0.01);
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-[11px] uppercase tracking-eyebrow text-ink-mute">
          {t(data.outcomeLabel)}
        </span>
        <span className="font-mono text-lg font-semibold tabular-nums text-ink">
          r = {formatR(data.personCorrelation, locale)}
        </span>
      </div>

      {rates.map((r, i) => (
        <div key={t(r.label)} className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-sans text-[12px] font-semibold text-ink">
              {t(r.short ?? r.label)}
            </span>
            <span className="font-mono text-[12px] tabular-nums text-ink-soft">
              {nf.format(r.affected)} / {nf.format(r.total)} (
              {oneDecimal.format(r.rate * 100)}%)
            </span>
          </div>
          <div className="h-5 w-full overflow-hidden rounded-[3px] bg-rule/60">
            <div
              className="h-full rounded-[3px]"
              style={{
                width: `${(r.rate / max) * 100}%`,
                backgroundColor: colorFor(i),
              }}
              role="img"
              // The same sentence the rates chart announces, deliberately the
              // same key: one bar with a name and a percentage reads the same
              // way whichever shape drew it, and two wordings would be two
              // translations of one thing.
              aria-label={fillSlots(t({ en: "{group}: {percent} percent" }), {
                group: t(r.label),
                percent: oneDecimal.format(r.rate * 100),
              })}
            />
          </div>
        </div>
      ))}

      <p className="text-[11px] leading-snug text-ink-mute">{t(data.scaleNote)}</p>
    </div>
  );
}
