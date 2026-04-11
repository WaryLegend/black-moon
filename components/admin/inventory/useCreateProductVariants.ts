"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "@/services/products.api";
import type {
  CreateProductVariantsResponse,
  CreateVariantMatrixItem,
} from "@/types/products";

type CreateProductVariantsVariables = {
  productId: number;
  variants: CreateVariantMatrixItem[];
};

export function useCreateProductVariants() {
  const queryClient = useQueryClient();

  return useMutation<
    CreateProductVariantsResponse,
    any,
    CreateProductVariantsVariables
  >({
    mutationKey: ["product-variants", "create"],
    mutationFn: async ({ productId, variants }) => {
      const pairs = Array.from(
        new Map(
          variants.map((variant) => {
            const color = variant.color.toUpperCase();
            const size = variant.size.toUpperCase();
            return [`${color}:${size}`, { color, size }];
          }),
        ).values(),
      );

      const response = await productsApi.createVariant({
        productId,
        basePrice: variants[0]?.price,
        pairs,
      });

      return response;
    },
    onSuccess: (response) => {
      toast.success(`Tạo ${response.createdCount} biến thể thành công`);
      queryClient.invalidateQueries({ queryKey: ["product-variants"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Tạo biến thể mới không thành công";
      toast.error(message);
    },
  });
}
