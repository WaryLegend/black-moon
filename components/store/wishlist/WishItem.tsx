"use client";

import Image from "next/image";

import { capitalizeFirst } from "@/utils/capitalize";
import type { WishlistUserItem } from "@/types/wishlist";

import RemoveFromWishList from "./RemoveFromWishList";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { fDate } from "@/utils/date";

type WishItemProps = {
  item: WishlistUserItem;
};

function WishItem({ item }: WishItemProps) {
  const { variant, createdAt } = item;
  const product = variant?.product;
  const productName = product?.name ?? "Sản phẩm";
  const imageUrl = variant?.image?.imageUrl ?? null;
  const colorLabel = variant?.color ? capitalizeFirst(variant.color) : "-";
  const sizeLabel = variant?.size ?? "-";
  const skuLabel = variant?.sku ?? "-";

  // addtional fields for navigation
  const disabled = variant?.isDeleted || false;
  const category = product?.category;
  const group = category?.targetGroup;

  const router = useRouter();
  const handleClick = () => {
    if (disabled) return;
    if (product?.slug) {
      router.push(
        `/${group?.slug ?? ""}/${category?.slug ?? ""}/${product.slug}?color=${variant?.color ?? ""}&size=${variant?.size ?? ""}`,
      );
    }
  };

  return (
    <li className="relative" onClick={handleClick}>
      <div
        className={cn(
          "group relative flex flex-col gap-4 rounded-lg p-4 shadow-md transition sm:flex-row md:gap-6",
          disabled
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-primary-100 hover:cursor-pointer",
        )}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] w-30 shrink-0 self-center overflow-hidden rounded-lg sm:w-40 md:h-auto md:self-auto">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={productName}
              fill
              className={cn(
                "object-cover transition-transform duration-300",
                disabled ? "grayscale" : "group-hover:scale-105",
              )}
            />
          ) : (
            <div className="from-primary-200 to-primary-100 h-full w-full bg-gradient-to-tr" />
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col justify-between gap-2 pr-4">
          <div className="space-y-1">
            <h2 className="pr-5 text-lg font-semibold">
              {productName}{" "}
              {disabled && (
                <span className="text-accent-600">(không có sẵn)</span>
              )}
            </h2>
            <p className="text-primary-600 text-sm sm:text-base">
              Màu sắc: {colorLabel}
            </p>
            <p className="text-primary-600 text-sm sm:text-base">
              Kích cỡ: {sizeLabel}
            </p>
            <p className="text-primary-500 text-sm">SKU: {skuLabel}</p>
            <p className="text-primary-500 text-sm">
              Ngày thêm: {fDate(createdAt)}
            </p>
          </div>
        </div>
      </div>
      {/* Remove button */}
      <div className="absolute top-4 right-4">
        <RemoveFromWishList wishlistId={item.id} />
      </div>
    </li>
  );
}

export default WishItem;
