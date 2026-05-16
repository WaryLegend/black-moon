"use client";

import { useQuery } from "@tanstack/react-query";

import { shippingProfilesApi } from "@/services/shipping-profiles.api";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";

export const SHIPPING_PROFILES_QUERY_KEY = ["shipping-profiles", "me"] as const;

export function useShippingProfiles() {
  const { data: user } = useCurrentAccount();
  const enabled = Boolean(user?.id);

  return useQuery({
    queryKey: SHIPPING_PROFILES_QUERY_KEY,
    queryFn: () => shippingProfilesApi.getByMe(),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
