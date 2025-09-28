import { STAR_LENGTH } from "@/app/_utils/constants";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import TextButton from "./TextButton";

function StarRatings({ rates, showRating = false, totalReviews }) {
  // Render stars based on rating (support half star)
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;

    return Array.from({ length: STAR_LENGTH }, (_, i) => {
      if (i < fullStars) {
        return <FaStar key={i} className="text-accent-500" />;
      } else if (i === fullStars && decimal >= 0.5 && decimal <= 0.8) {
        return <FaStarHalfAlt key={i} className="text-accent-500" />;
      } else {
        return <FaRegStar key={i} className="text-accent-500" />;
      }
    });
  };

  return (
    <div className="flex items-center gap-1">
      {renderStars(rates ?? 0)}
      {rates && showRating ? <span className="ml-1">{rates}</span> : null}
      {totalReviews ? (
        <TextButton linkTo="reviews">({totalReviews})</TextButton>
      ) : null}
    </div>
  );
}

export default StarRatings;
