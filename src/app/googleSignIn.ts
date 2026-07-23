/**
 * Loading Google's sign-in button, as late as possible.
 *
 * The script is fetched only when someone opens the account panel on a
 * deployment that has Google configured. That is a deliberate privacy choice
 * rather than a performance one: until a visitor asks to sign in, this app
 * makes no request to Google at all, and the overwhelming majority of visitors
 * never will. Loading it in `index.html` would hand Google a record of every
 * person who ever opened a puzzle.
 *
 * One-Tap (`prompt()`) is not used for the same reason. It would show itself
 * uninvited, which means contacting Google before anyone asked.
 */

interface GoogleAccounts {
  id: {
    initialize(options: {
      client_id: string;
      callback: (response: { credential?: string }) => void;
      auto_select?: boolean;
      cancel_on_tap_outside?: boolean;
      use_fedcm_for_prompt?: boolean;
    }): void;
    renderButton(
      parent: HTMLElement,
      options: {
        type?: "standard" | "icon";
        theme?: "outline" | "filled_blue" | "filled_black";
        size?: "small" | "medium" | "large";
        text?: "signin_with" | "signup_with" | "continue_with";
        shape?: "rectangular" | "pill";
        width?: number;
      },
    ): void;
  };
}

declare global {
  interface Window {
    google?: { accounts?: GoogleAccounts };
  }
}

const SCRIPT_URL = "https://accounts.google.com/gsi/client";
let loading: Promise<GoogleAccounts> | null = null;

export function loadGoogleSignIn(): Promise<GoogleAccounts> {
  if (loading) return loading;
  loading = new Promise<GoogleAccounts>((resolve, reject) => {
    const existing = window.google?.accounts;
    if (existing) {
      resolve(existing);
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      const accounts = window.google?.accounts;
      if (accounts) resolve(accounts);
      else reject(new Error("Google sign-in loaded but exposed nothing"));
    };
    script.onerror = () => {
      // Blocked by an extension, an offline device, or a network that cannot
      // reach Google. The caller falls back to the email route.
      loading = null;
      reject(new Error("could not load Google sign-in"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

/**
 * Draw the button into `parent` and call back with the ID token.
 *
 * The token goes straight to our own endpoint, which verifies it against
 * Google's published keys before believing anything in it. Nothing is trusted
 * here in the browser, where anyone can type whatever they like.
 */
export async function renderGoogleButton(
  parent: HTMLElement,
  clientId: string,
  onCredential: (credential: string) => void,
): Promise<void> {
  const accounts = await loadGoogleSignIn();
  accounts.id.initialize({
    client_id: clientId,
    callback: (response) => {
      if (response.credential) onCredential(response.credential);
    },
    auto_select: false,
    cancel_on_tap_outside: true,
  });
  parent.replaceChildren();
  accounts.id.renderButton(parent, {
    type: "standard",
    theme: "outline",
    size: "large",
    text: "continue_with",
    shape: "pill",
    width: 280,
  });
}
