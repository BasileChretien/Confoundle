import { useState } from "react";
import { useLocale, useT } from "../../app/i18n";
import type { RatesData } from "../../puzzles/schema";
import { fillSlots } from "./announce";
import { declaredColors } from "./palette";
import { OPENING_MIX, mixerFrame, mixerModel, reversedAt } from "./mixer";

/**
 * The reversal, as something the reader causes.
 *
 * Every rate WITHIN a stratum is held exactly as measured and never moves; the
 * only thing the slider changes is how the cases were split. Drag far enough
 * and the overall winner swaps while both stratum comparisons sit where they
 * always were. That is Simpson's paradox, and it is the one thing a static
 * chart cannot show.
 *
 * IT IS OFFERED AFTER THE REVEAL AND SCORES NOTHING. There is no band to get
 * wrong here, so the hedge rule has no purchase on it, which is exactly why an
 * unscored toy is the right place to be this playful.
 *
 * THE FIXED ROWS ARE THE POINT, not decoration. Showing only the moving bars
 * would look like two numbers wobbling; showing the stratum rates beside them,
 * visibly still, is what makes the mechanism legible rather than magical.
 *
 * NOT ONE WORD OF THIS CHROME KNOWS WHAT THE PUZZLE IS ABOUT. It said
 * "treatments", "success rates" and "the hard cases" until review pointed out
 * that all three are facts about `kidney-stones` written into the engine, that
 * nothing checked them, and that a table whose strata are authored in the other
 * order would get a silently inverted slider. The slider now names the stratum
 * it moves by that stratum's own label, and the direction that counts as ahead
 * comes from the puzzle's `higherIsBetter`, so a mortality table cannot be
 * described as though fewer deaths were a defeat.
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
  const t = useT();
  const locale = useLocale();
  const [mix, setMix] = useState(OPENING_MIX);

  /*
    ONE DECIMAL, NOT NONE. At whole percents both bars read "80%" for several
    steps either side of the crossing while the caption underneath announces
    that one of them is behind. This component's own rule is that the caption
    may not assert what the picture does not show, and rounding the picture
    until it disagrees with the caption is that same failure arriving from the
    other direction.
  */
  const pct = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const model = mixerModel(full);
  const colorOf = declaredColors(full.groups);
  const overall = mixerFrame(model, mix / 100);
  const reversed = reversedAt(model, mix / 100);
  const strata = full.strata ?? [];
  const shortOf = (id: string) => {
    const g = full.groups.find((x) => x.id === id)!;
    return t(g.short ?? g.label);
  };
  /* The stratum the slider moves: `mixerFrame` mixes toward the second one. */
  const movedStratum = t(strata[1]!.label);
  const share = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(mix / 100);

  return (
    /* No top margin: the fold's container is a `gap-4` column already. */
    <div className="rounded-lg border border-rule bg-paper-2 p-3.5">
      <p className="mb-3 text-[13px] leading-snug text-ink-soft">
        {t({
          en: "Both groups keep the rates they actually had. The only thing that moves is how the cases were split between them.",
        })}
      </p>

      <p className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {t({ en: "Within each group, unchanged" })}
      </p>
      <ul className="mb-3 flex flex-col gap-1">
        {strata.map((s, i) => (
          <li
            key={s.id}
            className="flex items-baseline justify-between gap-3 text-[13px]"
          >
            <span className="text-ink-soft">{t(s.label)}</span>
            {/*
              SEPARATE ELEMENTS, NOT A JOINED STRING. `.join("   ")` collapses
              to one space in HTML, so this row rendered as "A 93.1% B 86.7%"
              run together, and no test could have seen it: they read the text
              content, where the padding never existed either.
            */}
            <span className="flex shrink-0 gap-3 tabular-nums text-ink">
              {model.groups.map((g) => (
                <span key={g.id}>
                  {shortOf(g.id)} {pct.format(g.byStratum[i]!)}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>

      <p className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {t({ en: "Overall, as you move the mix" })}
      </p>
      {/*
        NO `aria-label` AND NO `role="img"` ON THE BARS, deliberately. Both
        names and both numbers are already real text inside this block, so a
        label would replace a complete reading with a shorter one. The bars add
        emphasis for a sighted reader, not information.
      */}
      <div className="flex flex-col gap-1.5">
        {model.groups.map((g, i) => (
          <div key={g.id} className="flex items-center gap-2">
            <span className="shrink-0 text-[13px] text-ink-soft">
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
            {/*
              A TEST HOOK, AND IT EARNS ITS KEEP. At the opening mix each
              group's overall rate EQUALS one of its own stratum rates, which
              is arithmetic rather than a coincidence: at one end of the slider
              a group carries one stratum and nothing else. So a check that
              searched the whole page for the formatted value found it in the
              still rows above and passed while these bars printed anything at
              all, which is exactly how they stayed unlocalised through a
              review. The attribute lets the guard read this element instead of
              the document, without pinning the test to a Tailwind class that
              changes whenever the design does.
            */}
            <span
              data-mixer="overall"
              className="w-16 shrink-0 text-right text-[13px] tabular-nums text-ink"
            >
              {pct.format(overall[i]!)}
            </span>
          </div>
        ))}
      </div>

      <label className="mt-3 block">
        <span className="mb-1 block font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {fillSlots(t({ en: "Who got the {stratum}" }), {
            stratum: movedStratum,
          })}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={mix}
          onChange={(e) => setMix(Number(e.target.value))}
          /*
            Without this the slider announces a bare "50", a number with no unit
            and no subject. The sentence is authored whole so a translator can
            order it, rather than assembled from a percentage and a preposition
            that only English needs.
          */
          aria-valuetext={fillSlots(
            t({ en: "{share} of the {stratum} go to {group}" }),
            {
              share,
              stratum: movedStratum,
              group: shortOf(model.groups[0]!.id),
            },
          )}
          className="w-full accent-brand focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        />
      </label>

      {/*
        The punchline, and only when it is true. Saying "ahead in both, behind
        overall" while the leader has not yet swapped would be the figure
        asserting something the picture does not show.

        THE REGION IS ALWAYS PRESENT so that it can be a live one. Inserted into
        the DOM at the moment it becomes true it would be announced by nothing,
        and a reader arrowing the slider would cause the reversal without ever
        being told it had happened. `RevealView` wraps its scrub caption the
        same way and for the same reason.
      */}
      <div aria-live="polite">
        {reversed !== null ? (
          <p className="mt-2 border-t border-rule pt-2 text-[13px] leading-snug text-ink">
            {fillSlots(
              t({ en: "{winner} is ahead in every group and behind overall." }),
              { winner: shortOf(reversed) },
            )}
          </p>
        ) : null}
      </div>
    </div>
  );
}
