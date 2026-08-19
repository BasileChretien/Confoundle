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
  reliabilityByStake,
  gradeAnswer,
  gradeRun,
  isWellCalibrated,
  RUN_SIZE,
  type RunAnswer,
} from "../srs/calibrationRun";
import { recentlySeen, recordRun } from "../app/runStats";
import {
  playedDailyRun,
  recordDailyRun,
  runCountsTowardRecord,
  runNumber,
  todayRunDay,
} from "../app/dailyRun";
import { buildRunStrip, stripGlyphs } from "./runShare";
import { appUrl, currentOrigin } from "../app/shareLinks";
import { drawDailyRun } from "../srs/dailyRun";

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
 * THE SCORE IS THE PER-ITEM WAGER, which is a proper rule, so saying what you
 * actually believe earns the most. It is shown for the run just played and
 * accumulated into nothing: a run whose VALUE depends on survival turns the
 * stake into a risk-management decision about the rest of the round instead of
 * a report of belief about this item. Modelling the obvious alternative showed
 * exactly that, with "hunch" optimal up to a belief of about 0.82 and "fairly
 * sure" never optimal at all. `srs/calibrationRun.ts` carries the argument.
 *
 * IT USED TO SHOW A STREAK BESIDE IT, and this docstring used to argue the
 * streak was safe because it fed nothing. Eight hunches scored a perfect streak
 * every run, and the app stored and congratulated it. What replaced it is a
 * report: how many calls were right, which no stake can move, and how each
 * stake actually held up.
 *
 * A WRONG HEDGE IS STILL MARKED AS CALIBRATED per item, because somebody who
 * says "I am not sure" and misses has described themselves accurately, which is
 * the behaviour being taught. What went away is taking a MAXIMUM of that.
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
 * believed on nothing. It is labelled as HINDSIGHT, because it picks the best
 * of the three stakes on the outcomes that actually happened, and a
 * well-calibrated player loses to that a good fraction of the time.
 */
/**
 * What each stake was actually worth, as its own component so a test can see it.
 *
 * IT WAS INLINE AND UNGUARDED. A review swapped the two slots, so the Certain
 * row would have read "3 of 1" instead of "1 of 3", and all 2042 tests passed:
 * the block only renders after eight items are answered, which no test can
 * reach through a component that holds its own state. Splitting it out is what
 * makes the loaded state reachable, the same move `CrowdLinesView` needed for
 * the same reason.
 *
 * A REPORT, NOT A TARGET. It describes what happened, with no maximum taken
 * over it, so the only way to improve it is to read the evidence better.
 * "Certain: 4 of 4" and "Certain: 1 of 4" are two different people, and neither
 * could learn which they were from a score.
 */
export function StakeReadout({ answers }: { answers: readonly RunAnswer[] }) {
  const t = useT();
  const locale = useLocale();
  const nf = new Intl.NumberFormat(locale);
  const reliability = reliabilityByStake(answers);

  return (
    <div className="rounded-lg border border-rule bg-paper-2 p-3">
      <p className="mb-1.5 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {t({ en: "How your stakes held up" })}
      </p>
      <ul className="flex flex-col gap-0.5">
        {CONFIDENCE_LEVELS.map((c) => {
          const row = reliability[c];
          return (
            <li
              key={c}
              className="flex items-baseline justify-between gap-3 text-[14px]"
            >
              <span className="text-ink-soft">{t(STAKE_LABEL[c])}</span>
              <span className="tabular-nums text-ink">
                {row.calls === 0
                  ? t({ en: "not staked" })
                  : fillSlots(t({ en: "{right} of {calls}" }), {
                      right: nf.format(row.right),
                      calls: nf.format(row.calls),
                    })}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The pasteable result of a shared day.
 *
 * IT ONLY APPEARS FOR THE DAILY. A private run has no denominator: two people
 * comparing strips from two different draws is exactly the comparison this
 * project has removed three times, and offering the button on a practice run
 * would invite it. The daily is the only run everybody played the same.
 *
 * The link goes to the front door rather than to the run, because the strip is
 * about the day and the recipient should meet today's, not a route that would
 * hand them a different one tomorrow.
 */
export function RunStripShare({
  day,
  answers,
}: {
  day: number;
  answers: readonly RunAnswer[];
}) {
  const t = useT();
  // Every numeral this app draws follows the reader's locale, including the one
  // in a visually hidden sentence: a screen reader is a reader.
  const nf = new Intl.NumberFormat(useLocale());
  const [copied, setCopied] = useState(false);
  // The seed goes in and `buildRunStrip` converts. Passing a display number
  // here is what a review broke silently, so there is no longer a choice.
  const text = `${buildRunStrip({ day, answers })}
${appUrl(currentOrigin())}`;

  function share() {
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
      return;
    }
    navigator.clipboard
      ?.writeText(text)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  }

  return (
    <div className="rounded-lg border border-rule bg-paper-2 p-3">
      <p
        className="mb-2 text-center font-display text-[22px] leading-snug tracking-[0.12em]"
        // The marks are the message. A screen reader gets the sentence below
        // instead, because eight emoji read aloud one at a time is noise.
        aria-hidden="true"
      >
        {stripGlyphs(answers)}
      </p>
      <p className="sr-only">
        {fillSlots(t({ en: "{right} of {total} called correctly." }), {
          right: nf.format(answers.filter((a) => a.correct).length),
          total: nf.format(answers.length),
        })}
      </p>
      <Button onClick={share}>
        {copied ? t({ en: "Copied" }) : t({ en: "Copy result" })}
      </Button>
    </div>
  );
}

export function CalibrationRunView({
  daily = false,
  onDone,
}: {
  /**
   * Draw today's shared eight rather than a private draw.
   *
   * The daily excludes nothing, which is the whole difference: the calibration
   * run passes `recentlySeen()` so a player does not repeat themselves, and
   * that filters the pool before the shuffle, so the same day would give two
   * people two different runs. See `srs/dailyRun.ts`.
   */
  daily?: boolean;
  onDone: () => void;
}) {
  const t = useT();
  // Every numeral this view draws goes through here before it reaches a slot:
  // a slot fills by string coercion, which is always Latin digits, so a count
  // dropped in raw would stay "5" beside fully translated Bengali or Arabic.
  const nf = new Intl.NumberFormat(useLocale());

  // Read once, on mount, so a run that straddles midnight finishes as the day
  // it started rather than swapping its items underneath the player.
  const day = useMemo(() => todayRunDay(), []);
  /**
   * Whether this attempt counts. Read on mount and held, so finishing does not
   * retroactively relabel the run the player has just done.
   *
   * A daily whose score can be farmed by replaying until the draw goes well
   * measures nothing, and this deck's subject is a number that means what it
   * says. Further attempts are allowed rather than refused, because somebody
   * who simply wants practice should not find the mode gone, and they say so
   * instead of being silently discarded.
   */
  const scored = useMemo(() => !daily || !playedDailyRun(day), [daily, day]);
  const items = useMemo(
    () => (daily ? drawDailyRun(day, RUN_SIZE) : drawRun(Math.random, RUN_SIZE, recentlySeen())),
    [daily, day],
  );

  const [at, setAt] = useState(0);
  const [answers, setAnswers] = useState<RunAnswer[]>([]);
  const [called, setCalled] = useState<boolean | null>(null);
  const [showing, setShowing] = useState<RunAnswer | null>(null);
  const [saved, setSaved] = useState<{
    bestCorrect: number;
    isBest: boolean;
  } | null>(null);

  const skillName = useMemo(
    () => (slug: string) => {
      const p = puzzles.find((x) => x.reasoningSkill === slug);
      return p ? t(p.lesson.skillName) : slug;
    },
    [t],
  );

  /*
    ONE LABEL FOR BOTH BADGES. The run draws its header twice, in progress and
    at the end, and two independent expressions for "which mode is this" is how
    a beat comes to say one thing on the way in and another on the way out.
  */
  const runLabel = daily
    ? fillSlots(t({ en: "Today's run, #{n}" }), { n: nf.format(runNumber(day)) })
    : t({ en: "Calibration run" });

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
      if (daily && scored) recordDailyRun(day);
      /*
        A REPLAY OF THE DAILY WRITES NOTHING, and leaving that out reopened the
        defect this mode has now had removed twice.

        `drawDailyRun` is pure in the day, so the practice attempt after the
        scored one returns the SAME EIGHT ITEMS IN THE SAME ORDER, and the
        player has just been shown every answer. `recordRun` fired regardless,
        so a guaranteed 8 of 8 went into `bestCorrect` and the app said "A new
        personal best." The record is confidence-blind, which was the fix for
        the last two, and it is not memory-blind: chasing it could mean
        remembering eight answers rather than reading better.

        The ordinary calibration run is safe from this because it passes
        `recentlySeen()` and essentially never repeats. Only this path is a
        guaranteed repeat, so only this path is refused.
      */
      if (!runCountsTowardRecord(daily, scored)) {
        setSaved(null);
        return;
      }
      const rec = recordRun(graded.correct, items.map((i) => i.id));
      setSaved({ bestCorrect: rec.stats.bestCorrect, isBest: rec.isBest });
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
          <Badge tone="brand">{runLabel}</Badge>
          <h2 className="font-display text-[28px] font-semibold leading-[1.05] text-ink">
            {fillSlots(t({ en: "Score: {n}" }), { n: nf.format(graded.score) })}
          </h2>
          <p className="text-[15px] text-ink-soft">
            {fillSlots(t({ en: "{right} of {total} called correctly." }), {
              right: nf.format(graded.correct),
              total: nf.format(answers.length),
            })}{" "}
            {saved === null
              ? null
              : saved.isBest
                ? t({ en: "A new personal best." })
                : fillSlots(t({ en: "Your best is {best}." }), {
                    best: nf.format(saved.bestCorrect),
                  })}
          </p>

          <StakeReadout answers={answers} />

          {daily ? <RunStripShare day={day} answers={answers} /> : null}

          <p className="text-[13px] leading-snug text-ink-soft">
            {/*
              The honest comparison, on the player's own calls. Without it the
              mode would quietly reward whichever fixed stake happened to suit
              the round, and never say so.
            */}
            {fillSlots(
              t({
                en: "With hindsight, staking {stake} on every call would have scored {n}.",
              }),
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
        <Badge tone="brand">{runLabel}</Badge>
        {/*
          BEFORE THE FIRST CALL, NOT AFTER THE LAST. A player deciding how hard
          to think deserves to know the attempt is not counted, and telling them
          on the results screen is telling them once it cannot matter.
        */}
        {daily && !scored ? (
          <p className="w-full text-[13px] text-ink-soft">
            {t({ en: "Practice. Today's run was already recorded." })}
          </p>
        ) : null}
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
