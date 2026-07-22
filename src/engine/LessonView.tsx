import type { Puzzle } from "../puzzles/schema";
import { useT } from "../app/i18n";
import { Badge, Button } from "./ui";

/**
 * Beat 4: the lesson. Names the portable skill and the "you'll see it
 * everywhere" takeaway. Provenance is shown here — after the reveal, off the
 * emotional path. The optional go-deeper link is kept visually secondary.
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
  const sourceLink =
    provenance.url ??
    (provenance.doi ? `https://doi.org/${provenance.doi}` : undefined);

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <Badge tone="brand">The skill</Badge>
        <h2 className="font-display text-[34px] font-semibold leading-[1.05] text-ink">
          {t(lesson.skillName)}
        </h2>
        <p className="text-lg leading-relaxed text-ink">{t(lesson.takeaway)}</p>
      </header>

      {lesson.body ? (
        <p className="text-[15px] leading-relaxed text-ink-soft">
          {t(lesson.body)}
        </p>
      ) : null}

      <div className="rounded-lg border border-rule bg-paper-2 p-4 text-xs leading-relaxed text-ink-soft">
        <Badge tone="ink">Source</Badge>
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

      <Button onClick={onNext}>Make my card →</Button>

      {goDeeperUrl ? (
        <a
          href={goDeeperUrl}
          target="_blank"
          rel="noreferrer"
          className="text-center text-sm text-ink-soft underline decoration-rule underline-offset-2 hover:text-ink"
        >
          Go deeper on this idea →
        </a>
      ) : null}
    </section>
  );
}
