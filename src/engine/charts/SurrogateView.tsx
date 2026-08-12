import { useT } from "../../app/i18n";
import type { SurrogateData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { endpointAxisMax, endpointRates, showsOutcome, stageShares } from "./surrogate";

/**
 * The run-in funnel, then the randomised outcome.
 *
 * `markeronly` draws the funnel; `andoutcome` draws the funnel AND the endpoint
 * counts underneath it. The funnel is byte-identical between the two beats, so
 * the reveal is a superset by construction rather than by an author remembering
 * to keep them in step.
 *
 * THE TWO HALVES ARE DELIBERATELY NOT ON A SHARED SCALE, and there is a rule
 * separating them saying so. The funnel is a share of everybody who walked in;
 * the endpoint bars are a share of one randomised arm. Drawing them against one
 * axis would invite exactly the comparison this card exists to break, since a
 * 75 per cent response bar sitting on the same scale as a 7.7 per cent death
 * bar reads as "mostly worked, a few died", which is the misreading rather than
 * the lesson.
 */
function StageBar({ share, color, dim }: { share: number; color: string; dim: boolean }) {
  return (
    <div dir="ltr" className="relative h-3 overflow-hidden rounded-sm bg-rule/40">
      <div
        className="absolute inset-y-0 left-0 rounded-sm"
        style={{ width: `${share * 100}%`, backgroundColor: color, opacity: dim ? 0.35 : 1 }}
      />
    </div>
  );
}

export function SurrogateView({
  data,
  kind,
}: {
  data: SurrogateData;
  kind: "markeronly" | "andoutcome";
}) {
  const t = useT();
  const stages = stageShares(data);
  const withOutcome = showsOutcome(kind);
  const rates = endpointRates(data);
  const axisMax = endpointAxisMax(data);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-[11px] leading-snug text-ink-soft">{t(data.runInLabel)}</p>
        <p className="font-mono text-[11px] tabular-nums text-ink">
          n = {data.entered.toLocaleString("en")}
        </p>
      </div>

      <div className="flex flex-col gap-2 rounded-md border border-rule bg-paper/50 px-2.5 py-2">
        {stages.map((s, i) => {
          const stage = data.stages[i];
          if (!stage) return null;
          return (
            <div key={s.id} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className={
                    s.qualified
                      ? "text-[12px] leading-snug font-medium text-ink"
                      : "text-[12px] leading-snug text-ink-soft"
                  }
                >
                  {t(stage.short ?? stage.label)}
                </span>
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink-soft">
                  {stage.count.toLocaleString("en")} · {(s.share * 100).toFixed(0)}%
                </span>
              </div>
              <div aria-hidden="true">
                <StageBar share={s.share} color={colorFor(0)} dim={!s.qualified} />
              </div>
            </div>
          );
        })}
        <p className="text-[10px] leading-snug text-ink-soft">{t(data.criterionLabel)}</p>
      </div>

      <p className="text-[10px] leading-snug text-ink-soft">{t(data.noControlNote)}</p>

      {withOutcome ? (
        <>
          {/*
            The rule is load-bearing, not decoration. It marks where the
            denominator changes, from everyone who entered the run-in to one
            randomised arm, which is the seam the whole lesson sits on.
          */}
          <div className="mt-1 border-t border-rule pt-2.5">
            <p className="text-[11px] leading-snug text-ink-soft">{t(data.endpointLabel)}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {data.arms.map((a, i) => (
              <span key={a.id} className="flex items-center gap-1.5 text-[11px] text-ink">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colorFor(i) }}
                />
                {t(a.short ?? a.label)}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 rounded-md border border-rule bg-paper/50 px-2.5 py-2">
            {data.endpoints.map((e) => (
              <div key={e.id} className="flex flex-col gap-1">
                <span className="text-[12px] leading-snug text-ink">
                  {t(e.short ?? e.label)}
                </span>
                {data.arms.map((a, i) => {
                  const r = rates.find((x) => x.endpointId === e.id && x.armId === a.id);
                  if (!r) return null;
                  return (
                    <div key={a.id} className="flex items-center gap-2">
                      <div dir="ltr" className="relative h-3 flex-1 overflow-hidden rounded-sm bg-rule/40">
                        <div
                          className="absolute inset-y-0 left-0 rounded-sm"
                          style={{
                            width: `${(r.rate / axisMax) * 100}%`,
                            backgroundColor: colorFor(i),
                          }}
                        />
                      </div>
                      <span className="w-[104px] shrink-0 text-right font-mono text-[11px] tabular-nums text-ink-soft">
                        {r.events} / {r.n.toLocaleString("en")} · {(r.rate * 100).toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
                {e.note ? (
                  <span className="text-[10px] leading-snug text-ink-soft">{t(e.note)}</span>
                ) : null}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
