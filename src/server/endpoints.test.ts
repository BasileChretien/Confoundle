import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";
import { onRequestPost as googleSignIn } from "../../functions/api/auth/google";
import {
  onRequestGet as getSession,
  onRequestDelete as signOut,
} from "../../functions/api/auth/session";
import { onRequestPost as startEmail } from "../../functions/api/auth/email/start";
import { onRequestPost as verifyEmail } from "../../functions/api/auth/email/verify";
import {
  onRequestGet as getProgress,
  onRequestPut as putProgress,
  onRequestDelete as wipeProgress,
} from "../../functions/api/progress";
import {
  onRequestGet as exportAccount,
  onRequestDelete as eraseAccount,
} from "../../functions/api/account";
import { createTestDatabase, type TestDatabase } from "./testing/sqliteD1";
import { loadMigration } from "./testing/schema";
import { resetGoogleKeyCache, type Jwk } from "./googleToken";
import { toBase64Url } from "./crypto";
import { SESSION_COOKIE } from "./http";
import type { Env } from "./cf";

/**
 * The endpoints themselves, driven end to end.
 *
 * Two reasons this test earns its keep beyond the unit tests underneath it.
 *
 * First, `functions/` is outside the tsconfig `include`, so nothing type-checks
 * it. Importing the handlers here pulls them into the program through the
 * import graph, which means a mistyped relative path in a function stops being
 * something you discover in production.
 *
 * Second, the flows only exist at this level. "Sign in by email, then by
 * Google, and find the same account with its progress intact" is not a property
 * of any one module.
 *
 * `fetch` is stubbed to stand in for Google's key endpoint and the mail
 * provider, which also lets the test read the code out of the email exactly as
 * a user would.
 */

const ORIGIN = "https://confoundle.pages.dev";
const CLIENT_ID = "1234.apps.googleusercontent.com";

let keys: CryptoKeyPair;
let jwks: Jwk[];
let sentMail: { to: string; text: string }[] = [];
let db: TestDatabase;
let env: Env;

beforeAll(async () => {
  keys = (await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  )) as CryptoKeyPair;
  jwks = [{ ...((await crypto.subtle.exportKey("jwk", keys.publicKey)) as Jwk), kid: "k1" }];
});

beforeEach(() => {
  db = createTestDatabase(loadMigration());
  env = {
    DB: db,
    GOOGLE_CLIENT_ID: CLIENT_ID,
    SESSION_SECRET: "test-secret",
    RESEND_API_KEY: "test-key",
    MAIL_FROM: "Confoundle <hello@example.org>",
  };
  sentMail = [];
  resetGoogleKeyCache();

  vi.stubGlobal("fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url.includes("googleapis.com")) {
      return new Response(JSON.stringify({ keys: jwks }), { status: 200 });
    }
    if (url.includes("api.resend.com")) {
      const body = JSON.parse(String(init?.body)) as { to: string; text: string };
      sentMail.push(body);
      return new Response("{}", { status: 200 });
    }
    throw new Error(`unexpected fetch to ${url}`);
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  db.close();
});

/* ---- helpers ---------------------------------------------------------- */

function request(path: string, init: RequestInit & { cookie?: string } = {}): Request {
  const headers = new Headers(init.headers);
  headers.set("origin", ORIGIN);
  headers.set("content-type", "application/json");
  if (init.cookie) headers.set("cookie", `${SESSION_COOKIE}=${init.cookie}`);
  return new Request(`${ORIGIN}${path}`, { ...init, headers });
}

function cookieFrom(response: Response): string {
  const header = response.headers.get("set-cookie") ?? "";
  return /__Host-confoundle_session=([^;]*)/.exec(header)?.[1] ?? "";
}

async function body<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

async function googleToken(sub: string, email: string, verified = true): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const encode = (v: unknown) => toBase64Url(new TextEncoder().encode(JSON.stringify(v)));
  const input = `${encode({ alg: "RS256", kid: "k1" })}.${encode({
    iss: "https://accounts.google.com",
    aud: CLIENT_ID,
    sub,
    email,
    email_verified: verified,
    iat: now - 5,
    exp: now + 3600,
  })}`;
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    keys.privateKey,
    new TextEncoder().encode(input),
  );
  return `${input}.${toBase64Url(new Uint8Array(signature))}`;
}

async function signInByGoogle(sub: string, email: string): Promise<string> {
  const response = await googleSignIn({
    request: request("/api/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential: await googleToken(sub, email) }),
    }),
    env,
  });
  expect(response.status).toBe(200);
  return cookieFrom(response);
}

async function signInByEmail(email: string): Promise<string> {
  const started = await startEmail({
    request: request("/api/auth/email/start", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
    env,
  });
  expect(started.status).toBe(200);
  const code = /\b(\d{6})\b/.exec(sentMail[sentMail.length - 1]?.text ?? "")?.[1];
  expect(code).toBeTruthy();

  const verified = await verifyEmail({
    request: request("/api/auth/email/verify", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    }),
    env,
  });
  expect(verified.status).toBe(200);
  return cookieFrom(verified);
}

const SKILL = {
  skill: "immortal-time-bias",
  stage: 4,
  dueAt: 1_760_000_000_000,
  seenItemIds: ["it-1"],
  misconceived: false,
  lifetime: { correct: 3, wrong: 1 },
  updatedAt: 1_760_000_000_000,
};

/* ---- the tests -------------------------------------------------------- */

describe("what the client sees before signing in", () => {
  it("reports which methods this deployment really has", async () => {
    const response = await getSession({ request: request("/api/auth/session"), env });
    expect(await body(response)).toEqual({
      account: null,
      methods: { googleClientId: CLIENT_ID, email: true },
    });
  });

  it("offers nothing when nothing is configured", async () => {
    const bare = await getSession({ request: request("/api/auth/session"), env: {} as Env });
    expect(await body(bare)).toEqual({
      account: null,
      methods: { googleClientId: null, email: false },
    });
  });

  it("offers Google but not email when there is no mail provider", async () => {
    const response = await getSession({
      request: request("/api/auth/session"),
      env: { ...env, RESEND_API_KEY: undefined },
    });
    const parsed = await body<{ methods: { email: boolean; googleClientId: string | null } }>(
      response,
    );
    expect(parsed.methods).toEqual({ googleClientId: CLIENT_ID, email: false });
  });
});

describe("signing in", () => {
  it("works with Google and sets a session", async () => {
    const cookie = await signInByGoogle("g-1", "learner@example.org");
    expect(cookie).not.toBe("");

    const me = await getSession({ request: request("/api/auth/session", { cookie }), env });
    const parsed = await body<{ account: { email: string; hasGoogle: boolean } }>(me);
    expect(parsed.account).toMatchObject({ email: "learner@example.org", hasGoogle: true });
  });

  it("works with an emailed code, and mails a code that expires", async () => {
    const cookie = await signInByEmail("learner@example.org");
    expect(sentMail).toHaveLength(1);
    expect(sentMail[0].to).toBe("learner@example.org");
    expect(sentMail[0].text).toMatch(/ten minutes|10 minutes/);
    // The recipient may not have asked for this, and must be told so.
    expect(sentMail[0].text).toMatch(/did not ask/i);

    const me = await getSession({ request: request("/api/auth/session", { cookie }), env });
    const parsed = await body<{ account: { hasGoogle: boolean } }>(me);
    expect(parsed.account.hasGoogle).toBe(false);
  });

  it("refuses a token issued to another application", async () => {
    const response = await googleSignIn({
      request: request("/api/auth/google", {
        method: "POST",
        body: JSON.stringify({ credential: await googleToken("g-1", "a@example.org") }),
      }),
      env: { ...env, GOOGLE_CLIENT_ID: "someone-else" },
    });
    expect(response.status).toBe(401);
    expect(await body(response)).toEqual({ error: "bad-credential" });
  });

  it("refuses a request that did not come from our own page", async () => {
    const headers = new Headers({ origin: "https://evil.example", "content-type": "application/json" });
    const response = await googleSignIn({
      request: new Request(`${ORIGIN}/api/auth/google`, {
        method: "POST",
        headers,
        body: JSON.stringify({ credential: "x" }),
      }),
      env,
    });
    expect(response.status).toBe(403);
  });

  it("sends no mail and says nothing useful for a junk address", async () => {
    const response = await startEmail({
      request: request("/api/auth/email/start", {
        method: "POST",
        body: JSON.stringify({ email: "not-an-address" }),
      }),
      env,
    });
    expect(response.status).toBe(400);
    expect(sentMail).toHaveLength(0);
  });

  it("refuses a wrong code", async () => {
    await startEmail({
      request: request("/api/auth/email/start", {
        method: "POST",
        body: JSON.stringify({ email: "learner@example.org" }),
      }),
      env,
    });
    const response = await verifyEmail({
      request: request("/api/auth/email/verify", {
        method: "POST",
        body: JSON.stringify({ email: "learner@example.org", code: "000000" }),
      }),
      env,
    });
    expect(response.status).toBe(401);
    expect(cookieFrom(response)).toBe("");
  });
});

describe("the same person arriving by both doors", () => {
  it("finds one account, with the progress from either visit", async () => {
    // Day one: email code, and a review gets done.
    const first = await signInByEmail("same@example.org");
    await putProgress({
      request: request("/api/progress", { method: "PUT", cookie: first, body: JSON.stringify({ skills: [SKILL] }) }),
      env,
    });

    // Day two, another device: the Google button, same address.
    const second = await signInByGoogle("g-99", "same@example.org");
    const response = await getProgress({ request: request("/api/progress", { cookie: second }), env });
    const parsed = await body<{ skills: { skill: string; stage: number }[] }>(response);
    expect(parsed.skills).toEqual([SKILL]);

    // And it is one account, not two.
    const { results } = await db.prepare("SELECT id FROM accounts").all();
    expect(results).toHaveLength(1);
  });
});

describe("progress sync", () => {
  it("needs a session", async () => {
    const response = await getProgress({ request: request("/api/progress"), env });
    expect(response.status).toBe(401);
    expect(await body(response)).toEqual({ error: "not-signed-in" });
  });

  it("round-trips, and hands back the merged set", async () => {
    const cookie = await signInByGoogle("g-1", "learner@example.org");
    const put = await putProgress({
      request: request("/api/progress", { method: "PUT", cookie, body: JSON.stringify({ skills: [SKILL] }) }),
      env,
    });
    expect(await body(put)).toEqual({ skills: [SKILL] });

    const get = await getProgress({ request: request("/api/progress", { cookie }), env });
    expect(await body(get)).toEqual({ skills: [SKILL] });
  });

  it("rejects a malformed payload rather than storing part of it", async () => {
    const cookie = await signInByGoogle("g-1", "learner@example.org");
    const response = await putProgress({
      request: request("/api/progress", {
        method: "PUT",
        cookie,
        body: JSON.stringify({ skills: [{ ...SKILL, stage: "four" }] }),
      }),
      env,
    });
    expect(response.status).toBe(400);
    const get = await getProgress({ request: request("/api/progress", { cookie }), env });
    expect(await body(get)).toEqual({ skills: [] });
  });

  it("never shows one account another's progress", async () => {
    const mine = await signInByGoogle("g-1", "mine@example.org");
    await putProgress({
      request: request("/api/progress", { method: "PUT", cookie: mine, body: JSON.stringify({ skills: [SKILL] }) }),
      env,
    });
    const theirs = await signInByGoogle("g-2", "theirs@example.org");
    const response = await getProgress({ request: request("/api/progress", { cookie: theirs }), env });
    expect(await body(response)).toEqual({ skills: [] });
  });

  it("wipes the history without ending the account", async () => {
    const cookie = await signInByGoogle("g-1", "learner@example.org");
    await putProgress({
      request: request("/api/progress", { method: "PUT", cookie, body: JSON.stringify({ skills: [SKILL] }) }),
      env,
    });
    await wipeProgress({ request: request("/api/progress", { method: "DELETE", cookie }), env });

    const after = await getProgress({ request: request("/api/progress", { cookie }), env });
    expect(await body(after)).toEqual({ skills: [] });
    const me = await getSession({ request: request("/api/auth/session", { cookie }), env });
    expect((await body<{ account: unknown }>(me)).account).not.toBeNull();
  });
});

describe("signing out", () => {
  it("kills the session on the server, not just in the browser", async () => {
    const cookie = await signInByGoogle("g-1", "learner@example.org");
    const out = await signOut({ request: request("/api/auth/session", { method: "DELETE", cookie }), env });
    expect(out.headers.get("set-cookie")).toContain("Max-Age=0");

    // Replaying the old cookie must not work.
    const replay = await getProgress({ request: request("/api/progress", { cookie }), env });
    expect(replay.status).toBe(401);
  });
});

describe("taking your data and deleting it", () => {
  it("exports everything held about you", async () => {
    const cookie = await signInByGoogle("g-1", "learner@example.org");
    await putProgress({
      request: request("/api/progress", { method: "PUT", cookie, body: JSON.stringify({ skills: [SKILL] }) }),
      env,
    });

    const response = await exportAccount({ request: request("/api/account", { cookie }), env });
    const dump = await body<{
      account: { email: string; signInWithGoogle: boolean };
      skills: unknown[];
    }>(response);
    expect(dump.account).toMatchObject({ email: "learner@example.org", signInWithGoogle: true });
    expect(dump.skills).toEqual([SKILL]);
  });

  it("erases immediately, reports what went, and invalidates the session", async () => {
    const cookie = await signInByGoogle("g-1", "learner@example.org");
    await putProgress({
      request: request("/api/progress", { method: "PUT", cookie, body: JSON.stringify({ skills: [SKILL] }) }),
      env,
    });

    const response = await eraseAccount({ request: request("/api/account", { method: "DELETE", cookie }), env });
    expect(await body(response)).toEqual({
      deleted: { reminder_prefs: 0, progress: 1, sessions: 1, accounts: 1 },
    });
    expect(response.headers.get("set-cookie")).toContain("Max-Age=0");

    const after = await getProgress({ request: request("/api/progress", { cookie }), env });
    expect(after.status).toBe(401);
    const { results } = await db.prepare("SELECT id FROM accounts").all();
    expect(results).toHaveLength(0);
  });

  it("cannot be triggered from another site", async () => {
    const cookie = await signInByGoogle("g-1", "learner@example.org");
    const headers = new Headers({ origin: "https://evil.example" });
    headers.set("cookie", `${SESSION_COOKIE}=${cookie}`);
    const response = await eraseAccount({
      request: new Request(`${ORIGIN}/api/account`, { method: "DELETE", headers }),
      env,
    });
    expect(response.status).toBe(403);
    const { results } = await db.prepare("SELECT id FROM accounts").all();
    expect(results).toHaveLength(1);
  });
});
