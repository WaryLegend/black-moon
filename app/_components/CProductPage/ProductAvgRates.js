import StarRatings from "@/app/_components/StarRatings";

function ProductAvgRates({ reviews, showRating }) {
  // Calculate average rating and total reviews
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rates, 0) /
          reviews.length
        ).toFixed(1)
      : 0;
  const totalReviews = reviews.length;

  return (
    <StarRatings
      rates={averageRating}
      showRating={showRating}
      totalReviews={totalReviews}
    />
  );
}

export default ProductAvgRates;
