"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { categoriesApi } from "@/services/categories.api";
import type { CategorySummary, CreateCategoryDto } from "@/types/categories";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

type CreateCategoryVariables = {
  payload: CreateCategoryDto;
  imageFile?: File | null;
};

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation<CategorySummary, unknown, CreateCategoryVariables>({
    mutationKey: ["categories", "create"],
    mutationFn: ({ payload, imageFile }) =>
      categoriesApi.create(payload, imageFile),
    onSuccess: () => {
      toast.success("Tạo danh mục thành công");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error(resolveToastErrorMessage(error, "Không thể tạo danh mục"));
    },
  });
}
