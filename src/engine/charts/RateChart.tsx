import type { DataViewKind, Group, RatesData } from "../../puzzles/schema";
import { useT } from "../../app/i18n";
import { useReducedMotion } from "../useReducedMotion";
import { useCountUp } from "../useCountUp";
import { colorFor } from "./palette";
import { aggregateRates, bestGroupId, stratifiedRates } from "./rates";

interface BarProps {
  pct: number; // 0..100
  colorHex: string;
  label: string;
  sub?: string;
  winner: boolean;
  animate: boolean;
}

function Bar({ pct, colorHex, label, sub, winner, animate }: BarProps) {
  const reduced = useReducedMotion();
  const value = useCountUp(pct, animate, 800, reduced);
  const height = Math.max(0, Math.min(100, value));

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
      <div className="text-sm font-bold tabular-nums text-white">
        {Math.round(value)}%
      </div>
      <div className="flex h-36 w-full items-end justify-center">
        <div
          className={
            "w-9 rounded-md " +
            (winner
              ? "ring-2 ring-white/85 ring-offset-2 ring-offset-slate-900"
              : "")
          }
          style={{
            height: `${height}%`,
            minHeight: "4px",
            backgroundColor: colorHex,
          }}
          role="img"
          aria-label={`${label}: ${Math.round(pct)} percent${winner ? ", highest" : ""}`}
        />
      </div>
      <div className="text-center text-[11px] leading-tight">
        <div className="font-medium text-slate-200">{label}</div>
        {sub ? <div className="tabular-nums text-slate-500">{sub}</div> : null}
      </div>
    </div>
  );
}

export interface RateChartProps {
  data: RatesData;
  view: DataViewKind;
  animate: boolean;
  /** Ring the winning bar within each view (drives the eye during the reveal). */
  highlightWinner?: boolean;
}

export function RateChart({
  data,
  view,
  animate,
  highlightWinner = false,
}: RateChartProps) {
  const t = useT();
  const indexOfGroup = new Map(data.groups.map((g, i) => [g.id, i]));
  const shortLabel = (g: Group) => t(g.short ?? g.label);
  const groupById = (id: string) => data.groups.find((g) => g.id === id)!;

  if (view === "aggregate") {
    const rates = aggregateRates(data);
    const winner = highlightWinner
      ? bestGroupId(rates, data.higherIsBetter)
      : null;
    return (
      <div className="flex items-end justify-center gap-10 px-2">
        {rates.map((r) => (
          <Bar
            key={r.groupId}
            pct={r.rate * 100}
            colorHex={colorFor(indexOfGroup.get(r.groupId) ?? 0)}
            label={shortLabel(groupById(r.groupId))}
            sub={`${r.numerator}/${r.denominator}`}
            winner={winner === r.groupId}
            animate={animate}
          />
        ))}
      </div>
    );
  }

  const strata = stratifiedRates(data);
  return (
    <div className="grid grid-cols-2 gap-3">
      {strata.map((s) => {
        const stratum = data.strata.find((x) => x.id === s.stratumId)!;
        const winner = highlightWinner
          ? bestGroupId(s.rates, data.higherIsBetter)
          : null;
        return (
          <div key={s.stratumId} className="rounded-xl bg-black/20 p-3">
            <div className="mb-2 text-center text-xs font-semibold text-slate-300">
              {t(stratum.label)}
            </div>
            <div className="flex items-end justify-center gap-4">
              {s.rates.map((r) => (
                <Bar
                  key={r.groupId}
                  pct={r.rate * 100}
                  colorHex={colorFor(indexOfGroup.get(r.groupId) ?? 0)}
                  label={shortLabel(groupById(r.groupId))}
                  sub={`${r.numerator}/${r.denominator}`}
                  winner={winner === r.groupId}
                  animate={animate}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Legend({ data }: { data: RatesData }) {
  const t = useT();
  return (
    <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-300">
      {data.groups.map((g, i) => (
        <li key={g.id} className="inline-flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-sm"
            style={{ backgroundColor: colorFor(i) }}
            aria-hidden="true"
          />
          <span>{t(g.label)}</span>
        </li>
      ))}
    </ul>
  );
}
