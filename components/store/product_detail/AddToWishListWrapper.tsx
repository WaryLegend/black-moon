"use client";

import { useProductStore } from "@/contexts/ProductStore";
import AddToWishList from "@/components/store/wishlist/AddToWishList";

function AddToWishListWrapper() {
  const selectedVariant = useProductStore((s) => s.selectedVariant());
  const variantId = selectedVariant?.id ?? null;

  if (!variantId) return null;

  return <AddToWishList className="h-5 w-5" variantId={variantId} />;
}

export default AddToWishListWrapper;
