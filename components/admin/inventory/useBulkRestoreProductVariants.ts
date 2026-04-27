"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "@/services/products.api";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

export function useBulkRestoreProductVariants() {
  const queryClient = useQueryClient();

  return useMutation<{ updatedCount: number }, unknown, number[]>({
    mutationKey: ["product-variants", "bulk-restore"],
    mutationFn: (ids: number[]) => productsApi.bulkRestoreVariants({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã khôi phục ${data.updatedCount} biến thể`);
      queryClient.invalidateQueries({ queryKey: ["product-variants"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(error, "Không thể khôi phục biến thể"),
      );
    },
  });
}
