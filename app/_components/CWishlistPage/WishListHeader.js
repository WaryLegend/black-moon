"use client";

import { useWishListStore } from "@/app/_context/WishListStore";

function WishListHeader() {
  const isPending = useWishListStore((state) => state.isPending);
  const totalTypes = useWishListStore((state) => state.getTotalTypes());

  return (
    <>
      <h1 className="text-3xl font-semibold">Yêu thích</h1>
      {!isPending && totalTypes > 0 && (
        <h1 className="text-xl font-semibold">{totalTypes} sản phẩm</h1>
      )}
    </>
  );
}

export default WishListHeader;
