import { useEffect, useState } from "react";
import { useLocale, useT } from "../app/i18n";
import { fetchDistribution, shareOf, type Distribution } from "../app/answerStats";
import { fillSlots } from "./charts/announce";

/**
 * "Most people picked that too."
 *
 * The point of the whole tally: a loss is easier to learn from when it turns
 * out to be company rather than a personal failure, and on a deck built to fool
 * people that is the common case.
 *
 * FOUR STATES, AND THREE OF THEM DRAW NOTHING. No endpoint, a request that
 * failed, and a tally below the floor all render null rather than a hedge, a
 * spinner or a zero. A line saying "0% of players" would be a claim about
 * evidence that does not exist, on a deck whose subject is exactly that
 * mistake, and a spinner would put a network state into a beat that is supposed
 * to land.
 *
 * IT LOADS AFTER THE REVEAL, never before it. The fetch starts on mount and the
 * line appears if and when it resolves, so the reveal is never waiting on the
 * network and a slow connection costs the player nothing but this sentence.
 */
export function CompanyLine({
  slug,
  choiceId,
  wasCorrect,
}: {
  slug: string;
  choiceId: string;
  /** Chooses the wording: sharing a mistake reads differently from sharing a win. */
  wasCorrect: boolean;
}) {
  const t = useT();
  const locale = useLocale();
  const [dist, setDist] = useState<Distribution | null>(null);

  useEffect(() => {
    let live = true;
    void fetchDistribution(slug).then((d) => {
      if (live) setDist(d);
    });
    return () => {
      live = false;
    };
  }, [slug]);

  const share = shareOf(dist, choiceId);
  if (share === null) return null;

  const pct = new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(share);

  return (
    <p className="mt-3 font-sans text-[13px] leading-snug text-ink-soft">
      {fillSlots(
        wasCorrect
          ? t({ en: "{percent} of players picked that too." })
          : t({ en: "{percent} of players fell for the same one." }),
        { percent: pct },
      )}
    </p>
  );
}
