import { useLocale, useT } from "../../app/i18n";
import type { AttenuationData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import {
  axisFraction,
  exposedGroup,
  referenceGroup,
  showsAllWindows,
  visibleSeries,
} from "./attenuation";

/**
 * One association drawn once, then drawn again after the earliest deaths are
 * thrown away, with a control association given the same treatment.
 *
 * `atbaseline` draws the primary outcome's first window alone; `astrimmed`
 * draws every window of every outcome. The first window's row is identical
 * between the beats, so the reveal is a superset by construction rather than by
 * an author keeping two views in step.
 *
 * THE LINE AT 1 IS THE FIGURE. Everything else is positions relative to it, so
 * it is drawn first, labelled, and never scaled away: `ratioAxis` always
 * includes 1 whatever the data do. A version of this chart without that line
 * would be a row of numbers with no argument in it.
 */
export function AttenuationView({
  data,
  kind,
}: {
  data: AttenuationData;
  kind: "atbaseline" | "astrimmed";
}) {
  const t = useT();
  const locale = useLocale();
  const nf = new Intl.NumberFormat(locale);
  const num = (v: number, digits: number) =>
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(v);

  const series = visibleSeries(data, kind);
  const onePos = axisFraction(data, 1);
  const exposed = exposedGroup(data);
  const reference = referenceGroup(data);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] leading-snug text-ink-soft">{t(data.windowLabel)}</p>

      <div className="flex flex-col gap-3 rounded-md border border-rule bg-paper/50 px-2.5 py-2.5">
        {series.map((s, si) => {
          const outcome = data.outcomes.find((o) => o.id === s.outcomeId);
          if (!outcome) return null;
          return (
            <div key={s.outcomeId} className="flex flex-col gap-1.5">
              <div className="flex items-baseline gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colorFor(si) }}
                />
                <span className="text-[12px] leading-snug text-ink">
                  {t(outcome.short ?? outcome.label)}
                </span>
                {outcome.isControl ? (
                  <span className="ml-auto shrink-0 rounded border border-rule px-1 text-[9px] uppercase tracking-eyebrow text-ink-soft">
                    {t({ en: "control" })}
                  </span>
                ) : null}
              </div>

              {s.ratios.map((r) => {
                const w = data.windows.find((x) => x.id === r.windowId);
                if (!w) return null;
                return (
                  <div key={r.windowId} className="flex flex-col gap-0.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[11px] leading-snug text-ink-soft">
                        {t(w.short ?? w.label)}
                      </span>
                      <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink">
                        {num(r.riskRatio, 2)}
                      </span>
                    </div>

                    {/*
                      dir="ltr" IS LOAD-BEARING, for the reason `YieldView`
                      spells out: the axis runs low to high left to right in
                      every locale because the marks are positioned from the
                      left and do not mirror. Without it the ends would swap in
                      Arabic while the geometry stayed put.
                    */}
                    <div dir="ltr" className="relative h-4">
                      <div
                        className="absolute inset-y-0 w-px bg-rule"
                        style={{ left: `${onePos * 100}%` }}
                      />
                      <div
                        className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full"
                        style={{
                          left: `${Math.min(onePos, axisFraction(data, r.riskRatio)) * 100}%`,
                          width: `${Math.abs(axisFraction(data, r.riskRatio) - onePos) * 100}%`,
                          backgroundColor: colorFor(si),
                          opacity: 0.3,
                        }}
                      />
                      <div
                        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                          left: `${axisFraction(data, r.riskRatio) * 100}%`,
                          backgroundColor: colorFor(si),
                        }}
                      />
                    </div>

                    {/*
                      The counts name their groups. Without the labels this read
                      as two bare fractions either side of a dot, and which one
                      was the exposed group came from the schema contract that
                      `groups[0]` is exposed, which a reader cannot see.
                    */}
                    <span className="text-[10px] leading-snug text-ink-soft">
                      <span className="font-mono tabular-nums">
                        {t(exposed.short ?? exposed.label)} {nf.format(r.exposedEvents)}/
                        {nf.format(r.exposedN)}
                      </span>
                      {" · "}
                      <span className="font-mono tabular-nums">
                        {t(reference.short ?? reference.label)} {nf.format(r.referenceEvents)}/
                        {nf.format(r.referenceN)}
                      </span>
                    </span>
                  </div>
                );
              })}

              {outcome.note && showsAllWindows(kind) ? (
                <span className="text-[10px] leading-snug text-ink-soft">{t(outcome.note)}</span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div
        dir="ltr"
        className="relative h-3 font-mono text-[10px] tabular-nums text-ink-soft"
        aria-hidden="true"
      >
        <span className="absolute -translate-x-1/2" style={{ left: `${onePos * 100}%` }}>
          {num(1, 0)}
        </span>
      </div>

      <p className="text-[10px] leading-snug text-ink-soft">{t(data.ratioLabel)}</p>
      <p className="text-[10px] leading-snug text-ink-soft">{t(data.rateNote)}</p>
    </div>
  );
}
