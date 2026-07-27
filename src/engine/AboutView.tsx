import { useT } from "../app/i18n";
import { UI } from "../app/ui";
import { ConfounderMark } from "./Confounder";
import { Button } from "./ui";

/**
 * The pitch: what this is, how it works, who it is for, and why it can be
 * trusted. Shown inline to a newcomer (who needs telling) and on its own
 * `?about=1` route to anyone who taps About later. One component, two mounts,
 * so the two never drift.
 *
 * Deliberately not a marketing wall: four short sections, each earning the next
 * tap. Open-source is left off for now (the repo is still private); free,
 * private and cited are the promises that hold today.
 */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="w-6 shrink-0 font-display text-[26px] font-semibold leading-none tabular-nums text-gold">
        {n}
      </span>
      <span className="pt-1 text-[14px] leading-snug text-ink-soft">{children}</span>
    </li>
  );
}

/** A ruled list item: the almanac ledger look, no bullet glyph. */
function Point({ children }: { children: React.ReactNode }) {
  return (
    <li className="py-2.5 text-[14px] leading-snug text-ink-soft">{children}</li>
  );
}

export function AboutContent({
  onStart,
  onOpenLesson,
}: {
  onStart: () => void;
  onOpenLesson: (slug: string) => void;
}) {
  const t = useT();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <ConfounderMark size={64} />
        <div className="flex flex-col">
          <span className="font-display text-[22px] font-semibold leading-tight text-ink">
            {t(UI.pitch)}
          </span>
          <span className="font-display text-[15px] italic text-ink-soft">
            {t(UI.aboutTagline)}
          </span>
        </div>
      </div>

      <Section title={t(UI.aboutGoalTitle)}>
        <p className="text-[15px] leading-snug text-ink">{t(UI.aboutGoalBody)}</p>
      </Section>

      <Section title={t(UI.aboutHowTitle)}>
        <ol className="flex flex-col gap-2.5">
          <Step n={1}>{t(UI.aboutHowSetup)}</Step>
          <Step n={2}>{t(UI.aboutHowReveal)}</Step>
          <Step n={3}>{t(UI.aboutHowLesson)}</Step>
        </ol>
      </Section>

      <Section title={t(UI.aboutWhoTitle)}>
        <ul className="divide-y divide-rule border-y border-rule">
          <Point>{t(UI.aboutWhoEveryday)}</Point>
          <Point>{t(UI.aboutWhoClinical)}</Point>
        </ul>
      </Section>

      <Section title={t(UI.aboutWhyTitle)}>
        <ul className="divide-y divide-rule border-y border-rule">
          <Point>{t(UI.aboutWhyCited)}</Point>
          <Point>{t(UI.aboutWhyFree)}</Point>
          <Point>{t(UI.aboutWhyPrivate)}</Point>
          <Point>{t(UI.aboutWhyOffline)}</Point>
        </ul>
        <button
          type="button"
          onClick={() => onOpenLesson("relative-risk")}
          className="mt-1 self-start rounded-md font-sans text-[12px] font-semibold text-brand underline decoration-brand/40 underline-offset-4 transition hover:decoration-brand focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        >
          {t(UI.aboutSeeLesson)} →
        </button>
      </Section>

      <Button onClick={onStart}>{t(UI.aboutCta)}</Button>
    </div>
  );
}

/** The stand-alone About screen (?about=1), reachable from the header link. */
export function AboutView({
  onBack,
  onStart,
  onOpenLesson,
}: {
  onBack: () => void;
  onStart: () => void;
  onOpenLesson: (slug: string) => void;
}) {
  const t = useT();
  return (
    <section className="flex flex-col gap-5">
      <button
        type="button"
        onClick={onBack}
        className="-ms-2 inline-flex min-h-11 items-center gap-1.5 self-start rounded-md px-2 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-mute transition hover:text-ink focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
      >
        ← {t(UI.back)}
      </button>
      <AboutContent onStart={onStart} onOpenLesson={onOpenLesson} />
    </section>
  );
}
