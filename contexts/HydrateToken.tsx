"use client";

import { tokenManager } from "@/lib/auth/tokenManager";
import { useEffect } from "react";

function HydrateToken() {
  useEffect(() => {
    async function hydrateToken() {
      const res = await fetch("/api/auth/get-token");
      const data = await res.json();

      if (data.access_token) {
        tokenManager.setAccessToken(data.access_token);
      }
    }

    hydrateToken();
  }, []);

  return null;
}

export default HydrateToken;
