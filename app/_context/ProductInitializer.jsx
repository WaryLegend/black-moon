"use client";

import { useEffect } from "react";
import { useProductStore } from "./ProductStore";

export default function ProductInitializer({ product }) {
  const { setProduct } = useProductStore();

  useEffect(() => {
    setProduct(product);
  }, []);

  return null;
}
