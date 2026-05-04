"use client";

import { useQuery } from "@tanstack/react-query";

import { profileApi } from "@/services/profile.api";
import type { CurrentAccount } from "@/types/profile";
import { useAccessToken } from "@/hooks/useAccessToken";

export const CURRENT_ACCOUNT_QUERY_KEY = ["users", "me"] as const;

export function useCurrentAccount() {
  const token = useAccessToken();
  const enabled = Boolean(token);

  const resolveStatus = (error: unknown): number | null => {
    if (!error || typeof error !== "object") return null;
    const maybeError = error as { response?: { status?: unknown } };
    const status = maybeError.response?.status;
    return typeof status === "number" ? status : null;
  };

  return useQuery<CurrentAccount>({
    queryKey: CURRENT_ACCOUNT_QUERY_KEY,
    queryFn: async () => {
      const response = await profileApi.getMe();
      return response.data;
    },
    enabled,
    staleTime: Infinity,
    retry: (failureCount, error) => {
      const status = resolveStatus(error);
      if (status === 401) return false;
      return failureCount < 2;
    },
  });
}
