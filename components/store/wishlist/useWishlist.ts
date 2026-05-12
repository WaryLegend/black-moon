"use client";

import { useQuery } from "@tanstack/react-query";

import { wishlistApi } from "@/services/wishlist.api";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";
import type { WishlistSort } from "@/types/wishlist";

export const WISHLIST_QUERY_KEY = ["wishlists", "me"] as const;

const DEFAULT_SORT: WishlistSort = {
  field: "createdAt",
  order: "desc",
};

type UseWishlistParams = {
  page?: number;
  sortBy?: WishlistSort;
};

export function useWishlist({
  page = 1,
  sortBy = DEFAULT_SORT,
}: UseWishlistParams = {}) {
  const { data: user } = useCurrentAccount();
  const enabled = Boolean(user?.id);

  return useQuery({
    queryKey: [
      ...WISHLIST_QUERY_KEY,
      { userId: user?.id ?? null, page, sortBy },
    ],
    queryFn: () => wishlistApi.getByUser({ page, sortBy }),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
