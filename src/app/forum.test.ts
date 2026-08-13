import { describe, expect, it } from "vitest";

import { forumTagSlug } from "./forum";

/**
 * `FORUM_ORIGIN` is read from the environment once at module load, so the two
 * things worth testing are split. The pure slug and origin logic is tested
 * directly here. Whether the LINK reaches the reader before the answer does is
 * tested in `forumSpoiler.test.ts`, because that is a question about which view
 * imports it and not about this module at all.
 */

// The normaliser is not exported, since nothing outside should be constructing
// origins. Reimporting the module with a stubbed env is the honest way to
// exercise it, and vitest resets the module registry between these.
async function originFor(value: unknown): Promise<string | null> {
  const { vi } = await import("vitest");
  vi.resetModules();
  vi.stubEnv("VITE_FORUM_ORIGIN", value as string);
  const mod = await import("./forum");
  const origin = mod.FORUM_ORIGIN;
  vi.unstubAllEnvs();
  return origin;
}

describe("the forum origin", () => {
  it("accepts a bare https origin", async () => {
    expect(await originFor("https://confoundle.discourse.group")).toBe(
      "https://confoundle.discourse.group",
    );
  });

  it("tolerates a trailing slash, which is how people paste", async () => {
    expect(await originFor("https://confoundle.discourse.group/")).toBe(
      "https://confoundle.discourse.group",
    );
  });

  it("is disabled rather than broken when unset or empty", async () => {
    expect(await originFor(undefined)).toBeNull();
    expect(await originFor("")).toBeNull();
    expect(await originFor("   ")).toBeNull();
  });

  it("refuses a value that arrived with a path", async () => {
    // The URL the forum owner actually has in front of them is the admin one.
    // Pasting it must not produce a link that sends every reader there.
    expect(await originFor("https://confoundle.discourse.group/admin")).toBeNull();
    expect(await originFor("https://confoundle.discourse.group/c/general/4")).toBeNull();
  });

  it("refuses a query or a fragment", async () => {
    expect(await originFor("https://forum.example?utm_source=x")).toBeNull();
    expect(await originFor("https://forum.example#top")).toBeNull();
  });

  it("refuses a downgrade to http, and anything unparseable", async () => {
    expect(await originFor("http://forum.example")).toBeNull();
    expect(await originFor("forum.example")).toBeNull();
    expect(await originFor("javascript:alert(1)")).toBeNull();
  });
});

describe("forumTagSlug", () => {
  it("passes a well-formed puzzle slug through unchanged", () => {
    expect(forumTagSlug("the-photo-on-the-essay")).toBe("the-photo-on-the-essay");
  });

  it("normalises rather than trusting a hand-authored slug", () => {
    expect(forumTagSlug("The Photo, On The Essay!")).toBe("the-photo-on-the-essay");
    expect(forumTagSlug("--leading-and-trailing--")).toBe("leading-and-trailing");
    expect(forumTagSlug("runs____of___punctuation")).toBe("runs-of-punctuation");
  });

  it("returns null rather than an empty tag", () => {
    // An empty tag would build ".../tag/" which is the tag INDEX: every reader
    // of every card would land on the same page and it would look deliberate.
    expect(forumTagSlug("")).toBeNull();
    expect(forumTagSlug("!!!")).toBeNull();
  });
});
