import { fromBase64Url } from "./crypto";

/**
 * Verifying a Google ID token, from scratch.
 *
 * Google's own libraries are Node-shaped and heavy; the check itself is small
 * and the parts that can go wrong are the parts a library would hide. Doing it
 * here keeps every rule visible and testable, and keeps the function bundle at
 * the edge tiny.
 *
 * The rules, and why each one matters:
 *
 *  * Signature, against Google's published keys. Without it the token is just
 *    a string the caller typed.
 *  * `alg` must be RS256. Accepting whatever the token's own header asks for is
 *    the classic JWT hole: a token can declare `alg: none` and verify trivially.
 *  * `aud` must be our client id. A signed, genuine Google token issued to some
 *    other application would otherwise sign its holder into this one.
 *  * `iss` must be Google.
 *  * `exp` must be in the future and `iat` not absurdly in the future, with a
 *    small allowance for clock skew between Google and the edge.
 *  * `email_verified` must be true. The whole account-linking design rests on
 *    an email address being proof of identity, so an unverified one cannot be
 *    allowed to claim an existing account.
 */

export interface GoogleIdentity {
  /** Google's opaque, stable subject id. The key we match a returning user on. */
  sub: string;
  email: string;
  /** Present only so the caller can show it; never trusted for anything. */
  name?: string;
}

export interface Jwk {
  kid?: string;
  kty?: string;
  alg?: string;
  n?: string;
  e?: string;
}

export const GOOGLE_JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs";
const GOOGLE_ISSUERS = new Set(["accounts.google.com", "https://accounts.google.com"]);
/** Allowance for clock drift between Google and the edge, in ms. */
const SKEW_MS = 60_000;

export class TokenError extends Error {}

interface JwtHeader {
  alg?: string;
  kid?: string;
}

interface JwtPayload {
  iss?: string;
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: boolean | string;
  name?: string;
  exp?: number;
  iat?: number;
}

function decodeSegment<T>(segment: string): T {
  try {
    return JSON.parse(new TextDecoder().decode(fromBase64Url(segment))) as T;
  } catch {
    throw new TokenError("malformed token segment");
  }
}

async function verifySignature(
  signingInput: string,
  signature: Uint8Array,
  jwk: Jwk,
): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "jwk",
    { kty: "RSA", n: jwk.n, e: jwk.e, alg: "RS256", ext: true },
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"],
  );
  return crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    signature as unknown as BufferSource,
    new TextEncoder().encode(signingInput),
  );
}

export interface VerifyOptions {
  clientId: string;
  now: number;
  /** Injected so tests can supply their own key without touching the network. */
  fetchKeys: () => Promise<Jwk[]>;
}

export async function verifyGoogleIdToken(
  token: string,
  { clientId, now, fetchKeys }: VerifyOptions,
): Promise<GoogleIdentity> {
  if (!clientId) throw new TokenError("no client id configured");

  const parts = token.split(".");
  if (parts.length !== 3) throw new TokenError("not a JWT");
  const [headerB64, payloadB64, signatureB64] = parts;

  const header = decodeSegment<JwtHeader>(headerB64);
  if (header.alg !== "RS256") throw new TokenError(`unexpected alg ${header.alg}`);

  const keys = await fetchKeys();
  // A token names its key by `kid`. Falling back to trying every key covers the
  // window around a Google key rotation, and costs one extra verify at most.
  const candidates = header.kid
    ? keys.filter((k) => k.kid === header.kid)
    : keys;
  const usable = (candidates.length > 0 ? candidates : keys).filter(
    (k) => k.kty === "RSA" && k.n && k.e,
  );
  if (usable.length === 0) throw new TokenError("no usable signing key");

  const signature = fromBase64Url(signatureB64);
  const signingInput = `${headerB64}.${payloadB64}`;
  let verified = false;
  for (const jwk of usable) {
    if (await verifySignature(signingInput, signature, jwk)) {
      verified = true;
      break;
    }
  }
  if (!verified) throw new TokenError("bad signature");

  const payload = decodeSegment<JwtPayload>(payloadB64);
  if (!payload.iss || !GOOGLE_ISSUERS.has(payload.iss)) {
    throw new TokenError("wrong issuer");
  }
  if (payload.aud !== clientId) throw new TokenError("wrong audience");
  if (typeof payload.exp !== "number" || payload.exp * 1000 + SKEW_MS < now) {
    throw new TokenError("token expired");
  }
  if (typeof payload.iat === "number" && payload.iat * 1000 - SKEW_MS > now) {
    throw new TokenError("token issued in the future");
  }
  if (!payload.sub) throw new TokenError("no subject");
  // Google sends the flag as a boolean in ID tokens and as a string elsewhere.
  const emailVerified =
    payload.email_verified === true || payload.email_verified === "true";
  if (!payload.email || !emailVerified) {
    throw new TokenError("email not verified by Google");
  }

  return { sub: payload.sub, email: payload.email.toLowerCase(), name: payload.name };
}

/**
 * Google's signing keys, cached for as long as Google says they are good for.
 *
 * The cache is per isolate rather than global, so a cold start refetches. That
 * is one extra request against an endpoint built to be hammered, and it beats
 * holding a key past its rotation.
 */
let cached: { keys: Jwk[]; until: number } | null = null;

export function makeGoogleKeyFetcher(
  now: () => number = () => Date.now(),
): () => Promise<Jwk[]> {
  return async () => {
    if (cached && cached.until > now()) return cached.keys;
    const response = await fetch(GOOGLE_JWKS_URL);
    if (!response.ok) throw new TokenError("could not reach Google's key set");
    const body = (await response.json()) as { keys?: Jwk[] };
    const keys = body.keys ?? [];
    const maxAge = /max-age=(\d+)/.exec(response.headers.get("cache-control") ?? "");
    const ttl = maxAge ? Number(maxAge[1]) * 1000 : 3_600_000;
    cached = { keys, until: now() + ttl };
    return keys;
  };
}

/** Test seam: drop the cached key set. */
export function resetGoogleKeyCache(): void {
  cached = null;
}
