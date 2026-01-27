import { capitalizeFirst, formatCurrency } from "@/utils/helpers";

import Image from "next/image";
import Link from "next/link";
import QuantitySelect from "./QuantitySelect";
import RemoveItemBtn from "./RemoveItemBtn";

function CartItem({ item }) {
  const { id, name, color, size, variantPrice, quantity, image, url } = item;

  //test
  const isNew = false;
  const sale = 5;

  const finalPrice = variantPrice * (1 - sale / 100);

  return (
    <li className="[&:has(.group:hover)]:bg-primary-200 relative flex flex-row items-center gap-4 px-2 py-6 transition-all md:gap-6 [&:has(.group:hover)]:shadow-sm">
      {/* Image */}
      <Link href={url} className="group w-35 rounded-lg hover:shadow-md">
        <div className="relative aspect-[5/6] w-full shrink-0 self-center overflow-hidden rounded-lg md:h-auto">
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
          {sale > 0 && <p className="text-sm text-green-600">Sale</p>}
          <p
            className={`${sale > 0 ? "text-green-600" : "text-accent-600"} mt-1 font-medium`}
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
            <QuantitySelect id={id} quantity={quantity} />
            <p className="font-semibold">
              TỔNG:{" "}
              <span
                className={`${sale > 0 ? "text-green-600" : "text-accent-600"} font-bold`}
              >
                {formatCurrency(finalPrice * quantity)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Remove button */}
      <div className="absolute top-5 right-1">
        <RemoveItemBtn id={id} />
      </div>
    </li>
  );
}

export default CartItem;
