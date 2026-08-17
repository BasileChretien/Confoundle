import { todayDayNumber } from "./session";

/**
 * The client half of the anonymous answer tally.
 *
 * WHAT LEAVES THE DEVICE, and it is the whole list: the puzzle slug, which
 * option was picked, how sure the player said they were, and the day number.
 * No identifier of any kind, and nothing is attached by this module that the
 * player did not choose in the four beats. `public/privacy.html` describes
 * exactly this, and the two have to stay in step.
 *
 * THE SWITCH IS A SWITCH, not a request. Turning contribution off stops `send`
 * before it builds a body, so nothing is transmitted and there is nothing for
 * anybody to honour or ignore at the far end. That is what the policy page
 * promises and it is cheaper to keep true than to explain.
 *
 * EVERY FAILURE IS SILENT AND HARMLESS. A player's beat must never depend on
 * this: no database bound, offline, blocked by an extension, rate limited, all
 * end the same way, with the puzzle behaving exactly as it did before the
 * feature existed.
 */

const OPT_OUT_KEY = "confoundle:answers:optout:v1";

/** Contribution is on unless the player has turned it off. */
export function contributesAnswers(): boolean {
  try {
    return localStorage.getItem(OPT_OUT_KEY) !== "1";
  } catch {
    // Storage unavailable (private mode, quota). Treat as opted out: the safe
    // default when we cannot read a preference is not to transmit.
    return false;
  }
}

export function setContributesAnswers(on: boolean): void {
  try {
    if (on) localStorage.removeItem(OPT_OUT_KEY);
    else localStorage.setItem(OPT_OUT_KEY, "1");
  } catch {
    // Nothing to do. The getter fails closed, so the player ends up opted out
    // rather than silently contributing against their choice.
  }
}

export interface ChoiceTally {
  choiceId: string;
  count: number;
}

export interface Distribution {
  total: number;
  choices: ChoiceTally[];
  certain: ChoiceTally[];
}

/**
 * Send one answer. Fire and forget by design: the caller must not await this
 * on the path to the reveal.
 */
export function sendAnswer(
  slug: string,
  choiceId: string,
  confidence: string,
): void {
  if (!contributesAnswers()) return;
  const body = JSON.stringify({
    slug,
    choiceId,
    confidence,
    day: todayDayNumber(),
  });
  try {
    void fetch("/api/answers", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
      // No cookies. The tally must be identical for a signed-in player and an
      // anonymous one, and sending credentials would make that untrue even if
      // the server ignored them.
      credentials: "omit",
    }).catch(() => {});
  } catch {
    // Ignored on purpose. See the header.
  }
}

/**
 * Read what everybody else did. Returns null when there is nothing worth
 * showing, which the caller renders as nothing at all rather than as a zero.
 *
 * IT ASKS FOR EVERY ANSWER EVER GIVEN, NOT TODAY'S. `day` used to DEFAULT to
 * `todayDayNumber()`, so every request was scoped to one UTC calendar day, and
 * with `MIN_ANSWERS_TO_SHOW` at 20 the line only appeared once twenty people
 * had answered THAT slug on THAT day. Across 73 freely browsable puzzles with
 * no forced daily that needs thousands of daily players per puzzle, so the one
 * piece of social proof in the product was effectively dark in production.
 *
 * The server was always ready for this: `answerDistribution` branches on
 * `day === undefined` and runs an all-time `SUM(count) GROUP BY choice_id`,
 * and the endpoint already reads a missing `day` param as `undefined`. That
 * branch existed, was tested, and was never reached from the client, because a
 * default argument here quietly guaranteed the parameter was always sent.
 *
 * Pooling across days is also the RIGHT denominator rather than merely a
 * bigger one. `recordPlay` sends only the first answer to a slug on a given
 * day, so every counted answer is somebody meeting the figures cold; stacking
 * those across days keeps that property and only adds evidence. And the floor
 * exists partly because a tally of one or two is the only state in which an
 * aggregate could describe an individual, which a larger denominator can only
 * improve.
 *
 * `day` stays available for a caller that genuinely wants one day, and is now
 * OMITTED FROM THE QUERY when absent rather than defaulted, so the shape of
 * the request says what the caller meant.
 */
export async function fetchDistribution(
  slug: string,
  day?: number,
): Promise<Distribution | null> {
  try {
    const query = day === undefined ? "" : `&day=${day}`;
    const res = await fetch(
      `/api/answers?slug=${encodeURIComponent(slug)}${query}`,
      { credentials: "omit" },
    );
    if (!res.ok) return null;
    const d = (await res.json()) as Partial<Distribution>;
    if (typeof d.total !== "number" || !Array.isArray(d.choices)) return null;
    return { total: d.total, choices: d.choices, certain: d.certain ?? [] };
  } catch {
    return null;
  }
}

/**
 * Below this the app shows nothing. Mirrors `MIN_ANSWERS_TO_SHOW` in
 * `src/server/answers.ts`; a test asserts the two agree, because a client that
 * drew a percentage the server considers too small to be evidence would be the
 * deck making exactly the mistake it teaches against.
 */
export const MIN_ANSWERS_TO_SHOW = 20;

/** The share of players who picked `choiceId`, or null when not showable. */
export function shareOf(
  d: Distribution | null,
  choiceId: string,
): number | null {
  if (!d || d.total < MIN_ANSWERS_TO_SHOW) return null;
  const hit = d.choices.find((c) => c.choiceId === choiceId);
  if (!hit) return null;
  return hit.count / d.total;
}
