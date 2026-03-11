"use client";

import { tokenManager } from "@/lib/auth/tokenManager";
import { useEffect } from "react";

function HydrateToken() {
  useEffect(() => {
    async function hydrateToken() {
      try {
        const res = await fetch("/api/auth/get-token");
        if (!res.ok) return;

        const data = await res.json();
        const token = data?.accessToken;

        if (token) {
          tokenManager.setAccessToken(token);
        }
      } catch (error) {
        console.warn(
          "Failed to hydrate access token:",
          error instanceof Error ? error.message : error,
        );
      }
    }

    hydrateToken();
  }, []);

  return null;
}

export default HydrateToken;
