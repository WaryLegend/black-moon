"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { categoriesApi } from "@/services/categories.api";
import type { CategorySummary, UpdateCategoryDto } from "@/types/categories";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

type UpdateCategoryVariables = {
  categoryId: number;
  payload: UpdateCategoryDto;
  imageFile?: File | null;
};

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation<CategorySummary, unknown, UpdateCategoryVariables>({
    mutationKey: ["categories", "update"],
    mutationFn: ({ categoryId, payload, imageFile }) =>
      categoriesApi.update(categoryId, payload, imageFile),
    onSuccess: () => {
      toast.success("Cập nhật danh mục thành công");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(error, "Không thể cập nhật danh mục"),
      );
    },
  });
}
