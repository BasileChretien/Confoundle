/**
 * Request and response plumbing shared by every account endpoint.
 */

/** Sign-in state lives in this cookie and nowhere else. */
export const SESSION_COOKIE = "__Host-confoundle_session";

/** Ninety days. Long enough that a learner is not asked to sign in again mid-course. */
export const SESSION_TTL_MS = 90 * 24 * 60 * 60 * 1000;

export function json(data: unknown, status = 200, extra?: HeadersInit): Response {
  const headers = new Headers(extra);
  headers.set("content-type", "application/json");
  // Everything here is per-account. A shared cache holding any of it would be
  // one user's progress served to another.
  headers.set("cache-control", "no-store");
  return new Response(JSON.stringify(data), { status, headers });
}

export function parseCookies(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq < 1) continue;
    const name = part.slice(0, eq).trim();
    if (name) out[name] = part.slice(eq + 1).trim();
  }
  return out;
}

/**
 * The session cookie, or the instruction to drop it when `token` is null.
 *
 * The `__Host-` prefix is a browser-enforced promise: the cookie must be
 * Secure, must be path `/`, and must carry no Domain, which means a subdomain
 * can never set or overwrite it. Browsers treat localhost as trustworthy, so
 * this works in `wrangler pages dev` too.
 */
export function sessionCookie(token: string | null, maxAgeMs = SESSION_TTL_MS): string {
  const attrs = [
    `${SESSION_COOKIE}=${token ?? ""}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${token ? Math.floor(maxAgeMs / 1000) : 0}`,
  ];
  return attrs.join("; ");
}

export function readSessionToken(request: Request): string | null {
  return parseCookies(request.headers.get("cookie"))[SESSION_COOKIE] ?? null;
}

/**
 * Reject a state-changing request that did not come from our own page.
 *
 * SameSite=Lax already stops the cookie riding along on a cross-site form POST,
 * and a JSON content-type forces a preflight that cross-origin script cannot
 * satisfy. Checking Origin as well is cheap, and means no single one of those
 * three has to be right on its own.
 */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

/** Normalise an email for storage and comparison, or reject it. */
export function normaliseEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  // Deliberately permissive: the only real proof an address exists is that a
  // code sent to it comes back. This shape check exists to stop obvious junk
  // and header injection, not to adjudicate RFC 5322.
  if (email.length < 3 || email.length > 254) return null;
  if (!/^[^\s@,;:<>"]+@[^\s@,;:<>"]+\.[^\s@,;:<>"]+$/.test(email)) return null;
  return email;
}

/** The client address Cloudflare saw, used only to derive a rate-limit bucket. */
export function clientIp(request: Request): string {
  return request.headers.get("cf-connecting-ip") ?? "unknown";
}
