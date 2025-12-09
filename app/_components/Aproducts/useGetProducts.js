"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/app/_lib/data-service";
import { PAGE_SIZE } from "@/app/_utils/constants";

export function useGetProducts({ page, filters, sortBy }) {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: { data: products, total } = {},
    error,
  } = useQuery({
    queryFn: () => getProducts({ page, filters, sortBy }),
    queryKey: ["products", filters, sortBy, page],
    staleTime: 60 * 1000 * 10,
  });

  const pageCount = Math.ceil(total / PAGE_SIZE);
  //Pre-fetching 2 page before and after current page. --> smooth transition
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["products", filters, sortBy, page + 1],
      queryFn: () => getProducts({ filters, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["products", filters, sortBy, page - 1],
      queryFn: () => getProducts({ filters, sortBy, page: page - 1 }),
    });

  return { isLoading, products, total, error };
}
