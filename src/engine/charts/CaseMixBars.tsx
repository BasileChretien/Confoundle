import type { RatesData } from "../../puzzles/schema";
import { useT } from "../../app/i18n";
import { stratumColor, stratumIsDark } from "./palette";

/**
 * The composition view that makes Simpson's paradox concrete: one full-width
 * bar per group, segmented by stratum in proportion to the number of patients
 * (denominators). It shows the *case mix*, the confounder's uneven split
 * between the groups, which the success-rate chart hides. This is the actual
 * driver of the reversal (the pooled rate is a weighted average, and the
 * weights differ). Pure-derivation friendly and reusable for any rates puzzle.
 */
export function CaseMixBars({ data }: { data: RatesData }) {
  const t = useT();
  const n = data.strata.length;

  return (
    <div className="flex flex-col gap-1.5">
      {data.groups.map((g) => {
        const cells = data.strata.map((s) => {
          const o = data.observations.find(
            (x) => x.groupId === g.id && x.stratumId === s.id,
          );
          return { stratum: s, value: o?.denominator ?? 0 };
        });
        const total = cells.reduce((a, c) => a + c.value, 0) || 1;
        return (
          <div key={g.id} className="flex items-center gap-2">
            <span className="w-4 shrink-0 text-[11px] font-bold text-ink">
              {t(g.short ?? g.label)}
            </span>
            <div className="flex h-5 flex-1 overflow-hidden rounded-[3px] ring-1 ring-inset ring-black/15">
              {cells.map((c, si) => {
                const pct = (c.value / total) * 100;
                return (
                  <div
                    key={c.stratum.id}
                    className="flex items-center justify-center overflow-hidden whitespace-nowrap text-[10px] font-semibold tabular-nums"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: stratumColor(si, n),
                      color: stratumIsDark(si, n) ? "#F2ECDE" : "#221D15",
                    }}
                  >
                    {pct >= 14 ? c.value : ""}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="mt-0.5 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-ink-soft">
        {data.strata.map((s, si) => (
          <span key={s.id} className="inline-flex items-center gap-1">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-[2px] ring-1 ring-inset ring-black/15"
              style={{ backgroundColor: stratumColor(si, n) }}
              aria-hidden="true"
            />
            {t(s.label)}
          </span>
        ))}
      </div>
    </div>
  );
}
