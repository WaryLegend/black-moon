"use client";

import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import Button from "@/components/ui/Button";
import { useProductStore } from "@/contexts/ProductStore";
import { groupLabels } from "@/utils/constants";

import { useCartActions } from "@/components/store/cart/useCartActions";

export default function AddToCart() {
  const variant = useProductStore((s) => s.selectedVariant());
  const quantity = useProductStore((s) => s.quantity);
  const productName = useProductStore((s) => s.product?.name ?? "Sản phẩm");
  const { addItem } = useCartActions();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const handleAdd = useCallback(() => {
    if (!variant) return;

    const groupLabel = groupLabels[pathname.split("/")?.[1]];

    addItem({
      variantId: variant.id,
      name: productName,
      sku: variant.sku,
      color: variant.color ?? null,
      size: variant.size
        ? `${variant.size.toUpperCase()} - ${groupLabel}`
        : null,
      quantity,
      price: variant.price ?? 0,
      imageUrl: variant.image?.imageUrl ?? null,
      url: `${pathname}?${query}`,
      stock: variant.quantity ?? null,
    });
  }, [variant, productName, quantity, pathname, query, addItem]);

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
