import { useT } from "../../app/i18n";
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
}: {
  name: string;
  value: number;
  left: number;
  width: number;
  point: number;
  color: string;
  solid: boolean;
  unit: string;
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
        */}
        <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink">
          {value.toFixed(1)}
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
  const nf = new Intl.NumberFormat();

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
          {t(data.unobservedLabel)}: {nf.format(data.unobserved)} ({(missing * 100).toFixed(0)}%)
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
            {t(data.tracedLabel)}: {nf.format(data.traced)} ({(tracedShare(data) * 100).toFixed(0)}
            %)
          </p>
          <p className="text-[11px] leading-snug text-ink">
            {t(data.resolvedLabel)}: {nf.format(data.resolved)} (
            {(resolvedShare(data) * 100).toFixed(0)}%)
          </p>
          <p className="mt-1 text-[12px] font-medium leading-snug" style={{ color: WINNER_GOLD }}>
            {t(data.foundAmongUnobserved.label)}: {data.foundAmongUnobserved.value}% (
            {data.foundAmongUnobserved.ciLow} {t(UI.rangeTo)}{" "}
            {data.foundAmongUnobserved.ciHigh})
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
        <span>0</span>
        <span>{data.axisMax}%</span>
      </div>
      <p className="text-[10px] leading-snug text-ink-soft">{t(data.perLabel)}</p>
      <p className="text-[10px] leading-snug text-ink-soft">{t(data.rateNote)}</p>
    </div>
  );
}
