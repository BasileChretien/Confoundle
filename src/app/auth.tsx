import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LocalProgressStore } from "../srs/store";
import { RemoteProgressStore, syncStores } from "../srs/remoteStore";

/**
 * Sign-in state for the app.
 *
 * The shape of this is set by one requirement: an account is optional, and the
 * game has to be entirely playable without one. So there is a fourth status,
 * `unavailable`, for a build served from a static host with no functions behind
 * it (the single-file build, a GitHub Pages copy, someone's fork). In that case
 * the account UI is not shown at all rather than shown broken.
 *
 * Nothing here is persisted. The session lives in an HttpOnly cookie the page's
 * own script cannot read, which is the point of it being HttpOnly, so "am I
 * signed in" is always a question for the server and never a local flag that
 * can drift out of date.
 */

export interface PublicAccount {
  email: string;
  hasGoogle: boolean;
  createdAt: number;
}

export interface AuthMethods {
  /** Null when this deployment has no Google client configured. */
  googleClientId: string | null;
  email: boolean;
}

export type AuthStatus = "loading" | "unavailable" | "signed-out" | "signed-in";

export interface AuthApi {
  status: AuthStatus;
  account: PublicAccount | null;
  methods: AuthMethods;
  /** Set when the last sign-in also pulled progress down from another device. */
  syncedSkills: number | null;
  signInWithGoogle(credential: string): Promise<string | null>;
  requestCode(email: string): Promise<string | null>;
  submitCode(email: string, code: string): Promise<string | null>;
  signOut(): Promise<void>;
  eraseAccount(): Promise<string | null>;
  /**
   * Push local review progress to the account, if signed in. Called after a
   * review session so a device that just did some reviews carries them up
   * without waiting for the next sign-in. A no-op, harmlessly, when signed out.
   */
  syncProgress(): Promise<void>;
  exportUrl: string;
}

const NO_METHODS: AuthMethods = { googleClientId: null, email: false };

const AuthContext = createContext<AuthApi>({
  status: "unavailable",
  account: null,
  methods: NO_METHODS,
  syncedSkills: null,
  signInWithGoogle: async () => "unavailable",
  requestCode: async () => "unavailable",
  submitCode: async () => "unavailable",
  signOut: async () => {},
  eraseAccount: async () => "unavailable",
  syncProgress: async () => {},
  exportUrl: "/api/account",
});

export function useAuth(): AuthApi {
  return useContext(AuthContext);
}

interface ApiError {
  error?: string;
}

/**
 * POST to an account endpoint, returning null on success and a stable error
 * code otherwise. The codes are what the panel translates; the server never
 * sends prose, so nothing here has to be localised on the wire.
 */
async function post(url: string, body?: unknown, method = "POST"): Promise<string | null> {
  let response: Response;
  try {
    response = await fetch(url, {
      method,
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    return "network";
  }
  if (response.ok) return null;
  try {
    return ((await response.json()) as ApiError).error ?? "server-error";
  } catch {
    return "server-error";
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [account, setAccount] = useState<PublicAccount | null>(null);
  const [methods, setMethods] = useState<AuthMethods>(NO_METHODS);
  const [syncedSkills, setSyncedSkills] = useState<number | null>(null);

  const local = useMemo(() => new LocalProgressStore(), []);
  const remote = useMemo(() => new RemoteProgressStore(), []);

  /**
   * Merge the device's history with the account's, in both directions.
   *
   * A learner who has been playing signed out has weeks of progress in
   * localStorage, and creating an account must not be the thing that loses it.
   * A failure here is deliberately swallowed: they are still signed in, the
   * local store still works, and the next sync will pick it up.
   */
  const sync = useCallback(async () => {
    try {
      const merged = await syncStores(local, remote);
      setSyncedSkills(merged.length);
    } catch {
      setSyncedSkills(null);
    }
  }, [local, remote]);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/session", { credentials: "same-origin" });
      if (!response.ok) throw new Error("no account service");
      const body = (await response.json()) as {
        account: PublicAccount | null;
        methods: AuthMethods;
      };
      setMethods(body.methods ?? NO_METHODS);
      setAccount(body.account);
      setStatus(body.account ? "signed-in" : "signed-out");
      return body.account;
    } catch {
      // No functions behind this build. Not an error, just a plainer app.
      setStatus("unavailable");
      return null;
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const afterSignIn = useCallback(async () => {
    const signedIn = await refresh();
    if (signedIn) await sync();
  }, [refresh, sync]);

  const api = useMemo<AuthApi>(
    () => ({
      status,
      account,
      methods,
      syncedSkills,
      exportUrl: "/api/account",

      async signInWithGoogle(credential) {
        const error = await post("/api/auth/google", { credential });
        if (!error) await afterSignIn();
        return error;
      },

      async requestCode(email) {
        return post("/api/auth/email/start", { email });
      },

      async submitCode(email, code) {
        const error = await post("/api/auth/email/verify", { email, code });
        if (!error) await afterSignIn();
        return error;
      },

      async signOut() {
        await post("/api/auth/session", undefined, "DELETE");
        setSyncedSkills(null);
        // The local store is deliberately left alone. Signing out is not a
        // request to forget anything, and wiping the device's copy would
        // punish someone for using a shared computer carefully.
        await refresh();
      },

      async eraseAccount() {
        const error = await post("/api/account", undefined, "DELETE");
        if (error) return error;
        // Erasure means erasure. The device's copy goes too, otherwise the
        // next sign-in would upload the very history that was just deleted.
        await local.clear();
        setSyncedSkills(null);
        await refresh();
        return null;
      },

      async syncProgress() {
        if (status !== "signed-in") return;
        await sync();
      },
    }),
    [status, account, methods, syncedSkills, afterSignIn, refresh, local, sync],
  );

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}
