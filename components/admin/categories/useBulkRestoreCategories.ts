"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { categoriesApi } from "@/services/categories.api";

export function useBulkRestoreCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["categories", "bulk-restore"],
    mutationFn: (ids: number[]) => categoriesApi.bulkRestore({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã khôi phục ${data.updatedCount} categories`);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể khôi phục categories. Vui lòng thử lại";
      toast.error(message);
    },
  });
}
