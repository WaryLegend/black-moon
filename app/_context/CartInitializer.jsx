"use client";

import { useEffect } from "react";
import { useCartStore } from "@/app/_context/CartStore";

export default function CartInitializer({ initialItems }) {
  const setCart = useCartStore((state) => state.setCart);

  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      setCart(initialItems);
    }
    // Nếu có backend → gọi sync
    // useCartStore.getState().syncWithServer();
  }, [initialItems, setCart]);

  return null;
}
