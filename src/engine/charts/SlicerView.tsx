import { useState } from "react";
import { useLocale, useT } from "../../app/i18n";
import type { RatesData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { colorFor } from "./palette";
import {
  MAX_SLICES,
  contraryCount,
  overallLeader,
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

  const num = new Intl.NumberFormat(locale);
  const pct = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  });

  const frame = sliceFrame(model, slices);
  const overall = overallLeader(model);
  const contrary = contraryCount(model, frame);
  const shortOf = (id: string) => {
    const g = full.groups.find((x) => x.id === id)!;
    return t(g.short ?? g.label);
  };
  const winner = overall === null ? "" : shortOf(overall);

  return (
    <div className="rounded-lg border border-rule bg-paper-2 p-3.5">
      <p className="mb-3 text-[13px] leading-snug text-ink-soft">
        {t({
          en: "Every subgroup below is the trial's own patients, each keeping the outcome they really had. The only thing invented is which group they landed in.",
        })}
      </p>

      <p className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {t({ en: "The whole trial, unchanged" })}
      </p>
      <ul className="mb-3 flex flex-col gap-1 text-[13px]">
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
                  : s.leader === overall
                    ? colorFor(0)
                    : colorFor(1),
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
            ONE SLICE IS NOT A SUBGROUP, it is the trial. Printing "All 1
            subgroups still favour Aspirin" was ungrammatical, and worse, it
            described the published result as though it were one of the
            rearrangements. The opening position is the only one that is a
            measurement, so it gets its own sentence rather than a plural
            phrased around a number that happens to be one.
          */}
          {frame.length === 1
            ? t({ en: "Uncut, this is the whole trial." })
            : contrary === 0
            ? fillSlots(
                t({ en: "All {n} subgroups still favour {winner}." }),
                { n: num.format(frame.length), winner },
              )
            : fillSlots(
                t({
                  en: "{contrary} of the {n} subgroups now point away from {winner}.",
                }),
                {
                  contrary: num.format(contrary),
                  n: num.format(frame.length),
                  winner,
                },
              )}
        </p>
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
              : fillSlots(t({ en: "{n} subgroups" }), {
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
      <button
        type="button"
        onClick={() => setSlices(1)}
        className="mt-1.5 rounded-sm text-[12px] leading-snug text-ink-mute underline decoration-rule underline-offset-2 hover:text-ink-soft focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
      >
        {t({ en: "Back to the trial itself" })}
      </button>
    </div>
  );
}
