"use client";

import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCartStore } from "@/app/_context/CartStore";

function Wishlist() {
  const cartItems = useCartStore((state) => state.items);
  const totalItemAmount = cartItems.length;

  return (
    <Link
      href="/wishlist"
      className="group hover:text-accent-700 relative flex items-center justify-center p-1 transition-all"
    >
      <FaRegHeart className="h-5 w-5 group-hover:hidden" />
      <FaHeart className="hidden h-5 w-5 group-hover:block" />
      {totalItemAmount > 0 && (
        <span className="absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {totalItemAmount}
        </span>
      )}
    </Link>
  );
}

export default Wishlist;
