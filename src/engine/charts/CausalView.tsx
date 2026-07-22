import type { CausalData, DataViewKind } from "../../puzzles/schema";
import { useT } from "../../app/i18n";

const TEAL = "#0E8C7A";
const RULE = "#D6C9AE";
const GOLD = "#9A6B12";

// A handful of points sitting near the rising trend line.
const SCATTER: ReadonlyArray<readonly [number, number]> = [
  [40, 92],
  [72, 84],
  [104, 74],
  [140, 64],
  [176, 52],
  [214, 40],
  [252, 30],
];

/** Setup view: the observed correlation, X and Y rising together. */
function TrendView({ data }: { data: CausalData }) {
  const t = useT();
  return (
    <div className="flex flex-col gap-1.5">
      <div className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
        ↑ {t(data.effect)}
      </div>
      <svg
        viewBox="0 0 290 116"
        width="100%"
        role="img"
        aria-label={`${t(data.cause)} and ${t(data.effect)} rise together`}
        className="block"
      >
        <line x1="6" y1="6" x2="6" y2="108" stroke={RULE} strokeWidth="1.5" />
        <line x1="6" y1="108" x2="286" y2="108" stroke={RULE} strokeWidth="1.5" />
        <line
          x1="22"
          y1="96"
          x2="272"
          y2="20"
          stroke={TEAL}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {SCATTER.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill={TEAL} />
        ))}
      </svg>
      <div className="flex items-center justify-between font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
        <span>{t(data.cause)} →</span>
        {data.correlationNote ? (
          <span className="tabular-nums text-ink">{t(data.correlationNote)}</span>
        ) : null}
      </div>
    </div>
  );
}

/** Reveal view: the common cause driving both, X ← Z → Y, with no direct link. */
function CausalDiagram({ data }: { data: CausalData }) {
  const t = useT();
  const pill =
    "rounded-lg border px-3 py-1.5 text-center text-[13px] font-semibold leading-tight";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`${pill} border-gold/50 bg-gold/15 text-ink`}>
        {t(data.commonCause)}
      </div>
      <div
        className="flex justify-center gap-12 text-lg leading-none"
        style={{ color: GOLD }}
        aria-hidden="true"
      >
        <span>↙</span>
        <span>↘</span>
      </div>
      <div className="flex w-full max-w-[18rem] items-stretch justify-center gap-3">
        <div className={`${pill} flex-1 border-rule bg-paper text-ink`}>
          {t(data.cause)}
        </div>
        <div className={`${pill} flex-1 border-rule bg-paper text-ink`}>
          {t(data.effect)}
        </div>
      </div>
      <div className="mt-0.5 flex items-center gap-2 text-[11px] font-semibold text-rust-ink">
        <span className="inline-block w-8 border-t border-dashed border-rust-ink/60" />
        ✗ no direct link
        <span className="inline-block w-8 border-t border-dashed border-rust-ink/60" />
      </div>
    </div>
  );
}

export function CausalView({
  data,
  view,
}: {
  data: CausalData;
  view: DataViewKind;
  animate?: boolean;
}) {
  if (view === "cause") return <CausalDiagram data={data} />;
  return <TrendView data={data} />;
}
