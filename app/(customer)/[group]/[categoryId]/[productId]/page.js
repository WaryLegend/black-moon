import BreadCrumbNav from "@/app/_components/BreadCrumbNav";
import Button from "@/app/_components/Button";
import ProductDetails from "@/app/_components/ProductDetails";
import ProductRates from "@/app/_components/ProductRates";
import Image from "next/image";

export default function Page({ params }) {
  return (
    <div className="flex flex-col gap-1 md:gap-4">
      <BreadCrumbNav params={params} />

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

          {/* Product rates */}
          <ProductRates />
        </div>

        {/* RIGHT: sticky product info */}
        <div className="bg-primary-0 rounded-sm">
          <div className="sticky top-[var(--header-height)] p-5">
            <h1 className="text-2xl font-semibold lg:text-3xl">
              Quần Jogger Siêu Co Giãn
            </h1>

            {/* Price */}
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl font-bold text-red-600">
                293.000 VND
              </span>
              <span className="text-primary-400 line-through">391.000 VND</span>
              <span className="text-sm text-red-600">Sale</span>
            </div>

            {/* Colors */}
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">Màu sắc</p>
              <div className="flex gap-2">
                <button className="bg-primary-400 h-8 w-8 rounded-full border"></button>
                <button className="h-8 w-8 rounded-full border bg-black"></button>
                <button className="h-8 w-8 rounded-full border bg-slate-700"></button>
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">Kích cỡ</p>
              <div className="flex flex-wrap gap-3">
                {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                  <label key={size}>
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      className="peer hidden"
                    />
                    <span className="border-primary-800 peer-hover:outline-primary-800 peer-checked:bg-accent-700 peer-checked:outline-accent-700 cursor-pointer rounded-sm border px-3 py-2 text-sm outline-offset-2 transition-colors select-none peer-checked:text-white peer-checked:outline-1 peer-hover:outline-2">
                      {size}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <Button className="mt-8 w-full !rounded-full">
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
