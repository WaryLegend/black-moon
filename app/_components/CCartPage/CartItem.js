"use client";

import { useCartStore } from "@/app/_context/CartStore";
import { capitalizeFirst, formatCurrency } from "@/app/_utils/helpers";
import { HiXMark } from "react-icons/hi2";
import Image from "next/image";
import Button from "@/app/_components/Button";
import Link from "next/link";

function CartItem({ item }) {
  const { id, name, color, size, variantPrice, quantity, image, url } = item;
  const { updateQuantity, removeItem } = useCartStore();
  //test
  const isNew = false;
  const sale = 5;

  const finalPrice = variantPrice * (1 - sale / 100);

  return (
    <li className="relative flex flex-row items-center gap-4 px-2 py-6 md:gap-6">
      {/* Image */}
      <Link
        href={url}
        className="group w-35 rounded-md transition hover:shadow-md"
      >
        <div className="relative aspect-[5/6] w-full shrink-0 self-center overflow-hidden rounded-md md:h-auto">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <h2 className="pr-5 text-lg font-semibold">{name}</h2>
          <p className="text-primary-600 text-sm">
            Màu sắc: {capitalizeFirst(color)}
          </p>
          <p className="text-primary-600 text-sm">Kích cỡ: {size}</p>
          {sale > 0 && <p className="text-sm text-red-600">Sale</p>}
          <p
            className={`${sale > 0 ? "text-red-600" : "text-accent-600"} mt-1 font-medium`}
          >
            {formatCurrency(finalPrice)}
          </p>
          {isNew && <p className="text-primary-600 text-sm">New</p>}
        </div>

        {/* QUANTITY + TOTAL */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-sm md:text-base">
          <label htmlFor={`quantity-${id}`} className="font-semibold">
            SỐ LƯỢNG:
          </label>
          <div className="flex items-center gap-4">
            <select
              id={`quantity-${id}`}
              value={quantity}
              onChange={(e) => updateQuantity(id, Number(e.target.value))}
              className="border-primary-400 bg-primary-0 rounded-md border px-2 py-1 text-sm font-medium transition-all"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option
                  key={n}
                  value={n}
                  className="checked:bg-accent-600 hover:bg-accent-500 bg-primary-50 text-primary-800 checked:text-primary-0"
                >
                  {n}
                </option>
              ))}
            </select>
            <p className="font-semibold">
              TỔNG:{" "}
              <span
                className={`${sale > 0 ? "text-red-600" : "text-accent-600"} font-bold`}
              >
                {formatCurrency(finalPrice * quantity)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Remove button */}
      <div className="absolute top-5 right-1">
        <Button
          aria-label="Remove item"
          icon
          className="hover:text-accent-700 rounded-full font-bold"
          onClick={() => removeItem(id)}
        >
          <HiXMark className="h-6 w-6" />
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
