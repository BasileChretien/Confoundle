import { useT } from "../../app/i18n";
import type { InteractionData } from "../../puzzles/schema";
import { colorFor, WINNER_GOLD } from "./palette";
import { formatOR, interactionSummary } from "./interaction";

/**
 * Effect modification, drawn as a small forest plot on a log odds-ratio scale.
 *
 * `crude` (setup) shows the two ways of collapsing the third variable into one
 * number: the crude odds ratio and the Mantel-Haenszel adjusted one. They land
 * almost on top of each other, a little above 2, which is what makes the
 * exposure look like a modest, stable risk factor.
 *
 * `bystratum` (reveal) shows the odds ratio computed inside each stratum. They
 * fly apart, one near the no-effect line and one far to its right, and the crude
 * number is left stranded between them, describing neither. Same cells, two
 * framings. No sentences are assembled from fragments here; every word is an
 * authored, translated label, and the numbers are derived.
 */

const NEUTRAL = "#7E7159";
const AXIS = "#DCD2BC";

// Log axis bounds, wide enough to hold the no-effect line (1) and the extreme.
const MIN = 0.7;
const MAX = 6;
const L = Math.log(MIN);
const SPAN = Math.log(MAX) - L;
const pos = (or: number) =>
  Math.max(0, Math.min(1, (Math.log(or) - L) / SPAN)) * 100;

function Row({
  label,
  n,
  or,
  color,
  muted,
}: {
  label: string;
  n?: number;
  or: number;
  color: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center gap-2" style={{ opacity: muted ? 0.5 : 1 }}>
      <div className="w-[36%] shrink-0 text-right">
        <div className="text-[11px] font-semibold leading-tight text-ink">{label}</div>
        {n != null && (
          <div className="font-mono text-[10px] tabular-nums text-ink-mute">n = {n}</div>
        )}
      </div>
      <div className="relative h-7 flex-1">
        <span
          className="absolute inset-y-0 w-px"
          style={{ left: `${pos(1)}%`, backgroundColor: AXIS }}
          aria-hidden="true"
        />
        <span
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ left: `${pos(or)}%`, backgroundColor: color }}
        />
        <span
          className="absolute top-1/2 -translate-y-1/2 font-mono text-[11px] font-semibold tabular-nums text-ink"
          style={{ left: `calc(${pos(or)}% + 10px)` }}
        >
          {formatOR(or)}
        </span>
      </div>
    </div>
  );
}

function stratumN(st: {
  exposedCases: number;
  exposedControls: number;
  unexposedCases: number;
  unexposedControls: number;
}): number {
  return (
    st.exposedCases + st.exposedControls + st.unexposedCases + st.unexposedControls
  );
}

export function InteractionView({
  data,
  kind,
}: {
  data: InteractionData;
  kind: "crude" | "bystratum";
}) {
  const t = useT();
  const s = interactionSummary(data);
  const ticks = [1, 2, 4];

  return (
    <div className="flex flex-col gap-2">
      <div className="text-center font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {t(data.exposureLabel)}
      </div>

      <div className="flex flex-col gap-2">
        {kind === "crude" ? (
          <>
            <Row label={t(data.crudeLabel)} or={s.crudeOR} color={NEUTRAL} />
            <Row label={t(data.adjustedLabel)} or={s.adjustedOR} color={NEUTRAL} />
          </>
        ) : (
          <>
            {s.strata.map((st, i) => (
              <Row
                key={st.id}
                label={t(st.short ?? st.label)}
                n={stratumN(st)}
                or={st.or}
                color={colorFor(i)}
              />
            ))}
            <Row label={t(data.crudeLabel)} or={s.crudeOR} color={NEUTRAL} muted />
          </>
        )}
      </div>

      {/* log axis: ticks, and the no-effect line labelled */}
      <div className="flex items-start gap-2 pt-0.5">
        <div className="w-[36%] shrink-0" />
        <div className="relative h-8 flex-1">
          {ticks.map((tk) => (
            <span
              key={tk}
              className="absolute -translate-x-1/2 font-mono text-[10px] tabular-nums text-ink-mute"
              style={{ left: `${pos(tk)}%` }}
            >
              {tk}
            </span>
          ))}
          <span
            className="absolute max-w-[40%] -translate-x-1/2 text-center text-[9px] font-semibold uppercase leading-tight tracking-eyebrow"
            style={{ left: `${pos(1)}%`, top: "13px", color: WINNER_GOLD }}
          >
            {t(data.noEffectLabel)}
          </span>
        </div>
      </div>
    </div>
  );
}
