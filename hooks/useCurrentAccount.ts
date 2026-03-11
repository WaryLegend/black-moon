"use client";

import { useQuery } from "@tanstack/react-query";

import { profileApi } from "@/services/profile.api";
import type { CurrentAccount } from "@/types/profile";
import { useAccessToken } from "@/hooks/useAccessToken";

export const CURRENT_ACCOUNT_QUERY_KEY = ["users", "me"] as const;

export function useCurrentAccount() {
  const token = useAccessToken();
  const enabled = Boolean(token);

  return useQuery<CurrentAccount>({
    queryKey: CURRENT_ACCOUNT_QUERY_KEY,
    queryFn: async () => {
      const response = await profileApi.getMe();
      return response.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      const status = error?.response?.status;
      if (status === 401) return false;
      return failureCount < 2;
    },
  });
}
