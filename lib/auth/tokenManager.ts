type Listener = () => void;

let accessToken: string | null = null;
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
    notify();
  },

  clearTokens() {
    if (accessToken === null) return;
    accessToken = null;
    notify();
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
