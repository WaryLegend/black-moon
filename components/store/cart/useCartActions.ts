"use client";

import toast from "react-hot-toast";

import { useAccessToken } from "@/hooks/useAccessToken";
import { useCartStore } from "@/contexts/CartStore";
import type { GuestCartItem } from "@/types/cart";

import {
  useAddCartItem,
  useRemoveCartItem,
  useUpdateCartItem,
  useClearCart,
} from "./useCartMutations";

export function useCartActions() {
  const accessToken = useAccessToken();
  const isAuthenticated = Boolean(accessToken);

  const addCartItem = useAddCartItem();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();
  const clearCartItems = useClearCart();

  const addGuestItem = useCartStore((state) => state.addItem);
  const updateGuestQuantity = useCartStore((state) => state.updateQuantity);
  const removeGuestItem = useCartStore((state) => state.removeItem);
  const clearGuestCart = useCartStore((state) => state.clearCart);

  const addItem = async (item: GuestCartItem) => {
    const variantId = item.variant?.id;
    if (!variantId) return;

    if (isAuthenticated) {
      try {
        await addCartItem.mutateAsync({
          variantId,
          quantity: item.quantity ?? undefined,
        });
        toast.success("Đã thêm vào giỏ hàng", { icon: "🛒" });
      } catch {
        toast.error("Không thể thêm vào giỏ hàng. Thử lại sau.");
      }
      return;
    }

    addGuestItem(item);
    toast.success("Đã thêm vào giỏ hàng", { icon: "🛒" });
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (isAuthenticated) {
      try {
        await updateCartItem.mutateAsync({ itemId, data: { quantity } });
      } catch {
        toast.error("Không thể cập nhật số lượng.");
      }
      return;
    }

    updateGuestQuantity(itemId, quantity);
  };

  const removeItem = async (itemId: number) => {
    if (isAuthenticated) {
      try {
        await removeCartItem.mutateAsync(itemId);
        toast.success("Đã gỡ khỏi giỏ hàng");
      } catch {
        toast.error("Không thể xóa sản phẩm. Thử lại sau.");
      }
      return;
    }

    removeGuestItem(itemId);
    toast.success("Đã gỡ khỏi giỏ hàng");
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await clearCartItems.mutateAsync();
        toast.success("Đã xóa giỏ hàng");
      } catch {
        toast.error("Không thể xóa giỏ hàng. Thử lại sau.");
      }
      return;
    }

    clearGuestCart();
    toast.success("Đã xóa giỏ hàng");
  };

  return {
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    isAuthenticated,
    isAdding: addCartItem.isPending,
    isUpdating: updateCartItem.isPending,
    isRemoving: removeCartItem.isPending,
    isClearing: clearCartItems.isPending,
  };
}
