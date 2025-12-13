import { getCategoryById, getProductById } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";
import Image from "next/image";
import BreadCrumbNav from "@/app/_components/BreadCrumbNav";
import ProductDetails from "@/app/_components/CProductPage/ProductDetails";
import ProductRates from "@/app/_components/CProductPage/ProductRates";
import ProductMenu from "@/app/_components/CProductPage/ProductMenu";
import ProductInitializer from "@/app/_context/ProductInitializer";

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const { product } = await getProductById(productId);

  return {
    title: product?.name ?? "Not Found",
  };
}

export default async function Page({ params }) {
  const _params = await params;

  const { group, categoryId, productId } = _params;
  const [{ category }, { product }] = await Promise.all([
    getCategoryById(categoryId),
    getProductById(productId),
  ]);
  if (!category || !product) notFound();

  const imgLength = 6; // amount of image that product has

  return (
    <div className="flex flex-col gap-1 md:gap-4">
      <ProductInitializer product={product} />
      <BreadCrumbNav
        paths={{
          group,
          category: { id: category.id, name: category.name },
          product: product.name,
        }}
      />
      {/* Product page main body */}
      <section className="grid grid-cols-[2fr_1.2fr] gap-5">
        {/* LEFT: product images, details and more...*/}
        <div className="flex flex-col gap-10">
          {/* product images */}
          <div className="relative grid grid-cols-2 overflow-hidden rounded-lg">
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
          <ProductRates reviews={product.reviews} />
        </div>

        {/* RIGHT: sticky product info and add_to_cart button */}
        <ProductMenu product={product} />
      </section>

      {/* extra section / footer */}
      <section className="mt-10">
        <h1 className="text-center text-2xl font-semibold lg:text-3xl">
          Sản phẩm được quan tâm
        </h1>
        {/* Recommend List */}
      </section>
    </div>
  );
}
