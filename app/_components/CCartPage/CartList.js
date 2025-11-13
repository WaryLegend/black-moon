"use client";

import { useCartStore } from "@/app/_context/CartStore";
import CartItem from "@/app/_components/CCartPage/CartItem";
import CartListSkeleton from "@/app/_components/Skeletons/CartListSkeleton";
import NoCartlistFound from "./NoCartlistFound";

function CartList() {
  const items = useCartStore((state) => state.items);
  const isPending = useCartStore((state) => state.isPending);

  // 1. Still loading/pending (hydration in progress)
  if (isPending) {
    return <CartListSkeleton />;
  }
  // 2. Hydrated + empty → show empty state
  if (items.length === 0) {
    return <NoCartlistFound />;
  }
  // 3. Hydrated + has items → show list
  return (
    <ul className="divide-primary-300 flex flex-col divide-y">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default CartList;
