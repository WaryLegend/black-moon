"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { inventoryHistoryApi } from "@/services/inventory-history.api";
import type {
  InventoryHistorySort,
  ListInventoryHistoryFilters,
} from "@/types/inventory-history";
import { PAGE_SIZE } from "@/utils/constants";

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
  const meta =
    data?.meta ??
    ({
      page,
      pageSize: PAGE_SIZE,
      totalItems: 0,
      totalPages: 0,
    } as const);

  if (meta.totalPages && page < meta.totalPages) {
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
    total: meta.totalItems,
    meta,
    error,
  };
}
