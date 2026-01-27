"use client";

import { useEffect } from "react";
import { useCartStore } from "@/context/CartStore";

export default function CartInitializer({ user, cart }) {
  const { items, setCart, setCartId } = useCartStore();

  useEffect(() => {
    // Guest (no user)
    if (!user) return;

    // Logged in user with a cart
    if (cart) {
      // merge guest cart with server cart
      const merged = mergeCarts(items, cart.items);

      setCart(merged);
      setCartId(cart.id);
    }
  }, [user, cart]);

  return null;
}

function mergeCarts(localItems, serverItems) {
  const merged = [...serverItems];
  if (localItems?.length) {
    for (const local of localItems) {
      const found = merged.find((item) => item.variantId === local.variantId);

      if (found) {
        found.quantity += local.quantity;
      } else {
        merged.push(local);
      }
    }
  }
  return merged;
}
