"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { wishlistApi } from "@/services/wishlist.api";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";
import { WISHLIST_QUERY_KEY } from "./useWishlist";
import toast from "react-hot-toast";

export function useAddToWishlist() {
  const { data: user } = useCurrentAccount();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variantId: number) => {
      if (!user?.id) {
        throw new Error("Missing user session");
      }
      return wishlistApi.create({ userId: user.id, variantId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      toast.success("Sản phẩm đã được thêm vào yêu thích");
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wishlistId: number) => wishlistApi.remove(wishlistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
      toast.success("Sản phẩm đã được xóa khỏi yêu thích");
    },
  });
}
