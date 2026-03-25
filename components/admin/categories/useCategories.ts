"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "@/services/categories.api";
import { PAGE_SIZE } from "@/utils/constants";
import type { CategorySort, ListCategoriesFilters } from "@/types/categories";

type UseCategoriesParams = {
  page: number;
  filters: ListCategoriesFilters;
  sortBy: CategorySort;
};

export function useCategories({ page, filters, sortBy }: UseCategoriesParams) {
  const queryClient = useQueryClient();
  const { isPending, data, error } = useQuery({
    queryFn: () => categoriesApi.list({ page, filters, sortBy }),
    queryKey: ["categories", filters, sortBy, page],
    staleTime: 60 * 1000 * 10,
  });

  const categories = data?.items ?? [];
  const meta =
    data?.meta ??
    ({
      page,
      pageSize: PAGE_SIZE,
      totalItems: 0,
      totalPages: 0,
    } as const);
  const total = meta.totalItems;

  const totalPages = meta.totalPages ?? 0;

  if (totalPages && page < totalPages)
    queryClient.prefetchQuery({
      queryKey: ["categories", filters, sortBy, page + 1],
      queryFn: () => categoriesApi.list({ filters, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["categories", filters, sortBy, page - 1],
      queryFn: () => categoriesApi.list({ filters, sortBy, page: page - 1 }),
    });

  return { isPending, categories, total, error, meta };
}
