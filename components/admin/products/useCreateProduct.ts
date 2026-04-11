"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "@/services/products.api";
import type { CreateProductDto, CreateProductResponse } from "@/types/products";

type CreateProductVariables = {
  payload: CreateProductDto;
  imageFiles: File[];
};

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<CreateProductResponse, any, CreateProductVariables>({
    mutationKey: ["products", "create"],
    mutationFn: ({ payload, imageFiles }) =>
      productsApi.create(payload, imageFiles),
    onSuccess: (response) => {
      const hasCreatedVariants = response.variantCreatedCount > 0;

      toast.success(
        hasCreatedVariants
          ? `Tạo sản phẩm mới với ${response.variantCreatedCount} biến thể thành công`
          : "Tạo sản phẩm mới thành công",
      );

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể tạo sản phẩm";
      toast.error(message);
    },
  });
}
