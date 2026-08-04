import { useT } from "../../app/i18n";
import type { IntervalData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { gapMargin, gapSize, intervalShares } from "./intervals";

/**
 * A published poll, drawn twice.
 *
 * `oneshare` draws the shares as bars, each carrying the margin the poll
 * printed. It reads the way a poll writeup reads: two numbers, one ruler.
 *
 * `thegap` throws the bars away and draws the LEAD on a number line centred on
 * zero, with the margin that actually belongs to a difference. Nothing is
 * recalculated between the two pictures; the second one just measures the thing
 * the first one invited you to measure by eye. The published margin is drawn
 * alongside as a thin inner bracket, so the reader can see the ruler they were
 * given against the ruler the question needed.
 */
const W = 320;

export function IntervalView({
  data,
  kind,
}: {
  data: IntervalData;
  kind: "oneshare" | "thegap";
}) {
  const t = useT();
  return (
    <div className="flex flex-col gap-2.5">
      {kind === "oneshare" ? <Shares data={data} /> : <Gap data={data} />}
      <p className="text-[11px] leading-snug text-ink-soft">{t(data.metricLabel)}</p>
      <p className="text-[11px] leading-snug text-ink-mute">{t(data.statNote)}</p>
    </div>
  );
}

function Shares({ data }: { data: IntervalData }) {
  const t = useT();
  const bars = intervalShares(data);
  // Scaled against the largest share plus its whisker, so no whisker is clipped
  // and the same scale holds however the options are ordered.
  const peak = Math.max(...bars.map((b) => b.percent + b.margin), 1);
  const ROW = 34;
  const H = bars.length * ROW + 8;
  const BAR_H = 12;
  const px = (v: number) => (v / peak) * (W - 12);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t(data.label)}>
      {bars.map((b, i) => {
        const y = i * ROW + 14;
        const end = px(b.percent);
        const lo = px(Math.max(b.percent - b.margin, 0));
        const hi = px(b.percent + b.margin);
        return (
          <g key={b.id}>
            <text x={0} y={y - 4} fontSize="10" className="fill-ink-soft">
              {t(b.short ?? b.label)}
            </text>
            <rect x={0} y={y} width={end} height={BAR_H} rx={2} fill={colorFor(i)} />
            {/* The printed margin, drawn on the bar it belongs to. */}
            <line
              x1={lo}
              y1={y + BAR_H / 2}
              x2={hi}
              y2={y + BAR_H / 2}
              stroke="currentColor"
              className="text-ink"
              strokeWidth={1.5}
            />
            {[lo, hi].map((x) => (
              <line
                key={x}
                x1={x}
                y1={y + 1}
                x2={x}
                y2={y + BAR_H - 1}
                stroke="currentColor"
                className="text-ink"
                strokeWidth={1.5}
              />
            ))}
            <text
              x={hi + 4}
              y={y + BAR_H - 2}
              fontSize="10"
              className="fill-ink"
              fontWeight="600"
            >
              {b.percent}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Gap({ data }: { data: IntervalData }) {
  const t = useT();
  const gap = gapSize(data);
  const margin = gapMargin(data);
  const printed = data.publishedMargin;

  // A number line centred on zero. The span is set by the widest thing drawn so
  // that zero always stays visible: the whole point is whether the interval
  // reaches it.
  const span = Math.max(gap + margin, margin) * 1.15;
  const H = 96;
  const MID = 46;
  const px = (v: number) => W / 2 + (v / span) * (W / 2 - 10);

  const lo = px(gap - margin);
  const hi = px(gap + margin);
  const innerLo = px(gap - printed);
  const innerHi = px(gap + printed);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t(data.label)}>
      {/* Zero: no lead at all. */}
      <line
        x1={px(0)}
        y1={14}
        x2={px(0)}
        y2={H - 22}
        stroke="currentColor"
        className="text-ink-mute"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <text x={px(0)} y={10} fontSize="9" textAnchor="middle" className="fill-ink-mute">
        0
      </text>

      {/* The margin that belongs to a difference. */}
      <line x1={lo} y1={MID} x2={hi} y2={MID} stroke="currentColor" className="text-ink" strokeWidth={2} />
      {[lo, hi].map((x) => (
        <line
          key={x}
          x1={x}
          y1={MID - 7}
          x2={x}
          y2={MID + 7}
          stroke="currentColor"
          className="text-ink"
          strokeWidth={2}
        />
      ))}

      {/* The ruler the reader was given, drawn inside it for comparison. */}
      <line
        x1={innerLo}
        y1={MID + 18}
        x2={innerHi}
        y2={MID + 18}
        stroke="currentColor"
        className="text-ink-mute"
        strokeWidth={1.5}
      />
      {[innerLo, innerHi].map((x) => (
        <line
          key={x}
          x1={x}
          y1={MID + 13}
          x2={x}
          y2={MID + 23}
          stroke="currentColor"
          className="text-ink-mute"
          strokeWidth={1.5}
        />
      ))}

      {/* The lead itself. */}
      <circle cx={px(gap)} cy={MID} r={4} fill={colorFor(0)} />
      <text x={px(gap)} y={MID - 14} fontSize="10" textAnchor="middle" className="fill-ink" fontWeight="600">
        {gap.toFixed(1)}
      </text>
    </svg>
  );
}
