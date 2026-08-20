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
    ONE PERSON PER STOP, and the obvious optimisation here is a bug.

    Keeping the slider to a couple of hundred stops, `total / 200`, gives 5 on
    a figure of 1,000 and reads sensibly. It also puts the AUTHORED BASE RATE
    off the grid: 1 in 1,000 is not a multiple of 5, so the browser drew the
    thumb at 0 while the figure said 1, and the published study became a
    position the reader could not return to once they had moved. The opening
    state is the only place on this slider that is a measurement rather than a
    what-if, so making it unreachable is the one thing the control must not do.

    A person is the unit the figure counts in, so a person is the step. Found by
    dragging it; nothing in the tests could see it, because they read the value
    React holds and the browser is what snaps it.
  */
  const step = 1;

  return (
    <div className="rounded-lg border border-rule bg-paper-2 p-3.5">
      <p className="mb-3 text-[13px] leading-snug text-ink-soft">
        {t({
          en: "The test keeps the two numbers it actually scored. The only thing that moves is the mix of people it is pointed at.",
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
            {t({ en: "Of the people who do not, it still flags" })}
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
        ONE LIVE REGION AROUND EVERYTHING THAT MOVES, and the share was
        outside it. `aria-live` wrapped only the verdict, so arrowing the
        slider announced "1 of 1,000 ... 500 of 1,000" and, once, "More than
        half of them have the disease" -- and never the 2% to 95% swing, which
        is the entire point of the toy. The bar and the sentence and the
        verdict are one reading, so they are one region.
      */}
      <div aria-live="polite">
        {/*
          The bar is one row split in two rather than two rows, because the
          quantity in question is a SHARE OF THE POSITIVES and a reader should
          be able to see the split without comparing lengths across a gap.

          HIDDEN FROM ASSISTIVE TECHNOLOGY, because colour is the only thing
          distinguishing its two segments and the sentence below says the same
          in words. Announcing two unlabelled boxes would add nothing.
        */}
        <div
          className="flex h-5 overflow-hidden rounded-[3px] bg-paper-3"
          aria-hidden="true"
        >
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
            ? t({ en: "Nobody tests positive at all." })
            : fillSlots(
                t({
                  en: "{share} of them {condition}: {real} of {positives}.",
                }),
                {
                  share: pct.format(frame.shareReal),
                  condition,
                  real: num.format(frame.truePositives),
                  positives: num.format(positives),
                },
              )}
        </p>
      </div>

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
            t({ en: "{n} of {total}" }),
            {
              n: num.format(frame.withCondition),
              total: num.format(model.total),
            },
          )}
          className="w-full accent-brand focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        />
      </label>

      {/*
        THE WAY BACK TO THE ONE POSITION THAT IS A MEASUREMENT.

        Two problems, and they are the same problem. Nothing on screen said
        WHICH position is the study, so a reader who dragged had no way to know
        the figure had stopped being real; and with a thousand stops across a
        phone's width, one person is about a third of a pixel, so even a reader
        who knew could not get back. Values 0 to 3 all live inside the first
        pixel. Keyboard users could always do it with Home; nobody else could.

        A button naming the measured base rate answers both at once: it marks
        the position by printing it, and pressing it returns. Naming the number
        is the half that also teaches, because "1 in 1,000" is the fact the
        whole puzzle turns on and it was nowhere in this panel.

        Not disabled at the study, deliberately. A control that vanishes or
        greys out exactly when it is telling the truth stops being a label at
        the moment it is most worth reading.
      */}
      <button
        type="button"
        onClick={() => setWithCondition(model.authoredWithCondition)}
        className="mt-1.5 rounded-sm text-[12px] leading-snug text-ink-mute underline decoration-rule underline-offset-2 hover:text-ink-soft focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
      >
        {fillSlots(t({ en: "Back to the measured {n} in {total}" }), {
          n: num.format(model.authoredWithCondition),
          total: num.format(model.total),
        })}
      </button>

      {/*
        The verdict, and it is a claim, so it comes from a tested function
        rather than from a comparison written here. It sits in the same live
        region as the share above, because they are one reading: the number,
        then what the number means.
      */}
      <div aria-live="polite">
        {real !== null ? (
          <p className="mt-2 border-t border-rule pt-2 text-[13px] leading-snug text-ink">
            {real
              ? fillSlots(
                  t({ en: "More than half of them {condition}." }),
                  { condition },
                )
              : fillSlots(
                  t({ en: "Fewer than half of them {condition}." }),
                  { condition },
                )}
          </p>
        ) : null}
      </div>
    </div>
  );
}
