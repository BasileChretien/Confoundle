# Data inventory

Developer-facing companion to the published policy at
[`public/privacy.html`](../public/privacy.html), served at `/privacy.html`.

The policy is what a user reads. This is the version with file paths in it: what
is stored, where in the code it is written, and how to check the claims are
still true. If a change makes a row here wrong, the policy is wrong too and both
have to move together.

**Controller:** Basile Chretien, as an individual, non-commercial project.
**Regimes that apply:** GDPR (the controller is established in France) and
Japan's APPI (the controller is resident in Japan). Users elsewhere get the same
treatment; there is no cheaper tier of care by geography.

---

## Everything that is stored

### On the user's own device (no account needed, never transmitted)

| Key | Contents | Written by |
|---|---|---|
| `confoundle:progress:v1` | Which puzzle was played on which local date, the answer, the confidence | `src/app/session.ts` |
| `confoundle:learned:v1` | Which reasoning skills have been taught | `src/app/session.ts` |
| `confoundle:hunt:v1` | Trap Hunt round counters | `src/app/session.ts` |
| `confoundle:friends:v1` | Results friends pasted in, by nickname | `src/app/session.ts` |
| `confoundle:name` | A nickname, for the local friends board | `src/app/session.ts` |
| `confoundle:srs:v1` | The spaced-repetition schedule | `src/srs/store.ts` |
| `confoundle:locale` | Chosen language | `src/app/i18n.tsx` |

None of this leaves the browser unless the user signs in, and even then **only
`confoundle:srs:v1` syncs.** Streaks, scores, answers and the friends board are
deliberately not part of an account: they are not needed to make reviews follow a
learner between devices, so they stay local.

### On the server (only for users who sign in)

| Table | Column | What it is | Basis | Retention |
|---|---|---|---|---|
| `accounts` | `id` | Random opaque id. Not derived from the email, so it can appear in a log without being personal data | 6(1)(b) | Until erased |
| | `email` | Normalised address. The identity | 6(1)(b) | Until erased |
| | `google_sub` | Google's opaque subject id, null unless linked | 6(1)(b) | Until erased |
| | `created_at`, `updated_at` | Timestamps | 6(1)(b) | Until erased |
| `sessions` | `token_hash` | SHA-256 of the cookie's token. The token itself is stored nowhere | 6(1)(b) | 90 days |
| | `account_id`, `created_at`, `expires_at` | | 6(1)(b) | 90 days |
| `progress` | `skill`, `stage`, `due_at`, `seen_item_ids`, `misconceived`, `correct`, `wrong`, `updated_at` | The review schedule, one row per reasoning skill | 6(1)(b) | Until erased |
| `email_codes` | `email` | An address that has asked for a code and not yet used it. The only place an address exists before it is an account | 6(1)(b) | 10 minutes |
| | `code_hash`, `expires_at`, `attempts`, `sent_at` | | 6(1)(b) | 10 minutes |
| `rate_limits` | `bucket` | `ip:` plus a truncated HMAC of the client address under `SESSION_SECRET`, or `email:` plus a truncated SHA-256 | 6(1)(f) | 24 hours |
| | `count`, `window_start` | | 6(1)(f) | 24 hours |
| `reminder_prefs` | `opted_in` | Whether review reminders were asked for. No row at all until somebody opens the setting, so "never asked" and "asked then withdrew" stay distinguishable | 6(1)(a) | Until erased |
| | `locale` | Which of the ten languages to write the reminder in. Captured when the box is ticked | 6(1)(a) | Until erased |
| | `last_sent_at` | When the last reminder went out. This column IS the once-a-day guarantee | 6(1)(a) | Until erased |
| | `created_at`, `updated_at` | Timestamps. `updated_at` is the record of when consent was given or withdrawn | 6(1)(a) | Until erased |

Consent, not legitimate interests, for `reminder_prefs`: an unsolicited
recurring email is exactly the case consent exists for, and the withdrawal path
has to be as easy as the giving. It is, and then some, because the unsubscribe
in each message needs no sign-in. There is no unsubscribe-token column: the
token is `HMAC(SESSION_SECRET, "unsubscribe:" + account_id)`, recomputed to
verify, so nothing extra is stored and rotating the secret invalidates every
outstanding link at once.

The legitimate-interests balancing for `rate_limits`: without a counter, the
code endpoint mails arbitrary addresses on demand, which harms the people
receiving unwanted mail more than a one-way, keyed, 24 hour counter harms the
sender. The address is never written down and the digest cannot be checked
against a guess without the server secret.

### The one KV namespace, which predates accounts

`SCORES` (`functions/api/score.ts`) holds `puzzle:<slug>` to a histogram of
scores. It held `day:<n>` until the percentile drawn from it was found to be
ranking a score earned on one card against scores earned on others; the old
keys are never read again and nothing was migrated, because which card a
stored score belonged to was never recorded.
There is no identifier in it and no way to single anyone out, so it is not
personal data and is unaffected by an erasure request. It is also why KV is
still the right store for that and the wrong one for accounts, argued in
[`accounts.md`](./accounts.md).

---

## What is deliberately not collected

No name, no profile picture, no Google scopes beyond identity, no access or
refresh token, no IP address in any durable form, no device fingerprint, no
advertising identifier, no behavioural profile.
`src/app/analytics.ts` is still a no-op stub with fixed event names and must
stay one: the in-app funnel is deliberately not wired to anything.

### Aggregate visit counting (the one exception, added 2026-07-28)

`vite.config.ts` injects the **Cloudflare Web Analytics** beacon into
`index.html` when `CF_ANALYTICS_TOKEN` is set, and injects nothing at all when
it is not (so a fork reports nothing to anyone). Published as the "How visits
are counted" section of `public/privacy.html`, which has to move with this.

What makes it compatible with everything above: it sets no cookie, writes
nothing to browser storage, derives no visitor id and no fingerprint, and is
scoped to this origin. It collects page address, referrer, country, browser and
device class, in aggregate. It cannot be joined to an account, and it is not
personal data under this design, so an erasure request has nothing to erase in
it. That last point is why it is documented here but has no row in
`PERSONAL_TABLES`.

**The limit worth knowing before anyone plans around it:** with no visitor
identifier, it cannot measure returning readers, retention or a funnel. It
answers "how many arrived and from where", not "did they finish the puzzle" or
"did they come back on day 7". Answering those needs a first-party event store
(Workers Analytics Engine is the option that keeps every promise above); it is
not what this is.

The beacon needs two CSP entries in `public/_headers` and they are different
hostnames: `static.cloudflareinsights.com` in `script-src` (the script) and
`cloudflareinsights.com` in `connect-src` (where it POSTs). Setting only the
first is the standard way this ends up silently reporting nothing.

The single-file build (`SINGLEFILE=1`) never gets the beacon: it is handed to
people as a file and must not phone home from whatever machine opens it.

---

## Recipients

| Who | Role | Sees |
|---|---|---|
| Cloudflare | Processor | Hosting and the database. As any host does, request metadata including IP addresses, under its own terms. Also the aggregate visit counts described above |
| The configured mail provider (Resend by default) | Processor | The address a sign-in code goes to, and the code. Also the address a review reminder goes to, and how many skills are overdue, for anyone who opted in |
| Google | Independent controller | Only if the user presses the Google button: that they signed into this application |

Nobody else. Nothing is sold, rented or shared for marketing.

---

## The rights, and where they are implemented

| Right | How | Code |
|---|---|---|
| Access and portability | "Download my data" in the account panel | `functions/api/account.ts` `onRequestGet` |
| Erasure | "Delete my account", immediate, no grace period | `functions/api/account.ts` `onRequestDelete` to `deleteAccount` |
| Rectification | An address is changed by signing in through Google, whose address is authoritative | `signInWithGoogle` in `src/server/accounts.ts` |
| Restriction / objection | Sign out, or delete. There is no processing that survives either | |

Erasure is the one worth auditing, because it is the one that silently rots:
adding a table that holds personal data without adding it to `PERSONAL_TABLES`
would leave data behind after a deletion that reported success.

`src/server/accounts.test.ts` guards this. It creates an account with sessions
and progress, deletes it, and then asserts **zero rows remain in every table in
`PERSONAL_TABLES`**, so extending that list is the only thing a future
contributor has to remember, and forgetting it fails CI rather than shipping.

## How to re-check these claims

```bash
corepack pnpm test          # includes the erasure and no-leak tests
```

Then read, in order: `migrations/0001_accounts.sql` (nothing is stored that is
not a column here), `src/server/accounts.ts` (`PERSONAL_TABLES`), and
`src/srs/remoteStore.ts` (the only thing the client uploads).
