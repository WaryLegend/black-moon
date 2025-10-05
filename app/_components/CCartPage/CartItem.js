import { formatCurrency } from "@/app/_utils/helpers";
import Image from "next/image";
import { HiXMark } from "react-icons/hi2";
import Button from "../Button";

function CartItem({ item }) {
  const { id, name, color, size, price, quantity, image, isNew, sale } = item;

  const finalPrice = price * (1 - sale / 100);

  return (
    <li className="relative flex flex-col gap-4 px-2 py-6 md:flex-row md:gap-6">
      {/* Image */}
      <div className="relative aspect-square w-50 shrink-0 self-center md:aspect-[5/6] md:h-auto md:self-auto">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <h2 className="pr-5 text-lg font-semibold">{name}</h2>
          <p className="text-primary-600 text-sm">Màu sắc: {color}</p>
          <p className="text-primary-600 text-sm">Kích cỡ: {size}</p>
          {sale > 0 && <p className="text-sm text-red-600">Sale</p>}
          <p className={`${sale > 0 ? "text-red-600" : ""} mt-1 font-medium`}>
            {formatCurrency(finalPrice)}
          </p>
          {isNew && <p className="text-primary-600 text-sm">New</p>}
        </div>

        {/* QUANTITY + TOTAL */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-sm md:text-base">
          <label htmlFor={`quantity-${id}`} className="font-semibold">
            SỐ LƯỢNG
          </label>
          <div className="flex items-center gap-4">
            <select
              id={`quantity-${id}`}
              value={quantity}
              className="border-primary-400 border px-2 py-1"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
            <p className="font-semibold">
              TỔNG:{" "}
              <span className={`${sale > 0 ? "text-red-600" : ""} font-bold`}>
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
          className="hover:text-accent-700 font-bold"
        >
          <HiXMark className="h-6 w-6" />
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
