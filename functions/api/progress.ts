import type { FunctionContext } from "../../src/server/cf";
import {
  handle,
  HttpError,
  readJson,
  requireAccount,
  requireDatabase,
  requireSameOrigin,
} from "../../src/server/endpoint";
import { json } from "../../src/server/http";
import {
  clearProgress,
  loadProgress,
  parseProgressPayload,
  saveProgress,
} from "../../src/server/progress";

/**
 * The sync endpoint, and the only thing accounts exist for: SRS progress that
 * follows a learner between devices.
 *
 * PUT merges rather than replaces, and returns the merged set, so the client
 * that just uploaded ends the exchange holding whatever the other device knew
 * as well. The scheduler never sees any of this; it is handed records and
 * hands back records, exactly as it does against localStorage.
 */

export async function onRequestGet(ctx: FunctionContext): Promise<Response> {
  return handle(async () => {
    const db = requireDatabase(ctx.env);
    const account = await requireAccount(ctx.request, db, Date.now());
    return json({ skills: await loadProgress(db, account.id) });
  });
}

export async function onRequestPut(ctx: FunctionContext): Promise<Response> {
  return handle(async () => {
    requireSameOrigin(ctx.request);
    const db = requireDatabase(ctx.env);
    const account = await requireAccount(ctx.request, db, Date.now());

    const body = await readJson<{ skills?: unknown }>(ctx.request);
    const incoming = parseProgressPayload(body.skills);
    if (!incoming) throw new HttpError(400, "bad-progress");

    return json({ skills: await saveProgress(db, account.id, incoming) });
  });
}

/**
 * Wipe the learning history but keep the account. This is what the store
 * interface's `clear()` resolves to remotely, and it is a real thing to want:
 * starting the course again, or removing what is stored without giving up the
 * sign-in. Erasing the account itself is DELETE /api/account.
 */
export async function onRequestDelete(ctx: FunctionContext): Promise<Response> {
  return handle(async () => {
    requireSameOrigin(ctx.request);
    const db = requireDatabase(ctx.env);
    const account = await requireAccount(ctx.request, db, Date.now());
    await clearProgress(db, account.id);
    return json({ ok: true });
  });
}
