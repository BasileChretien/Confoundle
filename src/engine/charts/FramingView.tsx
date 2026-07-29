import { useT } from "../../app/i18n";
import type { FramingData, FramingFrame } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { formatPercent, preferenceOf } from "./framing";

/**
 * One choice, put to people twice in different words.
 *
 * `onewording` shows a single version, which reads as an ordinary finding about
 * what people prefer. `bothwordings` sets the other version beside it, where the
 * majority has swapped sides without a single outcome changing. The bars are the
 * published shares; nothing is recomputed between the two views.
 */
function FrameBlock({
  frame,
  data,
  dim,
}: {
  frame: FramingFrame;
  data: FramingData;
  dim?: boolean;
}) {
  const t = useT();
  const winner = preferenceOf(frame);

  const Row = ({
    text,
    percent,
    which,
  }: {
    text: string;
    percent: number;
    which: "sure" | "gamble";
  }) => {
    const won = winner === which;
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-3">
          <span
            className={
              "text-[12px] leading-snug " + (won ? "font-semibold text-ink" : "text-ink-soft")
            }
          >
            {text}
          </span>
          <span className="shrink-0 font-mono text-[12px] font-semibold tabular-nums text-ink">
            {formatPercent(percent)}
          </span>
        </div>
        <div className="h-4 w-full overflow-hidden rounded-[3px] bg-rule/60">
          <div
            className="h-full rounded-[3px]"
            style={{
              width: `${percent}%`,
              backgroundColor: colorFor(which === "sure" ? 0 : 1),
              opacity: dim ? 0.55 : 1,
            }}
            role="img"
            aria-label={`${text}: ${formatPercent(percent)}`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-md border border-rule bg-paper/50 p-2.5">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-soft">
          {t(frame.short ?? frame.label)}
        </span>
        <span className="font-mono text-[10px] tabular-nums text-ink-mute">
          n = {frame.n}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Row text={t(frame.sureText)} percent={frame.surePercent} which="sure" />
        <Row text={t(frame.gambleText)} percent={frame.gamblePercent} which="gamble" />
      </div>
      <div className="mt-1.5 font-sans text-[10px] uppercase tracking-eyebrow text-ink-mute">
        {t(winner === "sure" ? data.sureLabel : data.gambleLabel)}
      </div>
    </div>
  );
}

export function FramingView({
  data,
  kind,
}: {
  data: FramingData;
  kind: "onewording" | "bothwordings";
}) {
  const t = useT();
  const shown = kind === "onewording" ? data.frames.slice(0, 1) : data.frames;

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] leading-snug text-ink-soft">{t(data.stakeLabel)}</p>

      <div className={kind === "bothwordings" ? "grid grid-cols-2 gap-2" : "grid grid-cols-1"}>
        {shown.map((f) => (
          <FrameBlock key={f.id} frame={f} data={data} />
        ))}
      </div>

      <p className="text-[11px] leading-snug text-ink-mute">{t(data.percentNote)}</p>
    </div>
  );
}
