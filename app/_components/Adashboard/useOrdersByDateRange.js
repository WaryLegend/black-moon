"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { subDays } from "date-fns";
import {
  calculateTotalRevenue as _calculateTotalRevenue,
  calculateTotalOrders as _calculateTotalOrders,
  calculateProductsSold as _calculateProductsSold,
  calculateSalesByCategory as _calculateSalesByCategory,
  calculateSalesByProduct as _calculateSalesByProduct,
} from "../../_hooks/useOrdersHelpers";
import { getOrdersAfterDate } from "@/app/_lib/data-service";

function getQueryDate(numDays) {
  return subDays(new Date(), numDays).toISOString();
}

export function useOrdersByDateRange(defaultDays = 7) {
  const searchParams = useSearchParams();
  const numDays = !searchParams.get("last")
    ? defaultDays
    : Number(searchParams.get("last"));

  const queryDate = getQueryDate(numDays);

  const {
    isLoading,
    data: orders = [],
    error,
  } = useQuery({
    queryFn: () => getOrdersAfterDate(queryDate),
    queryKey: ["orders", `last-${numDays}`],
    staleTime: 5 * 60 * 1000,
  });

  return {
    isLoading,
    orders,
    numDays,
    error,
    totalRevenue: _calculateTotalRevenue(orders, numDays),
    totalOrdersCount: _calculateTotalOrders(orders, numDays),
    productsSold: _calculateProductsSold(orders, numDays),
    salesByCategory: _calculateSalesByCategory(orders, numDays),
    salesByProduct: _calculateSalesByProduct(orders, numDays),
  };
}
