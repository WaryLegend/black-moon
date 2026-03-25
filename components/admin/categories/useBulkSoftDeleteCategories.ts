"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { categoriesApi } from "@/services/categories.api";

export function useBulkSoftDeleteCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["categories", "bulk-soft-delete"],
    mutationFn: (ids: number[]) => categoriesApi.bulkSoftDelete({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã đánh dấu xóa ${data.updatedCount} categories`);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể đánh dấu xoá categories. Vui lòng thử lại";
      toast.error(message);
    },
  });
}
