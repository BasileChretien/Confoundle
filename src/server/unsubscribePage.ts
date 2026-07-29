import { localeInfo } from "../app/locales";
import { reminderStrings } from "./reminderEmail";

/**
 * The page the unsubscribe link opens.
 *
 * A self-contained document rather than a route in the app, for three reasons.
 * It arrives from an email, so the reader may not have the app installed, may
 * be signed out, and may be on a device that has never seen it. It has to work
 * with no JavaScript. And it must not depend on the SPA booting, because the
 * one thing worse than an unwanted email is an unsubscribe link that spins.
 *
 * Two states, because of how mail clients behave. A GET shows a confirm button
 * and changes NOTHING: mail clients and security scanners prefetch links, and a
 * GET that unsubscribed on sight would silently switch the feature off for
 * people who never clicked. The POST behind the button is what acts, and it is
 * also the target of the RFC 8058 one-click header, which is why it does not
 * check the request's origin: a legitimate one-click POST arrives from the mail
 * provider's servers, not from this site. The token is the authorisation.
 */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Inline, because this page has no build step and must not depend on the app's
// stylesheet existing at a hashed path. The palette is the almanac one.
const STYLE = `
  :root { color-scheme: light }
  body {
    margin: 0; min-height: 100vh; display: flex; align-items: center;
    justify-content: center; background: #f2ecde; color: #221d15;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    padding: 1.5rem; line-height: 1.5;
  }
  main { max-width: 32rem; width: 100% }
  h1 { font-size: 1.4rem; margin: 0 0 1rem; font-weight: 650 }
  p { margin: 0 0 1.25rem }
  button {
    font: inherit; font-weight: 600; cursor: pointer; border: 1px solid #221d15;
    background: #221d15; color: #f2ecde; padding: 0.7rem 1.1rem;
    border-radius: 0.4rem;
  }
  a { color: #0e8c7a }
  .quiet { opacity: 0.75; font-size: 0.9rem }
`;

function page(opts: {
  locale: string;
  title: string;
  body: string;
}): Response {
  const dir = localeInfo(opts.locale).dir;
  const html = `<!doctype html>
<html lang="${escapeHtml(opts.locale)}" dir="${dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(opts.title)}</title>
<style>${STYLE}</style>
</head>
<body><main>${opts.body}</main></body>
</html>`;
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      // Nothing here should ever be cached: the same URL renders a question
      // before the click and an answer after it.
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
    },
  });
}

/** The confirm step. Renders a form and changes nothing. */
export function unsubscribeConfirmPage(
  locale: string,
  accountId: string,
  token: string,
): Response {
  const t = reminderStrings(locale);
  return page({
    locale,
    title: t.stopTitle,
    body: `
      <h1>${escapeHtml(t.stopTitle)}</h1>
      <form method="post">
        <input type="hidden" name="a" value="${escapeHtml(accountId)}">
        <input type="hidden" name="t" value="${escapeHtml(token)}">
        <input type="hidden" name="l" value="${escapeHtml(locale)}">
        <button type="submit">${escapeHtml(t.stopConfirm)}</button>
      </form>`,
  });
}

/**
 * The done step.
 *
 * Deliberately identical whether or not the token was any good. A page that
 * said "no such account" would turn this endpoint into a way of testing
 * whether a given account id exists, and the person holding a broken link
 * cannot act on the difference anyway.
 */
export function unsubscribeDonePage(locale: string): Response {
  const t = reminderStrings(locale);
  return page({
    locale,
    title: t.stopTitle,
    body: `
      <h1>${escapeHtml(t.stopTitle)}</h1>
      <p>${escapeHtml(t.stopDone)}</p>
      <p class="quiet"><a href="/">Confoundle</a></p>`,
  });
}
