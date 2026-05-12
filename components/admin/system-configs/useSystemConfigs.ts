"use client";

import { useQuery } from "@tanstack/react-query";

import { systemConfigsApi } from "@/services/system-configs.api";

export function useSystemConfigs() {
  const { data, isPending, error } = useQuery({
    queryKey: ["system-configs"],
    queryFn: () => systemConfigsApi.list(),
    staleTime: 60 * 1000 * 5,
  });

  return {
    configs: data ?? [],
    isPending,
    error,
  };
}
