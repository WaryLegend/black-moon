import ProductAvgRates from "./ProductAvgRates";
import ProductReviews from "./ProductReviews";
import TextButton from "@/components/ui/TextButton";
import { FaPencilAlt } from "react-icons/fa";

export default function ProductRatingSection({ reviews }) {
  const { total, latestReviews, avgRating } = reviews;
  return (
    <div className="grid gap-3">
      <div className="border-primary-400 space-y-2 border-b pb-2">
        <h1 className="text-2xl font-semibold lg:text-3xl">Đánh giá</h1>
        <ProductAvgRates
          totalReviews={total}
          avgRating={avgRating}
          showRating
        />
      </div>

      {/* Reviews Section */}
      <ProductReviews reviews={latestReviews}>
        <div className="ml-auto flex items-center gap-10">
          {total > 3 && <TextButton linkTo="reviews">Xem thêm</TextButton>}
          <TextButton
            linkTo="reviews?form=open"
            className="flex items-center justify-center gap-1"
          >
            <FaPencilAlt />
            Viết đánh giá
          </TextButton>
        </div>
      </ProductReviews>
    </div>
  );
}
