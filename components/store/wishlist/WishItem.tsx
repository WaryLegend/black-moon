"use client";

import Image from "next/image";

import { capitalizeFirst } from "@/utils/capitalize";
import type { WishlistUserItem } from "@/types/wishlist";

import RemoveFromWishList from "./RemoveFromWishList";
import { useRouter } from "next/navigation";

type WishItemProps = {
  item: WishlistUserItem;
};

function WishItem({ item }: WishItemProps) {
  const variant = item.variant;
  const product = variant?.product;
  const productName = product?.name ?? "Sản phẩm";
  const imageUrl = variant?.image?.imageUrl ?? null;
  const colorLabel = variant?.color ? capitalizeFirst(variant.color) : "-";
  const sizeLabel = variant?.size ?? "-";
  const skuLabel = variant?.sku ?? "-";

  const router = useRouter();
  const handleClick = () => {
    if (product?.slug) {
      router.push(`/${product.slug}`);
    }
  };

  return (
    <li
      className="group hover:bg-primary-100 rounded-lg transition hover:shadow-md"
      onClick={handleClick}
    >
      <div className="relative flex flex-col gap-4 px-2 py-6 sm:flex-row md:gap-6">
        {/* Image */}
        <div className="relative aspect-square w-50 shrink-0 self-center overflow-hidden rounded-lg md:aspect-[5/6] md:h-auto md:self-auto">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={productName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="from-primary-200 to-primary-100 h-full w-full bg-gradient-to-tr" />
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col justify-between gap-2">
          <div>
            <h2 className="pr-5 text-lg font-semibold">{productName}</h2>
            <p className="text-primary-600 max-sm:text-sm">
              Màu sắc: {colorLabel}
            </p>
            <p className="text-primary-600 max-sm:text-sm">
              Kích cỡ: {sizeLabel}
            </p>
            <p className="text-primary-500 max-sm:text-sm">SKU: {skuLabel}</p>
          </div>
        </div>

        {/* Remove button */}
        <div className="absolute top-5 right-1">
          <RemoveFromWishList wishlistId={item.id} />
        </div>
      </div>
    </li>
  );
}

export default WishItem;
