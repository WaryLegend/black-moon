"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrdersByUserId } from "@/app/_lib/data-service";
import { PAGE_SIZE } from "@/app/_utils/constants";

export function useOrdersByUser({ userId, page, filters }) {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: { data: orders, total } = {},
    error,
  } = useQuery({
    queryFn: () => getOrdersByUserId({ userId, page, filters }),
    queryKey: ["orders", userId, filters, page],
    staleTime: 60 * 1000 * 2,
  });

  const pageCount = Math.ceil(total / PAGE_SIZE);
  //Pre-fetching 2 page before and after current page. --> smooth transition
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["orders", userId, filters, page + 1],
      queryFn: () => getOrdersByUserId({ userId, filters, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["orders", userId, filters, page - 1],
      queryFn: () => getOrdersByUserId({ userId, filters, page: page - 1 }),
    });

  return { isLoading, orders, total, error };
}
