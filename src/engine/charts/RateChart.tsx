import type { DataView, RatesData } from "../../puzzles/schema";
import { useT } from "../../app/i18n";
import { useReducedMotion } from "../useReducedMotion";
import { useCountUp } from "../useCountUp";
import { fillSlots } from "./announce";
import { colorFor } from "./palette";
import {
  aggregateRates,
  bestGroupId,
  restrictRates,
  ratesScrubFrame,
  stratifiedRates,
} from "./rates";

interface BarProps {
  pct: number; // 0..100
  colorHex: string;
  label: string;
  sub?: string;
  winner: boolean;
  animate: boolean;
}

function Bar({ pct, colorHex, label, sub, winner, animate }: BarProps) {
  const t = useT();
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
          // Two whole sentences rather than one plus an appended ", highest",
          // because the crown is not a suffix in every language and a fragment
          // has nowhere else to go.
          aria-label={fillSlots(
            t(
              winner
                ? { en: "{group}: {percent} percent, the highest" }
                : { en: "{group}: {percent} percent" },
            ),
            { group: label, percent: Math.round(pct) },
          )}
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
  view: DataView;
  animate: boolean;
  /** Mark the winning bar within each view (gold, the truth as it shifts). */
  highlightWinner?: boolean;
  /**
   * Position between the pooled view and the split one while the reader is
   * dragging, 0 being pooled. Absent means the discrete flip.
   */
  phase?: number;
}

export function RateChart({
  data,
  view,
  animate,
  highlightWinner = false,
  phase,
}: RateChartProps) {
  const t = useT();
  // Colours are indexed off the FULL group list, so a group keeps its colour
  // even in a view that only draws some of them.
  const indexOfGroup = new Map(data.groups.map((g, i) => [g.id, i]));
  const shown = restrictRates(data, view);
  const shortLabel = (g: { label: typeof data.groups[number]["label"]; short?: typeof data.groups[number]["short"] }) =>
    t(g.short ?? g.label);
  const groupById = (id: string) => data.groups.find((g) => g.id === id)!;

  const pooledLayer = () => {
    const rates = aggregateRates(shown);
    const winner =
      highlightWinner && shown.crownWinner !== false
        ? bestGroupId(rates, shown.higherIsBetter)
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
  };

  const splitLayer = (separation: number) => {
    const strata = stratifiedRates(shown);
    return (
      <div
        className={
          strata.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2 gap-2.5"
        }
        style={
          // The panels arrive from the middle, so the split reads as the pooled
          // picture coming apart rather than as a second chart appearing.
          separation < 1
            ? { transform: `scaleX(${0.82 + 0.18 * separation})` }
            : undefined
        }
      >
      {strata.map((s) => {
        const stratum = shown.strata.find((x) => x.id === s.stratumId)!;
        const winner =
          highlightWinner && shown.crownWinner !== false
            ? bestGroupId(s.rates, shown.higherIsBetter)
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
  };

  /*
    NOT A MORPH, AND THAT IS THE DESIGN RATHER THAN A LIMITATION.

    `risk` can slide its bars because its two views measure against different
    denominators, so the motion is a rescale. Here both views put a RATE on the
    same implied scale, so tweening a bar's height would walk it through rates
    nobody observed and, worse, through ORDERINGS that hold in neither view. On
    a Simpson's paradox card the ordering is the whole lesson: pooled says one
    group is ahead, every stratum says the other is. A frame invented between
    them states something true of no reading of the data, at the moment the
    reader is looking hardest.

    So the two layers are superimposed in one grid cell and the drag
    cross-dissolves between them while the split panels separate laterally.
    Nothing interpolates but opacity and position, and every numeral on screen
    at every instant belongs to a view somebody authored.
  */
  if (phase === undefined) {
    return view.kind === "aggregate" ? pooledLayer() : splitLayer(1);
  }

  const frame = ratesScrubFrame(phase);
  return (
    <div className="grid">
      <div
        className="col-start-1 row-start-1"
        style={{ opacity: frame.pooled }}
        // Exactly one layer is ever exposed to assistive tech. Thresholding
        // each at 0.5 independently left BOTH readable at phase 0.5, so a
        // screen reader met the pooled and split figures at once, which is the
        // one reading of this card that is never true. Comparing them instead
        // means the more visible layer is always the one announced.
        aria-hidden={frame.pooled <= frame.split}
      >
        {pooledLayer()}
      </div>
      <div
        className="col-start-1 row-start-1"
        style={{ opacity: frame.split }}
        aria-hidden={frame.split < frame.pooled}
      >
        {splitLayer(frame.separation)}
      </div>
    </div>
  );
}

export function Legend({ data, view }: { data: RatesData; view?: DataView }) {
  const t = useT();
  // Name only the groups actually on screen, but keep each one's colour.
  const shownIds = new Set(restrictRates(data, view).groups.map((g) => g.id));
  return (
    <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ink-soft">
      {data.groups
        .map((g, i) => ({ g, i }))
        .filter(({ g }) => shownIds.has(g.id))
        .map(({ g, i }) => (
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
