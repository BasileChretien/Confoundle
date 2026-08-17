import { useLocale, useT } from "../../app/i18n";
import type { RatersData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { colorFor } from "./palette";
import { markFraction, raterSpread } from "./raters";

/**
 * One piece of work, and the mark each judge put on it.
 *
 * Every rater is a row on a shared scale, with the threshold drawn straight
 * down the figure. The setup names one rater and the reveal names none, so the
 * reveal adds the rest underneath without moving the first, which is the whole
 * promise the two beats make. The scale is authored rather than derived from
 * whichever marks are on screen, so nothing slides when the others arrive.
 *
 * COLOUR HERE IS NOT A LIST POSITION. A row is painted by which side of the
 * threshold its own mark falls on, so a rater keeps its colour whether it is
 * drawn alone at the setup or among nine at the reveal. That is why this
 * renderer takes `full` for nothing but its counts: there is no palette slot to
 * hold stable, because no slot is derived from an index in the first place.
 */
export function RatersView({
  data,
  full,
  kind,
}: {
  data: RatersData;
  /**
   * The UNRESTRICTED data. Colour does not need it, for the reason above, but
   * the threshold caption does: the reveal says how many of ALL the raters fell
   * each side, and computing that from `data` would make the setup announce
   * "1 of 1 passed", which is true of the slice and a lie about the study.
   */
  full: RatersData;
  kind: "onemarker" | "everymarker";
}) {
  const t = useT();
  const locale = useLocale();
  const nf = new Intl.NumberFormat(locale);

  const spread = raterSpread(full);
  const showTally = kind === "everymarker";

  const announce = showTally
    ? fillSlots(
        t({
          en: "{subject}, marked by {total} judges: {above} put it at or above {threshold} and {below} below.",
        }),
        {
          subject: t(data.subject),
          total: nf.format(spread.total),
          above: nf.format(spread.above),
          below: nf.format(spread.below),
          threshold: nf.format(full.threshold),
        },
      )
    : fillSlots(t({ en: "{subject}, and one judge's mark for it." }), {
        subject: t(data.subject),
      });

  const thresholdAt = markFraction(full, full.threshold) * 100;

  return (
    <figure className="flex flex-col gap-2" aria-label={announce}>
      <figcaption className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {t(data.label)}
      </figcaption>

      <p className="text-[13px] leading-snug text-ink-soft">{t(data.subject)}</p>

      <div className="relative flex flex-col gap-1.5 py-1">
        {/* The line the marks are being judged against, drawn once behind them. */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-ink/35"
          style={{ left: `${thresholdAt}%` }}
          aria-hidden="true"
        />

        {data.raters.map((r) => {
          const passed = r.mark >= full.threshold;
          const at = markFraction(full, r.mark) * 100;
          return (
            <div key={r.id} className="flex items-center gap-2">
              <span className="w-[38%] shrink-0 truncate text-[12px] text-ink-soft">
                {t(r.label)}
              </span>
              <span className="relative h-5 grow">
                <span
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    left: `${at}%`,
                    // Two literal slots chosen by a fact about this mark, never
                    // by where the rater sits in a list.
                    background: colorFor(passed ? 1 : 0),
                  }}
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 text-[11px] font-semibold tabular-nums text-ink"
                  style={{
                    left: `${at}%`,
                    marginLeft: at > 80 ? undefined : "0.6rem",
                    marginRight: at > 80 ? "0.6rem" : undefined,
                    transform: at > 80 ? "translate(-100%, -50%)" : undefined,
                  }}
                >
                  {nf.format(r.mark)}
                </span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-mute">
        <span>{t(data.metricLabel)}</span>
        <span>{t(data.thresholdLabel)}</span>
        <span className="flex items-center gap-1">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: colorFor(1) }}
            aria-hidden="true"
          />
          {t(data.aboveLabel)}
        </span>
        <span className="flex items-center gap-1">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: colorFor(0) }}
            aria-hidden="true"
          />
          {t(data.belowLabel)}
        </span>
      </div>

      {showTally ? (
        <p className="text-[13px] leading-snug text-ink">
          {fillSlots(
            t({ en: "{above} of {total} judges passed it. {below} failed it." }),
            {
              above: nf.format(spread.above),
              total: nf.format(spread.total),
              below: nf.format(spread.below),
            },
          )}
        </p>
      ) : null}
    </figure>
  );
}
