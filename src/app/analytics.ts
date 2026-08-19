import { contributesAnswers } from "./answerStats";
import type { EventName } from "../server/events";

/**
 * The funnel counter, which counted nothing until now.
 *
 * This module has existed since Phase 0 with eight fixed event names and every
 * call site wired to it, and `track` was a comment saying "intentionally no
 * network call". So the app knew where every player stopped and told nobody,
 * and the one question that decides what to build next was unanswerable. The
 * reveal became something you drag rather than something you wait for, and
 * there was no way to tell whether anybody drags it.
 *
 * IT GOES TO THIS PROJECT'S OWN DATABASE, not to an analytics company. The
 * alternative was a hosted service, which would put every visitor's traffic in
 * front of a new processor, add a script tag to a page that loads none, and
 * hand a third party the browsing of people reading about statistical
 * deception. `src/server/events.ts` and `functions/api/event.ts` are the same
 * shape as the answer tally one file over.
 *
 * WHAT LEAVES THE DEVICE, and it is the whole list: which of eight named steps
 * was reached, and which puzzle it happened in. No identifier, no session, no
 * clock time, no ordering. The server supplies the day. It is not possible to
 * learn from this table that one person did commit and then reveal_view; it
 * counts events, never journeys, and that is the price of a table that cannot
 * describe anybody.
 *
 * IT OBEYS THE SAME SWITCH AS THE ANSWER TALLY, and the switch's own wording
 * was rewritten to say so in the same commit. One control for one guarantee:
 * both are anonymous aggregates with no identifier, and offering two checkboxes
 * for one promise is consent theatre rather than consent. `public/privacy.html`
 * promised that if this module ever stopped being a stub, that page would
 * change with it in the same commit. This is that commit.
 *
 * EVERY FAILURE IS SILENT AND HARMLESS, as in `answerStats`: no database bound,
 * offline, blocked, rate limited, all end with the app behaving exactly as it
 * did before the feature existed.
 */
export type AnalyticsEvent = EventName;

export function track(
  event: AnalyticsEvent,
  props: { slug?: string } = {},
): void {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, props);
  }
  if (!contributesAnswers()) return;

  // `props` is narrowed to the one field the table has a column for, so a
  // caller passing more cannot widen what is transmitted by accident. Anything
  // richer is a schema change and a policy change, deliberately.
  const body = JSON.stringify({ event, slug: props.slug });
  try {
    void fetch("/api/event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
      // No cookies. The count must be identical for a signed-in player and an
      // anonymous one, and sending credentials would make that untrue even if
      // the server ignored them.
      credentials: "omit",
    }).catch(() => {});
  } catch {
    // Ignored on purpose. See the header.
  }
}
