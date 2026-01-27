"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishListStore } from "@/context/WishListStore";
import Button from "@/components/ui/Button";

export default function AddToWishList({ item: vari, className = "" }) {
  if (!vari) return;

  const { items, addItem, removeItemByVariantId } = useWishListStore();

  const isInWishlist = items.some((i) => i.variantId === vari.variantId);

  const toggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist) {
      removeItemByVariantId(vari.variantId);
    } else {
      await addItem(vari);
    }
  };

  return (
    <Button
      icon
      className="hover:text-accent-700 rounded-full hover:scale-105"
      onClick={toggle}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isInWishlist ? (
        <FaHeart className={className} />
      ) : (
        <FaRegHeart className={className} />
      )}
    </Button>
  );
}
