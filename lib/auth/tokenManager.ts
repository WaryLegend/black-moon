type Listener = () => void;

let accessToken: string | null = null;
let hasHydratedAccessToken = false;
let hydratePromise: Promise<void> | null = null;
const listeners = new Set<Listener>();

const notify = () => {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (error) {
      console.warn(
        "tokenManager listener failed",
        error instanceof Error ? error.message : error,
      );
    }
  });
};

export const tokenManager = {
  getAccessToken() {
    return accessToken;
  },

  setAccessToken(token: string) {
    accessToken = token;
    hasHydratedAccessToken = true;
    notify();
  },

  clearTokens() {
    if (accessToken === null) return;
    accessToken = null;
    hasHydratedAccessToken = true;
    notify();
  },

  async ensureTokenHydrated() {
    if (typeof window === "undefined") {
      return;
    }

    if (hasHydratedAccessToken || accessToken) {
      return;
    }

    if (hydratePromise) {
      await hydratePromise;
      return;
    }

    hydratePromise = (async () => {
      try {
        const res = await fetch("/api/auth/get-token", { cache: "no-store" });
        if (!res.ok) {
          return;
        }

        const data = await res.json();
        const token =
          typeof data?.accessToken === "string" && data.accessToken.length > 0
            ? data.accessToken
            : null;

        if (token) {
          accessToken = token;
          notify();
        }
      } catch (error) {
        console.warn(
          "Failed to hydrate access token:",
          error instanceof Error ? error.message : error,
        );
      } finally {
        hasHydratedAccessToken = true;
        hydratePromise = null;
      }
    })();

    await hydratePromise;
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  },
};
