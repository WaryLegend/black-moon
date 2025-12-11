import StarRates from "@/app/_components/StarRates";

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
