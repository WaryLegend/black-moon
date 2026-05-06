"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

import { useCurrentAccount } from "@/hooks/useCurrentAccount";
import { useCartStore } from "@/contexts/CartStore";

import { useMergeCart } from "./useCartMutations";

export function useCartSync() {
  const { data: user } = useCurrentAccount();
  const guestItems = useCartStore((state) => state.items);
  const hasMerged = useCartStore((state) => state.hasMerged);
  const setHasMerged = useCartStore((state) => state.setHasMerged);
  const clearGuestCart = useCartStore((state) => state.clearCart);

  const mergeCart = useMergeCart();

  useEffect(() => {
    if (!user?.id) {
      if (hasMerged) {
        setHasMerged(false);
      }
      return;
    }

    if (hasMerged || guestItems.length === 0 || mergeCart.isPending) {
      return;
    }

    mergeCart.mutate(
      {
        items: guestItems.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      },
      {
        onSuccess: () => {
          clearGuestCart();
          setHasMerged(true);
          toast.success("Đã đồng bộ giỏ hàng");
        },
        onError: () => {
          toast.error("Không thể đồng bộ giỏ hàng");
        },
      },
    );
  }, [
    user?.id,
    guestItems,
    hasMerged,
    mergeCart,
    clearGuestCart,
    setHasMerged,
  ]);
}
