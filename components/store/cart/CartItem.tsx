import Image from "next/image";

import { capitalizeFirst } from "@/utils/capitalize";
import { formatCurrency } from "@/utils/currency";
import type { CartItem as CartItemType, GuestCartItem } from "@/types/cart";

import QuantitySelect from "./QuantitySelect";
import RemoveItemBtn from "./RemoveItemBtn";

type CartItemProps = {
  item: CartItemType | GuestCartItem;
};

const getLineTotal = (item: CartItemType | GuestCartItem): number => {
  if ("totalPrice" in item) {
    return item.totalPrice;
  }

  return item.variant.price * item.quantity;
};

function CartItem({ item }: CartItemProps) {
  const variant = item.variant;
  const quantity = item.quantity ?? NaN;
  const unitPrice = variant?.price ?? NaN;
  const totalPrice = getLineTotal(item);
  const name = variant?.product?.name ?? "Sản phẩm";
  const imageUrl = variant?.image?.imageUrl ?? null;

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

  return (
    <li className="[&:has(.group:hover)]:bg-primary-200 relative flex flex-row items-center gap-4 px-2 py-6 transition-all md:gap-6 [&:has(.group:hover)]:shadow-sm">
      {/* Image */}
      <div className="group w-35 rounded-lg">
        <div className="relative aspect-[5/6] w-full shrink-0 self-center overflow-hidden rounded-lg md:h-auto">
          {imageBlock}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <h2 className="pr-5 text-lg font-semibold">{name}</h2>
          <p className="text-primary-600 text-sm">
            Màu sắc: {variant?.color ? capitalizeFirst(variant.color) : "-"}
          </p>
          <p className="text-primary-600 text-sm">
            Kích cỡ: {variant?.size ?? "-"}
          </p>
          <p className="text-accent-600 mt-1 font-medium">
            {formatCurrency(unitPrice)}
          </p>
        </div>

        {/* QUANTITY + TOTAL */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-sm md:text-base">
          <label htmlFor={`quantity-${item.id}`} className="font-semibold">
            SỐ LƯỢNG:
          </label>
          <div className="flex items-center gap-4">
            <QuantitySelect
              itemId={item.id}
              quantity={quantity}
              variantQuantity={variant?.quantity ?? null}
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
        <RemoveItemBtn itemId={item.id} />
      </div>
    </li>
  );
}

export default CartItem;
