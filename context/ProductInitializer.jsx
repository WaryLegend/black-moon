"use client";

import { useRef } from "react";
import { useProductStore } from "./ProductStore";

export default function ProductInitializer({ product }) {
  const { setProduct } = useProductStore();

  const prevProductId = useRef(null);

  if (product?.id !== prevProductId.current) {
    prevProductId.current = product?.id;
    setProduct(product);
  }

  return null;
}
