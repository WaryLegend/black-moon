import { formatCurrency } from "@/app/_utils/helpers";
import { FaRegHeart } from "react-icons/fa";
import { COLORS, SIZES } from "@/app/_utils/constants";
import ProductAvgRates from "@/app/_components/CProductPage/ProductAvgRates";
import QuantityInput from "@/app/_components/QuantityInput";
import Button from "@/app/_components/Button";

// fake reviews data (testing)
const mockReviews = [
  {
    title: "This shirt is nice, cosy and fit",
    date: "26/09/2025",
    rates: 5,
    comment:
      "Kích cỡ đã mua: S, Quần áo có vừa không: Hơi chật, Really comfortable and affordable pair that can be worn daily",
  },
  {
    title: "Great quality, love the design",
    date: "25/09/2025",
    rates: 4,
    comment:
      "Kích cỡ đã mua: M, Quần áo có vừa không: Vừa vặn, Looks stylish and feels great for casual wear",
  },
  {
    title: "Perfect for daily wear",
    date: "24/09/2025",
    rates: 5,
    comment:
      "Kích cỡ đã mua: L, Quần áo có vừa không: Rộng rãi, Super soft fabric, highly recommend!",
  },
];

export default function ProductMenu() {
  const isNew = true; // test
  const price = 293000; // default price of a product
  const Sale = 9; // % discount of a single product
  const finalPrice = price * (1 - Sale / 100);

  return (
    <div className="bg-primary-0 rounded-md">
      <div className="sticky top-[var(--header-height)] p-5">
        <div className="grid gap-[4vh]">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold lg:text-2xl">
              Quần Jogger Siêu Co Giãn
            </h1>
            <Button
              icon
              className="hover:text-accent-700 ml-auto"
              aria-label="Add to wishlist"
            >
              <FaRegHeart className="h-5 w-5" />
            </Button>
          </div>

          {/* Colors */}
          <div>
            <p className="mb-2 font-medium">Màu sắc</p>
            <div className="flex flex-wrap gap-2">
              {COLORS.map(({ value, label }) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="color"
                    value={value}
                    className="peer hidden"
                  />
                  <span
                    className="peer-checked:ring-accent-700 peer-hover:outline-accent-700 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-all peer-checked:ring-2 peer-checked:ring-offset-2 peer-hover:outline-1"
                    style={{ backgroundColor: value }}
                    title={label}
                  ></span>
                </label>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="mb-2 font-medium">Kích cỡ</p>
            <div className="flex flex-wrap gap-3">
              {SIZES.map(({ value, label }) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="size"
                    value={value}
                    className="peer hidden"
                  />
                  <span className="border-primary-800 peer-checked:bg-accent-700 peer-checked:ring-accent-700 cursor-pointer rounded-sm border px-3 py-2 text-sm transition-all select-none peer-checked:text-white peer-checked:ring-2 peer-checked:ring-offset-2">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

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
                <ProductAvgRates reviews={mockReviews} />
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
