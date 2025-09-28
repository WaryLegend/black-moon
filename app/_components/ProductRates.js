import ProductAvgRates from "@/app/_components/ProductAvgRates";
import ProductReviews from "@/app/_components/ProductReviews";

export default function ProductRates({ reviews }) {
  return (
    <div className="grid gap-3">
      <h1 className="text-2xl font-semibold lg:text-3xl">Đánh giá</h1>

      {/* Average Rating */}
      <ProductAvgRates reviews={reviews} showRating />

      {/* Reviews Section */}
      <ProductReviews reviews={reviews} />
    </div>
  );
}
