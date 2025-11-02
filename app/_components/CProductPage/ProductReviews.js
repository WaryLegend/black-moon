import { FaPencilAlt } from "react-icons/fa";
import StarRatings from "@/app/_components/StarRatings";
import TextButton from "../TextButton";

function ProductReviews({ reviews }) {
  return (
    <>
      <div className="divide-primary-300 border-primary-400 flex flex-col divide-y border-t">
        {reviews.map((review, index) => (
          <div key={index} className="flex flex-col gap-3 py-4">
            {/* Rating Header */}
            <div className="inline-flex w-full items-center justify-between text-lg">
              <p className="font-medium">{review.title}</p>
              <time className="font-light">{review.date}</time>
            </div>
            {/* Star Rates */}
            <StarRatings rates={review.rates} />
            {/* Comment */}
            <div>{review.comment}</div>
          </div>
        ))}
      </div>
      {/* view more and write your rating button */}
      <div className="ml-auto flex items-center gap-10">
        <TextButton linkTo="reviews">Xem thêm</TextButton>
        <TextButton
          linkTo="reviews?form=open"
          className="flex items-center justify-center gap-1"
        >
          <FaPencilAlt />
          Viết đánh giá
        </TextButton>
      </div>
    </>
  );
}

export default ProductReviews;
