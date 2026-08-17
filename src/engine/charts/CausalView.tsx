import type { CausalData, DataViewKind } from "../../puzzles/schema";
import { useT } from "../../app/i18n";
import { fillSlots } from "./announce";

const TEAL = "#0E8C7A";
const RULE = "#D6C9AE";
const GOLD = "#9A6B12";

/*
  THIS FIGURE DRAWS A LINE AND NO POINTS, AND THAT IS THE WHOLE POINT.

  It used to scatter seven hardcoded coordinates along the trend, under a
  comment calling them "a handful of points sitting near the rising trend
  line". They were invented. Nothing on the figure said so, the aria-label said
  only that the two quantities "rise together", and on a deck whose stated
  position is that every number is read off a source table they were the one
  set of numbers nobody sourced. A reader had no way to tell them from the
  measured counts every other shape draws.

  Annotating them would not have been enough: dots on a chart read as
  observations no matter what the caption says, which is why the fix is
  removal rather than a disclaimer. The slope carries the correlation, which
  is the only thing the source actually published, and `schematicNote` now
  says that in the reader's own language.
*/

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
        aria-label={fillSlots(t({ en: "{cause} and {effect} rise together" }), {
          cause: t(data.cause),
          effect: t(data.effect),
        })}
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
      </svg>
      <div className="flex items-center justify-between font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
        <span>{t(data.cause)} →</span>
        {data.correlationNote ? (
          <span className="tabular-nums text-ink">{t(data.correlationNote)}</span>
        ) : null}
      </div>
      <p className="text-[11px] leading-snug text-ink-mute">
        {t(data.schematicNote)}
      </p>
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
        ✗ {t({ en: "no direct link" })}
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
