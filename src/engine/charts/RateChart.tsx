import type { DataView, RatesData } from "../../puzzles/schema";
import { useT } from "../../app/i18n";
import { useReducedMotion } from "../useReducedMotion";
import { useCountUp } from "../useCountUp";
import { fillSlots } from "./announce";
import { declaredColors } from "./palette";
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
   * The drag: both authored views and how far between them the reader has
   * pulled, 0 being `from`. Absent means the discrete flip.
   *
   * EACH LAYER RENDERS FROM ITS OWN VIEW. A view can restrict which groups or
   * strata it draws, and 29 of the 31 rates puzzles use that to hold something
   * back until the reveal. Building both layers from one view dropped the
   * setup's restriction and drew the withheld group at phase 0, which spoils
   * the puzzle before the reader has touched it.
   */
  scrub?: { from: DataView; to: DataView; phase: number };
}

export function RateChart({
  data,
  view,
  animate,
  highlightWinner = false,
  scrub,
}: RateChartProps) {
  const t = useT();
  // Colours resolve through the declared list, so a group keeps its colour in
  // a view that draws only some of them. This shape restricts INSIDE itself
  // rather than being handed a slice, which is why it sat outside the reach of
  // `declaredColors.test.ts` until that scan learned to look for the call.
  const colorOf = declaredColors(data.groups);
  const shown = restrictRates(data, view);
  const shortLabel = (g: { label: typeof data.groups[number]["label"]; short?: typeof data.groups[number]["short"] }) =>
    t(g.short ?? g.label);
  const groupById = (id: string) => data.groups.find((g) => g.id === id)!;

  const pooledLayer = (source: RatesData) => {
    const rates = aggregateRates(source);
    const winner =
      highlightWinner && source.crownWinner !== false
        ? bestGroupId(rates, source.higherIsBetter)
        : null;
    return (
      <div className="flex items-end justify-center gap-10 px-2">
        {rates.map((r) => (
          <Bar
            key={r.groupId}
            pct={r.rate * 100}
            colorHex={colorOf(r.groupId)}
            label={shortLabel(groupById(r.groupId))}
            sub={`${r.numerator}/${r.denominator}`}
            winner={winner === r.groupId}
            animate={animate}
          />
        ))}
      </div>
    );
  };

  const splitLayer = (source: RatesData, separation: number) => {
    const strata = stratifiedRates(source);
    return (
      <div
        className={
          strata.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2 gap-2.5"
        }
        style={
          // The panels arrive from the middle, so the split reads as the pooled
          // picture coming apart rather than as a second chart appearing.
          separation < 1
            ? // KNOWN AND DEFERRED, twice reviewed and twice judged shippable.
              // This is one shared-centre scale of the whole panel block, not
              // two panels sliding apart, so it squeezes the text inside them
              // by up to 18% mid-drag. It is exactly 0 at both rest states, so
              // nobody sees it at either authored view. Replacing it with a
              // per-panel translation is the fix, and it is a separate change.
              { transform: `scaleX(${0.82 + 0.18 * separation})` }
            : undefined
        }
      >
      {strata.map((s) => {
        const stratum = source.strata.find((x) => x.id === s.stratumId)!;
        const winner =
          highlightWinner && source.crownWinner !== false
            ? bestGroupId(s.rates, source.higherIsBetter)
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
                  colorHex={colorOf(r.groupId)}
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
  if (scrub === undefined) {
    return view.kind === "aggregate"
      ? pooledLayer(shown)
      : splitLayer(shown, 1);
  }

  /*
    POOLED IS ALWAYS THE SETUP HERE. `canScrub` admits a rates puzzle only
    when the setup is the aggregate view and the reveal is the stratified one,
    so there is no direction to work out and no reversed case to carry.

    That gate replaced a version of this code that handled both directions,
    and the handling cost two defects: one that ran the reversed puzzle
    backwards, and one that exposed its setup at exactly phase 0.5 while the
    caption said reveal. Deleting the path was cheaper than guarding it, and
    `stage-migration` keeps the discrete flip it always had.
  */
  const pooledData = restrictRates(data, scrub.from);
  const splitData = restrictRates(data, scrub.to);
  const frame = ratesScrubFrame(scrub.phase);

  /*
    KNOWN AND DEFERRED: the layer that is not being shown keeps its text in the
    DOM, since `opacity: 0` and `aria-hidden` remove it from sight and from the
    accessibility tree but not from `innerText`, page search or copy. A
    determined reader could search for a number the reveal has not yet given
    them. Narrow, mildly in tension with this beat's promise, and the fix
    (`display: none` outside the crossfade window, or `inert`) is its own
    change.

    WHICH LAYER IS ANNOUNCED USES THE CAPTION'S OWN RULE. It was decided by
    comparing `frame.pooled` against `frame.split`, which is fine for the
    magnitudes and useless at the midpoint, where they are exactly equal. The
    tie fell to the split layer, which was right here and wrong on the reversed
    puzzle. `RevealView` picks the figcaption with `phase >= 0.5`, so this uses
    the identical expression and the two cannot part company at any phase.
  */
  const exposePooled = scrub.phase < 0.5;

  return (
    <div className="grid">
      <div
        className="col-start-1 row-start-1"
        style={{ opacity: frame.pooled }}
        // Exactly one layer is ever exposed to assistive tech, and which one
        // follows the same rule the caption uses.
        aria-hidden={!exposePooled}
      >
        {pooledLayer(pooledData)}
      </div>
      <div
        className="col-start-1 row-start-1"
        style={{ opacity: frame.split }}
        aria-hidden={exposePooled}
      >
        {splitLayer(splitData, frame.separation)}
      </div>
    </div>
  );
}

export function Legend({ data, view }: { data: RatesData; view?: DataView }) {
  const t = useT();
  // Name only the groups actually on screen, but keep each one's colour.
  const shownIds = new Set(restrictRates(data, view).groups.map((g) => g.id));
  const colorOf = declaredColors(data.groups);
  return (
    <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ink-soft">
      {data.groups
        .filter((g) => shownIds.has(g.id))
        .map((g) => (
          <li key={g.id} className="inline-flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-[2px] ring-1 ring-inset ring-black/15"
              style={{ backgroundColor: colorOf(g.id) }}
              aria-hidden="true"
            />
            <span>{t(g.label)}</span>
          </li>
        ))}
    </ul>
  );
}
