import BreadCrumbNav from "@/app/_components/BreadCrumbNav";
import Button from "@/app/_components/Button";
import ProductAvgRates from "@/app/_components/ProductAvgRates";
import ProductDetails from "@/app/_components/ProductDetails";
import ProductRates from "@/app/_components/ProductRates";
import { ParamsProvider } from "@/app/_context/NavParamsContext";
import { formatCurrency } from "@/app/_utils/helpers";
import Image from "next/image";
import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import { COLORS, SIZES } from "@/app/_utils/constants";
import ProductList from "@/app/_components/ProductList";

export const metadata = {
  title: "Name of product",
};

// testing
const products = [
  { id: 1, name: "ĐỒ MẶC NGOÀI" },
  { id: 2, name: "QUẦN" },
  { id: 3, name: "HEATTECH" },
  { id: 4, name: "ĐỒ BẦU" },
  { id: 5, name: "ÁO THUN, ÁO NI & ÁO GIẢ LÔNG CỪU" },
  { id: 6, name: "AIRism" },
  { id: 7, name: "Đồ mặc nhà" },
];

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

export default async function Page({ params }) {
  const trueParams = await params;

  const isSale = true; // test

  return (
    <ParamsProvider params={trueParams}>
      <div className="flex flex-col gap-1 md:gap-4">
        <BreadCrumbNav />

        {/* Product main body */}
        <div className="grid grid-cols-[2fr_1.2fr] gap-5">
          {/* LEFT: product images, details and more...*/}
          <div className="flex flex-col gap-10">
            {/* product images */}
            <div className="relative grid grid-cols-2 overflow-hidden rounded-sm">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="relative aspect-square">
                  <Image
                    src="/t-shirt.jpg"
                    alt="Product"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Product details */}
            <ProductDetails />

            {/* Product average rates and reviews*/}
            <ProductRates reviews={mockReviews} />
          </div>

          {/* RIGHT: sticky product info */}
          <div className="bg-primary-0 rounded-sm">
            <div className="sticky top-[var(--header-height)] p-5">
              <div className="grid gap-5">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold lg:text-2xl">
                    Quần Jogger Siêu Co Giãn
                  </h1>
                  <Button
                    icon
                    className="group ml-auto"
                    title="Thêm vào yêu thích"
                  >
                    <FaRegHeart className="group-hover:text-accent-700 h-5 w-5 transition-all" />
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
                          className="peer-checked:ring-accent-700 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-all peer-checked:ring-2 peer-checked:ring-offset-2"
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
                        isSale
                          ? "text-primary-400 line-through"
                          : "text-xl font-bold lg:text-2xl"
                      }
                    >
                      {formatCurrency(391000)}
                    </span>
                    {/* avg product rates */}
                    <div className="ml-auto">
                      <ProductAvgRates reviews={mockReviews} />
                    </div>
                  </div>

                  {/* Sale? */}
                  {isSale && (
                    <div>
                      <span className="text-xl font-bold text-red-600 lg:text-2xl">
                        {formatCurrency(293000)}
                      </span>
                      <span className="ml-3 text-red-600">Sale</span>
                    </div>
                  )}
                </div>

                {/* set quantity section */}
                <div>
                  <div className="bg-primary-100 inline-flex items-center rounded-full px-4 py-2">
                    <Button
                      icon
                      // onClick={()=> {}}
                      className="hover:text-accent-700 p-3"
                    >
                      <FaMinus className="h-3 w-3 transition-all" />
                    </Button>
                    <span className="px-4 text-center text-lg font-medium">
                      {1}
                    </span>
                    <Button
                      icon
                      // onClick={()=> {}}
                      className="hover:text-accent-700 p-3"
                    >
                      <FaPlus className="h-3 w-3 transition-all" />
                    </Button>
                  </div>
                </div>

                {/* Add to cart */}
                <Button
                  type="button"
                  className="w-full !rounded-full lg:text-2xl"
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* extra section / footer */}
        <div className="mt-10">
          <h1 className="text-center text-2xl font-semibold lg:text-3xl">
            Sản phẩm được quan tâm
          </h1>
          {/* testing this is fake recommend list*/}
          <ProductList products={products} />
        </div>
      </div>
    </ParamsProvider>
  );
}
