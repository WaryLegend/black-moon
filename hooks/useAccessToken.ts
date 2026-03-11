"use client";

import { useSyncExternalStore } from "react";

import { tokenManager } from "@/lib/auth/tokenManager";

export function useAccessToken() {
  return useSyncExternalStore(
    tokenManager.subscribe,
    tokenManager.getAccessToken,
    tokenManager.getAccessToken,
  );
}
