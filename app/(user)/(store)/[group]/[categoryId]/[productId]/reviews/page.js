import ReviewsSection from "@/app/_components/CProductReviewsPage/ReviewsSection";
import QueryProvider from "@/app/_components/QueryClientProvider";
import { getProductById } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const { product } = await getProductById(productId);

  return {
    title: product?.name ?? "Not Found",
  };
}

export default async function Page({ params }) {
  const { productId } = await params;

  return (
    <QueryProvider>
      <ReviewsSection productId={productId} />
    </QueryProvider>
  );
}
