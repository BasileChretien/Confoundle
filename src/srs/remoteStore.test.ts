import { describe, it, expect } from "vitest";
import { NotSignedIn, RemoteProgressStore, syncStores, type Fetcher } from "./remoteStore";
import type { ProgressStore } from "./store";
import type { SkillProgress } from "./schedule";

const NOW = 1_760_000_000_000;

function record(skill: string, stage: number, updatedAt: number): SkillProgress {
  return {
    skill,
    stage,
    dueAt: updatedAt + 86_400_000,
    seenItemIds: [],
    misconceived: false,
    lifetime: { correct: stage, wrong: 0 },
    updatedAt,
  };
}

/** A stand-in for localStorage, so the sync tests are about the merge only. */
class MemoryStore implements ProgressStore {
  constructor(public skills: SkillProgress[] = []) {}
  async load() {
    return this.skills;
  }
  async save(all: SkillProgress[]) {
    this.skills = all;
  }
  async clear() {
    this.skills = [];
  }
}

interface Call {
  url: string;
  method?: string;
  body?: unknown;
}

function stubFetch(
  reply: (call: Call) => { status: number; body?: unknown },
): { fetcher: Fetcher; calls: Call[] } {
  const calls: Call[] = [];
  const fetcher: Fetcher = async (url, init) => {
    const call: Call = {
      url,
      method: init?.method,
      body: init?.body ? JSON.parse(String(init.body)) : undefined,
    };
    calls.push(call);
    const { status, body } = reply(call);
    return new Response(body === undefined ? null : JSON.stringify(body), { status });
  };
  return { fetcher, calls };
}

describe("the remote store", () => {
  it("reads and writes progress over the account endpoint", async () => {
    const stored = [record("berksons-bias", 4, NOW)];
    const { fetcher, calls } = stubFetch((call) =>
      call.method === "GET"
        ? { status: 200, body: { skills: stored } }
        : { status: 200, body: { skills: stored } },
    );
    const store = new RemoteProgressStore(fetcher);

    expect(await store.load()).toEqual(stored);
    await store.save(stored);
    await store.clear();

    expect(calls.map((c) => c.method)).toEqual(["GET", "PUT", "DELETE"]);
    expect(calls[1].body).toEqual({ skills: stored });
  });

  it("reports an expired session as its own failure, not a network error", async () => {
    // The caller has to tell these apart: one means sign out and carry on
    // locally, the other means try again later.
    const { fetcher } = stubFetch(() => ({ status: 401, body: { error: "not-signed-in" } }));
    await expect(new RemoteProgressStore(fetcher).load()).rejects.toBeInstanceOf(NotSignedIn);

    const { fetcher: broken } = stubFetch(() => ({ status: 500 }));
    const failure = new RemoteProgressStore(broken).load();
    await expect(failure).rejects.toThrow(/500/);
    await expect(failure).rejects.not.toBeInstanceOf(NotSignedIn);
  });

  it("treats a missing skills array as no progress rather than a crash", async () => {
    const { fetcher } = stubFetch(() => ({ status: 200, body: {} }));
    expect(await new RemoteProgressStore(fetcher).load()).toEqual([]);
  });
});

describe("signing in with a history already on the device", () => {
  it("carries local progress up and remote progress down", async () => {
    const local = new MemoryStore([record("lead-time-bias", 3, NOW)]);
    const remote = new MemoryStore([record("berksons-bias", 5, NOW)]);

    const merged = await syncStores(local, remote);

    expect(merged.map((p) => p.skill)).toEqual(["berksons-bias", "lead-time-bias"]);
    expect(local.skills).toEqual(merged);
    expect(remote.skills).toEqual(merged);
  });

  it("keeps whichever record was touched last when both know the skill", async () => {
    const local = new MemoryStore([record("lead-time-bias", 2, NOW)]);
    const remote = new MemoryStore([record("lead-time-bias", 6, NOW + 1000)]);

    const merged = await syncStores(local, remote);
    expect(merged).toEqual([record("lead-time-bias", 6, NOW + 1000)]);
  });

  it("is safe to run twice", async () => {
    const local = new MemoryStore([record("a", 1, NOW)]);
    const remote = new MemoryStore([record("b", 2, NOW)]);
    const first = await syncStores(local, remote);
    const second = await syncStores(local, remote);
    expect(second).toEqual(first);
  });

  it("loses nothing when the upload fails", async () => {
    // The one failure mode that must never cost a learner their history.
    const local = new MemoryStore([record("lead-time-bias", 3, NOW)]);
    const remote: ProgressStore = {
      load: async () => [],
      save: async () => {
        throw new Error("offline");
      },
      clear: async () => {},
    };

    await expect(syncStores(local, remote)).rejects.toThrow(/offline/);
    expect(local.skills).toEqual([record("lead-time-bias", 3, NOW)]);
  });
});
