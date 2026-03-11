import StarRates from "@/components/ui/StarRates";

function ProductAvgRates({ totalReviews, avgRating, showRating }) {
  return (
    <StarRates
      rates={avgRating}
      showRating={showRating}
      totalReviews={totalReviews}
    />
  );
}

export default ProductAvgRates;
