"use client";

import CartInitializer from "@/app/_context/CartInitializer";

export default function CartProvider({ children, initialItems }) {
  return (
    <>
      <CartInitializer initialItems={initialItems} />
      {children}
    </>
  );
}
