"use client";

import AddToWishList from "@/app/_components/AddToWishList";
import { usePathname, useSearchParams } from "next/navigation";
import { useProductStore } from "@/app/_context/ProductStore";
import { useMemo } from "react";
import { groupLabels } from "@/app/_utils/constants";

function AddToWishListWrapper() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const selectedVariant = useProductStore((s) => s.selectedVariant());
  const productName = useProductStore((s) => s.product?.name);

  // Build the wishlist item with proper return URL
  const item = useMemo(() => {
    if (!selectedVariant || !productName) return null;

    const { id, ...rest } = selectedVariant;
    const groupLabel = groupLabels[pathname.split("/")?.[1]];

    return {
      ...rest,
      variantId: id,
      name: productName,
      size: `${rest.size?.toUpperCase()} - ${groupLabel}`,
      url: `${pathname}?${query}`,
    };
  }, [selectedVariant, productName, pathname, query]);

  if (!item) return null;

  return <AddToWishList className="h-5 w-5" item={item} />;
}

export default AddToWishListWrapper;
