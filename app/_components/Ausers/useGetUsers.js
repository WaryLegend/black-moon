"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "@/app/_lib/data-service";
import { PAGE_SIZE } from "@/app/_utils/constants";

export function useGetUsers({ page, filters, sortBy }) {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: { data: users, total } = {},
    error,
  } = useQuery({
    queryFn: () => getUsers({ page, filters, sortBy }),
    queryKey: ["users", filters, sortBy, page],
    staleTime: 60 * 1000 * 10,
  });

  const pageCount = Math.ceil(total / PAGE_SIZE);
  //Pre-fetching 2 page before and after current page. --> smooth transition
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["users", filters, sortBy, page + 1],
      queryFn: () => getUsers({ filters, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["users", filters, sortBy, page - 1],
      queryFn: () => getUsers({ filters, sortBy, page: page - 1 }),
    });

  return { isLoading, users, total, error };
}
