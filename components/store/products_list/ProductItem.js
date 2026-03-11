"use client";

import { capitalizeFirst } from "@/utils/capitalize";
import { formatCurrency } from "@/utils/currency";
import { usePathname } from "next/navigation";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import AddToWishList from "@/components/store/wishlist/AddToWishList";

function ProductItem({ product }) {
  const pathname = usePathname();
  const {
    id,
    name,
    group,
    colors,
    sizes,
    basePrice,
    image,
    reviews,
    previewVariant,
  } = product;

  const variant = previewVariant
    ? {
        ...previewVariant,
        variantId: previewVariant.id,
        name,
        url: `${pathname}/${id}?color=${previewVariant.color}&size=${previewVariant.size}`,
      }
    : null;

  return (
    <li className="group border-primary-200 bg-primary-0 flex cursor-pointer flex-col overflow-hidden rounded-lg border shadow-sm transition hover:shadow-md">
      <Link href={`${pathname}/${id}`}>
        {/* Image wrapper */}
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={image}
            alt={`${name}'s image`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product info section */}
        <div className="flex flex-col gap-1 p-2">
          {/* Color swatches */}
          <div className="flex justify-between">
            <div className="flex flex-wrap items-center gap-1">
              {colors?.slice(0, 4).map((color, i) => (
                <span
                  key={i}
                  className="border-primary-300 h-5 w-5 rounded-full border"
                  style={{ backgroundColor: color }}
                />
              ))}

              {colors?.length > 4 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full border text-xs">
                  +{colors.length - 4}
                </span>
              )}
            </div>
            <AddToWishList item={variant} />
          </div>

          {/* Group + Size */}
          <div className="text-primary-500 flex justify-between text-xs uppercase">
            <span>{group}</span>
            <span>
              {sizes && sizes.length > 0
                ? sizes.length === 1
                  ? sizes[0]
                  : `${sizes[0]} - ${sizes.at(-1)}`
                : "—"}
            </span>
          </div>

          {/* Product name */}
          <h3 className="text-primary-800 line-clamp-2 font-medium">
            {capitalizeFirst(name)}
          </h3>

          {/* Price */}
          <div className="text-accent-600 text-lg font-semibold">
            {formatCurrency(basePrice)}
          </div>

          {/* Rating */}
          <div className="flex items-center justify-end gap-1 text-sm">
            <FaStar />
            <span className="font-semibold">{reviews?.avgRating || "–"}</span>
            <span className="text-primary-500 text-xs">
              ({reviews?.total <= 999 ? reviews?.total : "+999"})
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductItem;
