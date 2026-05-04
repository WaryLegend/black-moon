"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "@/services/products.api";
import type { ProductDetailSummary, UpdateProductDto } from "@/types/products";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

type UpdateProductVariables = {
  productId: number;
  payload: UpdateProductDto;
  imageFiles: File[];
};

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation<ProductDetailSummary, unknown, UpdateProductVariables>({
    mutationKey: ["products", "update"],
    mutationFn: ({ productId, payload, imageFiles }) =>
      productsApi.update(productId, payload, imageFiles),
    onSuccess: () => {
      toast.success("Cập nhật sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(error, "Không thể cập nhật sản phẩm"),
      );
    },
  });
}
