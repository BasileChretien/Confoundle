import { useLocale, useT } from "../../app/i18n";
import { UI } from "../../app/ui";
import type { UnseenData } from "../../puzzles/schema";
import { colorFor, WINNER_GOLD } from "./palette";
import {
  axisFraction,
  correctionIsClear,
  resolvedShare,
  showsCorrection,
  tracedShare,
  unobservedShare,
} from "./unseen";

/**
 * A reported number, the slice of the population whose outcome nobody saw, and
 * the number after somebody went and looked.
 *
 * TWO SCALES LIVE ON THIS FIGURE and they must never be confused. The bar at
 * the top is a composition of the COHORT: observed against unobserved. The axis
 * at the bottom carries the two ESTIMATES, in the metric's own units. The
 * "found among the missing" figure belongs to neither: it is a share of the
 * unobserved slice, so it is drawn against that slice, in words, with its
 * denominator named. Putting it on the estimates axis would invite a reader to
 * compare 17 with 7 as though they measured the same thing.
 *
 * `asrecorded` draws the composition and the reported estimate. `afterlooking`
 * keeps both EXACTLY where they were and adds the rest. Nothing is recomputed
 * and nothing rescales, because the whole verdict is how far the corrected
 * estimate sits from the reported one.
 */
function Estimate({
  name,
  value,
  left,
  width,
  point,
  color,
  solid,
  unit,
  format,
}: {
  name: string;
  value: number;
  left: number;
  width: number;
  point: number;
  color: string;
  solid: boolean;
  unit: string;
  format: (n: number) => string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[12px] leading-snug text-ink">{name}</span>
        {/*
          One decimal, always. These two estimates sit one above the other and
          are meant to be compared, and JavaScript renders 7.0 as "7", which put
          "1.9%" next to "7%" and made the pair look like figures of different
          precision. The source publishes both to one decimal.

          The formatter is passed in rather than built here, because it carries
          the reader's locale and this component has no hook to reach it from.
        */}
        <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink">
          {format(value)}
          {unit}
        </span>
      </div>
      <div className="relative h-3.5" aria-hidden="true">
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
    </div>
  );
}

export function UnseenView({
  data,
  kind,
}: {
  data: UnseenData;
  kind: "asrecorded" | "afterlooking";
}) {
  const t = useT();
  const revealed = showsCorrection(kind);
  const missing = unobservedShare(data);
  const clear = correctionIsClear(data);
  /**
   * EVERY numeral on this figure, in the reader's locale.
   *
   * `new Intl.NumberFormat()` with no argument is the same defect as
   * `toLocaleString()` with no argument, and it reads as deliberate in a way
   * the latter does not: it looks like locale-aware formatting and it follows
   * the JavaScript runtime's default locale, which in a browser is the
   * browser's rather than the one the reader picked in the app.
   *
   * It also left this figure half-localised, which is the state
   * `SurrogateView` argues is worse than either choice made consistently: the
   * cohort counts were grouped through `Intl` while the percentages beside them
   * came from `toFixed`, and the corrected estimate and both ends of its
   * interval were bare JavaScript numbers. A Bengali reader read
   * "৪,৩৮২ (10%)" on one line.
   */
  const locale = useLocale();
  const nf = new Intl.NumberFormat(locale);
  const whole = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const oneDecimal = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] leading-snug text-ink-soft">{t(data.metricLabel)}</p>

      {/* The counted half: what the records contain, and what they do not. */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-2 text-[11px] text-ink">
          <span>{t(data.cohortLabel)}</span>
          <span className="font-mono tabular-nums">{nf.format(data.cohort)}</span>
        </div>
        <div
          className="flex h-5 w-full overflow-hidden rounded-md border border-rule"
          aria-hidden="true"
        >
          <div
            className="h-full"
            style={{ width: `${(1 - missing) * 100}%`, backgroundColor: colorFor(0), opacity: 0.3 }}
          />
          {/* The missing slice is the one the whole card is about, so it is the
              marked one rather than the leftover. */}
          <div
            className="h-full"
            style={{
              width: `${missing * 100}%`,
              backgroundColor: revealed ? WINNER_GOLD : colorFor(1),
              opacity: revealed ? 0.55 : 0.35,
            }}
          />
        </div>
        <p className="text-[10px] leading-snug text-ink-soft">
          {t(data.unobservedLabel)}: {nf.format(data.unobserved)} ({whole.format(missing * 100)}%)
        </p>
      </div>

      {/* What chasing the missing found. Its own scale, its own denominator,
          deliberately nowhere near the estimates axis below. */}
      {revealed ? (
        <div className="rounded-md border border-rule bg-paper/50 px-2.5 py-2">
          {/*
            Each label is its own translated string followed by its own numbers,
            never a sentence with a label spliced into it. An earlier version
            built "2,892 (10% filed only as lost to follow-up)" by lowercasing
            the unobserved label and dropping it mid-clause, which reads wrong
            in English and cannot be made to work in a language that inflects
            the noun or puts the qualifier elsewhere.
          */}
          <p className="text-[11px] leading-snug text-ink">
            {t(data.tracedLabel)}: {nf.format(data.traced)} ({whole.format(tracedShare(data) * 100)}
            %)
          </p>
          <p className="text-[11px] leading-snug text-ink">
            {t(data.resolvedLabel)}: {nf.format(data.resolved)} (
            {whole.format(resolvedShare(data) * 100)}%)
          </p>
          <p className="mt-1 text-[12px] font-medium leading-snug" style={{ color: WINNER_GOLD }}>
            {t(data.foundAmongUnobserved.label)}: {nf.format(data.foundAmongUnobserved.value)}% (
            {nf.format(data.foundAmongUnobserved.ciLow)} {t(UI.rangeTo)}{" "}
            {nf.format(data.foundAmongUnobserved.ciHigh)})
          </p>
        </div>
      ) : null}

      {/* The estimated half. */}
      <div className="rounded-md border border-rule bg-paper/50 px-2.5 py-2">
        <div className="flex flex-col gap-2.5">
          <Estimate
            name={t(data.reported.short ?? data.reported.label)}
            value={data.reported.value}
            left={axisFraction(data, data.reported.ciLow)}
            width={axisFraction(data, data.reported.ciHigh) - axisFraction(data, data.reported.ciLow)}
            point={axisFraction(data, data.reported.value)}
            color={colorFor(0)}
            solid={revealed && clear}
            unit="%"
            format={(n) => oneDecimal.format(n)}
          />
          {revealed ? (
            <Estimate
              name={t(data.corrected.short ?? data.corrected.label)}
              value={data.corrected.value}
              left={axisFraction(data, data.corrected.ciLow)}
              width={
                axisFraction(data, data.corrected.ciHigh) - axisFraction(data, data.corrected.ciLow)
              }
              point={axisFraction(data, data.corrected.value)}
              color={colorFor(1)}
              solid={clear}
              unit="%"
              format={(n) => oneDecimal.format(n)}
            />
          ) : null}
        </div>
      </div>

      {/*
        dir="ltr" IS LOAD-BEARING and must not be removed. The estimates axis is
        numeric and does not mirror under RTL: zero stays left and the maximum
        stays right, in every locale. Without this the flex row reverses in
        Arabic while the bars do not, so the axis would be labelled backwards
        and both estimates would appear to sit at the opposite value.
      */}
      <div
        dir="ltr"
        className="flex items-center justify-between gap-2 font-mono text-[10px] tabular-nums text-ink-soft"
      >
        <span>{nf.format(0)}</span>
        <span>{nf.format(data.axisMax)}%</span>
      </div>
      <p className="text-[10px] leading-snug text-ink-soft">{t(data.perLabel)}</p>
      <p className="text-[10px] leading-snug text-ink-soft">{t(data.rateNote)}</p>
    </div>
  );
}
