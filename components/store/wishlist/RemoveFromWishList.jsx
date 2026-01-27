"use client";

import { useWishListStore } from "@/context/WishListStore";
import { FaHeart } from "react-icons/fa";
import Button from "@/components/ui/Button";

function RemoveFromWishList({ id }) {
  const { removeItem } = useWishListStore();

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await removeItem(id);
  };

  return (
    <Button
      aria-label="Remove from wishlist"
      icon
      className="hover:text-accent-700 rounded-full font-bold"
      onClick={handleClick}
    >
      <FaHeart className="h-6 w-6" />
    </Button>
  );
}

export default RemoveFromWishList;
