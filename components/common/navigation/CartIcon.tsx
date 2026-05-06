"use client";

import Link from "next/link";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";
import { useCartData } from "@/components/store/cart/useCart";

function CartIcon() {
  const { isPending, totalItems } = useCartData();

  if (isPending)
    return (
      <Link
        href="/cart"
        className="relative flex items-center justify-center p-1"
      >
        <MdOutlineShoppingCart className="h-5 w-5" />
      </Link>
    );

  return (
    <Link
      href="/cart"
      className="group hover:text-accent-700 hover:bg-primary-100 relative flex items-center justify-center rounded-full p-1 transition-all"
    >
      <MdOutlineShoppingCart className="h-5 w-5 group-hover:hidden" />
      <MdShoppingCart className="hidden h-5 w-5 group-hover:block" />
      {!isPending && totalItems > 0 && (
        <span className="absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}

export default CartIcon;
