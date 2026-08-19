import { useState } from "react";
import { useLocale, useT } from "../../app/i18n";
import type { RatesData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { declaredColors } from "./palette";
import { mixerFrame, mixerModel, reversedAt } from "./mixer";

/**
 * The reversal, as something the reader causes.
 *
 * Every rate WITHIN a stratum is held exactly as measured and never moves; the
 * only thing the slider changes is who got the hard cases. Drag far enough and
 * the overall winner swaps while both stratum comparisons sit where they always
 * were. That is Simpson's paradox, and it is the one thing a static chart
 * cannot show.
 *
 * IT IS OFFERED AFTER THE REVEAL AND SCORES NOTHING. There is no band to get
 * wrong here, so the hedge rule has no purchase on it, which is exactly why an
 * unscored toy is the right place to be this playful.
 *
 * THE FIXED ROWS ARE THE POINT, not decoration. Showing only the moving bars
 * would look like two numbers wobbling; showing the stratum rates beside them,
 * visibly still, is what makes the mechanism legible rather than magical.
 *
 * NO ANIMATION TO SUPPRESS. The reader is the animation, so there is nothing
 * for `prefers-reduced-motion` to turn off, and the control is a native range
 * input, so arrow keys and a screen reader work without anything being
 * reimplemented.
 */
/*
  THE PROP IS `full` BECAUSE A SLICE WOULD BE MEANINGLESS HERE, and the name is
  the one this codebase already uses for the unrestricted, declared data.
  Remixing needs both groups and both strata by definition, so `canMix` refuses
  a restricted copy anyway; taking `full` says that in the signature instead of
  only at runtime, and lets `declaredColors.test.ts` classify this file without
  its strict default having to be loosened for it.
*/
export function MixerView({ full }: { full: RatesData }) {
  const data = full;
  const t = useT();
  const locale = useLocale();
  const [mix, setMix] = useState(50);

  const pct = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  const model = mixerModel(data);
  const colorOf = declaredColors(full.groups);
  const overall = mixerFrame(model, mix / 100);
  const reversed = reversedAt(model, mix / 100);
  const strata = data.strata ?? [];
  const shortOf = (id: string) => {
    const g = data.groups.find((x) => x.id === id)!;
    return t(g.short ?? g.label);
  };

  return (
    <div className="mt-3 rounded-lg border border-rule bg-paper-2 p-3.5">
      <p className="mb-3 text-[13px] leading-snug text-ink-soft">
        {t({
          en: "Both treatments keep the success rates they actually had. The only thing that moves is who got the hard cases.",
        })}
      </p>

      <p className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {t({ en: "Within each group, unchanged" })}
      </p>
      <ul className="mb-3 flex flex-col gap-1">
        {strata.map((s, i) => (
          <li key={s.id} className="flex items-baseline justify-between gap-3 text-[13px]">
            <span className="text-ink-soft">{t(s.label)}</span>
            <span className="tabular-nums text-ink">
              {model.groups
                .map((g) => `${shortOf(g.id)} ${pct.format(g.byStratum[i]!)}`)
                .join("   ")}
            </span>
          </li>
        ))}
      </ul>

      <p className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {t({ en: "Overall, as you move the mix" })}
      </p>
      <div className="flex flex-col gap-1.5">
        {model.groups.map((g, i) => (
          <div key={g.id} className="flex items-center gap-2">
            <span className="w-8 shrink-0 text-[13px] text-ink-soft">
              {shortOf(g.id)}
            </span>
            <div className="h-4 flex-1 rounded-[3px] bg-paper-3">
              <div
                className="h-full rounded-[3px]"
                style={{
                  width: `${overall[i]! * 100}%`,
                  backgroundColor: colorOf(g.id),
                }}
              />
            </div>
            <span className="w-12 shrink-0 text-right text-[13px] tabular-nums text-ink">
              {pct.format(overall[i]!)}
            </span>
          </div>
        ))}
      </div>

      <label className="mt-3 block">
        <span className="mb-1 block font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t({ en: "Who got the hard cases" })}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={mix}
          onChange={(e) => setMix(Number(e.target.value))}
          className="w-full accent-brand focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        />
      </label>

      {/*
        The punchline, and only when it is true. Saying "ahead in both, behind
        overall" while the leader has not yet swapped would be the figure
        asserting something the picture does not show.
      */}
      {reversed !== null ? (
        <p className="mt-2 border-t border-rule pt-2 text-[13px] leading-snug text-ink">
          {fillSlots(
            t({ en: "{winner} is ahead in every group and behind overall." }),
            { winner: shortOf(reversed) },
          )}
        </p>
      ) : null}
    </div>
  );
}
