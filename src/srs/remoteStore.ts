import type { SkillProgress } from "./schedule";
import { mergeProgress, type ProgressStore } from "./store";

/**
 * The account-backed half of the store.
 *
 * This is the whole of what sync required. `store.ts` was written with an async
 * interface and no clock of its own precisely so that this file could exist
 * without anything else moving: the scheduler is pure, `PuzzleFlow` never learns
 * where progress lives, and a signed-out learner keeps working exactly as
 * before.
 *
 * `fetch` is injected so the tests can drive every branch, including the ones
 * that matter most: what happens when the network is not there.
 */

export type Fetcher = (input: string, init?: RequestInit) => Promise<Response>;

/** Thrown when the server says a session has gone. Callers sign the user out. */
export class NotSignedIn extends Error {}

export class RemoteProgressStore implements ProgressStore {
  constructor(private readonly fetcher: Fetcher = fetch.bind(globalThis)) {}

  private async request(init: RequestInit): Promise<unknown> {
    const response = await this.fetcher("/api/progress", {
      ...init,
      credentials: "same-origin",
      headers: { "content-type": "application/json", ...(init.headers ?? {}) },
    });
    if (response.status === 401) throw new NotSignedIn("session expired");
    if (!response.ok) throw new Error(`progress sync failed (${response.status})`);
    return response.json();
  }

  async load(): Promise<SkillProgress[]> {
    const body = (await this.request({ method: "GET" })) as { skills?: SkillProgress[] };
    return body.skills ?? [];
  }

  /**
   * The server merges too and returns the result, so what comes back may hold
   * more than what went up: another device's newer records. The caller writes
   * that back into local storage, which is what makes two devices converge.
   */
  async save(all: SkillProgress[]): Promise<void> {
    await this.request({ method: "PUT", body: JSON.stringify({ skills: all }) });
  }

  async clear(): Promise<void> {
    await this.request({ method: "DELETE" });
  }
}

/**
 * Reconcile a local store with a remote one, in that order, and leave both
 * holding the same thing.
 *
 * Called once at sign-in, which is the moment that actually matters: a learner
 * who has been playing signed-out has a history in localStorage and must not
 * lose it by creating an account. Because the merge is last-write-wins per
 * skill on `updatedAt`, running this twice is harmless, and running it after a
 * spell offline does the right thing in both directions.
 *
 * On a network failure it throws, and the caller keeps using the local store.
 * Sync failing must never cost a learner their progress, so nothing is cleared
 * or overwritten until the round trip has actually succeeded.
 */
export async function syncStores(
  local: ProgressStore,
  remote: ProgressStore,
): Promise<SkillProgress[]> {
  const mine = await local.load();
  const theirs = await remote.load();
  const merged = mergeProgress(theirs, mine);

  // Upload first: if this throws, local is untouched and nothing was lost.
  await remote.save(merged);
  await local.save(merged);
  return merged;
}
