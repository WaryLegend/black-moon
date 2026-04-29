"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { formatCurrency } from "@/utils/currency";
import { SIZE_VALUES } from "@/utils/constants";
import AddToWishList from "@/components/store/wishlist/AddToWishList";
import type { CategorySummary } from "@/types/categories";
import type { ProductSummary } from "@/types/products";

type ProductItemProps = {
  product: ProductSummary;
  category?: CategorySummary;
};

function normalizeSizeOrder(size?: string | null) {
  if (!size) return Infinity;
  const index = SIZE_VALUES.indexOf(size as (typeof SIZE_VALUES)[number]);
  return index === -1 ? Infinity : index;
}

function getUniqueColors(product: ProductSummary): string[] {
  return product.options?.colors ?? [];
}

function getSortedSizes(product: ProductSummary): string[] {
  const sizes = product.options?.sizes ?? [];
  return sizes.sort(
    (left, right) => normalizeSizeOrder(left) - normalizeSizeOrder(right),
  );
}

function getSizeLabel(product: ProductSummary): string {
  const sizes = getSortedSizes(product);
  if (!sizes.length) return "-";
  if (sizes.length === 1) return sizes[0];
  return `${sizes[0]} - ${sizes[sizes.length - 1]}`;
}

function getPriceLabel(product: ProductSummary): string {
  if (product.minPrice === product.maxPrice) {
    return formatCurrency(product.minPrice ?? 0);
  }

  return `${formatCurrency(product.minPrice ?? 0)} - ${formatCurrency(
    product.maxPrice ?? 0,
  )}`;
}

function ProductItem({ product, category }: ProductItemProps) {
  const pathname = usePathname();
  const imageUrl = product.images?.[0]?.imageUrl ?? null;
  const colors = getUniqueColors(product);
  const sizeLabel = getSizeLabel(product);
  const groupName = category?.targetGroup?.name ?? "-";

  const wishlistVariant = null;

  return (
    <li className="group border-primary-200 bg-primary-0 flex cursor-pointer flex-col overflow-hidden rounded-lg border shadow-md transition hover:shadow-md">
      <Link href={`${pathname}/${product.slug}`}>
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${product.name}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="from-primary-200 to-primary-100 h-full w-full bg-gradient-to-tr" />
          )}
        </div>

        <div className="flex flex-col gap-1 p-2">
          <div className="flex justify-between">
            <div className="flex flex-wrap items-center gap-1">
              {colors.slice(0, 4).map((color) => (
                <span
                  key={color}
                  className="border-primary-300 h-5 w-5 rounded-full border"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}

              {colors.length > 4 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full border text-xs">
                  +{colors.length - 4}
                </span>
              )}
            </div>
            <AddToWishList item={wishlistVariant} />
          </div>

          <div className="text-primary-500 flex justify-between text-xs uppercase">
            <span>{groupName}</span>
            <span>{sizeLabel}</span>
          </div>

          <h3 className="text-primary-800 line-clamp-2 font-medium">
            {product.name}
          </h3>

          <div className="text-accent-600 text-sm font-semibold sm:text-base">
            {getPriceLabel(product)}
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductItem;
