"use client";

import type { MouseEvent } from "react";
import { FaHeart } from "react-icons/fa";

import Button from "@/components/ui/Button";

import { useRemoveFromWishlist } from "./useWishlistMutations";

type RemoveFromWishListProps = {
  wishlistId: number;
};

function RemoveFromWishList({ wishlistId }: RemoveFromWishListProps) {
  const { mutateAsync: removeItem, isPending } = useRemoveFromWishlist();

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    await removeItem(wishlistId);
  };

  return (
    <Button
      aria-label="Remove from wishlist"
      icon
      title="Remove"
      className="hover:text-accent-700 rounded-full font-bold"
      onClick={handleClick}
      disabled={isPending}
    >
      <FaHeart className="h-6 w-6" />
    </Button>
  );
}

export default RemoveFromWishList;
