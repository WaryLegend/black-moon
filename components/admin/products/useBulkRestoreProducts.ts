"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "@/services/products.api";

export function useBulkRestoreProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["products", "bulk-restore"],
    mutationFn: (ids: number[]) => productsApi.bulkRestore({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã khôi phục ${data.updatedCount} products`);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể khôi phục products";
      toast.error(message);
    },
  });
}
