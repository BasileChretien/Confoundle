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
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
      <div className="flex items-center gap-1 text-sm font-semibold tabular-nums text-ink">
        {winner ? (
          <span className="text-gold" aria-hidden="true">
            ✓
          </span>
        ) : null}
        <span
          className={
            winner
              ? "underline decoration-gold decoration-2 underline-offset-4"
              : "text-ink-soft"
          }
        >
          {Math.round(value)}%
        </span>
      </div>
      <div className="flex h-24 w-full items-end justify-center">
        <div
          className="relative w-9 rounded-t-[3px]"
          style={{ height: `${height}%`, minHeight: "4px", backgroundColor: colorHex }}
          role="img"
          aria-label={`${label}: ${Math.round(pct)} percent${winner ? ", highest" : ""}`}
        >
          <span
            className="pointer-events-none absolute inset-0 rounded-t-[3px] ring-1 ring-inset ring-black/15"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="text-center text-[11px] leading-tight">
        <div className="font-medium text-ink">{label}</div>
        {sub ? <div className="tabular-nums text-ink-soft">{sub}</div> : null}
      </div>
    </div>
  );
}

export interface RateChartProps {
  data: RatesData;
  view: DataViewKind;
  animate: boolean;
  /** Mark the winning bar within each view (gold, the truth as it shifts). */
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
    <div className="grid grid-cols-2 gap-2.5">
      {strata.map((s) => {
        const stratum = data.strata.find((x) => x.id === s.stratumId)!;
        const winner = highlightWinner
          ? bestGroupId(s.rates, data.higherIsBetter)
          : null;
        return (
          <div key={s.stratumId} className="rounded-md border border-rule bg-paper/50 p-2.5">
            <div className="mb-1.5 text-center font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
              {t(stratum.label)}
            </div>
            <div className="flex items-end justify-center gap-3">
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
    <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ink-soft">
      {data.groups.map((g, i) => (
        <li key={g.id} className="inline-flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-[2px] ring-1 ring-inset ring-black/15"
            style={{ backgroundColor: colorFor(i) }}
            aria-hidden="true"
          />
          <span>{t(g.label)}</span>
        </li>
      ))}
    </ul>
  );
}
