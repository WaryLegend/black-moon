import Image from "next/image";
import test from "@/public/test-product.jpg";
import test_img from "@/public/t-shirt.jpg";

function ProductSection({ variants }) {
  return (
    <div className="px-5">
      <div className="py-5 text-xl">Product name</div>
      <div className="flex justify-center">
        <div className="relative h-150 max-h-200 w-full max-w-7xl">
          <Image
            src={test}
            fill
            placeholder="blur"
            alt="product"
            className="rounded-sm object-cover"
          />
          <button className="bg-primary-50 hover:bg-primary-200 absolute right-2.5 bottom-2.5 rounded-full px-2 py-1 transition-all">
            Xem sản phẩm
          </button>
        </div>
      </div>
      {variants ? (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5 p-5">
          {variants.map((variant, index) => (
            <li
              key={index}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Image wrapper */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={test_img}
                  alt={`${variant}'s image`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Caption */}
              <div className="p-3 text-center">
                <span className="text-accent-800 text-sm font-medium">
                  {variant}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span>Chưa có dữ liệu hiển thị</span>
      )}
    </div>
  );
}

export default ProductSection;
