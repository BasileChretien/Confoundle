import { describe, it, expect } from "vitest";
import {
  normaliseEmail,
  parseCookies,
  readSessionToken,
  sameOrigin,
  SESSION_COOKIE,
  sessionCookie,
} from "./http";
import { randomDigits, timingSafeEqual, toBase64Url, fromBase64Url } from "./crypto";

describe("cookies", () => {
  it("reads the session cookie out of a crowded header", () => {
    const request = new Request("https://confoundle.pages.dev/api/auth/session", {
      headers: { cookie: `theme=dark; ${SESSION_COOKIE}=abc123; other=x` },
    });
    expect(readSessionToken(request)).toBe("abc123");
  });

  it("finds nothing when there is nothing", () => {
    expect(parseCookies(null)).toEqual({});
    expect(parseCookies("malformed")).toEqual({});
    expect(
      readSessionToken(new Request("https://confoundle.pages.dev/")),
    ).toBeNull();
  });

  it("sets a cookie a subdomain cannot overwrite and script cannot read", () => {
    const cookie = sessionCookie("token-value");
    expect(cookie).toContain(`${SESSION_COOKIE}=token-value`);
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("Secure");
    expect(cookie).toContain("SameSite=Lax");
    expect(cookie).toContain("Path=/");
    // __Host- forbids a Domain attribute; adding one would silently void it.
    expect(cookie).not.toContain("Domain");
  });

  it("expires the cookie when signing out", () => {
    expect(sessionCookie(null)).toContain("Max-Age=0");
  });
});

describe("the origin check", () => {
  const make = (origin?: string) =>
    new Request("https://confoundle.pages.dev/api/progress", {
      method: "PUT",
      headers: origin ? { origin } : {},
    });

  it("accepts our own page", () => {
    expect(sameOrigin(make("https://confoundle.pages.dev"))).toBe(true);
  });

  it("refuses another site, a lookalike, and a missing header", () => {
    expect(sameOrigin(make("https://confoundle.pages.dev.evil.example"))).toBe(false);
    expect(sameOrigin(make("http://confoundle.pages.dev"))).toBe(false);
    expect(sameOrigin(make("null"))).toBe(false);
    expect(sameOrigin(make())).toBe(false);
  });
});

describe("email normalisation", () => {
  it("trims and lowercases, so one address is one account", () => {
    expect(normaliseEmail("  Learner@Example.ORG ")).toBe("learner@example.org");
  });

  it("turns away what is obviously not an address", () => {
    for (const bad of [
      "",
      "  ",
      "no-at-sign",
      "no@domain",
      "two@@at.example",
      "spaces in@example.org",
      "injection@example.org\nBcc: someone@else.example",
      "a@b.c" + "x".repeat(300),
      42,
      null,
      undefined,
    ]) {
      expect({ bad, ok: normaliseEmail(bad) }).toEqual({ bad, ok: null });
    }
  });
});

describe("primitives", () => {
  it("round-trips base64url without padding or unsafe characters", () => {
    const bytes = new Uint8Array([0, 1, 250, 251, 252, 253, 254, 255]);
    const encoded = toBase64Url(bytes);
    expect(encoded).not.toMatch(/[+/=]/);
    expect([...fromBase64Url(encoded)]).toEqual([...bytes]);
  });

  it("compares equal-length strings without short-circuiting", () => {
    expect(timingSafeEqual("abc", "abc")).toBe(true);
    expect(timingSafeEqual("abc", "abd")).toBe(false);
    expect(timingSafeEqual("abc", "abcd")).toBe(false);
    expect(timingSafeEqual("", "")).toBe(true);
  });

  it("draws digits without the modulo bias a naive sampler would have", () => {
    // 256 is not a multiple of 10, so byte % 10 would make 0 through 5 about
    // 2.5% likelier than 6 through 9. Over this many draws that is visible.
    const counts = new Array(10).fill(0);
    for (const digit of randomDigits(20_000)) counts[Number(digit)] += 1;
    for (const count of counts) {
      expect(count).toBeGreaterThan(1_700);
      expect(count).toBeLessThan(2_300);
    }
  });
});
