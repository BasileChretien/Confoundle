import { useT } from "../../app/i18n";
import type { DoseData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { formatMean, points } from "./dose";

/**
 * One outcome measured at several doses.
 *
 * `endpoints` draws only the two ends, which join into a straight line and read
 * as a steady climb, because two points can only ever be a straight line.
 * `curve` adds the doses in between and the climb turns out to have happened
 * almost entirely at the start. Nothing is recomputed between the two views.
 *
 * Points sit at x proportional to the DOSE (see ./dose.ts). That is the whole
 * honesty of the figure: evenly spacing unevenly spaced doses would flatten the
 * front-loading into a straight line, which is the distortion the
 * misleading-axis lesson is about.
 */
const W = 300;
const H = 150;
const PAD = { left: 26, right: 10, top: 10, bottom: 26 };

export function DoseView({
  data,
  kind,
}: {
  data: DoseData;
  kind: "partial" | "curve";
}) {
  const t = useT();
  const pts = points(data);

  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const px = (x: number) => PAD.left + x * innerW;
  const py = (y: number) => PAD.top + (1 - y) * innerH;

  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${px(p.x)},${py(p.y)}`).join(" ");

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] leading-snug text-ink-soft">{t(data.outcomeLabel)}</p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={pts
          .map((p) => `${t(p.step.short ?? p.step.label)}: ${formatMean(p.step.mean)}`)
          .join("; ")}
        style={{ display: "block", width: "100%" }}
      >
        {/* the scale, stated rather than implied */}
        <line
          x1={PAD.left}
          y1={PAD.top}
          x2={PAD.left}
          y2={H - PAD.bottom}
          stroke="currentColor"
          strokeWidth={1}
          className="text-rule"
        />
        <line
          x1={PAD.left}
          y1={H - PAD.bottom}
          x2={W - PAD.right}
          y2={H - PAD.bottom}
          stroke="currentColor"
          strokeWidth={1}
          className="text-rule"
        />
        <text x={PAD.left - 4} y={PAD.top + 4} fontSize={8} textAnchor="end" className="fill-ink-mute">
          {data.scaleMax}
        </text>
        <text
          x={PAD.left - 4}
          y={H - PAD.bottom}
          fontSize={8}
          textAnchor="end"
          className="fill-ink-mute"
        >
          {data.scaleMin}
        </text>

        <path d={path} fill="none" stroke={colorFor(0)} strokeWidth={2} strokeLinejoin="round" />

        {pts.map((p) => (
          <g key={p.step.id}>
            <circle cx={px(p.x)} cy={py(p.y)} r={3.5} fill={colorFor(0)} />
            <text
              x={px(p.x)}
              y={py(p.y) - 7}
              fontSize={8}
              textAnchor="middle"
              className="fill-ink"
              style={{ fontWeight: 600 }}
            >
              {formatMean(p.step.mean)}
            </text>
            <text
              x={px(p.x)}
              y={H - PAD.bottom + 11}
              fontSize={8}
              textAnchor="middle"
              className="fill-ink-mute"
            >
              {p.step.dose}
            </text>
          </g>
        ))}

        <text
          x={PAD.left + innerW / 2}
          y={H - 3}
          fontSize={8}
          textAnchor="middle"
          className="fill-ink-soft"
        >
          {t(data.doseLabel)}
        </text>
      </svg>

      <p className="text-[11px] leading-snug text-ink-mute">
        {kind === "curve" ? t(data.meansNote) : t(data.sampleLabel)}
      </p>
    </div>
  );
}
