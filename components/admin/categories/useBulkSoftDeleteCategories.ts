"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { categoriesApi } from "@/services/categories.api";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

export function useBulkSoftDeleteCategories() {
  const queryClient = useQueryClient();

  return useMutation<{ updatedCount: number }, unknown, number[]>({
    mutationKey: ["categories", "bulk-soft-delete"],
    mutationFn: (ids: number[]) => categoriesApi.bulkSoftDelete({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã đánh dấu xóa ${data.updatedCount} categories`);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(
          error,
          "Không thể đánh dấu xoá categories. Vui lòng thử lại",
        ),
      );
    },
  });
}
