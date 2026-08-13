# The forum link

One line of app code, and three decisions behind it that are worth writing down
because each one had an obvious alternative that is wrong.

## Why a link and not embedded comments

Discourse ships an official embedded-comments script. It is the obvious thing to
reach for and it cannot be used here.

`public/privacy.html` states that Cloudflare Web Analytics is the **only**
measurement on the site, that it sets no cookie and builds no identifier for
you. An embed loads third-party JavaScript into the page, and for anyone signed
in to the forum it carries their forum session with it. Shipping that would not
be adding a feature, it would be publishing a different privacy policy while
leaving the old one on the site.

It also breaks the offline promise. The app shell is precached and works with no
network; a comment box that renders a spinner forever when offline is a bug
report waiting to happen, on the one surface the project advertises as reliable.

So: an ordinary anchor, `target="_blank"`, and nothing from the forum ever
executes in this origin.

## Why `rel="noreferrer"` and not just `noopener`

`noopener` closes the tab-hijacking hole and does nothing about the Referer
header. Without `noreferrer` the forum learns **which card** the reader was
looking at when they clicked, which is precisely the per-card behavioural crumb
the privacy policy promises not to leave. The two attributes solve different
problems and the interesting one here is the second.

## Why a tag page and not a topic id

A topic id has to exist before the link can be written. That means seeding one
thread per card into an empty forum before the feature can ship at all, and then
keeping a slug-to-id mapping in step with the registry forever, with a test to
catch the drift, and a broken link every time a topic is merged or deleted.

A tag page needs nothing seeded. `/tag/<puzzle-slug>` renders for a tag with no
topics, and the first reader who wants to argue about a card opens the thread
that every later reader then lands on. One tag per card, named with the card's
own slug, so the mapping is the identity function and cannot drift.

**The cost, and it is the one thing to get right before switching this on:**
Discourse by default only lets staff create tags. On a fresh forum the first
reader to open a thread therefore cannot apply the tag, nobody else ever finds
it, and the scheme silently never bootstraps. Lower the minimum trust level for
creating tags, or pre-create the tags, before setting `VITE_FORUM_ORIGIN`.

## Turning it on

```bash
VITE_FORUM_ORIGIN=https://confoundle.discourse.group corepack pnpm build
```

Or set it in the Cloudflare Pages dashboard alongside `CONTACT_EMAIL`, or in a
gitignored `.env.local` for local builds.

Unset, the feature does not exist: no link is drawn on any card. That is the
right default for a fork, and it is also the right state until the forum is
ready, because a link into an empty forum is worse than no link. A value that
arrives with a path, a query, an `http` scheme, or anything unparseable is
rejected and the link disappears rather than pointing somewhere wrong. The URL
most likely to be pasted here is the one the forum owner has open, which is
`/admin`; `src/app/forum.test.ts` asserts that exact case.

## Where the link may appear, and the test that enforces it

Only on the lesson beat, after the player has committed and seen the reveal.

A forum thread about a card contains the answer to that card. A "Discuss this"
link on the setup or commit beat is therefore a button labelled "show me the
answer", and it would be put there by somebody doing something entirely
reasonable: moving a link to where it gets more clicks. Nothing in the type
system prevents that, and a rendering test would not catch it either, because
the link would render perfectly.

`src/app/forumSpoiler.test.ts` scans the source and fails if any view outside
the post-answer ones so much as mentions the forum module. It is deliberately
coarse: it does not try to understand what a reference does, only that it is not
there. It carries its own self-test, since a scan asserting an absence passes
just as happily when the matcher has stopped matching, and it was
mutation-proved by importing the module into `SetupView` and confirming the
failure names that file.

To allow a new post-answer surface, add it to `ALLOWED` in that test with a
sentence saying why it is post-answer.

## Not done here

The prerendered lesson pages under `dist/l/<slug>/` carry no forum link. They
open on the answer by design, so there is no spoiler objection; it was left out
only to keep this change to one surface. Adding it means `src/server/
lessonPage.ts` learning the origin at build time, and `LESSON_PAGE` in
`src/server/lessonPageStrings.ts` gaining the label in all ten locales.
