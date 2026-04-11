"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "@/services/products.api";
import type {
  ProductVariantSummary,
  UpdateProductVariantDto,
} from "@/types/products";

type UpdateProductVariantVariables = {
  variantId: number;
  payload: UpdateProductVariantDto;
  imageFile?: File | null;
};

export function useUpdateProductVariant() {
  const queryClient = useQueryClient();

  return useMutation<ProductVariantSummary, any, UpdateProductVariantVariables>(
    {
      mutationKey: ["product-variants", "update"],
      mutationFn: ({ variantId, payload, imageFile }) =>
        productsApi.updateVariant(variantId, payload, imageFile),
      onSuccess: () => {
        toast.success("Cập nhật biến thể thành công");
        queryClient.invalidateQueries({ queryKey: ["product-variants"] });
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ??
          error?.message ??
          "Cập nhật biến thể thất bại";
        toast.error(message);
      },
    },
  );
}
