"use client";

import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishListStore } from "@/context/WishListStore";

function WishlistIcon() {
  const isPending = useWishListStore((state) => state.isPending);
  const totalTypes = useWishListStore((state) => state.getTotalTypes());

  if (isPending)
    return (
      <Link
        href="/wishlist"
        className="relative flex items-center justify-center p-1"
      >
        <FaRegHeart className="h-5 w-5" />
      </Link>
    );

  return (
    <Link
      href="/wishlist"
      className="group hover:text-accent-700 hover:bg-primary-100 relative flex items-center justify-center rounded-full p-1 transition-all"
    >
      <FaRegHeart className="h-5 w-5 group-hover:hidden" />
      <FaHeart className="hidden h-5 w-5 group-hover:block" />
      {!isPending && totalTypes > 0 && (
        <span className="absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {totalTypes}
        </span>
      )}
    </Link>
  );
}

export default WishlistIcon;
