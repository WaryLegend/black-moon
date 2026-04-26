"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { productsApi } from "@/services/products.api";
import type { ListProductsFilters, ProductSort } from "@/types/products";

type UseProductsParams = {
  page: number;
  filters: ListProductsFilters;
  sortBy: ProductSort;
};

export function useProducts({ page, filters, sortBy }: UseProductsParams) {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["products", { filters, sortBy, page }],
    queryFn: () => productsApi.list({ page, filters, sortBy }),
    staleTime: 10 * 60 * 1000,
  });

  const products = data?.items ?? [];
  const meta = data?.meta;

  const totalPages = meta?.totalPages ?? 0;

  if (totalPages && page < totalPages) {
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["products", { filters, sortBy, page: nextPage }],
      queryFn: () => productsApi.list({ page: nextPage, filters, sortBy }),
    });
  }

  if (page > 1) {
    const prevPage = page - 1;
    queryClient.prefetchQuery({
      queryKey: ["products", { filters, sortBy, page: prevPage }],
      queryFn: () => productsApi.list({ page: prevPage, filters, sortBy }),
    });
  }

  return {
    isPending,
    products,
    meta,
    error,
  };
}
