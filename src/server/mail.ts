/**
 * Sending the sign-in code.
 *
 * Behind an interface with one method, because the provider is the part of this
 * whole design most likely to change and the least interesting. Resend is the
 * default only because it is a single authenticated POST with no SDK.
 *
 * Absent configuration, `mailerFor` returns null and the endpoint answers 503.
 * That is deliberate: an app that silently accepts a sign-in request it cannot
 * fulfil leaves the user waiting for an email that was never going to arrive.
 */

export interface Mailer {
  send(to: string, subject: string, text: string): Promise<void>;
}

export class MailError extends Error {}

export function resendMailer(apiKey: string, from: string): Mailer {
  return {
    async send(to, subject, text) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ from, to, subject, text }),
      });
      if (!response.ok) {
        // The provider's message can quote the address back, so it is not
        // repeated to the caller or into a log line.
        throw new MailError(`mail provider returned ${response.status}`);
      }
    },
  };
}

export function mailerFor(env: {
  RESEND_API_KEY?: string;
  MAIL_FROM?: string;
}): Mailer | null {
  if (!env.RESEND_API_KEY || !env.MAIL_FROM) return null;
  return resendMailer(env.RESEND_API_KEY, env.MAIL_FROM);
}

/**
 * The body of the code email, in plain text.
 *
 * Plain text on purpose. It renders everywhere, it cannot carry a tracking
 * pixel, and there is nothing here that wants styling. The last line matters:
 * anyone can type an address into a sign-in box, so the person receiving this
 * may not have asked for it, and should be told that ignoring it is enough.
 */
export function codeEmail(code: string, ttlMinutes: number): {
  subject: string;
  text: string;
} {
  return {
    subject: `${code} is your Confoundle sign-in code`,
    text: [
      `Your Confoundle sign-in code is ${code}`,
      "",
      `It works once, and expires in ${ttlMinutes} minutes.`,
      "",
      "If you did not ask to sign in, nothing has happened to any account and you can ignore this message.",
    ].join("\n"),
  };
}
