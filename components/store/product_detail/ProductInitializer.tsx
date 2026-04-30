"use client";

import { useRef } from "react";

import { useProductStore } from "@/contexts/ProductStore";
import type { ProductDetailSummary } from "@/types/products";

export default function ProductInitializer({
  product,
}: {
  product: ProductDetailSummary;
}) {
  const { setProduct } = useProductStore();
  const prevProductId = useRef<number | null>(null);

  if (product?.id !== prevProductId.current) {
    prevProductId.current = product?.id ?? null;
    setProduct(product);
  }

  return null;
}
