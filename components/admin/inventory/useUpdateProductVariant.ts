"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { productsApi } from "@/services/products.api";
import type {
  ProductVariantSummary,
  UpdateProductVariantDto,
} from "@/types/products";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

type UpdateProductVariantVariables = {
  variantId: number;
  payload: UpdateProductVariantDto;
  imageFile?: File | null;
};

export function useUpdateProductVariant() {
  const queryClient = useQueryClient();

  return useMutation<
    ProductVariantSummary,
    unknown,
    UpdateProductVariantVariables
  >({
    mutationKey: ["product-variants", "update"],
    mutationFn: ({ variantId, payload, imageFile }) =>
      productsApi.updateVariant(variantId, payload, imageFile),
    onSuccess: (_, variables) => {
      toast.success("Cập nhật biến thể thành công");
      queryClient.invalidateQueries({ queryKey: ["product-variants"] });
      if (variables.payload.quantity !== undefined) {
        queryClient.invalidateQueries({ queryKey: ["inventory-history"] });
      }
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(error, "Cập nhật biến thể thất bại"),
      );
    },
  });
}
