import { useMemo, useState } from "react";
import { useLocale, useT } from "../app/i18n";
import { puzzles } from "../puzzles";
import { fillSlots } from "./charts/announce";
import { Badge, Button } from "./ui";
import { CONFIDENCE_LEVELS, type Confidence } from "./scoring";
import { isTrap } from "../srs/trapHunt";
import {
  drawRun,
  fixedStakeScores,
  gradeAnswer,
  gradeRun,
  isWellCalibrated,
  RUN_SIZE,
  type RunAnswer,
} from "../srs/calibrationRun";
import { recentlySeen, recordRun } from "../app/runStats";

const choiceButton =
  "rounded-lg border border-rule bg-paper-2 px-4 py-3.5 text-left font-semibold text-ink transition hover:border-ink/40 hover:bg-paper-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand active:scale-[.99]";

const stakeButton =
  "rounded-lg border border-rule bg-paper-2 px-3 py-3 text-center font-semibold text-ink transition hover:border-ink/40 hover:bg-paper-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand active:scale-[.99]";

/**
 * The three stakes, as authored strings rather than a computed label.
 *
 * Written out so `translations/inlineChrome.test.ts` can see them: a `t()`
 * argument built at runtime is invisible to that scan, which is the gap that
 * let nine chart captions ship in English to nine languages.
 */
const STAKE_LABEL: Record<Confidence, { en: string }> = {
  hunch: { en: "Hunch" },
  sure: { en: "Fairly sure" },
  certain: { en: "Certain" },
};

/**
 * The calibration run: Trap Hunt with a stake on every call.
 *
 * THE MODE EXISTS BECAUSE NOTHING MEASURED THE DEEPEST SKILL IN THE DECK,
 * which is not spotting a trap but knowing how sure you are entitled to be.
 *
 * TWO NUMBERS, DELIBERATELY NOT ONE. The score is the per-item wager, which is
 * a proper rule, so saying what you actually believe earns the most. The streak
 * is consecutive well-calibrated calls and it feeds nothing at all. That
 * separation is the design rather than an implementation detail: a run whose
 * VALUE depends on survival turns the stake into a risk-management decision
 * about the rest of the round instead of a report of belief about this item.
 * Modelling the obvious alternative showed exactly that, with "hunch" optimal
 * up to a belief of about 0.82 and "fairly sure" never optimal at all.
 * `srs/calibrationRun.ts` carries the argument and the tests that hold it.
 *
 * A WRONG HEDGE KEEPS THE STREAK. Somebody who says "I am not sure" and misses
 * has described themselves accurately, which is the behaviour being taught.
 * Ending their streak for it would teach them to be quietly confident instead.
 *
 * THE STAKE IS TAKEN BEFORE THE VERDICT AND AFTER THE CALL, in its own beat.
 * Trap Hunt deliberately asks one binary question and moves on, because a stake
 * on every item is a chore there; here the stake IS the mode, so it earns the
 * extra tap. Splitting the two also keeps the call itself uncoloured by how
 * sure the player is about to say they were.
 *
 * IT SHOWS WHAT A FIXED STAKE WOULD HAVE SCORED, on the player's own calls.
 * That is the guard rail generalised from `alwaysTrapScore`: a scored mechanic
 * that never publishes what a thoughtless strategy earns is asking to be
 * believed on nothing.
 */
export function CalibrationRunView({ onDone }: { onDone: () => void }) {
  const t = useT();
  // Every numeral this view draws goes through here before it reaches a slot:
  // a slot fills by string coercion, which is always Latin digits, so a count
  // dropped in raw would stay "5" beside fully translated Bengali or Arabic.
  const nf = new Intl.NumberFormat(useLocale());

  const items = useMemo(() => drawRun(Math.random, RUN_SIZE, recentlySeen()), []);

  const [at, setAt] = useState(0);
  const [answers, setAnswers] = useState<RunAnswer[]>([]);
  const [called, setCalled] = useState<boolean | null>(null);
  const [showing, setShowing] = useState<RunAnswer | null>(null);
  const [saved, setSaved] = useState<{
    bestStreak: number;
    isBestScore: boolean;
    isBestStreak: boolean;
  } | null>(null);

  const skillName = useMemo(
    () => (slug: string) => {
      const p = puzzles.find((x) => x.reasoningSkill === slug);
      return p ? t(p.lesson.skillName) : slug;
    },
    [t],
  );

  const item = items[at];
  const done = at >= items.length;

  function stake(confidence: Confidence) {
    if (!item || called === null || showing) return;
    setShowing(gradeAnswer(item, called, confidence));
  }

  function next() {
    if (!showing) return;
    const all = [...answers, showing];
    setAnswers(all);
    setShowing(null);
    setCalled(null);
    const nextAt = at + 1;
    setAt(nextAt);
    if (nextAt >= items.length) {
      // Recorded once, at the end, so an abandoned run costs nothing and
      // cannot inflate the count.
      const graded = gradeRun(all);
      const rec = recordRun(
        graded.score,
        graded.longestStreak,
        items.map((i) => i.id),
      );
      setSaved({
        bestStreak: rec.stats.bestStreak,
        isBestScore: rec.isBestScore,
        isBestStreak: rec.isBestStreak,
      });
    }
  }

  if (done) {
    const graded = gradeRun(answers);
    const fixed = fixedStakeScores(answers);
    // The best a thoughtless player could have done with the very same calls,
    // which is the only comparator worth publishing.
    const bestFixed = CONFIDENCE_LEVELS.reduce((a, b) =>
      fixed[a] >= fixed[b] ? a : b,
    );

    return (
      <section className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <Badge tone="brand">{t({ en: "Calibration run" })}</Badge>
          <h2 className="font-display text-[28px] font-semibold leading-[1.05] text-ink">
            {fillSlots(t({ en: "Score: {n}" }), { n: nf.format(graded.score) })}
          </h2>
          <p className="text-[15px] text-ink-soft">
            {fillSlots(t({ en: "Longest calibrated streak: {n}" }), {
              n: nf.format(graded.longestStreak),
            })}{" "}
            {saved === null
              ? null
              : saved.isBestStreak
                ? t({ en: "A new personal best." })
                : fillSlots(t({ en: "Your best is {best}." }), {
                    best: nf.format(saved.bestStreak),
                  })}
          </p>
          <p className="text-[15px] text-ink-soft">
            {fillSlots(t({ en: "{right} of {total} called correctly." }), {
              right: nf.format(graded.correct),
              total: nf.format(answers.length),
            })}
          </p>
          <p className="text-[13px] leading-snug text-ink-soft">
            {/*
              The honest comparison, on the player's own calls. Without it the
              mode would quietly reward whichever fixed stake happened to suit
              the round, and never say so.
            */}
            {fillSlots(
              t({ en: "Staking {stake} on every call would have scored {n}." }),
              {
                stake: t(STAKE_LABEL[bestFixed]),
                n: nf.format(fixed[bestFixed]),
              },
            )}
          </p>
        </header>

        <ol className="flex flex-col gap-3">
          {items.map((it, i) => {
            const res = answers[i];
            return (
              <li key={it.id} className="rounded-lg border border-rule bg-paper-2 p-3">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span>{res?.correct ? "✅" : "❌"}</span>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                    {it.trap === null
                      ? t({ en: "Sound reasoning" })
                      : skillName(it.trap)}
                  </span>
                  {res && !isWellCalibrated(res) ? (
                    <Badge tone="rust">{t({ en: "Overclaimed" })}</Badge>
                  ) : null}
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
        <Badge tone="brand">{t({ en: "Calibration run" })}</Badge>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {fillSlots(t({ en: "{at} of {total}" }), {
            at: nf.format(at + 1),
            total: nf.format(items.length),
          })}
        </p>
        <p className="text-[15px] text-ink-soft">
          {called === null
            ? t({ en: "Does this reasoning fall for something?" })
            : t({ en: "How sure are you?" })}
        </p>
      </header>

      <div
        key={item.id}
        className="cf-enter-sm rounded-lg border border-rule bg-paper-2 p-4"
      >
        <p className="text-[15px] leading-relaxed text-ink">{t(item.scenario)}</p>
      </div>

      {showing ? (
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-rule bg-paper-2 p-3">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span>{showing.correct ? "✅" : "❌"}</span>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                {isTrap(item) ? skillName(item.trap!) : t({ en: "Sound reasoning" })}
              </span>
              {isWellCalibrated(showing) ? null : (
                <Badge tone="rust">{t({ en: "Overclaimed" })}</Badge>
              )}
            </div>
            <p className="text-[13px] leading-snug text-ink-soft">
              {t(item.explanation)}
            </p>
          </div>
          <Button onClick={next}>
            {at + 1 >= items.length ? t({ en: "See the run" }) : t({ en: "Next" })}
          </Button>
        </div>
      ) : called === null ? (
        <div className="grid gap-2">
          <button type="button" onClick={() => setCalled(true)} className={choiceButton}>
            {t({ en: "Yes, it falls for something" })}
          </button>
          <button
            type="button"
            onClick={() => setCalled(false)}
            className={choiceButton}
          >
            {t({ en: "No, the reasoning is sound" })}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {CONFIDENCE_LEVELS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => stake(c)}
              className={stakeButton}
            >
              {t(STAKE_LABEL[c])}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
