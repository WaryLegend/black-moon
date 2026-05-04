"use client";

import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "@/components/store/wishlist/useWishlist";

function WishlistIcon() {
  const { data, isPending } = useWishlist();
  const totalItems = data?.meta?.totalItems ?? data?.items?.length ?? 0;

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
      {!isPending && totalItems > 0 && (
        <span className="absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}

export default WishlistIcon;
