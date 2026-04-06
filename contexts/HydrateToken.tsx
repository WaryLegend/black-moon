"use client";

import { tokenManager } from "@/lib/auth/tokenManager";
import { useEffect } from "react";

function HydrateToken() {
  useEffect(() => {
    tokenManager.ensureTokenHydrated();
  }, []);

  return null;
}

export default HydrateToken;
