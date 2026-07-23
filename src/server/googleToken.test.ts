import { describe, it, expect, beforeAll } from "vitest";
import { toBase64Url } from "./crypto";
import { TokenError, verifyGoogleIdToken, type Jwk } from "./googleToken";

/**
 * These tests mint real RS256 tokens with WebCrypto and check that each rule
 * the verifier claims to enforce actually rejects.
 *
 * That matters more here than almost anywhere else in the codebase. Every one
 * of these checks is the only thing standing between "a signed JWT from
 * somewhere on the internet" and "signed in as that user", and a verifier that
 * silently skips one still passes every happy-path test.
 */

const CLIENT_ID = "1234.apps.googleusercontent.com";
const NOW = 1_760_000_000_000;

let keys: CryptoKeyPair;
let jwks: Jwk[];

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
  const jwk = (await crypto.subtle.exportKey("jwk", keys.publicKey)) as Jwk;
  jwks = [{ ...jwk, kid: "test-key" }];
});

function encode(value: unknown): string {
  return toBase64Url(new TextEncoder().encode(JSON.stringify(value)));
}

interface Claims {
  iss?: string;
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: boolean | string;
  name?: string;
  exp?: number;
  iat?: number;
}

const goodClaims: Claims = {
  iss: "https://accounts.google.com",
  aud: CLIENT_ID,
  sub: "108234",
  email: "Learner@Example.org",
  email_verified: true,
  name: "A Learner",
  iat: NOW / 1000 - 10,
  exp: NOW / 1000 + 3600,
};

async function mint(
  claims: Claims = goodClaims,
  header: Record<string, unknown> = { alg: "RS256", kid: "test-key", typ: "JWT" },
  signingKey: CryptoKey = keys.privateKey,
): Promise<string> {
  const signingInput = `${encode(header)}.${encode(claims)}`;
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    signingKey,
    new TextEncoder().encode(signingInput),
  );
  return `${signingInput}.${toBase64Url(new Uint8Array(signature))}`;
}

function verify(token: string, clientId = CLIENT_ID, now = NOW) {
  return verifyGoogleIdToken(token, {
    clientId,
    now,
    fetchKeys: async () => jwks,
  });
}

describe("verifying a Google ID token", () => {
  it("accepts a genuine one and lowercases the address", async () => {
    const identity = await verify(await mint());
    expect(identity).toEqual({
      sub: "108234",
      email: "learner@example.org",
      name: "A Learner",
    });
  });

  it("rejects a token signed by somebody else", async () => {
    const impostor = (await crypto.subtle.generateKey(
      {
        name: "RSASSA-PKCS1-v1_5",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["sign", "verify"],
    )) as CryptoKeyPair;
    await expect(verify(await mint(goodClaims, undefined, impostor.privateKey))).rejects.toThrow(
      /bad signature/,
    );
  });

  it("rejects a payload edited after signing", async () => {
    const token = await mint();
    const [header, , signature] = token.split(".");
    const tampered = `${header}.${encode({ ...goodClaims, sub: "someone-else" })}.${signature}`;
    await expect(verify(tampered)).rejects.toThrow(/bad signature/);
  });

  it("refuses alg: none, whatever the header asks for", async () => {
    // The classic JWT hole: trust the token's own claim about how to check it.
    const unsigned = `${encode({ alg: "none" })}.${encode(goodClaims)}.`;
    await expect(verify(unsigned)).rejects.toThrow(/unexpected alg/);
  });

  it("refuses a token issued to a different application", async () => {
    // Genuinely signed by Google, just not for us. Without this check, any site
    // with a Google button could hand us its users' tokens and sign in as them.
    await expect(verify(await mint(), "someone-elses-client-id")).rejects.toThrow(
      /wrong audience/,
    );
  });

  it("refuses a wrong issuer", async () => {
    await expect(
      verify(await mint({ ...goodClaims, iss: "https://accounts.evil.example" })),
    ).rejects.toThrow(/wrong issuer/);
  });

  it("refuses an expired token, allowing a minute of clock skew", async () => {
    const token = await mint({ ...goodClaims, exp: NOW / 1000 - 30 });
    await expect(verify(token, CLIENT_ID, NOW + 120_000)).rejects.toThrow(/expired/);
    // Just-expired is still accepted, because the edge's clock is not Google's.
    await expect(verify(token)).resolves.toBeTruthy();
  });

  it("refuses a token stamped in the future", async () => {
    await expect(
      verify(await mint({ ...goodClaims, iat: NOW / 1000 + 3600 })),
    ).rejects.toThrow(/issued in the future/);
  });

  it("refuses an unverified address", async () => {
    // The linking rule treats an address as proof of identity, so an
    // unverified one could be used to claim somebody else's account.
    await expect(
      verify(await mint({ ...goodClaims, email_verified: false })),
    ).rejects.toThrow(/not verified/);
    await expect(
      verify(await mint({ ...goodClaims, email_verified: undefined })),
    ).rejects.toThrow(/not verified/);
  });

  it("accepts the string form of the verified flag", async () => {
    await expect(
      verify(await mint({ ...goodClaims, email_verified: "true" })),
    ).resolves.toBeTruthy();
  });

  it("refuses junk, and refuses to run without a client id", async () => {
    await expect(verify("not-a-jwt")).rejects.toBeInstanceOf(TokenError);
    await expect(verify("a.b.c")).rejects.toBeInstanceOf(TokenError);
    await expect(verify(await mint(), "")).rejects.toThrow(/no client id/);
  });

  it("still verifies when the key set has rotated past the token's kid", async () => {
    // Google publishes several keys and retires them on its own schedule. A
    // token whose kid no longer matches must fall back to trying the rest
    // rather than failing a user who did nothing wrong.
    const token = await mint(goodClaims, { alg: "RS256", kid: "retired", typ: "JWT" });
    await expect(verify(token)).resolves.toBeTruthy();
  });
});
