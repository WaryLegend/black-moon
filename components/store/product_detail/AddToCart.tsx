"use client";

import { useCallback } from "react";

import Button from "@/components/ui/Button";
import { useProductStore } from "@/contexts/ProductStore";

import { useCartActions } from "@/components/store/cart/useCartActions";

export default function AddToCart() {
  const product = useProductStore((s) => s.product);
  const variant = useProductStore((s) => s.selectedVariant());
  const quantity = useProductStore((s) => s.quantity);
  const { addItem } = useCartActions();

  const handleAdd = useCallback(() => {
    if (!product || !variant) return;

    addItem({
      id: variant.id,
      quantity,
      variant: {
        id: variant.id,
        sku: variant.sku,
        color: variant.color ?? null,
        size: variant.size ?? null,
        price: variant.price ?? 0,
        image: variant.image,
        isDeleted: variant.isDeleted,
        quantity: variant.quantity ?? null,
        version: 0,
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          isDeleted: product.isDeleted,
        },
      },
    });
  }, [product, variant, quantity, addItem]);

  return (
    <Button
      type="button"
      className="w-full rounded-full lg:text-2xl"
      aria-label="Add to cart"
      onClick={handleAdd}
      disabled={!variant?.quantity || variant.quantity < quantity}
    >
      Thêm vào giỏ hàng
    </Button>
  );
}
