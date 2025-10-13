"use client";

import CartItem from "@/app/_components/CCartPage/CartItem";
import { useCartStore } from "@/app/_context/CartStore";
import NoCartlistFound from "./NoCartlistFound";

function CartList() {
  const cartItems = useCartStore((state) => state.items);

  if (!cartItems.length) return <NoCartlistFound />;

  return (
    <ul className="divide-primary-300 flex flex-col divide-y">
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default CartList;
