"use client";

import { useEffect } from "react";
import { useWishListStore } from "@/context/WishListStore";

export default function WishListInitializer({ user, wishlist }) {
  const { items, setWishList, setUserId } = useWishListStore();

  useEffect(() => {
    // Guest (no user)
    if (!user) return;

    // Logged in user with a WishList
    if (wishlist) {
      // merge guest WishList with server WishList
      const merged = mergeWishLists(items, wishlist);

      setWishList(merged);
      setUserId(user.id);
    }
  }, [user, wishlist]);

  return null;
}

function mergeWishLists(localItems, serverItems) {
  const merged = [...serverItems];
  if (localItems?.length) {
    for (const local of localItems) {
      const found = merged.find((item) => item.variantId === local.variantId);
      if (!found) {
        merged.push(local);
      }
    }
  }
  return merged;
}
