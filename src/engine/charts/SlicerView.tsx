import { useState } from "react";
import { useLocale, useT } from "../../app/i18n";
import type { RatesData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { declaredColors } from "./palette";
import {
  MAX_SLICES,
  contraryCount,
  sliceFrame,
  slicerModel,
} from "./subgroups";

/**
 * Multiplicity as something the reader does, rather than reads about.
 *
 * The trial's own result is held exactly as measured and never moves. The
 * reader chooses how many ways to cut the patients up, and watches subgroups
 * appear in which the treatment looks useless, or harmful. Nothing about the
 * treatment changed. They cut the same data more ways.
 *
 * EVERY SUBGROUP IS REAL PATIENTS. `sliceFrame` deals the trial's own people,
 * each carrying the outcome they actually had; the only invented thing is
 * which handful they landed in, and the panel says so in as many words. That
 * is the difference between this and a simulation, and it is the reason the
 * counts always add back up to the published totals.
 *
 * IT IS OFFERED AFTER THE REVEAL AND SCORES NOTHING, so the hedge rule has no
 * purchase on it.
 *
 * IT KNOWS NOTHING ABOUT ASPIRIN. Every name on screen comes from the puzzle's
 * own group labels, and which direction counts as better comes from its
 * `higherIsBetter`, so a second randomised trial gets sentences about itself.
 */
export function SlicerView({ full }: { full: RatesData }) {
  const t = useT();
  const locale = useLocale();
  const model = slicerModel(full);
  const [slices, setSlices] = useState(1);
  const [deal, setDeal] = useState(0);

  const num = new Intl.NumberFormat(locale);
  const pct = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  });

  const frame = sliceFrame(model, slices, deal);
  const contrary = contraryCount(model, frame);
  const shortOf = (id: string) => {
    const g = full.groups.find((x) => x.id === id)!;
    return t(g.short ?? g.label);
  };
  const colorOf = declaredColors(full.groups);
  const agree = frame.length - contrary;

  return (
    <div className="rounded-lg border border-rule bg-paper-2 p-3.5">
      <p className="mb-3 text-[13px] leading-snug text-ink-soft">
        {t({
          en: "Every subgroup below is the trial's own patients, each keeping the outcome they really had. The only thing invented is which group they landed in.",
        })}
      </p>

      <p className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {t({ en: "Both arms pooled, unchanged" })}
      </p>
      <ul data-slicer="pooled" className="mb-3 flex flex-col gap-1 text-[13px]">
        {model.groups.map((g) => (
          <li key={g.id} className="flex items-baseline justify-between gap-3">
            <span className="text-ink-soft">{shortOf(g.id)}</span>
            <span className="shrink-0 tabular-nums text-ink">
              {fillSlots(t({ en: "{events} of {total}, {rate}" }), {
                events: num.format(g.events),
                total: num.format(g.total),
                rate: pct.format(g.events / g.total),
              })}
            </span>
          </li>
        ))}
      </ul>

      <p className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {t({ en: "Cut into subgroups" })}
      </p>
      {/*
        A GRID OF CELLS RATHER THAN ROWS, because at twenty-four slices a row
        each would be a page of numbers and the thing worth seeing is the
        pattern: mostly one colour, with a few going the other way. Each cell
        is one subgroup, coloured by which arm came out ahead in it.

        Hidden from assistive technology because colour is all it carries and
        the sentence below says the same in words.
      */}
      <div className="flex flex-wrap gap-1" aria-hidden="true">
        {frame.map((s, i) => (
          <span
            key={i}
            className="h-5 w-5 rounded-[3px]"
            style={{
              backgroundColor:
                s.leader === null
                  ? "var(--color-paper-3)"
                  : colorOf(s.leader),
            }}
          />
        ))}
      </div>

      <div aria-live="polite">
        <p
          data-slicer="verdict"
          className="mt-2 text-[13px] leading-snug text-ink"
        >
          {/*
            NOT ONE NUMBER IN THIS SENTENCE, and that is the whole design.

            It used to read "{contrary} of the {n} subgroups now point away from
            {winner}", which is broken in six languages at once. At one it says
            "1 ... point away" in English and the same in French, Spanish,
            Portuguese and Hindi, all of which need the singular; Russian needs
            a different noun form at two, three and four; Arabic needs the dual
            at two. And `{winner}` arrives as a bare nominative, so Russian
            cannot decline it after "in favour of" and French cannot elide
            before a vowel.

            No count in the sentence, no agreement to get wrong. The counts go
            in the two rows below, where a numeral is followed by "of" and by
            nothing that has to agree with it. That is the same rule the
            screening toy arrived at, stated once more because this is the
            second shape to need it: A NUMBER THE TRANSLATOR CANNOT SEE MUST
            NEVER STAND WHERE SOMETHING HAS TO AGREE WITH IT.
          */}
          {frame.length === 1
            ? t({ en: "Uncut, this is both arms pooled." })
            : contrary === 0
              ? t({ en: "Every subgroup still agrees with the trial." })
              : t({ en: "Some subgroups now disagree with the trial." })}
        </p>
        {frame.length > 1 ? (
          <ul className="mt-1.5 flex flex-col gap-1 text-[13px]">
            <li className="flex items-baseline justify-between gap-3">
              <span className="text-ink-soft">
                {t({ en: "Agree with the trial" })}
              </span>
              <span className="shrink-0 tabular-nums text-ink">
                {fillSlots(t({ en: "{n} of {total}" }), {
                  n: num.format(agree),
                  total: num.format(frame.length),
                })}
              </span>
            </li>
            <li className="flex items-baseline justify-between gap-3">
              <span className="text-ink-soft">
                {t({ en: "Disagree with the trial" })}
              </span>
              <span className="shrink-0 tabular-nums text-ink">
                {fillSlots(t({ en: "{n} of {total}" }), {
                  n: num.format(contrary),
                  total: num.format(frame.length),
                })}
              </span>
            </li>
          </ul>
        ) : null}
      </div>

      <label className="mt-3 block">
        <span className="mb-1 block font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t({ en: "How many ways you cut them up" })}
        </span>
        <input
          type="range"
          min={1}
          max={MAX_SLICES}
          step={1}
          value={slices}
          onChange={(e) => setSlices(Number(e.target.value))}
          aria-valuetext={
            frame.length === 1
              ? t({ en: "Not cut up" })
              : fillSlots(t({ en: "Cut into {n}" }), {
                  n: num.format(frame.length),
                })
          }
          className="w-full accent-brand focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        />
      </label>

      {/*
        THE WAY BACK TO THE TRIAL ITSELF, for the same reason the screening toy
        has one: exactly one position here is a measurement rather than a
        rearrangement, and without a control saying so a reader cannot tell
        which, nor easily return to it.
      */}
      {/*
        RE-DEAL, and it is the most important control here. Every arrangement
        is one draw, and a reader who saw only one would take it for a fact
        about the trial: dealt twelve ways, this one contradicts itself in 56%
        of deals and not in the other 44%, and an earlier version of this file
        drew a conclusion from the deal it happened to have. Pressing this is
        the difference between "subgroups mislead" and "whether subgroups
        mislead is luck", which is the actual lesson.
      */}
      <div className="mt-1.5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setDeal((d) => d + 1)}
          className="rounded-sm text-[12px] leading-snug text-ink-mute underline decoration-rule underline-offset-2 hover:text-ink-soft focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        >
          {t({ en: "Deal them again" })}
        </button>
      <button
        type="button"
        onClick={() => setSlices(1)}
          className="rounded-sm text-[12px] leading-snug text-ink-mute underline decoration-rule underline-offset-2 hover:text-ink-soft focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        >
        {t({ en: "Back to the trial itself" })}
        </button>
      </div>
    </div>
  );
}
