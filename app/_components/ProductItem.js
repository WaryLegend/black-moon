"use client";

import { usePathname } from "next/navigation";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { capitalizeFirst, formatCurrency } from "@/app/_utils/helpers";
import Image from "next/image";
import Link from "next/link";
import test_img from "@/public/t-shirt.jpg";

function ProductItem({ product }) {
  const pathname = usePathname();
  const { id, name, colors, sizes, basePrice, image, reviews } = product;
  const isLiked = false; // test

  return (
    <li className="group border-primary-200 bg-primary-0 flex cursor-pointer flex-col overflow-hidden rounded-md border shadow-sm transition hover:shadow-md">
      <Link href={`${pathname}/${id}`}>
        {/* Image wrapper */}
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={test_img}
            alt={`${name}'s image`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Info section */}
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
            <button
              className="hover:text-accent-700 flex items-center justify-center p-1 transition-all hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // console.log("Liked!");
              }}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          {/* Gender + Size */}
          <div className="text-primary-500 flex justify-between text-xs">
            <span>Nữ</span>
            <span>XS-XXL</span>
          </div>

          {/* Product name */}
          <h3 className="text-primary-800 line-clamp-2 font-medium">
            {capitalizeFirst(name)}
          </h3>

          {/* Price */}
          <div className="text-accent-600 text-lg font-semibold">
            {formatCurrency(293000)}
          </div>

          {/* Rating */}
          <div className="flex items-center justify-end gap-1 text-sm">
            <FaStar />
            <span className="font-semibold">4.9</span>
            <span className="text-primary-500 text-xs">(999)</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductItem;
