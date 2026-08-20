import { useState } from "react";
import { useLocale, useT } from "../../app/i18n";
import type { FrequenciesData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { colorFor } from "./palette";
import { mostAreReal, screenFrame, screenModel } from "./screen";

/**
 * What a positive result is worth, as something the reader causes.
 *
 * The test's two characteristics are held exactly as measured and never move.
 * The only thing the slider changes is how common the condition is among the
 * people tested, and the share of positives that are real swings from almost
 * none to almost all. Same test, opposite verdict, and the reader did it.
 *
 * IT IS OFFERED AFTER THE REVEAL AND SCORES NOTHING, so the hedge rule has no
 * purchase on it, which is why an unscored toy is the right place for this.
 *
 * THE FIXED ROWS ARE THE POINT, exactly as in the Simpson mixer. Showing only
 * the swinging percentage would look like a number being played with; showing
 * the two test characteristics beside it, visibly still, is what makes the
 * mechanism legible rather than a trick.
 *
 * IT KNOWS NOTHING ABOUT WHAT THE CONDITION IS. Every noun on screen comes from
 * the puzzle's own `conditionLabel` and `positiveLabel`, so a second screening
 * puzzle gets sentences about its own subject rather than about a disease.
 *
 * NO ANIMATION TO SUPPRESS. The reader is the animation, and the control is a
 * native range input, so arrow keys and a screen reader work without anything
 * being reimplemented.
 */
export function ScreenView({ full }: { full: FrequenciesData }) {
  const t = useT();
  const locale = useLocale();
  const model = screenModel(full);
  const [withCondition, setWithCondition] = useState(model.authoredWithCondition);

  const num = new Intl.NumberFormat(locale);
  const pct = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  /*
    A separate formatter for the characteristics, because 5% and 0.1% are both
    ordinary here and one decimal place is the difference between a test that
    fires on one person in a thousand and one that fires on one in ten.
  */
  const rate = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  });

  const frame = screenFrame(model, withCondition);
  const real = mostAreReal(model, withCondition);
  const positives = frame.truePositives + frame.falsePositives;
  const condition = t(full.conditionLabel);
  const positive = t(full.positiveLabel);
  /*
    `step` keeps the slider to a couple of hundred stops whatever the total, so
    dragging feels the same on a figure of 1,000 and one of 100,000 rather than
    demanding pixel precision on the second.
  */
  const step = Math.max(1, Math.round(model.total / 200));

  return (
    <div className="rounded-lg border border-rule bg-paper-2 p-3.5">
      <p className="mb-3 text-[13px] leading-snug text-ink-soft">
        {t({
          en: "The test keeps the two numbers it actually scored. The only thing that moves is how common the condition is among the people tested.",
        })}
      </p>

      <p className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {t({ en: "About the test, unchanged" })}
      </p>
      <ul className="mb-3 flex flex-col gap-1 text-[13px]">
        <li className="flex items-baseline justify-between gap-3">
          <span className="text-ink-soft">
            {fillSlots(t({ en: "Of the people who {condition}, it catches" }), {
              condition,
            })}
          </span>
          <span className="shrink-0 tabular-nums text-ink">
            {rate.format(model.sensitivity)}
          </span>
        </li>
        <li className="flex items-baseline justify-between gap-3">
          <span className="text-ink-soft">
            {fillSlots(t({ en: "Of the people who do not, it still says {positive}" }), {
              positive,
            })}
          </span>
          <span className="shrink-0 tabular-nums text-ink">
            {rate.format(model.falsePositiveRate)}
          </span>
        </li>
      </ul>

      <p className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {fillSlots(t({ en: "So, among the people who {positive}" }), { positive })}
      </p>
      {/*
        The bar is one row split in two rather than two rows, because the
        quantity in question is a SHARE OF THE POSITIVES and a reader should be
        able to see the split without comparing lengths across a gap.
      */}
      <div className="flex h-5 overflow-hidden rounded-[3px] bg-paper-3">
        {positives > 0 ? (
          <>
            <div
              style={{
                width: `${(frame.truePositives / positives) * 100}%`,
                backgroundColor: colorFor(0),
              }}
            />
            <div
              style={{
                width: `${(frame.falsePositives / positives) * 100}%`,
                backgroundColor: colorFor(1),
              }}
            />
          </>
        ) : null}
      </div>
      {/*
        A TEST HOOK, AND IT EARNS ITS KEEP. At the opening position the count
        with the condition, the count of true positives and the numeral 1 are
        the same character, so a numeral check searching the whole page finds
        it in the slider label and passes while this line prints anything at
        all. The attribute lets the guard read this element instead of the
        document.
      */}
      <p data-screen="share" className="mt-1.5 text-[13px] leading-snug text-ink">
        {frame.shareReal === null
          ? fillSlots(t({ en: "Nobody would {positive} at all." }), { positive })
          : fillSlots(
              t({
                en: "{share} of them really {condition}: {real} of {positives}.",
              }),
              {
                share: pct.format(frame.shareReal),
                condition,
                real: num.format(frame.truePositives),
                positives: num.format(positives),
              },
            )}
      </p>

      <label className="mt-3 block">
        <span className="mb-1 block font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {fillSlots(t({ en: "How many of the {total} {condition}" }), {
            total: num.format(model.total),
            condition,
          })}
        </span>
        <input
          type="range"
          min={0}
          max={model.total}
          step={step}
          value={withCondition}
          onChange={(e) => setWithCondition(Number(e.target.value))}
          aria-valuetext={fillSlots(
            t({ en: "{n} of the {total} {condition}" }),
            {
              n: num.format(frame.withCondition),
              total: num.format(model.total),
              condition,
            },
          )}
          className="w-full accent-brand focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        />
      </label>

      {/*
        The verdict, and it is a claim, so it comes from a tested function
        rather than from a comparison written here.

        THE REGION IS ALWAYS PRESENT so it can be a live one: swapped in and out
        of the DOM it would be announced by nothing, and a reader arrowing the
        slider would flip the answer without being told.
      */}
      <div aria-live="polite">
        {real !== null ? (
          <p className="mt-2 border-t border-rule pt-2 text-[13px] leading-snug text-ink">
            {real
              ? fillSlots(
                  t({ en: "Most of the people who {positive} really {condition}." }),
                  { positive, condition },
                )
              : fillSlots(
                  t({ en: "Most of the people who {positive} do not {condition}." }),
                  { positive, condition },
                )}
          </p>
        ) : null}
      </div>
    </div>
  );
}
