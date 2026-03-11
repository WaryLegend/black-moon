"use client";

import { useWishListStore } from "@/contexts/WishListStore";
import WishItem from "./WishItem";
import NoWishlistFound from "./NoWishlistFound";
import WishListSkeleton from "@/components/skeletons/WishListSkeleton";

function WishList() {
  const items = useWishListStore((state) => state.items);
  const isPending = useWishListStore((state) => state.isPending);

  if (isPending) {
    return <WishListSkeleton />;
  }

  if (items.length === 0) {
    return <NoWishlistFound />;
  }

  return (
    <ul className="divide-primary-300 flex flex-col divide-y">
      {items.map((item) => (
        <WishItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default WishList;
