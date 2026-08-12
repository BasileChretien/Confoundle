import { useT } from "../../app/i18n";
import type { SalienceComparison, SalienceData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { colorFor } from "./palette";
import { formatRatio, formatShare, shareFor } from "./salience";

/**
 * Head-to-head comparisons, and how the answers split.
 *
 * `asguessed` draws each comparison as one split bar with no verdict on it at
 * all, which is exactly what a survey result looks like before anybody checks
 * it against the world: you can see what people believe and nothing about
 * whether they are right. `againstfact` keeps the identical bars and adds the
 * verdict, ticking the side that actually happens more often and printing by
 * how much. No share is recomputed between the two views; only the knowledge of
 * which side was right arrives, and that is the lesson.
 *
 * Every string DRAWN here comes from the puzzle's own data, so the view owns no
 * visible text of its own. It does own the two sentences it announces to a
 * screen reader, which is a different thing and was missed for exactly that
 * reason: nothing on screen was in English, so nothing looked wrong.
 */
function Comparison({
  c,
  showTruth,
  index,
}: {
  c: SalienceComparison;
  showTruth: boolean;
  index: number;
}) {
  const t = useT();
  const shareA = shareFor(c, "a");
  const shareB = shareFor(c, "b");
  const colorA = colorFor(index * 2);
  const colorB = colorFor(index * 2 + 1);
  const commonerLabel = t(c.commoner === "a" ? c.optionA : c.optionB);

  const side = (which: "a" | "b", share: number, alignEnd: boolean) => {
    const isCommoner = showTruth && c.commoner === which;
    return (
      <div
        className={
          "flex min-w-0 flex-1 flex-col gap-0.5 " +
          (alignEnd ? "items-end text-right" : "items-start")
        }
      >
        <span
          className={
            "min-w-0 truncate text-[12px] leading-snug " +
            (isCommoner ? "font-semibold text-ink" : "text-ink")
          }
        >
          {isCommoner ? "✓ " : ""}
          {t(which === "a" ? c.optionA : c.optionB)}
        </span>
        <span className="font-mono text-[13px] font-semibold tabular-nums text-ink">
          {formatShare(share)}
        </span>
      </div>
    );
  };

  // Both beats, not just the reveal. Only the reveal was announcing English,
  // but the reveal sentence CONTAINS the setup one, so translating one and not
  // the other would have the same bar announce a Latin comma at the setup and a
  // fullwidth one at the reveal. The setup key looks like punctuation because
  // that is exactly what it is, and punctuation is not spelled the same in all
  // ten: Arabic separates on "،" and Chinese on "，".
  const label = fillSlots(
    t(
      showTruth
        ? {
            en: "{optiona} {sharea}, {optionb} {shareb}. {commoner} is {ratio} times commoner.",
          }
        : { en: "{optiona} {sharea}, {optionb} {shareb}" },
    ),
    {
      optiona: t(c.optionA),
      sharea: formatShare(shareA),
      optionb: t(c.optionB),
      shareb: formatShare(shareB),
      commoner: commonerLabel,
      ratio: formatRatio(c.trueRatio),
    },
  );

  return (
    <div className="flex flex-col gap-1.5 py-2.5">
      <div className="flex items-start justify-between gap-3">
        {side("a", shareA, false)}
        {side("b", shareB, true)}
      </div>
      <div
        className="flex h-4 w-full overflow-hidden rounded-[3px] bg-rule/50"
        role="img"
        aria-label={label}
      >
        <div
          className="h-full"
          style={{ width: `${shareA}%`, backgroundColor: colorA }}
        />
        <div
          className="h-full"
          style={{ width: `${shareB}%`, backgroundColor: colorB }}
        />
      </div>
      {showTruth ? (
        <div className="font-mono text-[11px] tabular-nums leading-snug text-ink-soft">
          {commonerLabel} ×{formatRatio(c.trueRatio)}
        </div>
      ) : null}
    </div>
  );
}

export function SalienceView({
  data,
  kind,
}: {
  data: SalienceData;
  kind: "asguessed" | "againstfact";
}) {
  const t = useT();
  const showTruth = kind === "againstfact";
  return (
    // The engine already draws the figure title and scope tag around this, so
    // the view owns only the rows and the two notes.
    <div className="w-full">
      <p className="mb-1 text-[11px] leading-snug text-ink-soft">
        {t(showTruth ? data.truthLabel : data.splitLabel)}
      </p>
      <div className="divide-y divide-rule/60">
        {data.comparisons.map((c, i) => (
          <Comparison key={c.id} c={c} showTruth={showTruth} index={i} />
        ))}
      </div>
      <p className="mt-2 text-[11px] leading-snug text-ink-soft">
        {t(data.statNote)}
      </p>
    </div>
  );
}
