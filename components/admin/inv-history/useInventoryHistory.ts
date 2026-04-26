"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { inventoryHistoryApi } from "@/services/inventory-history.api";
import type {
  InventoryHistorySort,
  ListInventoryHistoryFilters,
} from "@/types/inventory-history";

type UseInventoryHistoryParams = {
  page: number;
  filters: ListInventoryHistoryFilters;
  sortBy: InventoryHistorySort;
};

export function useInventoryHistory({
  page,
  filters,
  sortBy,
}: UseInventoryHistoryParams) {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["inventory-history", { filters, sortBy, page }],
    queryFn: () => inventoryHistoryApi.list({ page, filters, sortBy }),
    staleTime: 10 * 60 * 1000,
  });

  const rows = data?.items ?? [];
  const meta = data?.meta;

  const totalPages = meta?.totalPages;

  if (totalPages && page < totalPages) {
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["inventory-history", { filters, sortBy, page: nextPage }],
      queryFn: () =>
        inventoryHistoryApi.list({ page: nextPage, filters, sortBy }),
    });
  }

  if (page > 1) {
    const prevPage = page - 1;
    queryClient.prefetchQuery({
      queryKey: ["inventory-history", { filters, sortBy, page: prevPage }],
      queryFn: () =>
        inventoryHistoryApi.list({ page: prevPage, filters, sortBy }),
    });
  }

  return {
    isPending,
    rows,
    meta,
    error,
  };
}
