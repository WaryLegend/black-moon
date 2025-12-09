"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getVariants } from "@/app/_lib/data-service";
import { PAGE_SIZE } from "@/app/_utils/constants";

export function useGetVariants({ page, filters, sortBy }) {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: { data: variants, total } = {},
    error,
  } = useQuery({
    queryFn: () => getVariants({ page, filters, sortBy }),
    queryKey: ["variants", filters, sortBy, page],
    staleTime: 60 * 1000 * 10,
  });

  const pageCount = Math.ceil(total / PAGE_SIZE);
  //Pre-fetching 2 page before and after current page. --> smooth transition
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["variants", filters, sortBy, page + 1],
      queryFn: () => getVariants({ filters, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["variants", filters, sortBy, page - 1],
      queryFn: () => getVariants({ filters, sortBy, page: page - 1 }),
    });

  return { isLoading, variants, total, error };
}
