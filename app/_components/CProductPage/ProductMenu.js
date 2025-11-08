"use client";

import { formatCurrency } from "@/app/_utils/helpers";
import { FaRegHeart } from "react-icons/fa";
import ProductAvgRates from "@/app/_components/CProductPage/ProductAvgRates";
import QuantityInput from "@/app/_components/QuantityInput";
import Button from "@/app/_components/Button";
import ColorAndSizeInput from "./ColorAndSizeInput";

export default function ProductMenu({ product }) {
  const { id, name: productName, colors, sizes, reviews } = product;

  const isNew = true; // test
  const price = 293000; // default price of a product
  const Sale = 9; // % discount of a single product
  const finalPrice = price * (1 - Sale / 100);

  return (
    <div className="bg-primary-0 rounded-md">
      <div className="sticky top-[var(--header-height)] p-5">
        <div className="grid gap-[4vh]">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold lg:text-2xl">{productName}</h1>
            <Button
              icon
              className="hover:text-accent-700 ml-auto"
              aria-label="Add to wishlist"
            >
              <FaRegHeart className="h-5 w-5" />
            </Button>
          </div>

          {/* colors and sizes variant selection */}
          <ColorAndSizeInput product={product} />

          {/* Price section */}
          <div>
            {/* Default Price */}
            <div className="flex items-center gap-30">
              <span
                className={
                  Sale > 0
                    ? "text-primary-400 line-through"
                    : "text-xl font-bold lg:text-2xl"
                }
              >
                {formatCurrency(price)}
              </span>
              {/* avg product rates */}
              <div className="ml-auto">
                <ProductAvgRates reviews={reviews} />
              </div>
            </div>
            {/* Sale? */}
            {Sale > 0 && (
              <div>
                <span className="text-xl font-bold text-red-600 lg:text-2xl">
                  {formatCurrency(finalPrice)}
                </span>
                <span className="ml-3 text-red-600">Sale</span>
              </div>
            )}
            {/*New? */}
            {isNew && <div className="font-semibold">NEW</div>}
          </div>

          {/* set quantity section */}
          <QuantityInput name="quantity" defaultValue={1} />

          {/* Add to cart */}
          <Button type="button" className="w-full !rounded-full lg:text-2xl">
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
}
