import Image from "next/image";
import Link from "next/link";

import { capitalizeFirst } from "@/utils/capitalize";
import { formatCurrency } from "@/utils/currency";
import type { CartDisplayItem } from "@/types/cart";

import QuantitySelect from "./QuantitySelect";
import RemoveItemBtn from "./RemoveItemBtn";

type CartItemProps = {
  item: CartDisplayItem;
};

function CartItem({ item }: CartItemProps) {
  const {
    id,
    name,
    color,
    size,
    unitPrice,
    quantity,
    totalPrice,
    imageUrl,
    url,
    stock,
  } = item;

  const imageBlock = imageUrl ? (
    <Image
      src={imageUrl}
      alt={name}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
    />
  ) : (
    <div className="from-primary-200 to-primary-100 h-full w-full bg-gradient-to-tr" />
  );

  const content = (
    <div className="relative aspect-[5/6] w-full shrink-0 self-center overflow-hidden rounded-lg md:h-auto">
      {imageBlock}
    </div>
  );

  return (
    <li className="[&:has(.group:hover)]:bg-primary-200 relative flex flex-row items-center gap-4 px-2 py-6 transition-all md:gap-6 [&:has(.group:hover)]:shadow-sm">
      {/* Image */}
      {url ? (
        <Link href={url} className="group w-35 rounded-lg hover:shadow-md">
          {content}
        </Link>
      ) : (
        <div className="w-35 rounded-lg">{content}</div>
      )}

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <h2 className="pr-5 text-lg font-semibold">{name}</h2>
          <p className="text-primary-600 text-sm">
            Màu sắc: {color ? capitalizeFirst(color) : "-"}
          </p>
          <p className="text-primary-600 text-sm">Kích cỡ: {size ?? "-"}</p>
          <p className="text-accent-600 mt-1 font-medium">
            {formatCurrency(unitPrice)}
          </p>
        </div>

        {/* QUANTITY + TOTAL */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-sm md:text-base">
          <label htmlFor={`quantity-${id}`} className="font-semibold">
            SỐ LƯỢNG:
          </label>
          <div className="flex items-center gap-4">
            <QuantitySelect
              itemId={id}
              quantity={quantity}
              stock={stock ?? null}
            />
            <p className="font-semibold">
              TỔNG:{" "}
              <span className="text-accent-600 font-bold">
                {formatCurrency(totalPrice)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Remove button */}
      <div className="absolute top-5 right-1">
        <RemoveItemBtn itemId={id} />
      </div>
    </li>
  );
}

export default CartItem;
