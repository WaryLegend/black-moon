"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { categoriesApi } from "@/services/categories.api";
import type { CategorySummary, UpdateCategoryDto } from "@/types/categories";

type UpdateCategoryVariables = {
  categoryId: number;
  payload: UpdateCategoryDto;
  imageFile?: File | null;
};

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation<CategorySummary, any, UpdateCategoryVariables>({
    mutationKey: ["categories", "update"],
    mutationFn: ({ categoryId, payload, imageFile }) =>
      categoriesApi.update(categoryId, payload, imageFile),
    onSuccess: () => {
      toast.success("Cập nhật danh mục thành công");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể cập nhật danh mục";
      toast.error(message);
    },
  });
}
