"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cartApi } from "@/services/cart.api";
import type {
  CartResponse,
  CreateCartItemDto,
  MergeCartDto,
  UpdateCartItemDto,
} from "@/types/cart";

import { CART_QUERY_KEY } from "./useCart";

export function useAddCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCartItemDto) => cartApi.addItem(payload),
    onSuccess: (cart) => {
      queryClient.setQueryData<CartResponse>(CART_QUERY_KEY, cart);
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { itemId: number; data: UpdateCartItemDto }) =>
      cartApi.updateItem(payload.itemId, payload.data),
    onSuccess: (cart) => {
      queryClient.setQueryData<CartResponse>(CART_QUERY_KEY, cart);
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) => cartApi.removeItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartApi.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
}

export function useMergeCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MergeCartDto) => cartApi.mergeCart(payload),
    onSuccess: (cart) => {
      queryClient.setQueryData<CartResponse>(CART_QUERY_KEY, cart);
    },
  });
}
