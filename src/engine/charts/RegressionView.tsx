import { useT } from "../../app/i18n";
import type { RegressionData } from "../../puzzles/schema";
import { colorFor, WINNER_GOLD } from "./palette";
import { regressionRows, type RegressionRow } from "./regression";

/**
 * Regression to the mean, drawn on one vertical scale.
 *
 * `extremes` (setup) shows only where each selected group started: the tallest
 * parents high up, the shortest low down, against the population average. That is
 * all you would have to go on, and it invites the wrong prediction that the
 * children stay just as extreme.
 *
 * `reversion` (reveal) adds where each group landed on the second measurement,
 * with an arrow from the first mark to the second. Every arrow points inward,
 * toward the average line, because a group picked for being extreme drifts back
 * toward the middle on its own. Same scale, two framings.
 */

const FIRST = colorFor(0); // teal, the selected-on measurement
const SECOND = colorFor(1); // rust, where they landed
const AXIS = "#DCD2BC";

const W = 320;
const TOP = 18;
const BOTTOM = 150;
const PLOT = BOTTOM - TOP;

function num(x: number): string {
  const r = Math.round(x * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
}

export function RegressionView({
  data,
  kind,
}: {
  data: RegressionData;
  kind: "extremes" | "reversion";
}) {
  const t = useT();
  const rows = regressionRows(data);
  const showSecond = kind === "reversion";

  const yFor = (pos: number) => BOTTOM - pos * PLOT;
  const centerX = (i: number) => ((i + 0.5) / rows.length) * W;
  const meanY = yFor((data.mean - data.axisMin) / (data.axisMax - data.axisMin));

  return (
    <div className="flex flex-col gap-2">
      <svg
        viewBox={`0 0 ${W} 168`}
        role="img"
        aria-label={rows
          .map(
            (r) =>
              `${t(r.short ?? r.label)}: first ${num(r.first)}, ` +
              (showSecond ? `then ${num(r.second)}, ` : "") +
              `against an average of ${num(data.mean)}`,
          )
          .join("; ")}
        style={{ display: "block", width: "100%" }}
      >
        {/* the average line, the level everything reverts toward */}
        <line
          x1={0}
          x2={W}
          y1={meanY}
          y2={meanY}
          stroke={WINNER_GOLD}
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        <text x={4} y={meanY - 4} fontSize={11} fill={WINNER_GOLD} fontWeight={600}>
          {num(data.mean)}
        </text>

        {rows.map((r: RegressionRow, i) => {
          const x = centerX(i);
          const y1 = yFor(r.firstPos);
          const y2 = yFor(r.secondPos);
          const firstDim = showSecond ? 0.45 : 1;
          return (
            <g key={r.id}>
              {/* faint guide for the column */}
              <line x1={x} x2={x} y1={TOP} y2={BOTTOM} stroke={AXIS} strokeWidth={1} />

              {showSecond && (
                <line
                  x1={x}
                  x2={x}
                  y1={y1}
                  y2={y2}
                  stroke={SECOND}
                  strokeWidth={2.5}
                />
              )}

              {/* first measurement */}
              <circle cx={x} cy={y1} r={6} fill={FIRST} opacity={firstDim} />
              <text
                x={x + 11}
                y={y1 + 4}
                fontSize={12}
                fill="currentColor"
                opacity={firstDim}
                className="text-ink"
              >
                {num(r.first)}
              </text>

              {showSecond && (
                <>
                  <circle cx={x} cy={y2} r={6} fill={SECOND} />
                  <text
                    x={x + 11}
                    y={y2 + 4}
                    fontSize={12}
                    fontWeight={600}
                    fill="currentColor"
                    className="text-ink"
                  >
                    {num(r.second)}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* group labels under each column */}
      <div className="flex">
        {rows.map((r) => (
          <div key={r.id} className="flex-1 text-center">
            <div className="text-[12px] font-semibold text-ink">
              {t(r.short ?? r.label)}
            </div>
            {r.n != null && (
              <div className="font-mono text-[11px] tabular-nums text-ink-mute">
                n = {r.n}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-0.5">
        <Swatch color={FIRST} label={t(data.firstLabel)} />
        {showSecond && <Swatch color={SECOND} label={t(data.secondLabel)} />}
        <Swatch color={WINNER_GOLD} label={`${t(data.meanLabel)} (${num(data.mean)} ${t(data.unit)})`} dashed />
      </div>
    </div>
  );
}

function Swatch({
  color,
  label,
  dashed,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="h-2.5 w-2.5 rounded-[2px]"
        style={{
          backgroundColor: dashed ? "transparent" : color,
          border: dashed ? `2px dashed ${color}` : undefined,
        }}
        aria-hidden="true"
      />
      <span className="text-[11px] text-ink-soft">{label}</span>
    </span>
  );
}
