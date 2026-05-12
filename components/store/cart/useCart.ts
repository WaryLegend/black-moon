"use client";

import { useQuery } from "@tanstack/react-query";

import { cartApi } from "@/services/cart.api";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useCartStore } from "@/contexts/CartStore";

export const CART_QUERY_KEY = ["carts", "me"] as const;

export function useCartData() {
  const accessToken = useAccessToken();
  const hasAccessToken = Boolean(accessToken);
  const guestItems = useCartStore((state) => state.items);
  const guestPending = useCartStore((state) => state.isPending);

  const { data: cart, isPending: isCartPending } = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: () => cartApi.getByUser(),
    enabled: hasAccessToken,
    staleTime: 5 * 60 * 1000,
  });

  const items = hasAccessToken ? (cart?.items ?? []) : guestItems;

  const totalItems = hasAccessToken
    ? (cart?.totalItems ?? 0)
    : items.reduce((sum, item) => sum + (item.quantity ?? 0), 0);

  const totalPrice = hasAccessToken
    ? (cart?.totalPrice ?? 0)
    : guestItems.reduce(
        (sum, item) => sum + item.variant.price * item.quantity,
        0,
      );

  const isPending = hasAccessToken ? isCartPending : guestPending;

  const getHasIssue = (orderLimit = Infinity) =>
    items.some((item) => {
      const quantity = item.quantity ?? 0;
      const variantQuantity = item.variant?.quantity;
      return (
        quantity > orderLimit ||
        (variantQuantity !== null &&
          variantQuantity !== undefined &&
          quantity > variantQuantity)
      );
    });

  return {
    items,
    totalItems,
    totalPrice,
    isPending,
    getHasIssue,
  };
}
