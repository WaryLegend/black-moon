"use client";

import { useMemo } from "react";

import SortBy from "@/components/filters/SortBy";
import WishListSkeleton from "@/components/skeletons/WishListSkeleton";
import type { WishlistPageSearchParams, WishlistSort } from "@/types/wishlist";
import {
  normalizeSortField,
  parseListSearchParams,
} from "@/utils/searchParams";

import NoWishlistFound from "./NoWishlistFound";
import WishItem from "./WishItem";
import { useWishlist } from "./useWishlist";

type WishListProps = {
  searchParams: WishlistPageSearchParams;
};

function WishList({ searchParams }: WishListProps) {
  const sortBy = useMemo<WishlistSort>(() => {
    const { sortBy: parsed } = parseListSearchParams<Record<string, never>>(
      searchParams,
      { defaultSort: "createdAt-desc" },
    );

    const normalizedField =
      parsed.field === "createBy" ? "createdAt" : parsed.field;
    const field = normalizeSortField(
      normalizedField,
      ["createdAt"],
      "createdAt",
    );

    return {
      field,
      order: parsed.direction,
    };
  }, [searchParams]);

  const { data, isPending } = useWishlist({ sortBy });
  const items = data?.items ?? [];
  const totalItems = data?.meta?.totalItems ?? items.length;

  if (isPending) {
    return <WishListSkeleton />;
  }

  if (items.length === 0) {
    return <NoWishlistFound />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {totalItems > 0 && (
          <p className="text-primary-600 text-sm font-medium">
            {totalItems} sản phẩm
          </p>
        )}
        <SortBy
          options={[
            { value: "createdAt-desc", label: "Mới nhất" },
            { value: "createdAt-asc", label: "Cũ nhất" },
          ]}
        />
      </div>

      <ul className="divide-primary-300 grid grid-cols-[repeat(auto-fit,minmax(min-content,1fr))] gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <WishItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default WishList;
