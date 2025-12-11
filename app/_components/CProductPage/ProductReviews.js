import StarRates from "@/app/_components/StarRates";
import { fDateDistance } from "@/app/_utils/helpers";

function ProductReviews({ reviews, children }) {
  const hasReviews = !!reviews?.length;

  return (
    <>
      <div className="divide-primary-300 flex flex-col divide-y">
        {hasReviews ? (
          reviews.map((review, index) => (
            <div key={index} className="flex flex-col gap-3 py-4">
              {/* Rating Header */}
              <div className="inline-flex w-full items-center justify-between text-lg">
                <p className="font-medium">{review.userName}</p>
                <time className="font-light">
                  {fDateDistance(review.createdAt)}
                </time>
              </div>
              {/* Star Rates */}
              <StarRates rates={review.rating} />
              {/* Comment */}
              <div>{review.comment}</div>
            </div>
          ))
        ) : (
          <p className="py-4">Chưa có đánh giá nào</p>
        )}
      </div>
      {/* view more and write your rating button */}
      {children}
    </>
  );
}

export default ProductReviews;
