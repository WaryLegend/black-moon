"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "@/app/_lib/data-service";
import { PAGE_SIZE } from "@/app/_utils/constants";

export function useCategories({ page, filters, sortBy }) {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: { data: categories, total } = {},
    error,
  } = useQuery({
    queryFn: () => getCategories({ page, filters, sortBy }),
    queryKey: ["categories", filters, sortBy, page],
    staleTime: 60 * 1000 * 10,
  });

  const pageCount = Math.ceil(total / PAGE_SIZE);
  //Pre-fetching 2 page before and after current page. --> smooth transition
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["categories", filters, sortBy, page + 1],
      queryFn: () => getCategories({ filters, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["categories", filters, sortBy, page - 1],
      queryFn: () => getCategories({ filters, sortBy, page: page - 1 }),
    });

  return { isLoading, categories, total, error };
}
