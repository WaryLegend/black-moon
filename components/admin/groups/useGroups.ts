"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { targetGroupsApi } from "@/services/target-groups.api";
import type { TargetGroupSort } from "@/types/groups";
import { PAGE_SIZE } from "@/utils/constants";

type UseGroupsParams = {
  page: number;
  sortBy: TargetGroupSort;
};

export function useGroups({ page, sortBy }: UseGroupsParams) {
  const queryClient = useQueryClient();
  const queryKey = ["target-groups", { sortBy, page }] as const;

  const { data, isPending, error } = useQuery({
    queryKey,
    queryFn: () => targetGroupsApi.list({ page, sortBy }),
    staleTime: 10 * 60 * 1000,
  });

  const groups = data?.items ?? [];
  const meta =
    data?.meta ??
    ({
      page,
      pageSize: PAGE_SIZE,
      totalItems: 0,
      totalPages: 0,
    } as const);

  const totalPages = meta.totalPages ?? 0;

  if (totalPages && page < totalPages) {
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["target-groups", { sortBy, page: nextPage }],
      queryFn: () => targetGroupsApi.list({ page: nextPage, sortBy }),
    });
  }

  if (page > 1) {
    const prevPage = page - 1;
    queryClient.prefetchQuery({
      queryKey: ["target-groups", { sortBy, page: prevPage }],
      queryFn: () => targetGroupsApi.list({ page: prevPage, sortBy }),
    });
  }

  return {
    isPending,
    groups,
    total: meta.totalItems,
    meta,
    error,
  };
}
