import { ParamsProvider } from "@/app/_context/NavParamsContext";
import Image from "next/image";
import BreadCrumbNav from "@/app/_components/BreadCrumbNav";
import ProductDetails from "@/app/_components/CProductPage/ProductDetails";
import ProductRates from "@/app/_components/CProductPage/ProductRates";
import ProductList from "@/app/_components/ProductList";
import ProductMenu from "@/app/_components/CProductPage/ProductMenu";

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

  const imgLength = 6; // amount of image that product has

  return (
    <ParamsProvider params={trueParams}>
      <div className="flex flex-col gap-1 md:gap-4">
        <BreadCrumbNav />
        {/* Product page main body */}
        <section className="grid grid-cols-[2fr_1.2fr] gap-5">
          {/* LEFT: product images, details and more...*/}
          <div className="flex flex-col gap-10">
            {/* product images */}
            <div className="relative grid grid-cols-2 overflow-hidden rounded-sm">
              {Array.from({ length: imgLength }).map((_, i) => (
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

          {/* RIGHT: sticky product info and add_to_cart button */}
          <ProductMenu />
        </section>

        {/* extra section / footer */}
        <section className="mt-10">
          <h1 className="text-center text-2xl font-semibold lg:text-3xl">
            Sản phẩm được quan tâm
          </h1>
          {/* testing this is fake recommend list*/}
          <ProductList products={products} />
        </section>
      </div>
    </ParamsProvider>
  );
}
