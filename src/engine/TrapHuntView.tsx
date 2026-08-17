import { useMemo, useState } from "react";
import { useLocale, useT } from "../app/i18n";
import { puzzles } from "../puzzles";
import { fillSlots } from "./charts/announce";
import { Badge, Button } from "./ui";
import {
  alwaysTrapScore,
  drawRound,
  grade,
  isTrap,
  longestRun,
  ROUND_SIZE,
  type TrapHuntAnswer,
} from "../srs/trapHunt";
import { recentlySeen, recordRound } from "../app/trapHuntStats";

const choiceButton =
  "rounded-lg border border-rule bg-paper-2 px-4 py-3.5 text-left font-semibold text-ink transition hover:border-ink/40 hover:bg-paper-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand active:scale-[.99]";

/**
 * Trap Hunt: eight scenarios, one question, no scheduling.
 *
 * WHAT MAKES IT DIFFERENT FROM A REVIEW, beyond not touching the SRS. A review
 * asks you to stake a confidence and then grades that too, because being
 * confidently wrong is the failure worth measuring on a schedule. This asks one
 * binary question and moves immediately, because the mode exists to be fast
 * and because a stake on every item eight times over is a chore rather than a
 * game.
 *
 * IT SHOWS THE THOUGHTLESS SCORE AT THE END, and that is not decoration. Around
 * a quarter of the bank is sound reasoning, so answering "trap" every time
 * scores about six of eight. A mode that celebrated six without saying what six
 * is worth would be teaching the exact error this deck exists to correct, on
 * the deck's own surface.
 *
 * FEEDBACK IS IMMEDIATE AND NAMED. Each answer reveals whether it was a trap
 * and which one, with the explanation, before the next scenario. Batching the
 * feedback to the end would make the round faster and teach less, and the bank
 * is a teaching instrument first.
 */
export function TrapHuntView({ onDone }: { onDone: () => void }) {
  const t = useT();
  // Every numeral this view draws goes through here before it reaches a slot.
  // A slot fills by string coercion, which is always Latin digits, so a count
  // dropped in raw stays "5" beside fully translated Bengali or Arabic text.
  const nf = new Intl.NumberFormat(useLocale());

  // Drawn once per mount, avoiding whatever the player has seen lately.
  const round = useMemo(
    () => drawRound(Math.random, ROUND_SIZE, undefined, recentlySeen()),
    [],
  );

  const [at, setAt] = useState(0);
  const [answers, setAnswers] = useState<TrapHuntAnswer[]>([]);
  const [showing, setShowing] = useState<TrapHuntAnswer | null>(null);
  const [saved, setSaved] = useState<{ best: number; isBest: boolean } | null>(null);

  const skillName = useMemo(
    () => (slug: string) => {
      const p = puzzles.find((x) => x.reasoningSkill === slug);
      return p ? t(p.lesson.skillName) : slug;
    },
    [t],
  );

  const item = round.items[at];
  const done = at >= round.items.length;

  function answer(saidTrap: boolean) {
    if (!item || showing) return;
    setShowing(grade(item, saidTrap));
  }

  function next() {
    if (!showing) return;
    const all = [...answers, showing];
    setAnswers(all);
    setShowing(null);
    const nextAt = at + 1;
    setAt(nextAt);
    if (nextAt >= round.items.length) {
      // Recorded once, at the end, so an abandoned round costs nothing and
      // cannot inflate the count.
      const { stats, isBest } = recordRound(
        longestRun(all),
        round.items.map((i) => i.id),
      );
      setSaved({ best: stats.bestRun, isBest });
    }
  }

  if (done) {
    const run = longestRun(answers);
    const right = answers.filter((a) => a.correct).length;
    const thoughtless = alwaysTrapScore(round.items);
    return (
      <section className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <Badge tone="brand">{t({ en: "Trap Hunt" })}</Badge>
          {/*
            This round's run, labelled as this round's run. It read "Best run"
            while showing the same number, so a player whose record was eight
            finished a run of three and was told their best was three, with "A
            new personal best" sitting underneath deciding whether to appear.
            The record itself was computed, stored, and never drawn.
          */}
          <h2 className="font-display text-[28px] font-semibold leading-[1.05] text-ink">
            {fillSlots(t({ en: "Longest run: {run}" }), { run: nf.format(run) })}
          </h2>
          <p className="text-[15px] text-ink-soft">
            {fillSlots(t({ en: "{right} of {total} called correctly." }), {
              right: nf.format(right),
              total: nf.format(answers.length),
            })}{" "}
            {saved === null
              ? null
              : saved.isBest
                ? t({ en: "A new personal best." })
                : fillSlots(t({ en: "Your best is {best}." }), {
                    best: nf.format(saved.best),
                  })}
          </p>
          <p className="text-[13px] leading-snug text-ink-soft">
            {/*
              The honest comparison. Without it a mode about spotting traps
              would quietly reward the habit of seeing them everywhere.
            */}
            {fillSlots(
              t({
                en: "Answering trap every time would have scored {n} on this round.",
              }),
              { n: nf.format(thoughtless) },
            )}
          </p>
        </header>

        <ol className="flex flex-col gap-3">
          {round.items.map((it, i) => {
            const res = answers[i];
            return (
              <li key={it.id} className="rounded-lg border border-rule bg-paper-2 p-3">
                <div className="mb-1 flex items-center gap-2">
                  <span>{res?.correct ? "✅" : "❌"}</span>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                    {it.trap === null
                      ? t({ en: "Sound reasoning" })
                      : skillName(it.trap)}
                  </span>
                </div>
                <p className="text-[13px] leading-snug text-ink-soft">
                  {t(it.explanation)}
                </p>
              </li>
            );
          })}
        </ol>

        <Button onClick={onDone}>{t({ en: "Done" })}</Button>
      </section>
    );
  }

  if (!item) return null;

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-2">
        <Badge tone="brand">{t({ en: "Trap Hunt" })}</Badge>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {fillSlots(t({ en: "{at} of {total}" }), {
            at: nf.format(at + 1),
            total: nf.format(round.items.length),
          })}
        </p>
        <p className="text-[15px] text-ink-soft">
          {t({ en: "Does this reasoning fall for something?" })}
        </p>
      </header>

      <div key={item.id} className="cf-enter-sm rounded-lg border border-rule bg-paper-2 p-4">
        <p className="text-[15px] leading-relaxed text-ink">{t(item.scenario)}</p>
      </div>

      {showing ? (
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-rule bg-paper-2 p-3">
            <div className="mb-1 flex items-center gap-2">
              <span>{showing.correct ? "✅" : "❌"}</span>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                {isTrap(item) ? skillName(item.trap!) : t({ en: "Sound reasoning" })}
              </span>
            </div>
            <p className="text-[13px] leading-snug text-ink-soft">
              {t(item.explanation)}
            </p>
          </div>
          <Button onClick={next}>
            {at + 1 >= round.items.length
              ? t({ en: "See the round" })
              : t({ en: "Next" })}
          </Button>
        </div>
      ) : (
        <div className="grid gap-2">
          <button type="button" onClick={() => answer(true)} className={choiceButton}>
            {t({ en: "Yes, it falls for something" })}
          </button>
          <button type="button" onClick={() => answer(false)} className={choiceButton}>
            {t({ en: "No, the reasoning is sound" })}
          </button>
        </div>
      )}
    </section>
  );
}
