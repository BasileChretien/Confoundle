import { useRef, useState } from "react";
import type {
  CausalData,
  Choice,
  FrequenciesData,
  Puzzle,
  RatesData,
} from "../../puzzles/schema";
import { useLocale, useT } from "../../app/i18n";
import { UI } from "../../app/ui";
import { track } from "../../app/analytics";
import { Badge, Button } from "../ui";
import { aggregateRates, bestGroupId, stratifiedRates } from "../charts/rates";
import { frequencyBreakdown } from "../charts/frequencies";
import { shareOrDownloadCard, type ExportResult } from "./exportCard";
import { CalibrationStrip, calibrationSummary } from "./CalibrationStrip";
import { getCalibrationWeek, calibrationDaysPlayed } from "../../app/session";
import { currentOrigin, displayHost, puzzleUrl } from "../../app/shareLinks";
import { fillSlots } from "../charts/announce";

type Framing = "competitive" | "selfDeprecating";

// Card-specific colors: brighter tones for legibility on the dark plate.
const CARD = {
  bg: "#201B14",
  text: "#F2ECDE",
  muted: "#C9BEA6",
  gold: "#D6A43A",
  teal: "#2AB39C",
  rust: "#E06A45",
  falseDim: "#7E7159", // dim tan, "false alarm" dots on the dark plate
  rule: "rgba(242,236,222,0.16)",
};

function humanize(category: string): string {
  const s = category.replace(/-/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** True when the pooled winner differs from the (consistent) subgroup winner. */
function hasReversal(data: RatesData): boolean {
  // Pooling only means something when the strata partition one population.
  if (data.strataAreSeparateSamples) return false;
  const agg = bestGroupId(aggregateRates(data), data.higherIsBetter);
  const winners = stratifiedRates(data).map((s) =>
    bestGroupId(s.rates, data.higherIsBetter),
  );
  const champ =
    winners.length > 0 && winners.every((w) => w === winners[0])
      ? winners[0]
      : null;
  return Boolean(champ && agg && champ !== agg);
}

/** One labelled pair of bars with a gold check over the taller one. */
function GlyphPanel({
  label,
  a,
  b,
  winner,
  emphasized,
}: {
  label: string;
  a: number;
  b: number;
  winner: "a" | "b";
  emphasized?: boolean;
}) {
  const bar = (k: "a" | "b", v: number) => (
    <div
      key={k}
      className="relative w-4 rounded-t-[2px]"
      style={{
        height: `${v}%`,
        backgroundColor: k === "a" ? CARD.teal : CARD.rust,
      }}
    >
      {winner === k ? (
        <span
          className="absolute left-1/2 -translate-x-1/2 text-xs font-bold leading-none"
          style={{ top: -15, color: CARD.gold }}
        >
          ✓
        </span>
      ) : null}
    </div>
  );
  return (
    <div
      className={
        "flex flex-col items-center gap-1.5 rounded-md px-2 py-1 " +
        (emphasized ? "" : "")
      }
      style={
        emphasized ? { backgroundColor: "rgba(255,255,255,0.06)" } : undefined
      }
    >
      <div className="flex h-[58px] items-end justify-center gap-2">
        {bar("a", a)}
        {bar("b", b)}
      </div>
      <span
        className="text-[9px] font-semibold uppercase tracking-eyebrow"
        style={{ color: CARD.muted }}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * Abstract illustration of the paradox: the same option (teal) leads in every
 * group, yet the other (rust) leads once the groups are pooled, the winner
 * flips. Deliberately carries no case-specific numbers or labels; the card
 * teaches the concept, not this one puzzle.
 */
function ReversalGlyph() {
  const t = useT();
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <div className="flex items-end justify-center gap-2.5 pt-4">
        <GlyphPanel label={t({ en: "Group 1" })} a={92} b={82} winner="a" />
        <GlyphPanel label={t({ en: "Group 2" })} a={64} b={56} winner="a" />
        <span
          className="pb-5 text-sm"
          style={{ color: CARD.muted }}
          aria-hidden="true"
        >
          →
        </span>
        <GlyphPanel
          label={t({ en: "Combined" })}
          a={70}
          b={82}
          winner="b"
          emphasized
        />
      </div>
    </div>
  );
}

/**
 * Abstract illustration of the false-positive paradox: everyone shown here
 * tested positive, yet almost all are false alarms, because the condition is
 * rare. Derived from the puzzle's counts (scaled to fit); no case specifics.
 */
function FrequencyGlyph({ data }: { data: FrequenciesData }) {
  const t = useT();
  const b = frequencyBreakdown(data);
  const CAP = 60;
  let trueN = b.truePositive;
  let falseN = b.falsePositive;
  if (b.allPositive > CAP) {
    trueN = Math.max(1, Math.round((b.truePositive / b.allPositive) * CAP));
    falseN = Math.max(0, CAP - trueN);
  }
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <div
        className="mb-2 text-center font-sans text-[10px] font-semibold uppercase tracking-eyebrow"
        style={{ color: CARD.muted }}
      >
        {t({ en: "Everyone here tested positive" })}
      </div>
      <div className="mx-auto flex max-w-60 flex-wrap justify-center gap-1">
        {Array.from({ length: trueN }).map((_, i) => (
          <span
            key={`t${i}`}
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: CARD.teal }}
          />
        ))}
        {Array.from({ length: falseN }).map((_, i) => (
          <span
            key={`f${i}`}
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: CARD.falseDim }}
          />
        ))}
      </div>
      <div
        className="mt-2.5 text-center text-[11px] font-semibold"
        style={{ color: CARD.gold }}
      >
        {t({ en: "Almost every one is a false alarm." })}
      </div>
      <div
        className="mt-1.5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px]"
        style={{ color: CARD.muted }}
      >
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: CARD.teal }}
          />
          {t({ en: "really has it" })}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: CARD.falseDim }}
          />
          {t({ en: "false alarm" })}
        </span>
      </div>
    </div>
  );
}

/**
 * Abstract common-cause diagram for the card: a hidden third thing (Z) drives
 * both the claimed cause and the effect, which have no direct link.
 */
function CausalGlyph({ data }: { data: CausalData }) {
  const t = useT();
  const pill =
    "rounded-lg px-3 py-1.5 text-center text-[13px] font-semibold leading-tight";
  const nodeBg = "rgba(255,255,255,0.06)";
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <div className="flex flex-col items-center gap-1.5">
        <div
          className={pill}
          style={{
            backgroundColor: "rgba(214,164,58,0.18)",
            color: CARD.text,
            border: `1px solid ${CARD.gold}`,
          }}
        >
          {t(data.commonCause)}
        </div>
        <div
          className="flex justify-center gap-12 text-lg leading-none"
          style={{ color: CARD.gold }}
          aria-hidden="true"
        >
          <span>↙</span>
          <span>↘</span>
        </div>
        <div className="flex w-full max-w-[16rem] items-stretch justify-center gap-3">
          <div
            className={`${pill} flex-1`}
            style={{ backgroundColor: nodeBg, color: CARD.text }}
          >
            {t(data.cause)}
          </div>
          <div
            className={`${pill} flex-1`}
            style={{ backgroundColor: nodeBg, color: CARD.text }}
          >
            {t(data.effect)}
          </div>
        </div>
        <div
          className="mt-0.5 flex items-center gap-2 text-[11px] font-semibold"
          style={{ color: CARD.rust }}
        >
          <span
            className="inline-block w-8"
            style={{ borderTop: `1px dashed ${CARD.rust}` }}
          />
          ✗ {t({ en: "no direct link" })}
          <span
            className="inline-block w-8"
            style={{ borderTop: `1px dashed ${CARD.rust}` }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Abstract survivorship illustration for the card: armour the "clean" spots
 * (engines/cockpit), the bullet holes only map where a plane can be hit and
 * still come home. No case specifics beyond the iconic bomber shape.
 */
/**
 * Two readings of the same people, drifting apart. The upper band is what was
 * recorded at the time; the lower is what the same mouths said afterwards, with
 * only a sliver surviving in teal and a rust block that was never there at all.
 * Deliberately unlabelled: the card teases the shape, the lesson explains it.
 */
function AgreementGlyph() {
  const t = useT();
  const STROKE = "rgba(242,236,222,0.4)";
  const GHOST = "#4A4335";
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <svg
        viewBox="0 0 200 120"
        role="img"
        aria-label={t({
          en: "What people reported at the time, and how little of it survived when they were asked again",
        })}
        style={{
          display: "block",
          width: "100%",
          maxWidth: 200,
          margin: "0 auto",
        }}
      >
        <rect
          x="14"
          y="24"
          width="172"
          height="22"
          rx="4"
          fill={GHOST}
          stroke={STROKE}
          strokeWidth="1.5"
        />
        <rect x="14" y="74" width="30" height="22" rx="4" fill={CARD.teal} />
        <rect
          x="44"
          y="74"
          width="106"
          height="22"
          rx="0"
          fill="rgba(242,236,222,0.10)"
          stroke={STROKE}
          strokeWidth="1"
        />
        <rect x="150" y="74" width="36" height="22" rx="4" fill={CARD.rust} />
        <path
          d="M20 50 L20 70"
          stroke={CARD.gold}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d="M180 50 L180 70"
          stroke={CARD.gold}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
      </svg>
    </div>
  );
}

function SurvivorshipGlyph() {
  const t = useT();
  const FILL = "#4A4335";
  const STROKE = "rgba(242,236,222,0.4)";
  const HITS: ReadonlyArray<readonly [number, number]> = [
    [26, 72],
    [70, 70],
    [82, 80],
    [118, 71],
    [130, 80],
    [176, 72],
    [100, 96],
    [94, 110],
    [107, 124],
    [99, 138],
  ];
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <svg
        viewBox="0 0 200 168"
        role="img"
        aria-label={t({
          en: "Armour the engines and cockpit, the clean-looking spots, not the bullet holes",
        })}
        style={{
          display: "block",
          width: "100%",
          maxWidth: 200,
          margin: "0 auto",
        }}
      >
        <rect
          x="14"
          y="60"
          width="172"
          height="24"
          rx="11"
          fill={FILL}
          stroke={STROKE}
          strokeWidth="1.5"
        />
        <rect
          x="64"
          y="128"
          width="72"
          height="15"
          rx="7"
          fill={FILL}
          stroke={STROKE}
          strokeWidth="1.5"
        />
        <rect
          x="88"
          y="22"
          width="24"
          height="128"
          rx="12"
          fill={FILL}
          stroke={STROKE}
          strokeWidth="1.5"
        />
        <circle
          cx="100"
          cy="38"
          r="9"
          fill="rgba(214,164,58,0.30)"
          stroke={CARD.gold}
          strokeWidth="2.5"
        />
        <rect
          x="42"
          y="64"
          width="16"
          height="16"
          rx="4"
          fill="rgba(214,164,58,0.30)"
          stroke={CARD.gold}
          strokeWidth="2.5"
        />
        <rect
          x="142"
          y="64"
          width="16"
          height="16"
          rx="4"
          fill="rgba(214,164,58,0.30)"
          stroke={CARD.gold}
          strokeWidth="2.5"
        />
        {HITS.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="3.2"
            fill={CARD.rust}
            opacity="0.3"
          />
        ))}
      </svg>
      <div
        className="mt-2 text-center text-[11px] font-semibold"
        style={{ color: CARD.gold }}
      >
        {t({ en: "Armour the clean-looking spots, not the bullet holes." })}
      </div>
    </div>
  );
}

/**
 * Abstract lead-time illustration for the card: two lives, the same length,
 * ending on the same gold line. One was told earlier, so the stretch counted as
 * "survival" (the bright part) is longer while the life is not. No case
 * specifics; the card teaches the move, not this puzzle.
 */
function TimelineGlyph() {
  const t = useT();
  // "found", not "told": the shape's own field is `detectedLabel`, and a
  // timeline puzzle need not involve anybody being told anything.
  const ROWS = [
    { found: 58, label: t({ en: "found late" }) },
    { found: 26, label: t({ en: "found early" }) },
  ];
  const DEATH = 82; // percent along the axis, shared by both rows
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <div className="relative flex flex-col gap-3">
        {ROWS.map((row, i) => (
          <div key={row.found} className="flex flex-col gap-1">
            <span
              className="text-[9px] font-semibold uppercase tracking-eyebrow"
              style={{ color: CARD.muted }}
            >
              {row.label}
            </span>
            <div
              className="relative h-3 w-full rounded-[2px]"
              style={{ backgroundColor: "rgba(242,236,222,0.14)" }}
            >
              <span
                className="absolute inset-y-0 rounded-[2px]"
                style={{
                  left: `${row.found}%`,
                  width: `${DEATH - row.found}%`,
                  backgroundColor: i === 0 ? CARD.teal : CARD.rust,
                }}
              />
            </div>
          </div>
        ))}
        <span
          className="pointer-events-none absolute bottom-0 top-0 w-[2px]"
          style={{ left: `${DEATH}%`, backgroundColor: CARD.gold }}
        />
      </div>
      <div
        className="mt-2.5 text-center text-[11px] font-semibold"
        style={{ color: CARD.gold }}
      >
        {t({ en: "Same day of death. Longer “survival”." })}
      </div>
    </div>
  );
}

/**
 * For puzzles whose strata are one population sliced two ways (Berkson's
 * hospital sample inside its survey, DIG's patients sorted by prescription and
 * then by randomisation): two panels, drawn from the puzzle's own rates. One
 * shows a yawning gap, the other shows none, and no bar is crowned because
 * neither slicing is a contest. Derived, so it stays true to whatever data the
 * puzzle carries.
 */
function SplitSampleGlyph({ data }: { data: RatesData }) {
  const t = useT();
  const strata = stratifiedRates(data);
  const tallest = Math.max(
    ...strata.flatMap((s) => s.rates.map((r) => r.rate)),
    0.01,
  );

  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <div className="flex items-start justify-center gap-4">
        {strata.map((s) => {
          const stratum = data.strata.find((x) => x.id === s.stratumId)!;
          return (
            <div
              key={s.stratumId}
              className="flex flex-1 flex-col items-center gap-1.5"
            >
              <div className="flex h-[62px] items-end justify-center gap-2">
                {s.rates.map((r, i) => (
                  <div
                    key={r.groupId}
                    className="w-5 rounded-t-[2px]"
                    style={{
                      height: `${(r.rate / tallest) * 100}%`,
                      minHeight: 2,
                      backgroundColor: i === 0 ? CARD.rust : CARD.teal,
                    }}
                  />
                ))}
              </div>
              <span
                className="text-center text-[9px] font-semibold uppercase leading-tight tracking-eyebrow"
                style={{ color: CARD.muted }}
              >
                {t(stratum.label)}
              </span>
            </div>
          );
        })}
      </div>
      <div
        className="mt-2.5 text-center text-[11px] font-semibold"
        style={{ color: CARD.gold }}
      >
        {t({ en: "Same people. Two ways of sorting them." })}
      </div>
    </div>
  );
}

/**
 * Abstract relative-versus-absolute illustration for the card: the same drop,
 * measured twice. On the left the treated bar is scaled against the untreated
 * one and a third of it is gone. On the right both sit inside the whole
 * population and the same drop is a sliver. No case-specific numbers.
 *
 * The panels are labelled by WHAT THEY ARE MEASURED AGAINST rather than by how
 * big the drop looks. An earlier draft said "a third lower", which is the
 * schematic geometry here and not a fact about any puzzle: this glyph is picked
 * by `data.type` alone, so a risk puzzle whose reduction is a half would have
 * shipped a share image asserting a third.
 */
function RiskGlyph() {
  const t = useT();
  const panel = (
    label: string,
    bars: Array<{ h: number; color: string }>,
    framed: boolean,
  ) => (
    <div className="flex flex-1 flex-col items-center gap-1.5">
      <div className="flex h-[62px] items-end justify-center gap-2">
        {bars.map((b, i) => (
          <div
            key={i}
            className="flex h-full w-5 items-end justify-center rounded-[2px]"
            style={
              framed
                ? { border: `1px solid rgba(242,236,222,0.28)` }
                : undefined
            }
          >
            <div
              className="w-full rounded-t-[2px]"
              style={{
                height: `${b.h}%`,
                minHeight: 2,
                backgroundColor: b.color,
              }}
            />
          </div>
        ))}
      </div>
      <span
        className="text-[9px] font-semibold uppercase tracking-eyebrow"
        style={{ color: CARD.muted }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <div className="flex items-end justify-center gap-3">
        {panel(
          t({ en: "against the other arm" }),
          [
            { h: 100, color: CARD.teal },
            { h: 67, color: CARD.rust },
          ],
          false,
        )}
        <span
          className="pb-6 text-sm"
          style={{ color: CARD.muted }}
          aria-hidden="true"
        >
          =
        </span>
        {panel(
          t({ en: "against everybody" }),
          [
            { h: 8, color: CARD.teal },
            { h: 5, color: CARD.rust },
          ],
          true,
        )}
      </div>
      <div
        className="mt-2.5 text-center text-[11px] font-semibold"
        style={{ color: CARD.gold }}
      >
        {t({ en: "Ask: a drop in what?" })}
      </div>
    </div>
  );
}

/**
 * Abstract regression-to-the-mean illustration for the card: two groups picked
 * for being extreme, one high and one low, each with an arrow pointing back
 * toward the gold average line in the middle. No case specifics; the card
 * teaches the move, that an extreme group drifts toward the average on its own.
 */
function RegressionGlyph() {
  const t = useT();
  const W = 200;
  const H = 120;
  const midY = H / 2;
  const col = (x: number, startY: number) => {
    const down = startY < midY;
    const endY = midY + (startY - midY) * 0.35; // lands about a third of the way back
    return (
      <g key={x}>
        <circle cx={x} cy={startY} r={7} fill={CARD.teal} opacity={0.5} />
        <line
          x1={x}
          y1={startY}
          x2={x}
          y2={endY + (down ? -8 : 8)}
          stroke={CARD.rust}
          strokeWidth={2.5}
        />
        <path
          d={`M ${x} ${endY} l -4 ${down ? -6 : 6} l 8 0 z`}
          fill={CARD.rust}
        />
        <circle cx={x} cy={endY} r={7} fill={CARD.rust} />
      </g>
    );
  };
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t({
          en: "Two extreme groups, one high and one low, each drifting back toward the average on its own",
        })}
        style={{
          display: "block",
          width: "100%",
          maxWidth: W,
          margin: "0 auto",
        }}
      >
        <line
          x1={0}
          y1={midY}
          x2={W}
          y2={midY}
          stroke={CARD.gold}
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        {col(70, 24)}
        {col(130, 96)}
      </svg>
      <div
        className="mt-2 text-center text-[11px] font-semibold"
        style={{ color: CARD.gold }}
      >
        {t({ en: "The extreme drifts back on its own." })}
      </div>
    </div>
  );
}

/**
 * Abstract effect-modification illustration for the card: a log odds-ratio axis
 * with a "no effect" line, one dim marker for the single pooled number sitting
 * in the middle, and two bright markers flying apart from it. No case specifics;
 * the card teaches the move, that one averaged number can hide two.
 */
/**
 * Statistical against clinical significance: a long bar for the problem and the
 * sliver of it the result actually removes, with the interval that made the
 * sliver "certain" drawn beneath.
 */
/**
 * The ecological fallacy: the line across places runs one way, the people
 * inside them run the other.
 */
/**
 * The framing effect: one identical choice, two wordings, and the majority
 * swapping sides without a single outcome changing.
 */
function FramingGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  const bar = (x: number, y: number, w: number, fill: string) => (
    <rect x={x} y={y} width={w} height={11} rx={3} fill={fill} />
  );
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t({
          en: "The same choice worded two ways, with the majority swapping sides",
        })}
        style={{
          display: "block",
          width: "100%",
          maxWidth: W,
          margin: "0 auto",
        }}
      >
        <text x={10} y={14} fontSize={9} fill={CARD.muted}>
          {t({ en: "worded one way" })}
        </text>
        {bar(10, 20, 120, CARD.teal)}
        {bar(10, 35, 48, CARD.rust)}
        <text x={10} y={62} fontSize={9} fill={CARD.muted}>
          {t({ en: "worded the other" })}
        </text>
        {bar(10, 68, 38, CARD.teal)}
        {bar(10, 83, 130, CARD.rust)}
        <text
          x={W - 8}
          y={48}
          fontSize={9}
          fill={CARD.gold}
          textAnchor="end"
          fontWeight={600}
        >
          {t({ en: "same choice" })}
        </text>
      </svg>
    </div>
  );
}

function DistributionGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  // Three stacked bars, each mostly the "below" colour, with the average marked
  // well to the right of where most of the mass sits.
  const row = (y: number, belowPct: number) => (
    <>
      <rect
        x={10}
        y={y}
        width={(W - 40) * belowPct}
        height={13}
        rx={3}
        fill={CARD.rust}
      />
      <rect
        x={10 + (W - 40) * belowPct}
        y={y}
        width={(W - 40) * (1 - belowPct)}
        height={13}
        rx={3}
        fill={CARD.teal}
      />
    </>
  );
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t({
          en: "Most items fall below their own average, which sits far to the right",
        })}
        style={{
          display: "block",
          width: "100%",
          maxWidth: W,
          margin: "0 auto",
        }}
      >
        <text x={10} y={12} fontSize={9} fill={CARD.muted}>
          {t({ en: "below the average" })}
        </text>
        {row(18, 0.755)}
        {row(37, 0.748)}
        {row(56, 0.722)}
        <line
          x1={10 + (W - 40) * 0.742}
          y1={14}
          x2={10 + (W - 40) * 0.742}
          y2={73}
          stroke={CARD.gold}
          strokeWidth={2}
          strokeDasharray="3 2"
        />
        <text
          x={W - 8}
          y={88}
          fontSize={9}
          fill={CARD.gold}
          textAnchor="end"
          fontWeight={600}
        >
          {t({ en: "the average" })}
        </text>
      </svg>
    </div>
  );
}

function DoseGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  // A curve that does almost all its climbing in the first sliver, with the
  // points spaced by dose rather than evenly, same as the real chart.
  //
  // The curve is schematic and the labels say so. They used to read "one
  // repeat" and "27 repeats", which are the illusory-truth study's units and
  // its top dose; every other `dose` puzzle would have carried them too.
  const pts: Array<[number, number]> = [
    [0, 3.64],
    [1, 4.26],
    [9, 4.78],
    [18, 4.72],
    [27, 4.87],
  ];
  const px = (d: number) => 16 + (d / 27) * (W - 32);
  const py = (m: number) => H - 22 - ((m - 3.4) / 1.8) * (H - 44);
  const path = pts
    .map(([d, m], i) => `${i === 0 ? "M" : "L"}${px(d)},${py(m)}`)
    .join(" ");
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t({
          en: "The outcome climbs almost entirely on the first step of dose, then flattens",
        })}
        style={{
          display: "block",
          width: "100%",
          maxWidth: W,
          margin: "0 auto",
        }}
      >
        <path
          d={path}
          fill="none"
          stroke={CARD.teal}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        {pts.map(([d, m]) => (
          <circle key={d} cx={px(d)} cy={py(m)} r={3} fill={CARD.teal} />
        ))}
        <line
          x1={px(1)}
          y1={py(3.4)}
          x2={px(1)}
          y2={py(4.4)}
          stroke={CARD.gold}
          strokeWidth={1.5}
          strokeDasharray="3 2"
        />
        <text
          x={px(1) + 5}
          y={20}
          fontSize={9}
          fill={CARD.gold}
          fontWeight={600}
        >
          {t({ en: "the first step" })}
        </text>
        <text
          x={W - 8}
          y={H - 6}
          fontSize={9}
          fill={CARD.muted}
          textAnchor="end"
        >
          {t({ en: "the largest dose" })}
        </text>
      </svg>
    </div>
  );
}

function EstimationGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  // Two guesses that differ fourfold, both vanishing against the real answer.
  //
  // The three fractions are the anchoring study's numbers and stay, because
  // they are what makes the picture; the labels no longer PRINT them. They
  // used to read "guessed 512", "guessed 2,250" and "actually 40,320", which
  // would have appeared verbatim on the card of any other `estimation` puzzle.
  const bar = (y: number, frac: number, fill: string, label: string) => (
    <>
      <text x={10} y={y - 3} fontSize={8} fill={CARD.muted}>
        {label}
      </text>
      <rect
        x={10}
        y={y}
        width={Math.max((W - 30) * frac, 2)}
        height={11}
        rx={3}
        fill={fill}
      />
    </>
  );
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t({
          en: "Two guesses four times apart, both tiny beside the true answer",
        })}
        style={{
          display: "block",
          width: "100%",
          maxWidth: W,
          margin: "0 auto",
        }}
      >
        {bar(16, 512 / 40320, CARD.teal, t({ en: "one group guessed" }))}
        {bar(45, 2250 / 40320, CARD.rust, t({ en: "the other guessed" }))}
        {bar(74, 1, CARD.gold, t({ en: "the true answer" }))}
      </svg>
    </div>
  );
}

function DriftGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two lines that swap places. The trusted source starts high and sinks; the
   * discredited one starts low and climbs past it. The crossing is the whole
   * lesson, so the glyph is the crossing and nothing else, with a gold dot
   * where the order reverses.
   */
  const x0 = 16;
  const x1 = W - 16;
  const highStart = 20;
  const highEnd = 56;
  const lowStart = 74;
  const lowEnd = 46;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({ en: "Two lines crossing over time" })}
    >
      <line
        x1={x0}
        y1={H - 12}
        x2={x1}
        y2={H - 12}
        stroke={CARD.rule}
        strokeWidth={1}
      />
      <line
        x1={x0}
        y1={highStart}
        x2={x1}
        y2={highEnd}
        stroke={CARD.teal}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <line
        x1={x0}
        y1={lowStart}
        x2={x1}
        y2={lowEnd}
        stroke={CARD.rust}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <circle cx={(x0 + x1) / 2} cy={(highStart + highEnd) / 2} r={4} fill={CARD.gold} />
    </svg>
  );
}

function RatingsGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two markers on one scale. The teal one sits on the gold anchor line, the
   * point that means "no effect at all"; the rust one sits well to its right.
   * That is the whole finding: not that one number beats another, but that
   * people put themselves exactly on nothing happened.
   */
  const x0 = 18;
  const x1 = W - 18;
  const axis = 62;
  const anchor = x0 + (x1 - x0) * 0.5;
  const self = anchor + 3;
  const others = anchor + 42;
  const marker = (x: number, y: number, color: string, spread: number) => (
    <>
      <rect x={x - spread} y={y - 2} width={spread * 2} height={4} rx={2} fill={color} opacity={0.28} />
      <rect x={x - 1.5} y={y - 9} width={3} height={18} rx={1.5} fill={color} />
    </>
  );
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({ en: "Two mean ratings on one scale" })}
    >
      <line x1={x0} y1={axis} x2={x1} y2={axis} stroke={CARD.rule} strokeWidth={1} />
      <line
        x1={anchor}
        y1={22}
        x2={anchor}
        y2={axis + 6}
        stroke={CARD.gold}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      {marker(self, 34, CARD.teal, 14)}
      {marker(others, 34, CARD.rust, 24)}
    </svg>
  );
}

function BunchingGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Six bars and a line. The three on the left sit high and level, the three on
   * the right drop away, and the gold rule falls in the gap between them. The
   * point is not that the count declines, which any distribution does, but that
   * it steps down at one arbitrary instant that only matters because people
   * were aiming at it.
   */
  const base = 76;
  const left = 20;
  const gap = 6;
  const barW = 22;
  const heights = [46, 48, 45, 33, 31, 30];
  const bars = heights.map((h, i) => {
    // The rule takes the place of a seventh gap, so the far side shifts right.
    const x = left + i * (barW + gap) + (i >= 3 ? gap : 0);
    return { x, h, past: i >= 3 };
  });
  const ruleX = left + 3 * (barW + gap) - gap / 2;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Six counts in order, level before an arbitrary line and dropping sharply after it",
      })}
    >
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={base - b.h}
          width={barW}
          height={b.h}
          rx={2}
          fill={b.past ? CARD.rust : CARD.teal}
        />
      ))}
      <line
        x1={ruleX}
        y1={16}
        x2={ruleX}
        y2={base + 6}
        stroke={CARD.gold}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <line x1={12} y1={base} x2={W - 12} y2={base} stroke={CARD.rule} strokeWidth={1} />
    </svg>
  );
}

function MagnitudeGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Four pairs of bars, small thing at the top and large thing at the bottom.
   * The teal bar is what people guessed, the rust bar under it is the truth.
   * At the top the guess dwarfs the truth; at the bottom the truth runs off
   * past the guess. The crossover in the middle is the whole point: the error
   * does not shrink as you go down the list, it changes sign.
   */
  const left = 14;
  const span = W - left - 14;
  const rows = [
    { guess: 0.13, truth: 0.005 },
    { guess: 0.17, truth: 0.05 },
    { guess: 0.48, truth: 0.25 },
    { guess: 0.57, truth: 1 },
  ];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Four pairs of bars: for small things the guess towers over the truth, for the largest the truth runs well past the guess",
      })}
    >
      {rows.map((r, i) => {
        const y = 12 + i * 21;
        return (
          <g key={i}>
            <rect
              x={left}
              y={y}
              width={Math.max(r.guess * span, 1.5)}
              height={6}
              rx={2}
              fill={CARD.teal}
            />
            <rect
              x={left}
              y={y + 8}
              width={Math.max(r.truth * span, 1.5)}
              height={6}
              rx={2}
              fill={CARD.rust}
            />
          </g>
        );
      })}
      <line
        x1={left}
        y1={6}
        x2={left}
        y2={H - 8}
        stroke={CARD.rule}
        strokeWidth={1}
      />
    </svg>
  );
}

function ProjectionGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two schematic maps. On the left, the familiar-looking one: the far north is
   * drawn far too big, so the polar block dwarfs the tropical one. On the right,
   * the honest one, where the same two bands are drawn in true proportion. The
   * gold tick is on the map that looks stranger, which is the whole joke.
   */
  const box = (x: number, north: number, tropic: number, ok: boolean) => (
    <g>
      <rect x={x} y={16} width={86} height={62} rx={2} fill="none" stroke={CARD.rule} />
      <rect x={x + 8} y={22} width={north} height={16} rx={1} fill={CARD.rust} />
      <rect x={x + 8} y={46} width={tropic} height={22} rx={1} fill={CARD.teal} />
      {ok ? (
        <text x={x + 43} y={90} textAnchor="middle" fontSize="11" fill={CARD.gold}>
          ✓
        </text>
      ) : null}
    </g>
  );
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Two maps side by side: the familiar-looking one draws the far north far too large, the stranger-looking one draws both bands in true proportion and is the accurate one",
      })}
    >
      {box(6, 68, 34, false)}
      {box(108, 24, 70, true)}
    </svg>
  );
}

function TargetGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two bars of the same length against the same dashed rule, so the metric
   * anybody reports is identical. Inside them, the band pressed against the
   * rule is the crowd finishing in the last moments before the deadline: fat on
   * the top bar, thin on the bottom one. Same compliance, opposite department.
   */
  const left = 12;
  const span = W - left - 30;
  const target = 0.95;
  const rows = [
    { within: 0.9532, late: 0.2083 },
    { within: 0.9551, late: 0.0856 },
  ];
  const ruleX = left + target * span;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Two bars of equal length against the same target line, one with a wide band of finishers crowded against the line and one with a narrow band",
      })}
    >
      {rows.map((r, i) => {
        const y = 22 + i * 32;
        const end = left + r.within * span;
        const bandStart = left + (r.within - r.late) * span;
        return (
          <g key={i}>
            <rect x={left} y={y} width={r.within * span} height={16} rx={2} fill={CARD.teal} />
            <rect
              x={bandStart}
              y={y}
              width={end - bandStart}
              height={16}
              rx={2}
              fill={CARD.rust}
            />
          </g>
        );
      })}
      <line
        x1={ruleX}
        y1={12}
        x2={ruleX}
        y2={H - 12}
        stroke={CARD.gold}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
    </svg>
  );
}

function IntervalGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * A lead sitting on a number line, with a wide bracket that reaches back past
   * zero. The gold dashes are zero: no lead at all. The point of the picture is
   * that the bracket touches them.
   */
  const mid = 52;
  const zero = 46;
  const dot = 108;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "A measured lead with an uncertainty bracket wide enough to reach back to zero",
      })}
    >
      <line x1={zero} y1={16} x2={zero} y2={80} stroke={CARD.gold} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={38} y1={mid} x2={178} y2={mid} stroke={CARD.teal} strokeWidth={2} />
      <line x1={38} y1={mid - 8} x2={38} y2={mid + 8} stroke={CARD.teal} strokeWidth={2} />
      <line x1={178} y1={mid - 8} x2={178} y2={mid + 8} stroke={CARD.teal} strokeWidth={2} />
      <line x1={88} y1={mid + 20} x2={128} y2={mid + 20} stroke={CARD.rule} strokeWidth={1.5} />
      <line x1={88} y1={mid + 15} x2={88} y2={mid + 25} stroke={CARD.rule} strokeWidth={1.5} />
      <line x1={128} y1={mid + 15} x2={128} y2={mid + 25} stroke={CARD.rule} strokeWidth={1.5} />
      <circle cx={dot} cy={mid} r={4} fill={CARD.rust} />
    </svg>
  );
}

function CeilingGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two curves pinned against a floor and a ceiling, free to separate only in
   * the middle. The gold rules are the bounds. The point of the picture is that
   * the gap between the curves is not a fact about the curves; it is what is
   * left over once both ends have been squeezed flat.
   */
  const floorY = 78;
  const ceilY = 18;
  const lower = "M14 74L50 66L86 48L122 30L158 22L186 20";
  const upper = "M14 71L50 58L86 34L122 22L158 18L186 17";
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Two rising curves squeezed together against a floor and a ceiling, apart only in the middle",
      })}
    >
      <line x1={10} y1={ceilY} x2={W - 10} y2={ceilY} stroke={CARD.gold} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={10} y1={floorY} x2={W - 10} y2={floorY} stroke={CARD.gold} strokeWidth={1} strokeDasharray="3 3" />
      <path d={lower} fill="none" stroke={CARD.teal} strokeWidth={2} />
      <path d={upper} fill="none" stroke={CARD.rust} strokeWidth={2} />
      <text x={12} y={ceilY - 4} fontSize={8} fill={CARD.muted}>
        {t({ en: "ceiling" })}
      </text>
      <text x={12} y={floorY + 11} fontSize={8} fill={CARD.muted}>
        {t({ en: "floor" })}
      </text>
    </svg>
  );
}

function UnseenGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * A cohort bar whose right-hand slice is the part nobody observed, and below
   * it the same quantity measured twice: the short teal estimate the records
   * produced, and the long rust one that arrived after somebody went and found
   * the missing. The gold slice and the gold arrow are the same fact, which is
   * the whole card: the correction came out of the gap.
   */
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "A population bar with a marked slice whose outcome was never recorded, above two estimates of the same quantity, the second far larger than the first",
      })}
    >
      <rect x={10} y={12} width={140} height={16} rx={3} fill={CARD.teal} opacity={0.3} />
      <rect x={150} y={12} width={40} height={16} rx={3} fill={CARD.gold} opacity={0.55} />
      <text x={150} y={40} fontSize={8} fill={CARD.muted}>
        {t({ en: "never seen" })}
      </text>

      <line x1={170} y1={44} x2={170} y2={58} stroke={CARD.gold} strokeWidth={1} strokeDasharray="2 2" />
      <path d="M170 60 l-3 -5 h6 z" fill={CARD.gold} />

      {/* reported */}
      <line x1={14} y1={72} x2={44} y2={72} stroke={CARD.teal} strokeWidth={2} opacity={0.55} />
      <circle cx={29} cy={72} r={3.5} fill={CARD.teal} />
      {/* corrected */}
      <line x1={104} y1={86} x2={168} y2={86} stroke={CARD.rust} strokeWidth={2} opacity={0.55} />
      <circle cx={136} cy={86} r={3.5} fill={CARD.rust} />
      <line x1={10} y1={62} x2={W - 10} y2={62} stroke={CARD.rule} strokeWidth={1} />
    </svg>
  );
}

function PublishedGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two rows, one per adherence level, each carrying a teal point for the arm
   * that got the drug and a gold point for the arm that got nothing. The rows
   * are far apart and the two colours sit together inside each row, which is
   * the whole card: the gap runs down the page, not across it, so it belongs
   * to the people rather than to the capsule.
   *
   * The rows are labelled generically. "took few" and "took most" were the
   * healthy-adherer card's own rows; this shape is a gradient down ANY
   * grouping of people that repeats across the arms, and the glyph is chosen
   * by `data.type`, so the second puzzle to ship on it would have carried
   * adherence labels over rows that were never about adherence.
   */
  const rows = [
    { y: 30, teal: 128, gold: 148, label: t({ en: "one group" }) },
    { y: 72, teal: 66, gold: 68, label: t({ en: "another group" }) },
  ];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Two rows of points: within each row the two arms sit together, while the two rows are far apart",
      })}
    >
      {rows.map((r) => (
        <g key={r.y}>
          <text x={10} y={r.y - 9} fontSize={8} fill={CARD.muted}>
            {r.label}
          </text>
          <line x1={10} y1={r.y} x2={190} y2={r.y} stroke={CARD.muted} strokeWidth={0.5} opacity={0.4} />
          <circle cx={r.teal} cy={r.y} r={5} fill={CARD.teal} opacity={0.85} />
          <circle cx={r.gold} cy={r.y} r={5} fill={CARD.gold} opacity={0.85} />
        </g>
      ))}
      <line x1={196} y1={30} x2={196} y2={72} stroke={CARD.gold} strokeWidth={1} strokeDasharray="2 2" />
    </svg>
  );
}
function SurrogateGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * A long teal bar for the marker doing what it was asked, then a rule, then
   * two short bars for the hard outcome, in which the treated one is the
   * taller. The rule is the point: above it the denominator is everybody who
   * walked in, below it it is one randomised arm, and the two are not on one
   * scale. A glyph that drew them against a shared axis would show a
   * triumphant bar beside two slivers, which is the misreading rather than
   * the lesson.
   */
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "A long bar for the marker responding, then a dividing rule, then two short bars for the real outcome, in which the treated one is taller",
      })}
    >
      {/*
        Shape-generic wording, not CAST's. The glyph is chosen by `data.type`
        alone, so "beats suppressed" would be simply wrong on the second puzzle
        built on this shape, and so would "died": the shape carries whatever
        endpoints a puzzle authors, and only one of them happens to be death.
      */}
      <text x={10} y={18} fontSize={8} fill={CARD.muted}>
        {t({ en: "marker responded" })}
      </text>
      <rect x={10} y={24} width={142} height={11} rx={2} fill={CARD.teal} opacity={0.85} />
      <line x1={10} y1={48} x2={190} y2={48} stroke={CARD.muted} strokeWidth={0.5} opacity={0.5} />
      <text x={10} y={62} fontSize={8} fill={CARD.muted}>
        {t({ en: "the real outcome" })}
      </text>
      <rect x={10} y={68} width={54} height={9} rx={2} fill={CARD.gold} opacity={0.9} />
      <rect x={10} y={80} width={21} height={9} rx={2} fill={CARD.teal} opacity={0.6} />
    </svg>
  );
}
function AttenuationGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * A vertical line at 1, three gold marks walking in towards it, and three
   * teal marks that do not move. That pair IS the card: one association melts
   * as the early deaths are discarded and the other, given exactly the same
   * treatment, stays where it was. Shape-generic wording, since the glyph is
   * chosen by `data.type` and must survive the next puzzle on this shape.
   */
  const one = 60;
  const gold = [150, 124, 78];
  const teal = [38, 41, 39];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Three marks walking in towards a line at one, and three marks beside them that stay put",
      })}
    >
      <line x1={one} y1={10} x2={one} y2={88} stroke={CARD.muted} strokeWidth={1} />
      {/*
        The one numeral here is deliberately NOT routed through `t`. It is the
        axis position the whole glyph is read against, and 1 is 1 in every
        locale this deck ships; sending it through the dictionary would invite a
        translator to render it in a numeral system the neighbouring marks are
        not drawn in.
      */}
      <text x={one - 3} y={94} fontSize={7} fill={CARD.muted}>
        1
      </text>
      {gold.map((x, i) => (
        <g key={`g${x}`}>
          <line x1={one} y1={20 + i * 11} x2={x} y2={20 + i * 11} stroke={CARD.gold} strokeWidth={2} opacity={0.35} />
          <circle cx={x} cy={20 + i * 11} r={4} fill={CARD.gold} opacity={0.9} />
        </g>
      ))}
      {teal.map((x, i) => (
        <g key={`t${x}-${i}`}>
          <line x1={one} y1={62 + i * 11} x2={x} y2={62 + i * 11} stroke={CARD.teal} strokeWidth={2} opacity={0.3} />
          <circle cx={x} cy={62 + i * 11} r={4} fill={CARD.teal} opacity={0.75} />
        </g>
      ))}
    </svg>
  );
}
function ConditionalGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two tracks on one shared scale. The gold row is tight, its three points
   * almost touching; the teal row below is flung wide. That contrast IS the
   * card: the same three conditions barely move one row and pull the other
   * apart, so whatever the columns are doing depends entirely on which row
   * you are in. Shape-generic wording, since the glyph is chosen by
   * `data.type` and must survive the next puzzle on this shape.
   */
  const tight = [122, 128, 140];
  const wide = [66, 108, 152];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Two tracks on one scale, three points bunched together on the upper one and spread far apart on the lower one",
      })}
    >
      <line x1={20} y1={34} x2={180} y2={34} stroke={CARD.rule} strokeWidth={1} />
      <line x1={20} y1={70} x2={180} y2={70} stroke={CARD.rule} strokeWidth={1} />
      {tight.map((x) => (
        <circle key={`c${x}`} cx={x} cy={34} r={5} fill={CARD.gold} opacity={0.9} />
      ))}
      {wide.map((x) => (
        <circle key={`w${x}`} cx={x} cy={70} r={5} fill={CARD.teal} opacity={0.8} />
      ))}
      {/*
        The bracket under the lower row measures the spread the upper row does
        not have. No numerals: the glyph is a comparison of two widths, and the
        card's own figures are already in the caption above it.
      */}
      <path
        d={`M${wide[0]} 82 L${wide[0]} 87 L${wide[2]} 87 L${wide[2]} 82`}
        fill="none"
        stroke={CARD.teal}
        strokeWidth={1.5}
        opacity={0.6}
      />
    </svg>
  );
}
function RatersGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * One vertical line, and a column of marks scattered on both sides of it.
   * The line is the threshold and the scatter is a single piece of work, so the
   * glyph carries the whole shape in one picture: the same thing landed on both
   * sides of the decision depending on who picked it up. Gold for the marks
   * that cleared the line, teal for the ones that did not, matching the figure.
   * Shape-generic wording, since the glyph is chosen by `data.type` and has to
   * survive whatever the next puzzle on this shape turns out to be about.
   */
  const LINE = 120;
  const marks = [
    { x: 128, y: 20 },
    { x: 96, y: 37 },
    { x: 74, y: 54 },
    { x: 128, y: 71 },
    { x: 68, y: 88 },
  ];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Five marks for one piece of work, scattered on both sides of a single pass line",
      })}
    >
      <line x1={LINE} y1={8} x2={LINE} y2={H - 4} stroke={CARD.rule} strokeWidth={1.5} />
      {marks.map((m) => (
        <g key={`${m.x}-${m.y}`}>
          <line
            x1={26}
            y1={m.y}
            x2={m.x}
            y2={m.y}
            stroke={CARD.rule}
            strokeWidth={1}
            opacity={0.5}
          />
          <circle
            cx={m.x}
            cy={m.y}
            r={5}
            fill={m.x >= LINE ? CARD.gold : CARD.teal}
            opacity={0.9}
          />
        </g>
      ))}
    </svg>
  );
}
function ProxyGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two pairs of bars for the same two groups, one pair per scale, with a rule
   * between them. The upper pair sit almost level, which is what every check
   * anyone runs against the trained-on scale reports. The lower pair, the same
   * two groups measured on the scale nobody trained on, come apart.
   *
   * Colour is by GROUP rather than by scale, so the eye can follow one of them
   * down the card and watch it move. Colouring by scale would draw the same
   * picture and say the two rows were different things, when the whole claim is
   * that they are the same people weighed twice.
   *
   * Shape-generic wording, since the glyph is chosen by `data.type` and has to
   * survive whatever the next puzzle on this shape turns out to be about.
   */
  const X = 22;
  const rows = [
    { y: 18, a: 84, b: 92 },
    { y: 62, a: 52, b: 150 },
  ];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Two groups almost level on the scale a model was trained on, and far apart on a second scale below",
      })}
    >
      {rows.map((r) => (
        <g key={r.y}>
          <rect x={X} y={r.y} width={r.a} height={9} rx={2} fill={CARD.gold} opacity={0.9} />
          <rect x={X} y={r.y + 13} width={r.b} height={9} rx={2} fill={CARD.teal} opacity={0.9} />
        </g>
      ))}
      <line x1={X} y1={50} x2={W - 8} y2={50} stroke={CARD.rule} strokeWidth={1} opacity={0.7} />
      <line x1={X} y1={8} x2={X} y2={H - 4} stroke={CARD.rule} strokeWidth={1.5} />
    </svg>
  );
}
function CompetingGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two curves from one origin, the upper one climbing away from the lower,
   * with the band between them filled. The band is the whole shape: a distance
   * that is not a disagreement between two methods but a population of people
   * one of them is still counting.
   *
   * Drawn as a widening fan rather than as two parallel lines, because the
   * separation growing with time is the property that makes the shape worth a
   * card. Two parallel lines would say the estimators differ by a constant,
   * which is the case where none of this matters.
   *
   * Shape-generic wording, since the glyph is chosen by `data.type` and has to
   * survive whatever the next puzzle on this shape turns out to be about.
   */
  const X0 = 22;
  const Y0 = H - 14;
  const upper = `M${X0},${Y0} C 80,${Y0 - 14} 130,${Y0 - 40} ${W - 12},14`;
  const lower = `M${X0},${Y0} C 80,${Y0 - 6} 130,${Y0 - 20} ${W - 12},48`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Two rising curves from one starting point, the gap between them widening as they go",
      })}
    >
      <path
        d={`${upper} L ${W - 12},48 C 130,${Y0 - 20} 80,${Y0 - 6} ${X0},${Y0} Z`}
        fill={CARD.gold}
        opacity={0.22}
      />
      <path d={upper} fill="none" stroke={CARD.gold} strokeWidth={2} />
      <path d={lower} fill="none" stroke={CARD.teal} strokeWidth={2} />
      <line x1={X0} y1={10} x2={X0} y2={Y0} stroke={CARD.rule} strokeWidth={1.5} />
      <line x1={X0} y1={Y0} x2={W - 8} y2={Y0} stroke={CARD.rule} strokeWidth={1.5} />
    </svg>
  );
}
function ClassifierGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two pairs of bars sharing a baseline: the upper pair almost equal, the
   * lower pair one nearly twice the other. Same two colours in both rows,
   * because the claim is that these are the same two groups read twice rather
   * than four measurements of four things.
   *
   * The rule between the rows is doing work. Without it the four bars read as
   * one chart with an odd shape; with it they read as two answers, which is
   * the whole card.
   *
   * Shape-generic wording, since the glyph is chosen by `data.type` and has to
   * survive whatever the next puzzle on this shape turns out to be about.
   */
  const X = 26;
  const rows = [
    { y: 14, a: 118, b: 110 },
    { y: 56, a: 132, b: 69 },
  ];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Two groups almost equal on one reading of a table and far apart on a second reading of the same table",
      })}
    >
      {rows.map((r) => (
        <g key={r.y}>
          <rect x={X} y={r.y} width={r.a} height={11} rx={2} fill={CARD.gold} opacity={0.9} />
          <rect x={X} y={r.y + 15} width={r.b} height={11} rx={2} fill={CARD.teal} opacity={0.9} />
        </g>
      ))}
      <line x1={X - 4} y1={48} x2={W - 8} y2={48} stroke={CARD.rule} strokeWidth={1} opacity={0.75} />
      <line x1={X} y1={8} x2={X} y2={H - 4} stroke={CARD.rule} strokeWidth={1.5} />
    </svg>
  );
}
function ShortcutGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two bars from a baseline that is NOT the left edge, with the baseline
   * drawn and the gap beyond the shorter bar left open. The point of the
   * picture is how little of the first bar the second fails to cover, and that
   * only reads correctly if the eye can see where measuring begins. Drawn from
   * the left edge these two would be nearly identical and the glyph would say
   * the opposite of the card.
   *
   * Gold is the model that saw the evidence, teal the one that did not, which
   * matches the figure inside the puzzle.
   *
   * Shape-generic wording, since the glyph is chosen by `data.type` and has to
   * survive whatever the next puzzle on this shape turns out to be about.
   */
  const X = 40;
  const FULL = W - X - 14;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Two bars measured from a marked starting line, the shorter one covering most of the longer",
      })}
    >
      <rect x={X} y={20} width={FULL} height={14} rx={2} fill={CARD.gold} opacity={0.9} />
      <rect x={X} y={50} width={FULL * 0.84} height={14} rx={2} fill={CARD.teal} opacity={0.9} />
      <line x1={X} y1={10} x2={X} y2={H - 12} stroke={CARD.rule} strokeWidth={1.5} />
      <text x={X - 5} y={H - 4} textAnchor="end" fontSize={9} fill={CARD.rule}>
        {t({ en: "chance" })}
      </text>
    </svg>
  );
}
function CrossedGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two rows on one axis, one per level of the first factor. The gold pair are
   * the two points the setup drew, far apart. The teal pair are the two the
   * reveal added, and the whole card is that the top two sit on top of each
   * other: moving the other factor, with the first held still, went almost
   * nowhere. The dashed line is the baseline both rows are read against.
   *
   * "one level" and "the other level" rather than "told yes" and "told no":
   * the shape crosses ANY two binary factors, and only the first puzzle on it
   * happened to have one of them be what people were told.
   */
  const rows = [
    {
      y: 34,
      pts: [{ x: 62, gold: true }, { x: 58, gold: false }],
      label: t({ en: "one level" }),
    },
    {
      y: 72,
      pts: [{ x: 118, gold: false }, { x: 158, gold: true }],
      label: t({ en: "the other level" }),
    },
  ];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Two rows of points on a shared axis: in the first row the two points sit almost on top of each other, in the second they are far apart",
      })}
    >
      <line x1={148} y1={14} x2={148} y2={88} stroke={CARD.muted} strokeWidth={1} strokeDasharray="3 3" />
      {rows.map((r) => (
        <g key={r.y}>
          <text x={10} y={r.y - 10} fontSize={8} fill={CARD.muted}>
            {r.label}
          </text>
          <line x1={10} y1={r.y} x2={190} y2={r.y} stroke={CARD.muted} strokeWidth={0.5} opacity={0.5} />
          {r.pts.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={r.y}
              r={5}
              fill={p.gold ? CARD.gold : CARD.teal}
              opacity={0.85}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

function DeliveredGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two tiers of paired bars, with a mark beside each pair saying whether the
   * two arms were given the same thing. The top pair is far apart and its two
   * doses differed, so that gap is bought and accounted for. The bottom pair is
   * closer but still apart, and its two doses were identical, which is the
   * whole card: a gap with nothing behind it. The matched pair carries the gold
   * mark, because it is the pair a reader would otherwise skip past as the
   * small, boring one.
   *
   * DELIBERATELY SCHEMATIC, and it has to stay that way. An earlier draft
   * printed this puzzle's own temperatures, 48 and 43, against the bars. That
   * is fine for one puzzle and wrong for a shape: `ShareCard` picks this glyph
   * for EVERY `delivered` card, so the second one to ship would have carried a
   * share image contradicting its own chart, in a unit it never used. Every
   * other glyph in this file is schematic for the same reason. The equals and
   * not-equals marks also need no translation, which bare numbers only appeared
   * not to.
   */
  const rows = [
    { y: 18, w: 124, c: CARD.teal },
    { y: 34, w: 24, c: CARD.rust },
    { y: 62, w: 100, c: CARD.teal },
    { y: 78, w: 88, c: CARD.rust },
  ];
  const marks = [
    { y: 34, sign: "≠", gold: false },
    { y: 78, sign: "=", gold: true },
  ];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Two pairs of bars: the first pair is far apart and marked as having been given different amounts, the second pair is apart although marked as having been given the same amount",
      })}
    >
      {rows.map((r) => (
        <rect key={r.y} x={10} y={r.y} width={r.w} height={10} rx={3} fill={r.c} opacity={0.55} />
      ))}
      {marks.map((m) => (
        <g key={m.y}>
          <path
            d={`M150 ${m.y - 14} h8 v22 h-8`}
            fill="none"
            stroke={m.gold ? CARD.gold : CARD.muted}
            strokeWidth={1}
            opacity={m.gold ? 0.9 : 0.5}
          />
          <text
            x={164}
            y={m.y - 0.5}
            fontSize={13}
            fill={m.gold ? CARD.gold : CARD.muted}
            fontWeight={m.gold ? 700 : 400}
          >
            {m.sign}
          </text>
        </g>
      ))}
    </svg>
  );
}

function YieldGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Three outcomes, each measured in two populations. On the top row the teal
   * and rust marks sit far apart: the programme found a great deal more. On the
   * two rows below they land on top of one another, and those are the rows that
   * decide whether it did any good. The gold sign marks each pair that did not
   * move, because those are the rows a reader skips.
   */
  const rows = [
    { y: 24, teal: 62, rust: 138, span: 20, moved: true },
    { y: 52, teal: 96, rust: 100, span: 16, moved: false },
    { y: 78, teal: 82, rust: 76, span: 15, moved: false },
  ];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Three outcomes measured in two populations: on the first the two marks are far apart, on the other two they sit on top of each other",
      })}
    >
      {rows.map((r) => (
        <g key={r.y}>
          {[
            { x: r.teal, c: CARD.teal },
            { x: r.rust, c: CARD.rust },
          ].map((m, i) => (
            <g key={i}>
              <line
                x1={m.x - r.span / 2}
                y1={r.y}
                x2={m.x + r.span / 2}
                y2={r.y}
                stroke={m.c}
                strokeWidth={2}
                opacity={0.5}
              />
              <circle
                cx={m.x}
                cy={r.y}
                r={3.5}
                fill={r.moved ? m.c : "none"}
                stroke={m.c}
                strokeWidth={1.6}
              />
            </g>
          ))}
          {r.moved ? null : (
            <text x={W - 24} y={r.y + 3} fontSize={9} fontWeight={700} fill={CARD.gold}>
              =
            </text>
          )}
        </g>
      ))}
      <line x1={10} y1={90} x2={W - 10} y2={90} stroke={CARD.rule} strokeWidth={1} />
    </svg>
  );
}

function ForestGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Three intervals against the line that means no effect. The top two sit well
   * clear of it. The third is HALF the length of the second and still on the
   * same side, which is the whole lesson: it shrank, it did not cross. The gold
   * rule is zero, and the arrow to its left is the side nothing reached.
   */
  const zeroX = 58;
  const rows = [
    { y: 26, low: 96, high: 142, dot: 119 },
    { y: 48, low: 108, high: 158, dot: 133 },
    { y: 70, low: 82, high: 116, dot: 99 },
  ];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Three confidence intervals, all to the right of a zero line, the lowest one shorter but still clear of it",
      })}
    >
      <line x1={zeroX} y1={12} x2={zeroX} y2={82} stroke={CARD.gold} strokeWidth={1} strokeDasharray="3 3" />
      <text x={zeroX - 26} y={92} fontSize={8} fill={CARD.muted}>
        {t({ en: "worse" })}
      </text>
      <text x={zeroX + 6} y={92} fontSize={8} fill={CARD.muted}>
        {t({ en: "better" })}
      </text>
      {rows.map((r, i) => (
        <g key={r.y}>
          <line
            x1={r.low}
            y1={r.y}
            x2={r.high}
            y2={r.y}
            stroke={i === 2 ? CARD.rust : CARD.teal}
            strokeWidth={2}
            opacity={0.55}
          />
          <circle cx={r.dot} cy={r.y} r={3.5} fill={i === 2 ? CARD.rust : CARD.teal} />
        </g>
      ))}
    </svg>
  );
}

function SeriesGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  /**
   * Two lines counting the same thing and crossing. The teal one falls, the
   * rust one climbs, and the gold rule marks the year they swap places. Neither
   * line is marked as the true one, because the point is that you cannot tell
   * from the picture which instrument to believe.
   */
  const teal = "M14 24L60 32L106 52L152 66L186 76";
  const rust = "M14 72L60 62L106 44L152 26L186 16";
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={t({
        en: "Two lines measuring the same thing over time, one falling and one rising, crossing in the middle",
      })}
    >
      <line x1={106} y1={10} x2={106} y2={86} stroke={CARD.gold} strokeWidth={1} strokeDasharray="3 3" />
      <path d={teal} fill="none" stroke={CARD.teal} strokeWidth={2} />
      <path d={rust} fill="none" stroke={CARD.rust} strokeWidth={2} />
      <line x1={10} y1={86} x2={W - 10} y2={86} stroke={CARD.rule} strokeWidth={1} />
    </svg>
  );
}

function SalienceGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  const INNER = W - 20;
  /**
   * Three head-to-head splits. The gold tick marks the side that actually
   * happens more often, which on the bottom two rows sits on the short end:
   * the majority went the other way. The top row is the control, where the
   * crowd and the world agree.
   */
  const row = (y: number, leftShare: number, tickLeft: boolean) => (
    <>
      <rect
        x={10}
        y={y}
        width={INNER * (leftShare / 100)}
        height={13}
        rx={3}
        fill={CARD.rust}
      />
      <rect
        x={10 + INNER * (leftShare / 100)}
        y={y}
        width={INNER * (1 - leftShare / 100)}
        height={13}
        rx={3}
        fill={CARD.teal}
      />
      <text
        x={tickLeft ? 14 : W - 20}
        y={y + 11}
        fontSize={11}
        fontWeight={700}
        fill={CARD.gold}
      >
        {"✓"}
      </text>
    </>
  );
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t({
          en: "Three public splits, with the correct side marked on the short end of two of them",
        })}
        style={{
          display: "block",
          width: "100%",
          maxWidth: W,
          margin: "0 auto",
        }}
      >
        {row(14, 1, false)}
        {row(43, 80, false)}
        {row(72, 58, false)}
      </svg>
    </div>
  );
}

function EcologicalGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t({
          en: "A downward line across places, with the people inside pointing upward",
        })}
        style={{
          display: "block",
          width: "100%",
          maxWidth: W,
          margin: "0 auto",
        }}
      >
        <line
          x1={16}
          y1={12}
          x2={16}
          y2={78}
          stroke="rgba(242,236,222,0.25)"
          strokeWidth={1.5}
        />
        <line
          x1={16}
          y1={78}
          x2={W - 12}
          y2={78}
          stroke="rgba(242,236,222,0.25)"
          strokeWidth={1.5}
        />
        {/* the line you get by counting places */}
        <line
          x1={26}
          y1={24}
          x2={W - 22}
          y2={66}
          stroke={CARD.rust}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <text x={W - 22} y={60} fontSize={9} fill={CARD.rust} textAnchor="end">
          {t({ en: "places" })}
        </text>
        {/* the people inside, pointing the other way */}
        <line
          x1={52}
          y1={64}
          x2={92}
          y2={40}
          stroke={CARD.teal}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="4 3"
        />
        <line
          x1={112}
          y1={58}
          x2={152}
          y2={34}
          stroke={CARD.teal}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="4 3"
        />
        <text x={20} y={92} fontSize={9} fill={CARD.teal}>
          {t({ en: "people" })}
        </text>
      </svg>
    </div>
  );
}

function EffectGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  const barX = 14;
  const barW = W - 28;
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t({
          en: "A tiny certain sliver against the whole of the problem it is meant to fix",
        })}
        style={{
          display: "block",
          width: "100%",
          maxWidth: W,
          margin: "0 auto",
        }}
      >
        {/* the whole problem */}
        <rect
          x={barX}
          y={14}
          width={barW}
          height={16}
          rx={3}
          fill="rgba(242,236,222,0.28)"
        />
        {/* the part the result removes, a tenth of it */}
        <rect
          x={barX}
          y={14}
          width={barW * 0.1}
          height={16}
          rx={3}
          fill={CARD.gold}
        />
        <text x={barX} y={46} fontSize={9} fill={CARD.gold} fontWeight={600}>
          {t({ en: "what it actually fixes" })}
        </text>
        {/* the interval that made that sliver certain, clear of zero */}
        <line
          x1={barX + 24}
          y1={70}
          x2={barX + 24}
          y2={88}
          stroke="rgba(242,236,222,0.45)"
          strokeWidth={1.5}
          strokeDasharray="3 3"
        />
        <text
          x={barX + 24}
          y={66}
          fontSize={8}
          fill="rgba(242,236,222,0.6)"
          textAnchor="middle"
        >
          0
        </text>
        <rect
          x={barX + 60}
          y={76}
          width={90}
          height={7}
          rx={3.5}
          fill="rgba(242,236,222,0.8)"
        />
      </svg>
    </div>
  );
}

function InteractionGlyph() {
  const t = useT();
  const W = 200;
  const H = 96;
  const x1 = 30; // no-effect line
  const y = 44;
  const dot = (cx: number, color: string, dim?: boolean) => (
    <circle cx={cx} cy={y} r={7} fill={color} opacity={dim ? 0.45 : 1} />
  );
  return (
    <div
      className="mt-4 rounded-lg p-3"
      style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t({
          en: "One averaged number in the middle, hiding two very different real effects",
        })}
        style={{
          display: "block",
          width: "100%",
          maxWidth: W,
          margin: "0 auto",
        }}
      >
        {/* baseline axis */}
        <line
          x1={14}
          y1={y}
          x2={W - 8}
          y2={y}
          stroke="rgba(242,236,222,0.25)"
          strokeWidth={1.5}
        />
        {/* no-effect line */}
        <line
          x1={x1}
          y1={18}
          x2={x1}
          y2={70}
          stroke={CARD.gold}
          strokeWidth={1.5}
          strokeDasharray="3 3"
        />
        <text
          x={x1}
          y={84}
          fontSize={9}
          fill={CARD.gold}
          textAnchor="middle"
          fontWeight={600}
        >
          {t({ en: "no effect" })}
        </text>
        {/* the pooled number, dim, stranded in the middle */}
        {dot(96, CARD.muted, true)}
        <text x={96} y={26} fontSize={9} fill={CARD.muted} textAnchor="middle">
          {t({ en: "one number" })}
        </text>
        {/* the two real effects, flying apart */}
        {dot(48, CARD.teal)}
        {dot(168, CARD.rust)}
      </svg>
      <div
        className="mt-1 text-center text-[11px] font-semibold"
        style={{ color: CARD.gold }}
      >
        {t({ en: "One number can hide two." })}
      </div>
    </div>
  );
}

/**
 * Beat 5: the shareable result card. The card node (cardRef) is what gets
 * rendered to PNG. It explains the reasoning skill itself (name + definition +
 * an abstract diagram) so it teaches anyone who sees it, independent of the
 * specific puzzle. Both caption framings are offered side-by-side.
 */
export function ShareCard({
  puzzle,
  committed,
  onReplay,
  onHome,
  origin = currentOrigin(),
}: {
  puzzle: Puzzle;
  committed: Choice;
  onReplay: () => void;
  onHome: () => void;
  /**
   * Where shared links point, defaulted to wherever the app is being served.
   * A prop rather than an inline `window.location.origin` read for two
   * reasons: `window` does not exist in the node render the localisation test
   * performs, and a test that could not pass a real origin would be checking
   * markup the browser never produces.
   */
  origin?: string;
}) {
  const t = useT();
  const cardRef = useRef<HTMLDivElement>(null);
  // The week is read once per render from the same local log everything else
  // uses. Below three played days the strip is withheld: one lonely bar reads
  // as a broken chart rather than as a first day.
  const shareLocale = useLocale();
  const week = getCalibrationWeek(7);
  const weekPlayed = calibrationDaysPlayed(week);
  const showStrip = weekPlayed >= 3;
  const tally = calibrationSummary(week);
  // Every numeral this card draws follows the reader's locale, including the
  // ones inside a slot. A raw number here draws Latin digits at a Bengali or
  // Arabic reader while the strip beside it is fully translated.
  const weekNumerals = new Intl.NumberFormat(shareLocale);
  const [framing, setFraming] = useState<Framing>(
    committed.isCorrect ? "competitive" : "selfDeprecating",
  );
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const data = puzzle.setup.data;
  const caption = t(puzzle.share.captions[framing]);
  const reversalGlyph = data.type === "rates" && hasReversal(data);
  const frequencyGlyph =
    data.type === "frequencies" && frequencyBreakdown(data).ppv < 0.5;
  const causalGlyph = data.type === "causal";
  const survivorshipGlyph = data.type === "survivorship";
  const timelineGlyph = data.type === "timeline";
  const riskGlyph = data.type === "risk";
  const agreementGlyph = data.type === "agreement";
  const regressionGlyph = data.type === "regression";
  const interactionGlyph = data.type === "interaction";
  const effectGlyph = data.type === "effect";
  const ecologicalGlyph = data.type === "ecological";
  const framingGlyph = data.type === "framing";
  const distributionGlyph = data.type === "distribution";
  const doseGlyph = data.type === "dose";
  const estimationGlyph = data.type === "estimation";
  const salienceGlyph = data.type === "salience";
  const driftGlyph = data.type === "drift";
  const ratingsGlyph = data.type === "ratings";
  const bunchingGlyph = data.type === "bunching";
  const magnitudeGlyph = data.type === "magnitude";
  const projectionGlyph = data.type === "projection";
  const targetGlyph = data.type === "target";
  const seriesGlyph = data.type === "series";
  const intervalGlyph = data.type === "interval";
  const ceilingGlyph = data.type === "ceiling";
  const forestGlyph = data.type === "forest";
  const yieldGlyph = data.type === "yield";
  const unseenGlyph = data.type === "unseen";
  const deliveredGlyph = data.type === "delivered";
  const crossedGlyph = data.type === "crossed";
  const publishedGlyph = data.type === "published";
  const surrogateGlyph = data.type === "surrogate";
  const attenuationGlyph = data.type === "attenuation";
  const conditionalGlyph = data.type === "conditional";
  const ratersGlyph = data.type === "raters";
  const proxyGlyph = data.type === "proxy";
  const competingGlyph = data.type === "competing";
  const classifierGlyph = data.type === "classifier";
  const shortcutGlyph = data.type === "shortcut";
  const splitSampleGlyph =
    data.type === "rates" &&
    Boolean(data.strataAreSeparateSamples) &&
    data.strata.length === 2;

  function selectFraming(next: Framing) {
    setFraming(next);
    track("share_caption_select", { slug: puzzle.slug });
  }

  async function handleShare() {
    if (!cardRef.current || busy) return;
    setBusy(true);
    setStatus(t({ en: "Rendering card…" }));
    /*
      THE SHARE TEXT CARRIES THE LINK, and this is the half that makes the card
      travel. It used to be `"<caption>, Confoundle"`, which named the product
      and gave no way to reach it, so a card seen in a story was a dead end
      unless the viewer guessed the domain.

      It points at the PUZZLE rather than the lesson page, because the caption
      beside it is a boast or a confession and both of them are invitations.
      Sending someone the prerendered explanation would hand them the answer
      along with the challenge.

      The origin is read live rather than baked, so a preview deployment and a
      dev server each share themselves rather than sending a tester to
      production.
    */
    const link = puzzleUrl(origin, puzzle.slug);
    const result: ExportResult = await shareOrDownloadCard(
      cardRef.current,
      `confoundle-${puzzle.slug}.png`,
      { title: t(puzzle.share.title), text: `${caption}\n\n${link}` },
    );
    track("share_export", { slug: puzzle.slug });
    setStatus(
      result === "shared"
        ? t({ en: "Shared!" })
        : result === "downloaded"
          ? t({ en: "Saved to your device." })
          : result === "cancelled"
            ? null
            : t({ en: "Couldn't create the image, try again." }),
    );
    setBusy(false);
  }

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-2">
        <Badge tone="brand">{t({ en: "Your card" })}</Badge>
        <h2 className="font-display text-xl font-semibold text-ink">
          {t({ en: "Nice, now catch a friend." })}
        </h2>
      </header>

      {/* The screenshot-able card, a dark almanac plate that explains the skill */}
      <div className="flex justify-center">
        <div
          ref={cardRef}
          className="w-[320px] rounded-2xl p-6"
          style={{ backgroundColor: CARD.bg, color: CARD.text }}
        >
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-display text-base font-semibold">
              Confoundle
            </span>
            <span
              className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow"
              style={{ color: CARD.muted }}
            >
              {t({ en: humanize(puzzle.category) })}
            </span>
          </div>

          <div className="mt-3 font-display text-[26px] font-semibold leading-[1.05]">
            {t(puzzle.lesson.skillName)}
          </div>

          <p
            className="mt-2.5 text-[14px] leading-normal"
            style={{ color: CARD.text }}
          >
            {t(puzzle.share.explainer)}
          </p>

          {/*
            The glyph is a DIAGRAM, and its geometry is left to right: bars
            grow rightwards from x=10, axes run from 0 to 200, the gold rule
            sits at a fixed x. Its labels have to be anchored the same way.

            Without this the Arabic card lost every SVG label. `dir="rtl"` on
            the document is inherited by SVG text, where it flips what
            `text-anchor: start` MEANS: a label at x=10 was laid out from x=10
            leftwards, so it ran from -40 to 10 and fell off the edge of a
            viewBox that starts at 0. Nothing overlapped and nothing warned;
            the words were simply not on the picture. Arabic still shapes and
            orders right to left inside each label, which is bidi's job and
            not this property's. The card's PROSE stays in the document
            direction, which is why this sits on the glyph rather than on the
            card.
          */}
          <div style={{ direction: "ltr" }}>
            {reversalGlyph ? (
              <ReversalGlyph />
            ) : splitSampleGlyph && data.type === "rates" ? (
              <SplitSampleGlyph data={data} />
            ) : frequencyGlyph ? (
              <FrequencyGlyph data={data} />
            ) : causalGlyph ? (
              <CausalGlyph data={data} />
            ) : survivorshipGlyph ? (
              <SurvivorshipGlyph />
            ) : timelineGlyph ? (
              <TimelineGlyph />
            ) : riskGlyph ? (
              <RiskGlyph />
            ) : agreementGlyph ? (
              <AgreementGlyph />
            ) : regressionGlyph ? (
              <RegressionGlyph />
            ) : interactionGlyph ? (
              <InteractionGlyph />
            ) : effectGlyph ? (
              <EffectGlyph />
            ) : ecologicalGlyph ? (
              <EcologicalGlyph />
            ) : framingGlyph ? (
              <FramingGlyph />
            ) : distributionGlyph ? (
              <DistributionGlyph />
            ) : doseGlyph ? (
              <DoseGlyph />
            ) : estimationGlyph ? (
              <EstimationGlyph />
            ) : salienceGlyph ? (
              <SalienceGlyph />
            ) : driftGlyph ? (
              <DriftGlyph />
            ) : ratingsGlyph ? (
              <RatingsGlyph />
            ) : bunchingGlyph ? (
              <BunchingGlyph />
            ) : magnitudeGlyph ? (
              <MagnitudeGlyph />
            ) : projectionGlyph ? (
              <ProjectionGlyph />
            ) : targetGlyph ? (
              <TargetGlyph />
            ) : seriesGlyph ? (
              <SeriesGlyph />
            ) : intervalGlyph ? (
              <IntervalGlyph />
            ) : ceilingGlyph ? (
              <CeilingGlyph />
            ) : forestGlyph ? (
              <ForestGlyph />
            ) : yieldGlyph ? (
              <YieldGlyph />
            ) : unseenGlyph ? (
              <UnseenGlyph />
            ) : deliveredGlyph ? (
              <DeliveredGlyph />
            ) : crossedGlyph ? (
              <CrossedGlyph />
            ) : publishedGlyph ? (
              <PublishedGlyph />
            ) : surrogateGlyph ? (
              <SurrogateGlyph />
            ) : attenuationGlyph ? (
              <AttenuationGlyph />
            ) : ratersGlyph ? (
              <RatersGlyph />
            ) : conditionalGlyph ? (
              <ConditionalGlyph />
            ) : proxyGlyph ? (
              <ProxyGlyph />
            ) : competingGlyph ? (
              <CompetingGlyph />
            ) : classifierGlyph ? (
              <ClassifierGlyph />
            ) : shortcutGlyph ? (
              <ShortcutGlyph />
            ) : null}
          </div>

          {showStrip ? (
            <div className="mt-4">
              <CalibrationStrip
                week={week}
                colors={{
                  teal: CARD.teal,
                  rust: CARD.rust,
                  muted: CARD.falseDim,
                  text: CARD.text,
                  rule: CARD.rule,
                }}
              />
              <p className="mt-1 font-sans text-[13px] leading-snug">
                <span>
                  {fillSlots(
                    t({ en: "Caught {caught} of {played}." }),
                    {
                      caught: weekNumerals.format(tally.caught),
                      played: weekNumerals.format(tally.played),
                    },
                  )}
                </span>
                {tally.certainAndWrong > 0 ? (
                  <span style={{ color: CARD.rust }}>
                    {" "}
                    {/*
                      Two authored forms rather than one with a slot, because
                      "Certain and wrong 1 times" is what a single slot ships.
                      This project has no plural machinery, so the singular is
                      its own sentence and each translator phrases both.
                    */}
                    {tally.certainAndWrong === 1
                      ? t({ en: "Certain and wrong once." })
                      : fillSlots(t({ en: "Certain and wrong {n} times." }), {
                          n: weekNumerals.format(tally.certainAndWrong),
                        })}
                  </span>
                ) : null}
              </p>
            </div>
          ) : null}
          <p className="mt-4 font-display text-[17px] font-medium leading-snug">
            <span style={{ color: CARD.gold }}>“</span>
            {caption}
            <span style={{ color: CARD.gold }}>”</span>
          </p>

          {/*
            THE HOST, PRINTED ON THE IMAGE ITSELF.

            The card is a PNG, so nothing on it is clickable: this is something
            a person reads and retypes, which is why it is the bare host and
            not the deep link. The query string is exactly the part that gets
            mistyped, and it is already carried by the share text, which is
            real text. Printing the host also survives the common case where
            somebody screenshots the image and reposts it with the text gone.

            The tagline keeps its own translated string rather than being
            rewritten to include the address, so this adds no dictionary keys:
            a domain is not translatable, and folding it into the sentence
            would have meant nine new entries to say the same thing.
          */}
          <div
            className="mt-4 flex items-baseline justify-between gap-3 border-t pt-2 font-sans text-[10px] font-semibold uppercase tracking-eyebrow"
            style={{ borderColor: CARD.rule, color: CARD.muted }}
          >
            <span>{t({ en: "Spot the hidden variable · confoundle" })}</span>
            <span className="shrink-0 normal-case tracking-normal">
              {displayHost(origin)}
            </span>
          </div>
        </div>
      </div>

      {/* Caption framing, both offered side by side */}
      <div>
        <p className="mb-2 text-center font-sans text-[11px] uppercase tracking-eyebrow text-ink-mute">
          {t({ en: "Pick your caption" })}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { key: "competitive", label: t({ en: "Competitive" }) },
              { key: "selfDeprecating", label: t({ en: "Self-deprecating" }) },
            ] as const
          ).map((opt) => {
            const active = framing === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                aria-pressed={active}
                onClick={() => selectFraming(opt.key)}
                className={
                  "rounded-lg px-3 py-2 text-sm font-semibold transition focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper " +
                  (active
                    ? "bg-ink text-paper"
                    : "border border-rule bg-paper-2 text-ink hover:bg-paper-3")
                }
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <Button onClick={handleShare} disabled={busy}>
        {busy ? t({ en: "Working…" }) : t({ en: "Share / save card" })}
      </Button>
      <p
        className="min-h-5 text-center text-sm text-ink-soft"
        aria-live="polite"
      >
        {status}
      </p>

      <Button variant="ghost" onClick={onReplay}>
        {t({ en: "Play again" })}
      </Button>

      <Button variant="ghost" onClick={onHome}>
        {t(UI.home)}
      </Button>
    </section>
  );
}
