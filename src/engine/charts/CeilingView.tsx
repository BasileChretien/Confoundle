import { useT } from "../../app/i18n";
import type { CeilingData } from "../../puzzles/schema";
import { colorFor, WINNER_GOLD } from "./palette";
import { ceilingCurves, differenceCurve } from "./ceiling";

/**
 * An effect measured across a scale, drawn twice.
 *
 * `thedifference` draws only the gap between the two arms, bin by bin, scaled
 * against its own peak. It reads the way the finding was read for years: an
 * inverted U, near nothing at either end, and the obvious conclusion is that
 * whatever is being measured cannot reach the extremes.
 *
 * `bothcurves` throws that away and draws the two arms it was subtracted from,
 * on the outcome's own axis with the floor and the ceiling ruled across it.
 * Nothing is recomputed; the second picture is the first one's arithmetic
 * undone, and it shows why the gap had nowhere to open at either end. The
 * published peak of the fitted effect is drawn on the axis with its interval,
 * against the point where a constant effect would have peaked.
 */
const W = 320;
const H = 172;
const PAD_X = 10;
const PAD_TOP = 12;
/**
 * Deep, because the reveal hangs the peak's interval BELOW the floor rather
 * than on the plot. Putting it inside the frame would have it cross the two
 * curves, and the one thing it must not look like is a third series.
 */
const PAD_BOTTOM = 46;

const px = (x: number) => PAD_X + x * (W - PAD_X * 2);
const py = (y: number) => PAD_TOP + (1 - y) * (H - PAD_TOP - PAD_BOTTOM);
const FLOOR_Y = py(0);
const CEIL_Y = py(1);

export function CeilingView({
  data,
  kind,
}: {
  data: CeilingData;
  kind: "thedifference" | "bothcurves";
}) {
  const t = useT();
  return (
    <div className="flex flex-col gap-2.5">
      {kind === "bothcurves" ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {data.arms.map((arm, i) => (
            <span
              key={arm.id}
              className="flex items-center gap-1.5 text-[10px] leading-none text-ink-soft"
            >
              <span
                className="h-2 w-2 rounded-[1px]"
                style={{ backgroundColor: colorFor(i) }}
                aria-hidden="true"
              />
              {t(arm.short ?? arm.label)}
            </span>
          ))}
        </div>
      ) : null}

      <div className="rounded-md border border-rule bg-paper/50 px-1 py-1">
        {kind === "thedifference" ? (
          <Difference data={data} />
        ) : (
          <Curves data={data} />
        )}
      </div>

      <p className="text-[11px] leading-snug text-ink-soft">
        {t(kind === "thedifference" ? data.differenceLabel : data.metricLabel)}
      </p>

      {/*
        The two gold marks hanging below the floor carry the whole verdict, and
        an unlabelled bracket reads as decoration. They are named here rather
        than inside the SVG because at 320 wide the words would land on top of
        the bin labels, and because a caption that wraps beats one that clips.
      */}
      {kind === "bothcurves" ? (
        <div className="flex flex-col gap-1">
          <span className="flex items-start gap-1.5 text-[11px] leading-snug text-ink-soft">
            <span
              className="mt-1 h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: WINNER_GOLD }}
              aria-hidden="true"
            />
            {t(data.peak.label)}
          </span>
          <span className="flex items-start gap-1.5 text-[11px] leading-snug text-ink-soft">
            <span
              className="mt-[7px] h-0 w-2 shrink-0 border-t border-dashed"
              style={{ borderColor: WINNER_GOLD }}
              aria-hidden="true"
            />
            {t(data.neutralLabel)}
          </span>
        </div>
      ) : null}

      <p className="text-[11px] leading-snug text-ink-mute">{t(data.statNote)}</p>
    </div>
  );
}

/** The axis every beat shares: the scale the bins were sorted onto. */
function AxisEnds({ data }: { data: CeilingData }) {
  const t = useT();
  const first = data.bins[0];
  const last = data.bins[data.bins.length - 1];
  return (
    <>
      <text x={PAD_X} y={H - 16} fontSize="9" className="fill-ink-mute">
        {t(first.short ?? first.label)}
      </text>
      <text
        x={W - PAD_X}
        y={H - 16}
        fontSize="9"
        textAnchor="end"
        className="fill-ink-mute"
      >
        {t(last.short ?? last.label)}
      </text>
      <text
        x={W / 2}
        y={H - 4}
        fontSize="9"
        textAnchor="middle"
        className="fill-ink-mute"
      >
        {t(data.axis.label)}
      </text>
    </>
  );
}

function Difference({ data }: { data: CeilingData }) {
  const t = useT();
  const points = differenceCurve(data);
  const path = points
    .map((d, i) => `${i === 0 ? "M" : "L"}${px(d.x).toFixed(1)} ${py(d.y).toFixed(1)}`)
    .join("");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label={t(data.differenceLabel)}
    >
      {/* Zero: no difference between the arms at all. */}
      <line
        x1={PAD_X}
        y1={FLOOR_Y}
        x2={W - PAD_X}
        y2={FLOOR_Y}
        stroke="currentColor"
        className="text-rule"
        strokeWidth={1}
      />
      <path
        d={path}
        fill="none"
        stroke={colorFor(1)}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {points.map((d) => (
        <circle key={d.binId} cx={px(d.x)} cy={py(d.y)} r={2.5} fill={colorFor(1)} />
      ))}
      <AxisEnds data={data} />
    </svg>
  );
}

function Curves({ data }: { data: CeilingData }) {
  const t = useT();
  const curves = ceilingCurves(data);
  const neutralX = px(
    (data.neutralPoint - data.axis.min) / (data.axis.max - data.axis.min),
  );
  const onAxis = (v: number) =>
    px((v - data.axis.min) / (data.axis.max - data.axis.min));
  const peakX = onAxis(data.peak.at);
  const lowX = onAxis(data.peak.low);
  const highX = onAxis(data.peak.high);
  const RULE = 18; // where the peak's interval is drawn, below the floor

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label={t(data.metricLabel)}
    >
      {/* The ceiling, which is the whole point: nothing can be drawn above it. */}
      <line
        x1={PAD_X}
        y1={CEIL_Y}
        x2={W - PAD_X}
        y2={CEIL_Y}
        stroke="currentColor"
        className="text-ink-mute"
        strokeWidth={1}
        strokeDasharray="4 3"
      />
      <text x={PAD_X} y={CEIL_Y - 3} fontSize="9" className="fill-ink-mute">
        {t(data.bounds.maxLabel)}
      </text>

      {/* And the floor. */}
      <line
        x1={PAD_X}
        y1={FLOOR_Y}
        x2={W - PAD_X}
        y2={FLOOR_Y}
        stroke="currentColor"
        className="text-ink-mute"
        strokeWidth={1}
        strokeDasharray="4 3"
      />
      <text x={PAD_X} y={FLOOR_Y + 9} fontSize="9" className="fill-ink-mute">
        {t(data.bounds.minLabel)}
      </text>

      {/* Where a constant effect would have peaked. */}
      <line
        x1={neutralX}
        y1={CEIL_Y}
        x2={neutralX}
        y2={FLOOR_Y + RULE}
        stroke={WINNER_GOLD}
        strokeWidth={1}
        strokeDasharray="3 3"
      />

      {curves.map((c, i) => (
        <g key={c.armId}>
          <path
            d={c.points
              .map(
                (p, j) =>
                  `${j === 0 ? "M" : "L"}${px(p.x).toFixed(1)} ${py(p.y).toFixed(1)}`,
              )
              .join("")}
            fill="none"
            stroke={colorFor(i)}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          {c.points.map((p) => (
            <circle key={p.binId} cx={px(p.x)} cy={py(p.y)} r={2.5} fill={colorFor(i)} />
          ))}
        </g>
      ))}

      {/* The measured peak, with its interval, on the axis it was located on. */}
      <line
        x1={lowX}
        y1={FLOOR_Y + RULE}
        x2={highX}
        y2={FLOOR_Y + RULE}
        stroke={WINNER_GOLD}
        strokeWidth={2}
      />
      {[lowX, highX].map((x) => (
        <line
          key={x}
          x1={x}
          y1={FLOOR_Y + RULE - 4}
          x2={x}
          y2={FLOOR_Y + RULE + 4}
          stroke={WINNER_GOLD}
          strokeWidth={2}
        />
      ))}
      <circle cx={peakX} cy={FLOOR_Y + RULE} r={3} fill={WINNER_GOLD} />

      <AxisEnds data={data} />
    </svg>
  );
}
