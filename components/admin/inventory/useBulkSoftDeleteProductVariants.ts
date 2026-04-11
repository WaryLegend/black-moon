"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "@/services/products.api";

export function useBulkSoftDeleteProductVariants() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["product-variants", "bulk-soft-delete"],
    mutationFn: (ids: number[]) => productsApi.bulkSoftDeleteVariants({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã đánh dấu xóa ${data.updatedCount} biến thể`);
      queryClient.invalidateQueries({ queryKey: ["product-variants"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể đánh dấu xóa biến thể";
      toast.error(message);
    },
  });
}
