"use client";

import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useReviewsByProduct } from "./useReviewsByProduct";
import { useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { HiChevronLeft } from "react-icons/hi2";
import Image from "next/image";
import ReviewsSectionSkeleton from "@/app/_components/Skeletons/ReviewsSectionSkeleton";
import ProductAvgRates from "@/app/_components/CProductPage/ProductAvgRates";
import ProductReviews from "@/app/_components/CProductPage/ProductReviews";
import TextButton from "@/app/_components//TextButton";
import Spinner from "@/app/_components/Spinner";
import Modal from "@/app/_components/Modal";
import ReviewForm from "./ReviewForm";

function ReviewsSection({ productId }) {
  const {
    isLoading,
    product,
    reviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReviewsByProduct({ productId });
  if (!product && !isLoading) notFound();

  const searchParams = useSearchParams();
  const openForm = searchParams.get("form") === "open";

  const params = useParams();
  const { group, categoryId } = params;
  if (isLoading) return <ReviewsSectionSkeleton />;

  return (
    <div className="flex flex-col gap-1 md:gap-4">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 lg:h-35 lg:w-35">
          <Image
            src={product.images?.[0] || "/t-shirt.jpg"}
            alt={product.name}
            fill
            className="rounded object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold lg:text-3xl">{product.name}</h2>
          <ProductAvgRates avgRating={reviews?.avgRating} showRating />
        </div>
      </div>

      <section className="grid">
        <h2 className="bg-primary-100 border-primary-400 sticky top-[var(--header-height)] flex items-center justify-between border-b py-2">
          <p className="text-lg font-medium">Đánh giá ({reviews?.total})</p>
          <div className="ml-auto flex items-center gap-10">
            <TextButton
              href={`/${group}/${categoryId}/${productId}`}
              className="flex items-center justify-center gap-1 hover:underline"
            >
              <HiChevronLeft />
              Quay lại
            </TextButton>
            <Modal>
              <Modal.Open opens="review-form">
                <TextButton className="flex items-center justify-center gap-1">
                  <FaPencilAlt />
                  Viết đánh giá
                </TextButton>
              </Modal.Open>
              <Modal.Window name="review-form">
                <ReviewForm productId={productId} />
              </Modal.Window>
              {/* to open right away from product page */}
              {openForm && <AutoOpenTrigger />}
            </Modal>
          </div>
        </h2>
        <ProductReviews reviews={reviews?.reviews}>
          {hasNextPage && (
            <TextButton
              onClick={fetchNextPage}
              hasNextPage={hasNextPage}
              disabled={isFetchingNextPage}
              className="ml-auto"
            >
              {isFetchingNextPage ? (
                <div className="flex items-center gap-1">
                  <Spinner
                    type="mini"
                    color="var(--color-blue-700)"
                    size={20}
                  />{" "}
                  <span>Đang tải...</span>
                </div>
              ) : (
                "Xem thêm"
              )}
            </TextButton>
          )}
        </ProductReviews>
      </section>
    </div>
  );
}
export default ReviewsSection;

// Small component trigger early open-modal
function AutoOpenTrigger() {
  const { open } = Modal.useContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    open("review-form");

    const params = new URLSearchParams(searchParams);
    params.delete("form");

    router.replace(`?${params.toString()}`);
  }, [open, router, searchParams]);

  return null;
}
