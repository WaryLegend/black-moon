"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecentOrdersApi } from "@/app/_lib/data-service";

export function useRecentOrders(limit = 5) {
  const { isLoading, data: recentOrders = [] } = useQuery({
    queryFn: () => getRecentOrdersApi(limit),
    queryKey: ["recent-orders", `${limit}`],
    staleTime: 60 * 1000 * 2,
  });

  return { isLoading, recentOrders };
}
