/**
 * The small cryptographic primitives the account layer needs, over WebCrypto.
 *
 * WebCrypto is the same API in the browser, in Node 18+ and on Cloudflare
 * Workers, so everything here is testable under vitest with no shims and runs
 * unchanged at the edge.
 */

const encoder = new TextEncoder();

/** Bytes to a lowercase hex string. */
function toHex(bytes: ArrayBuffer): string {
  return [...new Uint8Array(bytes)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Bytes to base64url, which is cookie-safe and URL-safe without escaping. */
export function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, "="));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/**
 * A bearer token with 256 bits of entropy. Long enough that guessing is not a
 * threat model, so sessions need no other secret protecting them.
 */
export function randomToken(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return toBase64Url(bytes);
}

export async function sha256Hex(input: string): Promise<string> {
  return toHex(await crypto.subtle.digest("SHA-256", encoder.encode(input)));
}

export async function hmacHex(secret: string, input: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(input)));
}

/**
 * Compare two strings without letting the time taken reveal how much of the
 * prefix matched. Used on hex digests, which are always the same length, so the
 * early return on length leaks nothing about the secret.
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * A numeric one-time code, sampled without modulo bias.
 *
 * Taking a random byte modulo 10 would make 0 through 5 slightly likelier than
 * 6 through 9, because 256 is not a multiple of 10. Rejecting the tail of the
 * byte range costs nothing here and keeps every digit equally likely.
 */
export function randomDigits(length: number): string {
  const limit = 250; // the largest multiple of 10 at or below 256
  let out = "";
  const buffer = new Uint8Array(length * 2);
  while (out.length < length) {
    crypto.getRandomValues(buffer);
    for (const byte of buffer) {
      if (byte >= limit) continue;
      out += String(byte % 10);
      if (out.length === length) break;
    }
  }
  return out;
}
