"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { cartApi } from "@/services/cart.api";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";
import { useCartStore } from "@/contexts/CartStore";
import type { CartDisplayItem, CartGuestItem, CartItem } from "@/types/cart";

export const CART_QUERY_KEY = ["carts", "user"] as const;

const mapApiItem = (item: CartItem): CartDisplayItem => {
  const quantity = item.quantity ?? 0;
  const unitPrice = quantity > 0 ? item.totalPrice / quantity : 0;
  const variant = item.variant;

  return {
    id: item.id,
    variantId: variant?.id ?? 0,
    name: variant?.product?.name ?? "Sản phẩm",
    sku: variant?.sku ?? "-",
    color: variant?.color ?? null,
    size: variant?.size ?? null,
    quantity,
    unitPrice,
    totalPrice: item.totalPrice,
    imageUrl: variant?.image?.imageUrl ?? null,
    stock: variant?.quantity ?? null,
    isDeleted: variant?.isDeleted ?? false,
  };
};

const mapGuestItem = (item: CartGuestItem): CartDisplayItem => ({
  id: item.id,
  variantId: item.variantId,
  name: item.name,
  sku: item.sku,
  color: item.color ?? null,
  size: item.size ?? null,
  quantity: item.quantity,
  unitPrice: item.price,
  totalPrice: item.price * item.quantity,
  imageUrl: item.imageUrl ?? null,
  url: item.url,
  stock: item.stock ?? null,
});

export function useCartData() {
  const { data: user, isPending: isUserPending } = useCurrentAccount();
  const guestItems = useCartStore((state) => state.items);
  const guestPending = useCartStore((state) => state.isPending);

  const { data: cart, isPending: isCartPending } = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: () => cartApi.getByUser(),
    enabled: Boolean(user?.id),
    staleTime: 5 * 60 * 1000,
  });

  const items = useMemo(() => {
    if (user?.id) {
      return (cart?.items ?? []).map(mapApiItem);
    }
    return guestItems.map(mapGuestItem);
  }, [cart?.items, guestItems, user?.id]);

  const totalItems = user?.id
    ? (cart?.totalItems ?? 0)
    : items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = user?.id
    ? (cart?.totalPrice ?? 0)
    : items.reduce((sum, item) => sum + item.totalPrice, 0);

  const isPending = isUserPending || (user?.id ? isCartPending : guestPending);

  const getHasIssue = (orderLimit = Infinity) =>
    items.some(
      (item) =>
        item.quantity > orderLimit ||
        (item.stock !== null && item.stock !== undefined
          ? item.quantity > item.stock
          : false),
    );

  return {
    items,
    totalItems,
    totalPrice,
    isPending,
    getHasIssue,
  };
}
