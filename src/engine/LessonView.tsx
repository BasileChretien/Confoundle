import type { Puzzle } from "../puzzles/schema";
import { useT } from "../app/i18n";
import { Badge, Button } from "./ui";

/**
 * Beat 4: the lesson. Names the portable skill and the "you'll see it
 * everywhere" takeaway. Provenance is shown here — after the reveal, off the
 * emotional path (a citation inside the reveal would kill the beat). The
 * optional go-deeper link is kept visually secondary.
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
        <Badge>The skill</Badge>
        <h2 className="text-3xl font-extrabold leading-tight text-white">
          {t(lesson.skillName)}
        </h2>
        <p className="text-lg font-medium leading-relaxed text-indigo-100">
          {t(lesson.takeaway)}
        </p>
      </header>

      {lesson.body ? (
        <p className="text-[15px] leading-relaxed text-slate-300">
          {t(lesson.body)}
        </p>
      ) : null}

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-slate-400">
        <div className="mb-1 font-semibold uppercase tracking-wide text-slate-500">
          Source
        </div>
        <p>{provenance.source}</p>
        {sourceLink ? (
          <a
            href={sourceLink}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block text-indigo-300 underline decoration-indigo-300/40 underline-offset-2 hover:text-indigo-200"
          >
            {provenance.doi ? `doi:${provenance.doi}` : sourceLink}
          </a>
        ) : null}
        {provenance.note ? (
          <p className="mt-2 italic text-slate-500">{t(provenance.note)}</p>
        ) : null}
      </div>

      <Button onClick={onNext}>Make my card →</Button>

      {goDeeperUrl ? (
        <a
          href={goDeeperUrl}
          target="_blank"
          rel="noreferrer"
          className="text-center text-sm text-slate-400 underline decoration-slate-600 underline-offset-2 hover:text-slate-200"
        >
          Go deeper on this idea →
        </a>
      ) : null}
    </section>
  );
}
