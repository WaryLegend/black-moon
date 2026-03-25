"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { categoriesApi } from "@/services/categories.api";
import type { CategorySummary, CreateCategoryDto } from "@/types/categories";

type CreateCategoryVariables = {
  payload: CreateCategoryDto;
  imageFile?: File | null;
};

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation<CategorySummary, any, CreateCategoryVariables>({
    mutationKey: ["categories", "create"],
    mutationFn: ({ payload, imageFile }) =>
      categoriesApi.create(payload, imageFile),
    onSuccess: () => {
      toast.success("Tạo danh mục thành công");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể tạo danh mục";
      toast.error(message);
    },
  });
}
