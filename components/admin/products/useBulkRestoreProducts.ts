"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "@/services/products.api";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

export function useBulkRestoreProducts() {
  const queryClient = useQueryClient();

  return useMutation<{ updatedCount: number }, unknown, number[]>({
    mutationKey: ["products", "bulk-restore"],
    mutationFn: (ids: number[]) => productsApi.bulkRestore({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã khôi phục ${data.updatedCount} products`);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(error, "Không thể khôi phục products"),
      );
    },
  });
}
