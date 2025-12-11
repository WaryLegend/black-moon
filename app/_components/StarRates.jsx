import FractionalStar from "@/app/_components/FractionalStar";
import TextButton from "@/app/_components/TextButton";

export default function StarRates({
  rates = 0,
  showRating = false,
  totalReviews,
}) {
  const stars = Array.from({ length: 5 }).map((_, index) => {
    const diff = rates - index;

    const fill = diff >= 1 ? 100 : diff <= 0 ? 0 : diff * 100;

    return (
      <FractionalStar
        key={index}
        fillPercent={fill}
        className="text-accent-500"
        size={16}
      />
    );
  });

  return (
    <div className="flex items-center gap-1">
      {stars}

      {showRating && <span className="ml-1">{rates.toFixed(1)}</span>}

      {totalReviews ? (
        <TextButton linkTo="reviews">({totalReviews})</TextButton>
      ) : null}
    </div>
  );
}
