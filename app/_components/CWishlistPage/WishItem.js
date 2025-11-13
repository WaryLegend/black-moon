"use client";

import { formatCurrency } from "@/app/_utils/helpers";
import Image from "next/image";
import Button from "@/app/_components/Button";
import { FaHeart } from "react-icons/fa";
import { useWishListStore } from "@/app/_context/WishListStore";

function WishItem({ item }) {
  const { id, name, color, size, variantPrice, image } = item;
  const { removeItem } = useWishListStore();

  // test
  const isNew = false;
  const sale = 1; // %
  const finalPrice = variantPrice * (1 - sale / 100);

  return (
    <li className="relative flex flex-col gap-4 px-2 py-6 sm:flex-row md:gap-6">
      {/* Image */}
      <div className="relative aspect-square w-50 shrink-0 self-center md:aspect-[5/6] md:h-auto md:self-auto">
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-md object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <h2 className="pr-5 text-lg font-semibold">{name}</h2>
          <p className="text-primary-600 max-sm:text-sm">Màu sắc: {color}</p>
          <p className="text-primary-600 max-sm:text-sm">Kích cỡ: {size}</p>
          {sale > 0 && <p className="text-sm text-red-600">Sale</p>}
          <p className={`${sale > 0 ? "text-red-600" : ""} mt-1 font-medium`}>
            {formatCurrency(finalPrice)}
          </p>
          {isNew && <p className="text-primary-600 text-sm">New</p>}
        </div>
      </div>

      {/* Remove button */}
      <div className="absolute top-5 right-1">
        <Button
          aria-label="Remove from wishlist"
          icon
          className="hover:text-accent-700 rounded-full font-bold"
          onClick={() => removeItem(id)}
        >
          <FaHeart className="h-6 w-6" />
        </Button>
      </div>
    </li>
  );
}

export default WishItem;
