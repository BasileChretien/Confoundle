import type { DataViewKind, RiskArm, RiskData } from "../../puzzles/schema";
import { useT } from "../../app/i18n";
import { useReducedMotion } from "../useReducedMotion";
import { useCountUp } from "../useCountUp";
import { colorFor, WINNER_GOLD } from "./palette";
import { formatRiskPct, riskSummary } from "./risk";

/**
 * The same two counts, drawn twice.
 *
 * `relative` scales the treated arm against the control arm, so a third fewer
 * events fills a third of the bar. That is the picture behind every "cuts your
 * risk by a third" headline, and it is not a lie, it is just measured against
 * the risk rather than against the people.
 *
 * `absolute` frames each arm inside its full 0 to 100 scale, where the same
 * result is two slivers a millimetre apart, and adds the two numbers a patient
 * actually needs: how many in a thousand were spared, and how many have to be
 * treated for one of them to be.
 */

const FRAME = "#DCD2BC";

/** A number with its caption underneath. Never interpolated into a sentence,
 * so every locale stays grammatical. */
function Stat({
  value,
  caption,
  emphasis,
}: {
  value: string;
  caption: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className="flex flex-1 flex-col items-center rounded-md border px-2 py-2 text-center"
      style={{
        borderColor: emphasis ? WINNER_GOLD : FRAME,
        backgroundColor: emphasis ? "rgba(154,107,18,0.08)" : undefined,
      }}
    >
      <span
        className="font-display text-[26px] font-semibold leading-none tabular-nums"
        style={{ color: emphasis ? WINNER_GOLD : undefined }}
      >
        {value}
      </span>
      <span className="mt-1 text-[11px] leading-tight text-ink-soft">
        {caption}
      </span>
    </div>
  );
}

/** One arm's bar. `fill` is 0..1 of the drawn column; `framed` outlines the
 * whole 0 to 100 scale so the eye can see how little of it is used. */
function ArmBar({
  arm,
  fill,
  readout,
  colorHex,
  framed,
  animate,
}: {
  arm: RiskArm;
  fill: number;
  /** The risk as a percentage, in the absolute view only. In the relative view
   * the bars are a share of the control risk, and printing "100%" over the
   * control arm would read as "100% of these men", which is the opposite of
   * what it means. There the gold stat carries the only number. */
  readout: string | null;
  colorHex: string;
  framed: boolean;
  animate: boolean;
}) {
  const t = useT();
  const reduced = useReducedMotion();
  const value = useCountUp(fill, animate, 800, reduced);
  const height = Math.max(0, Math.min(1, value)) * 100;

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
      <span className="min-h-[1.25rem] text-sm font-semibold tabular-nums text-ink">
        {readout}
      </span>
      <div
        className="flex h-28 w-full items-end justify-center overflow-hidden rounded-[3px]"
        style={
          framed
            ? { border: `1px solid ${FRAME}`, backgroundColor: "rgba(0,0,0,0.02)" }
            : undefined
        }
        role="img"
        aria-label={`${t(arm.label)}: ${arm.events} of ${arm.n}${readout ? `, ${readout}` : ""}`}
      >
        <div
          className="w-10 rounded-t-[3px]"
          style={{
            height: `${height}%`,
            minHeight: height > 0 ? "3px" : "0",
            backgroundColor: colorHex,
          }}
        />
      </div>
      <div className="text-center text-[11px] leading-tight">
        <div className="font-medium text-ink">{t(arm.short ?? arm.label)}</div>
        <div className="tabular-nums text-ink-soft">
          {arm.events}/{arm.n}
        </div>
      </div>
    </div>
  );
}

/** Round for display, keeping a decimal only where one carries meaning. */
function tidy(value: number): string {
  const rounded = Math.round(value);
  return String(rounded);
}

export function RiskView({
  data,
  view,
  animate,
}: {
  data: RiskData;
  view: DataViewKind;
  animate: boolean;
}) {
  const t = useT();
  const s = riskSummary(data);
  const relative = view === "relative";

  const arms: Array<{ arm: RiskArm; fill: number; readout: string | null }> = relative
    ? [
        { arm: data.control, fill: 1, readout: null },
        { arm: data.treated, fill: s.remainingShare, readout: null },
      ]
    : [
        {
          arm: data.control,
          fill: s.controlRisk,
          readout: formatRiskPct(s.controlRisk),
        },
        {
          arm: data.treated,
          fill: s.treatedRisk,
          readout: formatRiskPct(s.treatedRisk),
        },
      ];

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {t(data.outcomeLabel)}
      </div>

      <div className="flex items-end justify-center gap-8 px-2">
        {arms.map(({ arm, fill, readout }, i) => (
          <ArmBar
            key={i}
            arm={arm}
            fill={fill}
            readout={readout}
            colorHex={colorFor(i)}
            framed={!relative}
            animate={animate}
          />
        ))}
      </div>

      {relative ? (
        <div className="flex gap-2">
          <Stat
            value={formatRiskPct(s.relativeReduction)}
            caption={t(data.relativeCaption)}
            emphasis
          />
        </div>
      ) : (
        <div className="flex gap-2">
          <Stat
            value={tidy(s.avoidedPerScale)}
            caption={t(data.absoluteCaption)}
            emphasis
          />
          <Stat
            value={
              Number.isFinite(s.numberNeededToTreat)
                ? tidy(s.numberNeededToTreat)
                : "∞"
            }
            caption={t(data.nntCaption)}
          />
        </div>
      )}
    </div>
  );
}
