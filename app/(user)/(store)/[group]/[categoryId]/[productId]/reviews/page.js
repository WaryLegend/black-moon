import ReviewsSection from "@/components/store/product_review/ReviewsSection";
import { getProductById } from "@/lib/data-service";

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const { product } = await getProductById(productId);

  return {
    title: product?.name ?? "Not Found",
  };
}

export default async function Page({ params }) {
  const { productId } = await params;

  return <ReviewsSection productId={productId} />;
}
