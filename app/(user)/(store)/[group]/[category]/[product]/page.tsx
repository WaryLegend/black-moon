import { notFound } from "next/navigation";

import BreadCrumbNav from "@/common/navigation/BreadCrumbNav";
import ProductDetails from "@/components/store/product_detail/ProductDetails";
import ProductMenu from "@/components/store/product_detail/ProductMenu";
// import ProductRates from "@/components/store/product_detail/ProductRates";
import ProductInitializer from "@/components/store/product_detail/ProductInitializer";
import {
  getCategoryBySlug,
  getPublicProductBySlug,
} from "@/services/store.api";
import type { AppPageProps } from "@/types/page-props";

import ProductGallery from "@/components/store/product_detail/ProductGallery";

type Params = {
  group: string;
  category: string;
  product: string;
};

// type ReviewsSummary = {
//   total: number;
//   latestReviews: unknown[];
//   avgRating: number;
// };

// const DEFAULT_REVIEWS: ReviewsSummary = {
//   total: 0,
//   latestReviews: [],
//   avgRating: 0,
// };

// function getReviews(product: ProductDetailSummary): ReviewsSummary {
//   return (
//     (product as unknown as { reviews?: ReviewsSummary }).reviews ??
//     DEFAULT_REVIEWS
//   );
// }

export async function generateMetadata({ params }: AppPageProps<Params>) {
  const { product: productSlug } = await params;
  const product = await getPublicProductBySlug(productSlug);

  return {
    title: product?.name ?? "Not Found",
  };
}

export default async function ProductDetailsPage({
  params,
}: AppPageProps<Params>) {
  const {
    group: groupSlug,
    category: categorySlug,
    product: productSlug,
  } = await params;

  const [{ category }, product] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getPublicProductBySlug(productSlug),
  ]);

  if (!category || !product) notFound();

  const groupName = category.targetGroup?.name ?? groupSlug;
  // const reviews = getReviews(product);

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <ProductInitializer product={product} />
      <BreadCrumbNav
        paths={{
          group: { slug: groupSlug, name: groupName },
          category: { slug: category.slug, name: category.name },
          product: { slug: product.slug, name: product.name },
        }}
      />

      {/* Product page main body */}
      <section className="grid grid-cols-[2fr_1.2fr] gap-5">
        {/* LEFT: product images, details and more...*/}
        <div className="flex flex-col gap-10">
          {/* product images */}
          <ProductGallery />

          {/* Product details */}
          <ProductDetails />

          {/* Product average rates and reviews*/}
          {/* <ProductRates reviews={reviews} /> */}
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
