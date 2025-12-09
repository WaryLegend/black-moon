"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecentOrders } from "@/app/_lib/data-service";

export function useRecentOrders(limit = 5) {
  const {
    isLoading,
    data: recentOrders = [],
    error,
  } = useQuery({
    queryFn: () => getRecentOrders(limit),
    queryKey: ["recent-orders", `${limit}`],
    staleTime: 60 * 1000,
  });

  return { isLoading, recentOrders, error };
}
