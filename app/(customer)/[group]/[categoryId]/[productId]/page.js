import BreadCrumbNav from "@/app/_components/BreadCrumbNav";
import Button from "@/app/_components/Button";
import Image from "next/image";

export default function Page({ params }) {
  return (
    <>
      <BreadCrumbNav params={params} />

      {/* Product detail body */}
      <div className="grid grid-cols-[2fr_1.2fr] gap-5">
        {/* LEFT: product images */}
        <div className="relative grid grid-cols-2 gap-2 overflow-hidden rounded-sm">
          {Array.from({ length: 8 }).map((_, i) => (
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

        {/* RIGHT: sticky product info */}
        <div className="bg-primary-0">
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
              <div className="flex flex-wrap gap-2">
                {["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y", "14Y+"].map(
                  (size) => (
                    <button
                      key={size}
                      className="rounded border px-3 py-1 text-sm hover:border-black"
                    >
                      {size}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Add to cart */}
            <Button className="mt-8 w-full !rounded-full">
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
