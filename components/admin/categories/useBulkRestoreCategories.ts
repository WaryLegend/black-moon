"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { categoriesApi } from "@/services/categories.api";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

export function useBulkRestoreCategories() {
  const queryClient = useQueryClient();

  return useMutation<{ updatedCount: number }, unknown, number[]>({
    mutationKey: ["categories", "bulk-restore"],
    mutationFn: (ids: number[]) => categoriesApi.bulkRestore({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã khôi phục ${data.updatedCount} categories`);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(
          error,
          "Không thể khôi phục categories. Vui lòng thử lại",
        ),
      );
    },
  });
}
