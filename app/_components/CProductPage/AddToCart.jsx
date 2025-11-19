"use client";

import { useCallback } from "react";
import { useProductStore } from "@/app/_context/ProductStore";
import { useCartStore } from "@/app/_context/CartStore";
import { usePathname, useSearchParams } from "next/navigation";
import { groupLabels } from "@/app/_utils/constants";
import Button from "@/app/_components/Button";

export default function AddToCart() {
  const variant = useProductStore((s) => s.selectedVariant());
  const quantity = useProductStore((s) => s.quantity);
  const productName = useProductStore((s) => s.product?.name);
  const addItem = useCartStore((s) => s.addItem);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const handleAdd = useCallback(() => {
    if (!variant) return;

    const { id, ...rest } = variant;
    const groupLabel = groupLabels[pathname.split("/")?.[1]];

    addItem({
      ...rest,
      variantId: id,
      name: productName,
      size: `${rest.size?.toUpperCase()} - ${groupLabel}`,
      quantity,
      url: `${pathname}?${query}`,
    });
  }, [variant, quantity, pathname, query, addItem, productName]);

  return (
    <Button
      type="button"
      className="w-full !rounded-full ring-offset-4 lg:text-2xl"
      aria-label="Add to cart"
      onClick={handleAdd}
    >
      Thêm vào giỏ hàng
    </Button>
  );
}
