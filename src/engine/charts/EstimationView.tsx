import { useLocale, useT } from "../../app/i18n";
import type { EstimateGroup, EstimationData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { colorFor, declaredColors } from "./palette";
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
  locale,
}: {
  name: string;
  prompt?: string;
  value: number;
  fraction: number;
  color: string;
  emphasis?: boolean;
  /**
   * Passed down rather than read here, because the CALLER already resolved it
   * and threading it keeps one source for the number formatting. `useT()` below
   * is a different matter: this is a component, so it may hold hooks, and the
   * announced sentence has to come from the dictionaries rather than be built
   * here.
   */
  locale: string;
}) {
  const t = useT();
  /**
   * An authored sentence, not a template literal.
   *
   * This line used to read `` `${name}: ${formatValue(value, locale)}` ``,
   * which localised the VALUE and left the sentence around it in English
   * punctuation: the digits followed the reader and the ": " between them did
   * not. That is the half-converted state this whole change argues against,
   * one layer further down, and it is the layer no rendering test can see,
   * because an `aria-label` is not drawn.
   *
   * `EcologicalView` announces its equivalent bar exactly this way. Japanese
   * and Chinese write the colon as a fullwidth "：" with no space before it,
   * which no hardcoded separator could have produced.
   */
  const announced = fillSlots(t({ en: "{name}: {value}" }), {
    name,
    value: formatValue(value, locale),
  });
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
          {formatValue(value, locale)}
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
          aria-label={announced}
        />
      </div>
    </div>
  );
}

export function EstimationView({
  data,
  full,
  kind,
}: {
  data: EstimationData;
  /**
   * The UNRESTRICTED data, for colour only. `restrictEstimation` filters
   * `groups`, so a group's position in `data.groups` is a property of the beat
   * rather than of the puzzle. See `declaredColors`.
   */
  full: EstimationData;
  kind: "oneguess" | "withtruth";
}) {
  const t = useT();
  const locale = useLocale();
  const againstTruth = kind === "withtruth";
  const colorOf = declaredColors(full.groups);

  return (
    <div className="flex flex-col gap-1">
      <div className="rounded-md border border-rule bg-paper/50 px-2.5 py-1">
        {data.groups.map((g: EstimateGroup) => (
          <Row
            key={g.id}
            name={t(g.short ?? g.label)}
            prompt={t(g.promptText)}
            value={g.estimate}
            fraction={barFraction(g.estimate, data, againstTruth)}
            color={colorOf(g.id)}
            locale={locale}
          />
        ))}

        {againstTruth ? (
          <Row
            name={t(data.trueLabel)}
            value={data.trueValue}
            fraction={1}
            color={colorFor(3)}
            emphasis
            locale={locale}
          />
        ) : null}
      </div>

      <p className="text-[11px] leading-snug text-ink-mute">{t(data.statNote)}</p>
    </div>
  );
}
