"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "@/services/products.api";
import type { ProductSummary, UpdateProductDto } from "@/types/products";

type UpdateProductVariables = {
  productId: number;
  payload: UpdateProductDto;
  imageFiles: File[];
};

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation<ProductSummary, any, UpdateProductVariables>({
    mutationKey: ["products", "update"],
    mutationFn: ({ productId, payload, imageFiles }) =>
      productsApi.update(productId, payload, imageFiles),
    onSuccess: () => {
      toast.success("Cập nhật sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể cập nhật sản phẩm";
      toast.error(message);
    },
  });
}
