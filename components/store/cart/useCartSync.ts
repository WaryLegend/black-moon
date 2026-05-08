"use client";

import { useEffect, useMemo, useRef } from "react";
import toast from "react-hot-toast";

import { useAccessToken } from "@/hooks/useAccessToken";
import { useCartStore } from "@/contexts/CartStore";

import { useMergeCart } from "./useCartMutations";

export function useCartSync() {
  const accessToken = useAccessToken();
  const hasAccessToken = Boolean(accessToken);

  const guestItems = useCartStore((state) => state.items);
  const clearGuestCart = useCartStore((state) => state.clearCart);
  const submittedMergeKeyRef = useRef<string | null>(null);

  const { mutate, isPending } = useMergeCart();

  const mergeItems = useMemo(
    () =>
      guestItems.flatMap((item) => {
        const variantId = item.variant?.id;
        const quantity = item.quantity ?? 0;

        if (!variantId || quantity <= 0) return [];
        return { variantId, quantity };
      }),
    [guestItems],
  );

  const mergeKey = useMemo(
    () =>
      mergeItems
        .map((item) => `${item.variantId}:${item.quantity}`)
        .sort()
        .join("|"),
    [mergeItems],
  );

  useEffect(() => {
    if (!hasAccessToken) {
      submittedMergeKeyRef.current = null;
      return;
    }

    if (!mergeItems.length || !mergeKey) {
      submittedMergeKeyRef.current = null;
      return;
    }

    if (isPending || submittedMergeKeyRef.current === mergeKey) {
      return;
    }

    submittedMergeKeyRef.current = mergeKey;

    mutate(
      { items: mergeItems },
      {
        onSuccess: () => {
          clearGuestCart();
          toast.success("Đã đồng bộ giỏ hàng");
        },
        onError: () => {
          toast.error("Không thể đồng bộ giỏ hàng");
        },
      },
    );
  }, [hasAccessToken, mergeItems, mergeKey, isPending, mutate, clearGuestCart]);
}
