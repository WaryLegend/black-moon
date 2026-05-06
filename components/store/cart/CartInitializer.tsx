"use client";

import { useCartSync } from "@/components/store/cart/useCartSync";

export default function CartInitializer() {
  useCartSync();
  return null;
}
