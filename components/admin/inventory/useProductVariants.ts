"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { productsApi } from "@/services/products.api";
import type {
  ListProductVariantsFilters,
  ProductVariantSort,
} from "@/types/products";

type UseProductVariantsParams = {
  page: number;
  filters: ListProductVariantsFilters;
  sortBy: ProductVariantSort;
};

export function useProductVariants({
  page,
  filters,
  sortBy,
}: UseProductVariantsParams) {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["product-variants", { filters, sortBy, page }],
    queryFn: () => productsApi.listVariants({ page, filters, sortBy }),
    staleTime: 10 * 60 * 1000,
  });

  const variants = data?.items ?? [];
  const meta = data?.meta;

  const totalPages = meta?.totalPages ?? 0;

  if (totalPages && page < totalPages) {
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["product-variants", { filters, sortBy, page: nextPage }],
      queryFn: () =>
        productsApi.listVariants({ page: nextPage, filters, sortBy }),
    });
  }

  if (page > 1) {
    const prevPage = page - 1;
    queryClient.prefetchQuery({
      queryKey: ["product-variants", { filters, sortBy, page: prevPage }],
      queryFn: () =>
        productsApi.listVariants({ page: prevPage, filters, sortBy }),
    });
  }

  return {
    isPending,
    variants,
    meta,
    error,
  };
}
