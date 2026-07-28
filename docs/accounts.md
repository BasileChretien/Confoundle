# Accounts: how they work, and how to switch them on

Confoundle is playable with no account and always will be. An account buys
exactly one thing: **the spaced-repetition schedule follows you between
devices.** Everything else, streaks, scores, the daily puzzle, works the same
signed in or out, and a build with no backend behind it hides the account panel
entirely rather than showing something broken.

This document covers the design decisions worth arguing about, then the runbook.

---

## Why D1 rather than another KV namespace

The site already has a KV namespace (`SCORES`) for the anonymous percentile, so
the cheap answer would have been to reuse the pattern. It is the wrong shape for
accounts, for four reasons, in descending order of how much they would hurt.

**1. Two lookup keys, one record.** The whole point of the design is that the
same person can arrive through Google or through an email code and must land in
the same account. That means finding an account by `google_sub` *and* by `email`.
KV is a single-key store, so the second access path has to be a second key
holding a pointer, and the two writes are not atomic. A failure between them
leaves a dangling index entry, and a dangling index entry in an authentication
system is not a stale cache, it is a way for the wrong person to be handed an
account.

**2. Uniqueness has to be enforced, not checked.** KV has no constraints and is
eventually consistent: a read can serve a stale value while a write propagates.
Two sign-ups racing for the same address would both read "not found" and both
write, and now one human has two accounts, or worse, two humans share one. D1
has `CREATE UNIQUE INDEX`, the second insert fails, and `signInWithGoogle`
catches that failure and reads the winner. There is a test for exactly this.

**3. Erasure has to be complete and provable.** Under the GDPR "delete my
account" means everything, and being able to say what was deleted is part of
answering the request. In D1 that is one enumerated list of tables
(`PERSONAL_TABLES`), a delete each, and a row count per table returned to the
user. In KV it is "remember every key pattern anything ever wrote", which is
precisely the retrofit this project decided to avoid by building deletion in on
day one.

**4. Sessions need revocation, not just expiry.** KV's TTL handles "this token
is old". It does not handle "revoke every session for this account, now",
which is what account deletion requires.

The counter-argument is latency: KV reads at the edge are faster than D1. For a
sync that happens on sign-in and after a review, that difference is invisible,
and the free tier (5 GB, 5 million row reads a day) is orders of magnitude
beyond what this project will use.

**KV stays right for what it already does.** The score histogram is one key,
append-mostly, with no relations and no identity, and an approximate percentile
under concurrent writes is fine. Nothing above applies to it.

## Why no passwords

Most people will press the Google button and never think about it again. Storing
a password hash for the minority who would not is a permanent liability (breach
risk, reset flows, rotation, "was this hash algorithm still fine in 2029") in
exchange for nothing this app needs. So there is no password column and no plan
for one.

What replaces it is a six digit code mailed to the address. Both routes then
prove the same single fact, **control of an email address**, which is what makes
linking the two safe rather than a way to steal an account.

### The linking rule, stated plainly

- A returning Google user is matched on Google's opaque `sub`, never on their
  address, so changing their Google email does not lock them out.
- A Google sign-in whose **verified** address already has an email-only account
  attaches to it. That is the case the whole design exists for.
- An email code for an address that Google already created an account for signs
  into it. Same person, other door.
- An address already attached to a *different* `sub` is refused, loudly. That
  means a Google address moved between Google accounts, and merging on it would
  hand whoever holds the address now the history of whoever held it before.

`email_verified` being true is load-bearing in the first three. An unverified
address is not proof of anything, and the verifier rejects such tokens outright.

## Where the code lives

| Path | What it is |
|---|---|
| `migrations/0001_accounts.sql` | The D1 schema. Tests run against this exact file. |
| `src/server/` | All the logic, pure and unit tested. No Cloudflare API surface beyond hand-declared interfaces in `cf.ts`. |
| `functions/api/**` | Thin Pages Function adapters. Parse, call `src/server`, return. |
| `src/srs/remoteStore.ts` | `RemoteProgressStore`, the third implementation of `ProgressStore`, plus `syncStores`. |
| `src/app/auth.tsx` | Sign-in state for the app, and the sync that runs after signing in. |
| `src/app/AccountPanel.tsx` | The panel: sign in, download, sign out, delete. |
| `public/privacy.html` | The published privacy page, served at `/privacy.html`. |

The logic sits under `src/` rather than inside `functions/` so that `pnpm test`
covers it and `tsc` type-checks it, which is not true of the `functions/`
directory. The tests run the real SQL against an in-memory SQLite through
`node:sqlite`, so unique indexes, upserts and the linking race are exercised for
real rather than against a stub that would pass whatever it was told.

---

## Runbook: switching accounts on

Nothing below is done for you: it all needs the Cloudflare account.
**Until the `DB` binding exists the app simply hides the account panel**, so a
deployment that skips this is not broken, just accountless.

### 1. Create the database and apply the schema

```bash
npx wrangler d1 create confoundle-accounts
```

Then apply the migration to the remote database:

```bash
npx wrangler d1 execute confoundle-accounts --remote --file=migrations/0001_accounts.sql
```

Wrangler runs through `npx`, never `pnpm dlx`: under pnpm's isolated store
wrangler's miniflare cannot resolve `undici` and crashes on startup.

### 2. Bind it to the Pages project

In the Cloudflare dashboard, **Workers & Pages, Confoundle, Settings, Bindings**,
add a **D1 database binding** with variable name `DB` pointing at
`confoundle-accounts`. Do it for Production, and for Preview if you use preview
deployments.

### 3. Set the secrets and variables

```bash
# 32+ random bytes; used to key the abuse counter's one-way digests
npx wrangler pages secret put SESSION_SECRET --project-name confoundle
```

Then as plain environment variables (dashboard, or `wrangler pages deploy --var`):

| Name | Required for | Value |
|---|---|---|
| `GOOGLE_CLIENT_ID` | Google sign-in | The OAuth **Web application** client ID |
| `RESEND_API_KEY` | Email sign-in | A Resend API key (secret, not a plain var) |
| `MAIL_FROM` | Email sign-in | e.g. `Confoundle <hello@yourdomain>` |

Each route switches itself off cleanly if its configuration is absent: the
`/api/auth/session` response reports which methods this deployment actually has,
and the panel only draws the ones that work. The same rule covers the reminder
toggle, which `/api/reminders` reports as unavailable when there is no mail
provider, so the panel hides it rather than accepting a preference nothing can
honour.

### 3b. Review reminders (the scheduled sender)

Opt-in email when a review has been overdue for half a day, at most one per
account per day. All the logic is in `src/server/reminders.ts`; what follows is
only the deployment.

**It is a separate Worker, because Pages Functions cannot carry a cron
trigger.** It binds the same D1 database, so there is one accounts database with
two consumers:

```bash
# 1. Apply the migration that adds reminder_prefs
npx wrangler d1 migrations apply confoundle-accounts --remote

# 2. Put the real database id into wrangler.reminders.toml
npx wrangler d1 list

# 3. Deploy the Worker
corepack pnpm run deploy:reminders

# 4. Its secrets live on the Worker, not on Pages
npx wrangler secret put RESEND_API_KEY -c wrangler.reminders.toml
npx wrangler secret put MAIL_FROM      -c wrangler.reminders.toml
npx wrangler secret put SESSION_SECRET -c wrangler.reminders.toml
```

`SESSION_SECRET` **must be the same value the Pages project holds.** The Worker
mints each unsubscribe link as an HMAC under it, and the Pages function at
`/api/reminders/unsubscribe` verifies with its own copy. A mismatch produces
links that look perfectly normal and silently never work, which is the one
failure here that nothing else will surface.

To watch a run without waiting for 08:00 UTC:

```bash
npx wrangler tail confoundle-reminders
```

The run logs counts only, never an address. `truncated: true` means the batch
cap was reached and people were left waiting.

### 4. Google OAuth client

Google Cloud console, **APIs and Services, Credentials, Create credentials,
OAuth client ID, Web application**. No scopes and no consent-screen extras are
needed; this only ever uses the ID token.

- **Authorised JavaScript origins:** `https://confoundle.pages.dev` (plus any
  custom domain, plus `http://localhost:8788` for `wrangler pages dev`).
- **Authorised redirect URIs:** none. The button hands the token to page
  script, so there is no redirect.

Paste the client ID into `GOOGLE_CLIENT_ID`. It is public by design and is
served to the browser from `/api/auth/session`, so there is exactly one place to
configure it and no build-time copy that can drift out of step with the audience
the server checks against.

### 5. Set the contact address

The privacy page has to name a way to reach the controller, or it does not do
its job. That address is a **build variable**, not a line in the repo. On the
Git-connected Cloudflare build it is set once in the Pages dashboard. For a
local build, either pass it inline or, better, put it in a gitignored
`.env.local` so it is not retyped every time:

```bash
cp .env.example .env.local   # then fill in CONTACT_EMAIL
```

```bash
CONTACT_EMAIL=privacy@yourdomain corepack pnpm build   # or pass it inline
```

A shell variable overrides the file, so the dashboard and CI, which set the
variable, are unaffected. Two reasons the address is not committed. A plain address in a public file is a
spam-harvesting target, and this is the only address on the site. And it should
be a **dedicated address, not a personal one**: it goes on a public page, it
will be scraped, and it is the address a data-protection request arrives at, so
it wants to outlive any one mailbox. A free forwarding alias is enough.

Left unset, the placeholder survives into `dist/privacy.html` and the build
prints a warning every single time. Nothing else breaks, so a deployment
without accounts is unaffected, but accounts must not go live in that state.

### 6. Check it

```bash
npx wrangler pages dev dist --d1 DB=confoundle-accounts
```

Sign in, then in the browser console:

```js
await (await fetch("/api/auth/session", { credentials: "same-origin" })).json()
```

Then take an export, then delete the account and confirm the response reports a
row removed from each of `reminder_prefs`, `progress`, `sessions` and
`accounts`.

---

## Known gaps, honestly

- **The reminder Worker is deployed separately** from Pages and holds its own
  copy of `SESSION_SECRET`. Rotating the secret means rotating it in both
  places, or the unsubscribe links the Worker mints stop verifying at the Pages
  function that receives them. Nothing detects that mismatch automatically.
- **The email provider is a single point of failure** for the non-Google route.
  If Resend is down, that route is down; Google keeps working.
- **Rate limiting is a fixed window**, so a burst straddling the boundary can
  briefly double the nominal rate. For "how many emails may one address be sent
  per hour" that is irrelevant.
- **No email-change flow.** A Google user's address follows Google. An
  email-only user who loses their address has to make a new account, and can
  carry their progress across with the download and the import in
  `src/srs/store.ts`.
