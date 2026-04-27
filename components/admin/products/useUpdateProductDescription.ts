"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "@/services/products.api";
import type { UpdateProductDescriptionDto } from "@/types/products";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

type UpdateProductDescriptionVariables = {
  productId: number;
  payload: UpdateProductDescriptionDto;
};

export function useUpdateProductDescription() {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean },
    unknown,
    UpdateProductDescriptionVariables
  >({
    mutationKey: ["products", "description", "update"],
    mutationFn: ({ payload }) => productsApi.updateDescription(payload),
    onSuccess: (_, variables) => {
      toast.success("Đã lưu mô tả");
      queryClient.invalidateQueries({
        queryKey: ["products", "id", variables.productId],
      });
    },
    onError: (error) => {
      toast.error(resolveToastErrorMessage(error, "Không thể lưu mô tả"));
    },
  });
}
