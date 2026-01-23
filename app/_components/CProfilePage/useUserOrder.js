"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserOrderById } from "@/app/_lib/data-service";

export function useUserOrder({ orderId, userId }) {
  const {
    isLoading,
    data: order,
    error,
    isError,
  } = useQuery({
    queryFn: () => getUserOrderById({ orderId, userId }),
    queryKey: ["order", orderId, userId],
    enabled: !!orderId,
    staleTime: 60 * 1000 * 2,
  });

  return { isLoading, order, error, isError };
}
