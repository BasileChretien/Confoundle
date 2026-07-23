import type { FunctionContext } from "../../src/server/cf";
import { deleteAccount } from "../../src/server/accounts";
import {
  handle,
  requireAccount,
  requireDatabase,
  requireSameOrigin,
} from "../../src/server/endpoint";
import { json, sessionCookie } from "../../src/server/http";
import { loadProgress } from "../../src/server/progress";

/**
 * Portability and erasure, the two rights that are expensive to retrofit and
 * nearly free to build in.
 *
 * GET returns everything held about the signed-in person, in the format the
 * app's own import already reads, so an export is both the legal answer and a
 * usable backup.
 *
 * DELETE is unconditional and immediate. No soft delete, no grace period, no
 * "your account will be removed within 30 days". Those exist to protect a
 * business from churn, and there is no business here. The response reports the
 * row count removed from each table so the deletion is something the person can
 * see happen rather than be assured of.
 */

export async function onRequestGet(ctx: FunctionContext): Promise<Response> {
  return handle(async () => {
    const db = requireDatabase(ctx.env);
    const account = await requireAccount(ctx.request, db, Date.now());
    return json({
      exportedAt: new Date().toISOString(),
      account: {
        email: account.email,
        signInWithGoogle: account.googleSub !== null,
        createdAt: new Date(account.createdAt).toISOString(),
      },
      skills: await loadProgress(db, account.id),
      note: "This is everything Confoundle stores about you. Sessions are omitted because they are stored only as one-way digests and expire on their own.",
    });
  });
}

export async function onRequestDelete(ctx: FunctionContext): Promise<Response> {
  return handle(async () => {
    requireSameOrigin(ctx.request);
    const db = requireDatabase(ctx.env);
    const account = await requireAccount(ctx.request, db, Date.now());
    const deleted = await deleteAccount(db, account.id);
    return json({ deleted }, 200, { "set-cookie": sessionCookie(null) });
  });
}
