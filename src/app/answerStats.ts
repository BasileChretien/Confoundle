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

/**
 * THE KEY NAMES WHAT IT GOVERNS, and for a while it named half of it.
 *
 * It was `confoundle:answers:optout:v1` while it controlled only the answer
 * tally. When the funnel counter began obeying the same switch, the label and
 * the blurb were rewritten and this was not, so a maintainer grepping for what
 * the answers opt-out covers would have undercounted by a whole feature. That
 * is the same shape as a guard whose name promises more than its glob delivers,
 * which this project has been bitten by twice.
 *
 * The old key is still read once, so nobody who turned contribution off has it
 * silently turned back on by a rename. It is not written again: the first write
 * under the new name settles it.
 */
const OPT_OUT_KEY = "confoundle:contribute:optout:v1";
const LEGACY_OPT_OUT_KEY = "confoundle:answers:optout:v1";

/** Contribution is on unless the player has turned it off. */
export function contributesAnswers(): boolean {
  try {
    if (localStorage.getItem(OPT_OUT_KEY) === "1") return false;
    // A rename must not re-enable a contribution somebody switched off.
    return localStorage.getItem(LEGACY_OPT_OUT_KEY) !== "1";
  } catch {
    // Storage unavailable (private mode, quota). Treat as opted out: the safe
    // default when we cannot read a preference is not to transmit.
    return false;
  }
}

export function setContributesAnswers(on: boolean): void {
  try {
    if (on) {
      localStorage.removeItem(OPT_OUT_KEY);
      // Turning it back on has to clear the old name too, or the legacy read
      // above would keep answering "off" forever.
      localStorage.removeItem(LEGACY_OPT_OUT_KEY);
    } else {
      localStorage.setItem(OPT_OUT_KEY, "1");
    }
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
 * A tally list, or null if the body is not one.
 *
 * `Array.isArray(d.choices)` was the whole check, and it was enough only while
 * nothing walked the entries. `certain` was not checked at all, because until
 * the certainty line existed nothing read it: `d.certain ?? []` passed any
 * truthy value straight through to a caller that never came.
 *
 * The certainty line made it a live path on every reveal. `certainSplit` calls
 * `.reduce` and `.find` synchronously during render, so a `certain` that is not
 * an array throws INSIDE a render rather than returning a bad number, and there
 * is no error boundary in this app: it would take down the whole tree. The
 * module promises the opposite in its own header, that every failure here costs
 * the player nothing but a sentence, and that promise has to be kept at the
 * boundary rather than hoped for from the server.
 *
 * It refuses the whole body rather than dropping bad entries. A tally with some
 * of its rows silently discarded is a denominator that no longer counts what it
 * says it counts, which on this deck is the one kind of wrong number that must
 * never be drawn.
 */
function tallies(v: unknown): ChoiceTally[] | null {
  if (!Array.isArray(v)) return null;
  const out: ChoiceTally[] = [];
  for (const row of v) {
    if (typeof row !== "object" || row === null) return null;
    const { choiceId, count } = row as Partial<ChoiceTally>;
    if (typeof choiceId !== "string") return null;
    if (typeof count !== "number" || !Number.isFinite(count) || count < 0) {
      return null;
    }
    out.push({ choiceId, count });
  }
  return out;
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
    const choices = tallies(d.choices);
    const certain = d.certain === undefined ? [] : tallies(d.certain);
    if (
      typeof d.total !== "number" ||
      !Number.isFinite(d.total) ||
      choices === null ||
      certain === null
    ) {
      return null;
    }
    return { total: d.total, choices, certain };
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

/**
 * A share as a percentage, in the reader's locale, that never says zero about
 * something that happened.
 *
 * `maximumFractionDigits: 0` on its own was already drawing a falsehood. The
 * floor constrains the denominator from below and not from above, so one
 * player in 500 rounds to "0%", and the company line would tell that player
 * "0% of players fell for the same one" while they sit looking at their own
 * answer, which is one of them. A deck about not believing a number more than
 * its collection method supports cannot round a person out of existence.
 *
 * Below half a percent it switches to a single significant figure, the
 * smallest change that cannot print zero for a non-zero share: 1 in 2500 draws
 * 0.04%. At or above half a percent the output is byte for byte what shipped,
 * so no figure a player has already seen moves.
 */
export function formatShare(share: number, locale: string): string {
  const digits: Intl.NumberFormatOptions =
    share > 0 && share < 0.005
      ? { maximumSignificantDigits: 1 }
      : { maximumFractionDigits: 0 };
  return new Intl.NumberFormat(locale, {
    style: "percent",
    ...digits,
  }).format(share);
}

/**
 * Of the players who staked `certain`, how many picked something other than
 * the answer the evidence supports.
 *
 * THE FLOOR IS ON THIS SUBGROUP, NOT ON THE PARENT TALLY, which is the whole
 * reason this is a function and not two lines at the call site. `total >= 20`
 * says nothing about how many of those twenty were certain, so a puzzle with
 * 25 answers of which 3 were certain would otherwise draw "67% of players who
 * were certain got this wrong" from a denominator of three. That is precisely
 * the mistake the deck teaches against, and the privacy half of the argument
 * behind `MIN_ANSWERS_TO_SHOW` binds harder on a subgroup than on the whole,
 * because the smaller cell is the likelier one to describe somebody.
 *
 * Fails closed on a missing `correctChoiceId`. The schema guarantees exactly
 * one correct choice per puzzle, but a caller that cannot find it must draw
 * nothing rather than count every certain player wrong.
 */
export function certainSplit(
  d: Distribution | null,
  correctChoiceId: string | undefined,
): { wrong: number; certain: number } | null {
  if (!d || correctChoiceId === undefined) return null;
  const certain = d.certain.reduce((n, c) => n + c.count, 0);
  if (certain < MIN_ANSWERS_TO_SHOW) return null;
  const right =
    d.certain.find((c) => c.choiceId === correctChoiceId)?.count ?? 0;
  return { wrong: certain - right, certain };
}
