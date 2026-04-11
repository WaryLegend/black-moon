"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "@/services/products.api";

export function useBulkSoftDeleteProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["products", "bulk-soft-delete"],
    mutationFn: (ids: number[]) => productsApi.bulkSoftDelete({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã đánh dấu xóa ${data.updatedCount} products`);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể đánh dấu xóa products";
      toast.error(message);
    },
  });
}
