"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { usersApi } from "@/services/users.api";
import type { ListUsersFilters, ListUsersSort } from "@/types/users";
import { PAGE_SIZE } from "@/utils/constants";

type UseUsersParams = {
  page: number;
  filters: ListUsersFilters;
  sortBy: ListUsersSort;
};

export function useUsers({ page, filters, sortBy }: UseUsersParams) {
  const queryClient = useQueryClient();
  const queryKey = ["users", filters, sortBy, page] as const;

  const { isPending, data, error } = useQuery({
    queryFn: () => usersApi.list({ page, filters, sortBy }),
    queryKey,
    staleTime: 60 * 1000 * 10,
  });

  const users = data?.items ?? [];
  const meta =
    data?.meta ??
    ({
      page,
      pageSize: PAGE_SIZE,
      totalItems: 0,
      totalPages: 0,
    } as const);
  const total = meta.totalItems;

  const totalPages = meta.totalPages ?? 0;

  if (totalPages && page < totalPages) {
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["users", filters, sortBy, nextPage],
      queryFn: () => usersApi.list({ filters, sortBy, page: nextPage }),
    });
  }

  if (page > 1) {
    const prevPage = page - 1;
    queryClient.prefetchQuery({
      queryKey: ["users", filters, sortBy, prevPage],
      queryFn: () => usersApi.list({ filters, sortBy, page: prevPage }),
    });
  }

  return { isPending, users, total, meta, error };
}
