import { useMemo, useState } from "react";
import { useLocale, useT } from "../../app/i18n";
import { fillSlots } from "../charts/announce";
import {
  ENDPOINTS,
  HYPOTHESES,
  TEST_SPACE,
  analyse,
  cohort,
  replicate,
  type TestResult,
} from "./publish";

/**
 * Publish or Perish.
 *
 * You are handed a trial with NOTHING in it, told so on the first screen, and
 * invited to find something publishable anyway. You will. Then replication
 * runs, and you watch it go.
 *
 * WHY THE DARE IS ON THE FIRST SCREEN rather than saved for the end. The
 * temptation is to hide it and spring the reveal, and that would make a better
 * magic trick and a worse lesson: a player who did not know would spend the
 * game wondering whether they had found something real, and would leave
 * thinking the game had cheated them. Told up front, every hit lands as "I
 * KNEW there was nothing and I still got one", which is the feeling the
 * replication crisis actually has.
 *
 * THE TEST COUNTER IS THE ANTAGONIST. Nothing punishes the player, no clock
 * runs out; the only thing that happens is that a number goes up while they
 * hunt, and at the end that number is the whole indictment. A turn limit was
 * the obvious design and it is worse, because it lets the player blame the
 * limit rather than notice what they did.
 *
 * EVERY NAME HERE IS INVENTED. No real drug, journal, institution or author,
 * because a screenshot of this will travel further than the page around it and
 * must be unmistakable as fiction wherever it lands.
 */

type Phase = "briefing" | "hunting" | "replication" | "verdict";

interface Published extends TestResult {
  survived: boolean | null;
}

/** A run's seed. Fixed per mount so the same game can be replayed and shared. */
function useSeed(): [number, () => void] {
  const [seed, setSeed] = useState(() => 1 + Math.floor(Date.now() / 60_000) % 9973);
  return [seed, () => setSeed((s) => (s % 9973) + 1)];
}

export function PublishGame({ onDone }: { onDone: () => void }) {
  const t = useT();
  const locale = useLocale();
  const [seed, nextSeed] = useSeed();
  const [phase, setPhase] = useState<Phase>("briefing");
  const [endpoint, setEndpoint] = useState(ENDPOINTS[0]!.id);
  const [tested, setTested] = useState<Record<string, TestResult>>({});
  const [current, setCurrent] = useState<TestResult | null>(null);
  const [published, setPublished] = useState<Published[]>([]);

  const patients = useMemo(() => cohort(seed), [seed]);
  const num = new Intl.NumberFormat(locale);
  const testCount = Object.keys(tested).length;
  const key = (h: string, e: string) => `${e}:${h}`;

  const reset = () => {
    setPhase("briefing");
    setTested({});
    setCurrent(null);
    setPublished([]);
    setEndpoint(ENDPOINTS[0]!.id);
    nextSeed();
  };

  const run = (hypothesis: string) => {
    const already = tested[key(hypothesis, endpoint)];
    if (already) {
      setCurrent(already);
      return;
    }
    const result = analyse(patients, hypothesis, endpoint);
    setTested((prev) => ({ ...prev, [key(hypothesis, endpoint)]: result }));
    setCurrent(result);
  };

  const publish = () => {
    if (!current?.significant) return;
    if (published.some((f) => f.hypothesis === current.hypothesis && f.endpoint === current.endpoint)) return;
    setPublished((prev) => [...prev, { ...current, survived: null }]);
    setCurrent(null);
  };

  const submitForReplication = () => {
    setPhase("replication");
    setPublished((prev) =>
      prev.map((f) => ({
        ...f,
        survived: replicate(seed, f.hypothesis, f.endpoint).significant,
      })),
    );
    setPhase("verdict");
  };

  const labelOf = (id: string) =>
    t(HYPOTHESES.find((h) => h.id === id)?.label ?? { en: id });
  const endpointOf = (id: string) =>
    t(ENDPOINTS.find((e) => e.id === id)?.label ?? { en: id });
  const retracted = published.filter((f) => f.survived === false).length;
  const held = published.filter((f) => f.survived === true).length;

  if (phase === "briefing") {
    return (
      <section className="mx-auto flex max-w-lg flex-col gap-4 px-4 py-8">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t({ en: "A game about finding things that are not there" })}
        </p>
        <h1 className="font-display text-3xl leading-tight text-ink">
          {t({ en: "Publish or Perish" })}
        </h1>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          {fillSlots(
            t({
              en: "You are handed a finished trial: {n} patients, an invented treatment, and a placebo. There is nothing in it. The treatment does not work, and it does not work in every subgroup equally.",
            }),
            { n: num.format(cohort(seed).length) },
          )}
        </p>
        <p className="text-[15px] leading-relaxed text-ink">
          {fillSlots(
            t({
              en: "Find something publishable anyway. You have {n} questions you could ask and no limit on how many you ask.",
            }),
            { n: num.format(TEST_SPACE) },
          )}
        </p>
        <button
          type="button"
          onClick={() => setPhase("hunting")}
          className="rounded-lg bg-brand px-4 py-3 font-sans text-[14px] font-semibold text-paper focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        >
          {t({ en: "Open the dataset" })}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="text-[13px] text-ink-mute underline decoration-rule underline-offset-2"
        >
          {t({ en: "Not now" })}
        </button>
      </section>
    );
  }

  if (phase === "verdict") {
    return (
      <section className="mx-auto flex max-w-lg flex-col gap-4 px-4 py-8">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t({ en: "Replication" })}
        </p>
        <h1 className="font-display text-3xl leading-tight text-ink">
          {published.length === 0
            ? t({ en: "You published nothing." })
            : retracted === published.length
              ? t({ en: "All of it went." })
              : t({ en: "Most of it went." })}
        </h1>

        <ul className="flex flex-col gap-2">
          {published.map((f) => (
            <li
              key={key(f.hypothesis, f.endpoint)}
              className="rounded-lg border border-rule bg-paper-2 p-3"
            >
              <p className="text-[14px] leading-snug text-ink">
                {fillSlots(t({ en: "{group}: {endpoint}" }), {
                  group: labelOf(f.hypothesis),
                  endpoint: endpointOf(f.endpoint),
                })}
              </p>
              <p className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                {f.survived
                  ? t({ en: "Held up. This time." })
                  : t({ en: "Did not replicate" })}
              </p>
            </li>
          ))}
        </ul>

        <div className="rounded-lg border border-rule bg-paper-2 p-3.5">
          <p data-game="verdict" className="text-[15px] leading-relaxed text-ink">
            {/*
              A RESULTS LINE RATHER THAN A SENTENCE, because every version with
              prose around the numbers put a count directly before a plural
              noun: "you ran {tests} tests" needs a different noun form in
              Russian at two, three and four, and the dual in Arabic at two.
              No count in this project may stand where something has to agree
              with it, and the colon form happens to read more like the results
              section it is parodying.
            */}
            {fillSlots(
              t({
                en: "Tests run: {tests}. Published: {published}. Retracted: {retracted}.",
              }),
              {
                tests: num.format(testCount),
                published: num.format(published.length),
                retracted: num.format(retracted),
              },
            )}{" "}
            {published.length === 0
              ? t({
                  en: "Publishing none of it is the right answer, and it is why you have never heard of most honest studies.",
                })
              : t({ en: "There was never anything there." })}
          </p>
          {held > 0 ? (
            <p className="mt-2 text-[13px] leading-snug text-ink-soft">
              {t({
                en: "The ones that held up are chance twice over. Run it again and they will go too.",
              })}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-brand px-4 py-3 font-sans text-[14px] font-semibold text-paper focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        >
          {t({ en: "New dataset" })}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="text-[13px] text-ink-mute underline decoration-rule underline-offset-2"
        >
          {t({ en: "Done" })}
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto flex max-w-lg flex-col gap-3 px-4 py-6">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t({ en: "Publish or Perish" })}
        </p>
        {/*
          THE COUNTER IS THE ANTAGONIST, so it is always on screen and never
          scolds. It simply goes up.
        */}
        <p data-game="tests" className="font-sans text-[11px] tabular-nums text-ink-soft">
          {fillSlots(t({ en: "Tests run: {n}" }), { n: num.format(testCount) })}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {ENDPOINTS.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => {
              setEndpoint(e.id);
              setCurrent(null);
            }}
            className={`rounded-full border px-2.5 py-1 font-sans text-[11px] ${
              e.id === endpoint
                ? "border-brand bg-brand/10 text-brand"
                : "border-rule text-ink-soft"
            }`}
          >
            {t(e.label)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {HYPOTHESES.map((h) => {
          const seen = tested[key(h.id, endpoint)];
          return (
            <button
              key={h.id}
              type="button"
              onClick={() => run(h.id)}
              className={`rounded-md border px-2.5 py-2 text-left text-[13px] leading-snug focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand ${
                seen?.significant
                  ? "border-brand bg-brand/10 text-ink"
                  : seen
                    ? "border-rule bg-paper-3 text-ink-mute"
                    : "border-rule bg-paper-2 text-ink"
              }`}
            >
              {t(h.label)}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="min-h-24">
        {current ? (
          <div
            data-game="result"
            className={`rounded-lg border p-3.5 ${
              current.significant
                ? "border-brand bg-brand/10"
                : "border-rule bg-paper-2"
            }`}
          >
            <p className="text-[14px] leading-snug text-ink">
              {fillSlots(t({ en: "{group}: {endpoint}" }), {
                group: labelOf(current.hypothesis),
                endpoint: endpointOf(current.endpoint),
              })}
            </p>
            <p className="mt-1 text-[13px] tabular-nums text-ink-soft">
              {fillSlots(t({ en: "{a} of {na} against {b} of {nb}" }), {
                a: num.format(current.treated.events),
                na: num.format(current.treated.n),
                b: num.format(current.control.events),
                nb: num.format(current.control.n),
              })}
            </p>
            <p className="mt-1.5 font-sans text-[15px] font-semibold tabular-nums text-ink">
              {fillSlots(t({ en: "p = {p}" }), { p: current.p.toFixed(3) })}
            </p>
            {current.significant ? (
              <button
                type="button"
                onClick={publish}
                className="mt-2 rounded-lg bg-brand px-3 py-2 font-sans text-[13px] font-semibold text-paper focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
              >
                {t({ en: "Publish it" })}
              </button>
            ) : (
              <p className="mt-1 text-[13px] leading-snug text-ink-mute">
                {t({ en: "Nothing here. Try another cut." })}
              </p>
            )}
          </div>
        ) : null}
      </div>

      <p className="text-[13px] leading-snug text-ink-soft">
        {fillSlots(t({ en: "Published so far: {n}" }), {
          n: num.format(published.length),
        })}
      </p>

      <button
        type="button"
        onClick={submitForReplication}
        disabled={testCount === 0}
        className="rounded-lg border border-rule px-4 py-3 font-sans text-[14px] font-semibold text-ink disabled:opacity-40 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
      >
        {t({ en: "Send it all for replication" })}
      </button>
      <button
        type="button"
        onClick={onDone}
        className="text-[13px] text-ink-mute underline decoration-rule underline-offset-2"
      >
        {t({ en: "Leave the lab" })}
      </button>
    </section>
  );
}
