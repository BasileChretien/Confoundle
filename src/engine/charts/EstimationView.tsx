import { useT } from "../../app/i18n";
import type { EstimateGroup, EstimationData } from "../../puzzles/schema";
import { colorFor } from "./palette";
import { barFraction, formatValue } from "./estimation";

/**
 * Two groups estimating the same quantity, and the answer.
 *
 * `oneguess` shows a single group's estimate filling its own frame, which is
 * how a lone number always looks before you know what it should have been.
 * `withtruth` puts the other group's estimate beside it and the true value on
 * the same axis, at which point both guesses collapse into slivers. Nothing is
 * recomputed between the two views; only the thing they are measured against
 * changes, and that is the lesson.
 */
function Row({
  name,
  prompt,
  value,
  fraction,
  color,
  emphasis,
}: {
  name: string;
  prompt?: string;
  value: number;
  fraction: number;
  color: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 py-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span
          className={
            "min-w-0 truncate text-[12px] leading-snug " +
            (emphasis ? "font-semibold text-ink" : "text-ink")
          }
        >
          {name}
        </span>
        <span className="shrink-0 font-mono text-[13px] font-semibold tabular-nums text-ink">
          {formatValue(value)}
        </span>
      </div>
      {prompt ? (
        <div className="font-mono text-[11px] tabular-nums text-ink-soft">{prompt}</div>
      ) : null}
      <div className="h-4 w-full overflow-hidden rounded-[3px] bg-rule/50">
        <div
          className="h-full rounded-[3px]"
          style={{
            width: `${Math.max(fraction * 100, 0.6)}%`,
            backgroundColor: color,
          }}
          role="img"
          aria-label={`${name}: ${formatValue(value)}`}
        />
      </div>
    </div>
  );
}

export function EstimationView({
  data,
  kind,
}: {
  data: EstimationData;
  kind: "oneguess" | "withtruth";
}) {
  const t = useT();
  const againstTruth = kind === "withtruth";

  return (
    <div className="flex flex-col gap-1">
      <div className="rounded-md border border-rule bg-paper/50 px-2.5 py-1">
        {data.groups.map((g: EstimateGroup, i) => (
          <Row
            key={g.id}
            name={t(g.short ?? g.label)}
            prompt={t(g.promptText)}
            value={g.estimate}
            fraction={barFraction(g.estimate, data, againstTruth)}
            color={colorFor(i)}
          />
        ))}

        {againstTruth ? (
          <Row
            name={t(data.trueLabel)}
            value={data.trueValue}
            fraction={1}
            color={colorFor(3)}
            emphasis
          />
        ) : null}
      </div>

      <p className="text-[11px] leading-snug text-ink-mute">{t(data.statNote)}</p>
    </div>
  );
}
