import { useEffect, useState } from "react";
import { useLocale, useT } from "../app/i18n";
import {
  certainSplit,
  fetchDistribution,
  formatShare,
  shareOf,
  type Distribution,
} from "../app/answerStats";
import { fillSlots } from "./charts/announce";

/**
 * What everybody else did, in at most two sentences.
 *
 * "Most people picked that too" is the point of the whole tally: a loss is
 * easier to learn from when it turns out to be company rather than a personal
 * failure, and on a deck built to fool people that is the common case.
 *
 * The second sentence is the one the deck is actually about. The server has
 * always returned a certain-only split, `answerDistribution` has always
 * computed it, and the client has parsed it since the endpoint shipped: it
 * reached no screen, so the best number in the product was collected, stored,
 * transported and thrown away. "38% of players who said they were certain got
 * this wrong" is the thesis of the deck stated as evidence rather than as a
 * claim, and it is the one figure here that no individual puzzle can make.
 *
 * FOUR STATES, AND THREE OF THEM DRAW NOTHING. No endpoint, a request that
 * failed, and a tally below the floor all render null rather than a hedge, a
 * spinner or a zero. A line saying "0% of players" would be a claim about
 * evidence that does not exist, on a deck whose subject is exactly that
 * mistake, and a spinner would put a network state into a beat that is
 * supposed to land.
 *
 * THE TWO LINES ARE GATED SEPARATELY, on different denominators, and neither
 * implies the other. The certain subgroup carries its own floor (see
 * `certainSplit`), and the company line additionally needs this player's own
 * option to appear in the tally, which it does not when their answer never
 * reached the server.
 *
 * IT LOADS AFTER THE REVEAL, never before it. The fetch starts on mount and a
 * line appears if and when it resolves, so the reveal never waits on the
 * network and a slow connection costs the player nothing but these sentences.
 */
export function CrowdLines({
  slug,
  choiceId,
  correctChoiceId,
  wasCorrect,
}: {
  slug: string;
  choiceId: string;
  /**
   * The option the evidence supports. Undefined draws nothing rather than
   * counting every certain player wrong; see `certainSplit`.
   */
  correctChoiceId: string | undefined;
  /** Chooses the wording: sharing a mistake reads differently from sharing a win. */
  wasCorrect: boolean;
}) {
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

  return (
    <CrowdLinesView
      dist={dist}
      choiceId={choiceId}
      correctChoiceId={correctChoiceId}
      wasCorrect={wasCorrect}
    />
  );
}

/**
 * The sentences, given a tally. Separated from the fetch above so that a test
 * can see the state a player actually reads.
 *
 * `renderToStaticMarkup` runs no effects, so a component that loads its own
 * data renders only its empty state and a test of it asserts nothing about the
 * thing on screen. Splitting the fetch off is what makes the loaded state
 * reachable, and the loaded state is where every string, slot and numeral in
 * this file lives.
 */
export function CrowdLinesView({
  dist,
  choiceId,
  correctChoiceId,
  wasCorrect,
}: {
  dist: Distribution | null;
  choiceId: string;
  correctChoiceId: string | undefined;
  wasCorrect: boolean;
}) {
  const t = useT();
  const locale = useLocale();

  const share = shareOf(dist, choiceId);
  const split = certainSplit(dist, correctChoiceId);
  if (share === null && split === null) return null;

  return (
    <div className="mt-3 flex flex-col gap-1.5 font-sans text-[13px] leading-snug text-ink-soft">
      {share !== null ? (
        <p>
          {fillSlots(
            wasCorrect
              ? t({ en: "{percent} of players picked that too." })
              : t({ en: "{percent} of players fell for the same one." }),
            { percent: formatShare(share, locale) },
          )}
        </p>
      ) : null}
      {split !== null ? (
        <p>
          {fillSlots(
            t({
              en: "{percent} of players who said they were certain got this wrong.",
            }),
            { percent: formatShare(split.wrong / split.certain, locale) },
          )}
        </p>
      ) : null}
    </div>
  );
}
