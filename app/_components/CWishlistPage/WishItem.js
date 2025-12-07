import { capitalizeFirst, formatCurrency } from "@/app/_utils/helpers";
import Link from "next/link";
import Image from "next/image";
import RemoveFromWishList from "./RemoveFromWishList";

function WishItem({ item }) {
  const { id, name, color, size, variantPrice, image, url } = item;
  // test
  const isNew = false;
  const sale = 1; // %
  const finalPrice = variantPrice * (1 - sale / 100);

  return (
    <li className="group hover:bg-primary-100 rounded-lg transition hover:shadow-md">
      <Link
        href={url}
        className="relative flex flex-col gap-4 px-2 py-6 sm:flex-row md:gap-6"
      >
        {/* Image */}
        <div className="relative aspect-square w-50 shrink-0 self-center overflow-hidden rounded-lg md:aspect-[5/6] md:h-auto md:self-auto">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col justify-between gap-2">
          <div>
            <h2 className="pr-5 text-lg font-semibold">{name}</h2>
            <p className="text-primary-600 max-sm:text-sm">
              Màu sắc: {capitalizeFirst(color)}
            </p>
            <p className="text-primary-600 max-sm:text-sm">Kích cỡ: {size}</p>
            {sale > 0 && <p className="text-sm text-green-600">Sale</p>}
            <p
              className={`${sale > 0 ? "text-green-600" : ""} mt-1 font-medium`}
            >
              {formatCurrency(finalPrice)}
            </p>
            {isNew && <p className="text-primary-600 text-sm">New</p>}
          </div>
        </div>

        {/* Remove button */}
        <div className="absolute top-5 right-1">
          <RemoveFromWishList id={id} />
        </div>
      </Link>
    </li>
  );
}

export default WishItem;
