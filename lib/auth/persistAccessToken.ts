import { tokenManager } from "@/lib/auth/tokenManager";
import { setAccessTokenCookie } from "@/lib/auth/accessTokenCookie";

export async function persistAccessToken(token?: string | null) {
  if (!token) {
    return;
  }

  tokenManager.setAccessToken(token);

  if (typeof window !== "undefined") {
    await setAccessTokenCookie(token);
  }
}
