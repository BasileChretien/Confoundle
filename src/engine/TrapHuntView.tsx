import { useEffect, useRef, useState } from "react";
import { useT } from "../app/i18n";
import { getHuntState, getLearned, puzzleNumber, recordHunt } from "../app/session";
import { puzzles } from "../puzzles";
import { TEST_ITEMS } from "../puzzles/testItems";
import {
  ROUND_SIZE,
  gradeAnswer,
  rankFor,
  selectItems,
  type Answer,
} from "./trapHunt";
import { Badge, Button, ProgressDots } from "./ui";

/**
 * The Trap Hunt: a short round of neutral scenarios where the player must
 * decide whether the reasoning is sound or hides a trap, and if so, name it.
 * Unlike a puzzle, nothing here telegraphs the answer.
 */
export function TrapHuntView({ onDone }: { onDone: () => void }) {
  const t = useT();
  const learned = getLearned();

  const [items] = useState(() =>
    selectItems(
      learned,
      TEST_ITEMS,
      ROUND_SIZE,
      puzzleNumber() * 31 + getHuntState().rounds,
    ),
  );
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [naming, setNaming] = useState(false);

  const done = index >= items.length;
  const correctCount = items.reduce(
    (n, item, i) => n + (answers[i] && gradeAnswer(item, answers[i]) ? 1 : 0),
    0,
  );

  const recorded = useRef(false);
  useEffect(() => {
    if (done && !recorded.current) {
      recorded.current = true;
      recordHunt(correctCount, learned.length);
    }
  }, [done, correctCount, learned.length]);

  function skillName(slug: string): string {
    const p = puzzles.find((x) => x.reasoningSkill === slug);
    return p ? t(p.lesson.skillName) : slug;
  }

  function submit(a: Answer) {
    setAnswers((prev) => [...prev, a]);
    setNaming(false);
    setIndex((i) => i + 1);
  }

  if (done) {
    const total = getHuntState().totalCorrect;
    return (
      <section className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <Badge tone="brand">{t({ en: "Trap Hunt" })}</Badge>
          <h2 className="font-display text-[28px] font-semibold leading-[1.05] text-ink">
            {correctCount} / {items.length}
          </h2>
          <p className="text-[15px] text-ink-soft">
            {t({ en: "Rank" })}:{" "}
            <span className="font-semibold text-ink">
              {t({ en: rankFor(total) })}
            </span>
          </p>
        </header>

        <ol className="flex flex-col gap-3">
          {items.map((item, i) => {
            const ok = answers[i] && gradeAnswer(item, answers[i]);
            return (
              <li
                key={item.id}
                className="rounded-lg border border-rule bg-paper-2 p-3"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span>{ok ? "✅" : "❌"}</span>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                    {item.trap === null
                      ? t({ en: "Sound reasoning" })
                      : skillName(item.trap)}
                  </span>
                </div>
                <p className="text-[13px] leading-snug text-ink-soft">
                  {t(item.explanation)}
                </p>
              </li>
            );
          })}
        </ol>

        <Button onClick={onDone}>{t({ en: "Done" })}</Button>
      </section>
    );
  }

  const item = items[index];

  return (
    <section className="flex flex-col gap-4">
      <ProgressDots total={items.length} index={index} />
      <header className="flex flex-col gap-2">
        <Badge tone="brand">{t({ en: "Trap Hunt" })}</Badge>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t({ en: "Some of these are sound. Some hide a trap." })}
        </p>
      </header>

      <div key={item.id} className="cf-enter-sm rounded-lg border border-rule bg-paper-2 p-4">
        <p className="text-[15px] leading-relaxed text-ink">
          {t(item.scenario)}
        </p>
      </div>

      {naming ? (
        <div className="flex flex-col gap-2">
          <span className="text-center font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
            {t({ en: "Which trap?" })}
          </span>
          {learned.map((slug) => (
            <button
              key={slug}
              type="button"
              onClick={() => submit({ isTrap: true, trap: slug })}
              className="rounded-lg border border-rule bg-paper-2 px-4 py-3 text-left font-semibold text-ink transition hover:border-ink/40 hover:bg-paper-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand active:scale-[.99]"
            >
              {skillName(slug)}
            </button>
          ))}
        </div>
      ) : (
        <div className="grid gap-2">
          <button
            type="button"
            onClick={() => submit({ isTrap: false })}
            className="rounded-lg border border-rule bg-paper-2 px-4 py-3.5 font-semibold text-ink transition hover:border-ink/40 hover:bg-paper-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand active:scale-[.99]"
          >
            {t({ en: "Sound reasoning" })}
          </button>
          <button
            type="button"
            onClick={() => setNaming(true)}
            className="rounded-lg border border-rule bg-paper-2 px-4 py-3.5 font-semibold text-ink transition hover:border-ink/40 hover:bg-paper-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand active:scale-[.99]"
          >
            {t({ en: "There's a trap" })}
          </button>
        </div>
      )}
    </section>
  );
}
