"use client";
import { useCartStore } from "@/app/_context/CartStore";
import { useEffect } from "react";

export default function CartInitializer({ items: initialItems }) {
  const setCart = useCartStore((state) => state.setCart);

  useEffect(() => {
    // Initialize the store with server-provided cart items
    setCart(initialItems);
  }, [initialItems, setCart]);

  return null; // This component doesn't render anything
}
