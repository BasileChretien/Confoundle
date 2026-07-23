import type { Provenance, Puzzle } from "../puzzles/schema";
import { useT } from "../app/i18n";
import { Badge, Button } from "./ui";
import { TagChips } from "./TagChips";
import { ShareLesson } from "./ShareLesson";

function linkFor(p: Provenance): string | undefined {
  return p.url ?? (p.doi ? `https://doi.org/${p.doi}` : undefined);
}

/**
 * Beat 4: the lesson. Names the portable skill and the "you'll see it
 * everywhere" takeaway. Provenance is shown here, after the reveal, off the
 * emotional path. An optional deep-dive ("see it in the wild") is collapsed by
 * default so the curious can open it without cluttering the main flow.
 */
export function LessonView({
  puzzle,
  onNext,
}: {
  puzzle: Puzzle;
  onNext: () => void;
}) {
  const t = useT();
  const { lesson, provenance, goDeeperUrl } = puzzle;
  const sourceLink = linkFor(provenance);
  const examples = lesson.examples ?? [];
  const hasDeepDive = Boolean(lesson.howItWorks) || examples.length > 0;

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-2">
        <Badge tone="brand">{t({ en: "The skill" })}</Badge>
        <h2 className="font-display text-[30px] font-semibold leading-[1.05] text-ink">
          {t(lesson.skillName)}
        </h2>
        <p className="text-lg leading-relaxed text-ink">{t(lesson.takeaway)}</p>
      </header>

      <div className="flex flex-col gap-1.5">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
          {t({ en: "Where this shows up" })}
        </span>
        <TagChips tags={puzzle.tags} />
      </div>

      {lesson.body ? (
        <p className="text-[15px] leading-relaxed text-ink-soft">
          {t(lesson.body)}
        </p>
      ) : null}

      <ShareLesson puzzle={puzzle} />

      <div className="rounded-lg border border-rule bg-paper-2 p-4 text-xs leading-relaxed text-ink-soft">
        <Badge tone="ink">{t({ en: "Source" })}</Badge>
        <p className="mt-1.5">{provenance.source}</p>
        {sourceLink ? (
          <a
            href={sourceLink}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block font-medium text-brand-ink underline decoration-brand/40 underline-offset-2 hover:decoration-brand"
          >
            {provenance.doi ? `doi:${provenance.doi}` : sourceLink}
          </a>
        ) : null}
        {provenance.note ? (
          <p className="mt-2 italic text-ink-mute">{t(provenance.note)}</p>
        ) : null}
      </div>

      {hasDeepDive ? (
        <details className="group rounded-lg border border-rule bg-paper-2">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand [&::-webkit-details-marker]:hidden">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-soft">
              {t({ en: "See it in the wild" })}
            </span>
            <svg
              className="h-4 w-4 text-ink-mute transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 8l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>

          <div className="flex flex-col gap-4 border-t border-rule px-4 pb-4 pt-3">
            {lesson.howItWorks ? (
              <div>
                <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                  {t({ en: "Why it happens" })}
                </div>
                <p className="text-[14px] leading-relaxed text-ink-soft">
                  {t(lesson.howItWorks)}
                </p>
              </div>
            ) : null}

            {examples.length > 0 ? (
              <div className="flex flex-col gap-3.5">
                <div className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-ink-mute">
                  {t({ en: "Same trap, other places" })}
                </div>
                {examples.map((ex, i) => {
                  const exLink = linkFor(ex.provenance);
                  return (
                    <div key={i}>
                      <h4 className="font-display text-base font-semibold text-ink">
                        {t(ex.title)}
                      </h4>
                      <p className="mt-0.5 text-[14px] leading-relaxed text-ink-soft">
                        {t(ex.summary)}
                      </p>
                      {exLink ? (
                        <a
                          href={exLink}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-block text-[11px] leading-snug text-brand-ink underline decoration-brand/40 underline-offset-2 hover:decoration-brand"
                        >
                          {ex.provenance.source}
                        </a>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </details>
      ) : null}

      <Button onClick={onNext}>{t({ en: "Make my card →" })}</Button>

      {goDeeperUrl ? (
        <a
          href={goDeeperUrl}
          target="_blank"
          rel="noreferrer"
          className="text-center text-sm text-ink-soft underline decoration-rule underline-offset-2 hover:text-ink"
        >
          {t({ en: "Go deeper on this idea →" })}
        </a>
      ) : null}
    </section>
  );
}
