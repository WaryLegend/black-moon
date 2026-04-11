"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "@/services/products.api";

export function useBulkRestoreProductVariants() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["product-variants", "bulk-restore"],
    mutationFn: (ids: number[]) => productsApi.bulkRestoreVariants({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã khôi phục ${data.updatedCount} biến thể`);
      queryClient.invalidateQueries({ queryKey: ["product-variants"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể khôi phục biến thể";
      toast.error(message);
    },
  });
}
