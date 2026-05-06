"use client";

import toast from "react-hot-toast";

import { useCurrentAccount } from "@/hooks/useCurrentAccount";
import { useCartStore } from "@/contexts/CartStore";
import type { CartGuestItem } from "@/types/cart";

import {
  useAddCartItem,
  useRemoveCartItem,
  useUpdateCartItem,
  useClearCart,
} from "./useCartMutations";

export type AddToCartInput = Omit<CartGuestItem, "id">;

export function useCartActions() {
  const { data: user, isPending: isUserPending } = useCurrentAccount();
  const isAuthenticated = Boolean(user?.id);

  const addCartItem = useAddCartItem();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();
  const clearCartItems = useClearCart();

  const addGuestItem = useCartStore((state) => state.addItem);
  const updateGuestQuantity = useCartStore((state) => state.updateQuantity);
  const removeGuestItem = useCartStore((state) => state.removeItem);
  const clearGuestCart = useCartStore((state) => state.clearCart);

  const addItem = async (item: AddToCartInput) => {
    if (isUserPending) return;
    if (isAuthenticated) {
      try {
        await addCartItem.mutateAsync({
          variantId: item.variantId,
          quantity: item.quantity,
        });
        toast.success("Đã thêm vào giỏ hàng", { icon: "🛒" });
      } catch {
        toast.error("Không thể thêm vào giỏ hàng. Thử lại sau.");
      }
      return;
    }

    addGuestItem({ id: crypto.randomUUID(), ...item });
    toast.success("Đã thêm vào giỏ hàng", { icon: "🛒" });
  };

  const updateQuantity = async (itemId: number | string, quantity: number) => {
    if (isUserPending) return;
    if (isAuthenticated) {
      if (typeof itemId !== "number") return;
      try {
        await updateCartItem.mutateAsync({ itemId, data: { quantity } });
      } catch {
        toast.error("Không thể cập nhật số lượng.");
      }
      return;
    }

    if (typeof itemId !== "string") return;
    updateGuestQuantity(itemId, quantity);
  };

  const removeItem = async (itemId: number | string) => {
    if (isUserPending) return;
    if (isAuthenticated) {
      if (typeof itemId !== "number") return;
      try {
        await removeCartItem.mutateAsync(itemId);
        toast.success("Đã gỡ khỏi giỏ hàng");
      } catch {
        toast.error("Không thể xóa sản phẩm. Thử lại sau.");
      }
      return;
    }

    if (typeof itemId !== "string") return;
    removeGuestItem(itemId);
    toast.success("Đã gỡ khỏi giỏ hàng");
  };

  const clearCart = async () => {
    if (isUserPending) return;
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
