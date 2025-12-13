import { capitalizeFirst, formatCurrency } from "@/app/_utils/helpers";
import Image from "next/image";
import Link from "next/link";

function OrderDetailItem({ item }) {
  const { productName, color, size, price, quantity, image, url } = item;

  return (
    <li className="[&:has(.group:hover)]:bg-primary-100 relative flex flex-row items-center gap-4 px-2 py-4 transition-all md:gap-6 [&:has(.group:hover)]:shadow-sm">
      {/* Image */}
      <Link href={url} className="group w-35 rounded-lg hover:shadow-md">
        <div className="relative aspect-[5/6] w-full shrink-0 self-center overflow-hidden rounded-lg md:h-auto">
          <Image
            src={image}
            alt={productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <h2 className="pr-5 text-lg font-semibold">{productName}</h2>
          <p className="text-primary-600 text-sm">
            Màu sắc: {capitalizeFirst(color)}
          </p>
          <p className="text-primary-600 text-sm">Kích cỡ: {size}</p>
          <p className="text-accent-600 mt-1 font-medium">
            {formatCurrency(price)}
          </p>
        </div>

        {/* QUANTITY + TOTAL */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-sm md:text-base">
          <p className="font-semibold">
            SỐ LƯỢNG: <span className="text-accent-600">{quantity}</span>
          </p>
          <p className="font-semibold">
            TỔNG:{" "}
            <span className="text-accent-600 font-bold">
              {formatCurrency(price * quantity)}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
}

export default OrderDetailItem;
