"use client";

import { useState } from "react";
import { FaPencilAlt, FaRegStar, FaStar } from "react-icons/fa";
import { STAR_LENGTH } from "@/app/_utils/constants";

const mockReviews = [
  {
    title: "This shirt is nice, cosy and fit",
    date: "26/09/2025",
    stars: 5,
    comment:
      "Kích cỡ đã mua: S, Quần áo có vừa không: Hơi chật, Really comfortable and affordable pair that can be worn daily",
  },
  {
    title: "Great quality, love the design",
    date: "25/09/2025",
    stars: 4,
    comment:
      "Kích cỡ đã mua: M, Quần áo có vừa không: Vừa vặn, Looks stylish and feels great for casual wear",
  },
  {
    title: "Perfect for daily wear",
    date: "24/09/2025",
    stars: 5,
    comment:
      "Kích cỡ đã mua: L, Quần áo có vừa không: Rộng rãi, Super soft fabric, highly recommend!",
  },
];

export default function ProductRates({ productId }) {
  const [reviews] = useState(mockReviews);

  // Calculate average rating and total reviews
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.stars, 0) /
          reviews.length
        ).toFixed(1)
      : 0;
  const totalReviews = reviews.length;

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: STAR_LENGTH }, (_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-accent-500" />
      ) : (
        <FaRegStar key={i} className="text-accent-500" />
      ),
    );
  };

  return (
    <div className="grid gap-3">
      <h1 className="text-3xl font-semibold">Đánh giá</h1>

      {/* Average Rating */}
      <div className="flex items-center gap-1">
        {renderStars(Math.round(averageRating))}
        <span className="ml-1">{averageRating}</span>
        <button className="text-blue-700 hover:text-blue-800">
          ({totalReviews})
        </button>
      </div>

      {/* Reviews Section */}
      <div className="divide-primary-300 border-primary-400 flex flex-col divide-y border-t">
        {reviews.map((review, index) => (
          <div key={index} className="flex flex-col gap-3 py-4">
            {/* Rating Header */}
            <div className="inline-flex w-full items-center justify-between text-lg">
              <p className="font-medium">{review.title}</p>
              <time className="font-light">{review.date}</time>
            </div>
            {/* Star Rates */}
            <div className="flex items-center gap-1">
              {renderStars(review.stars)}
            </div>
            {/* Comment */}
            <div>{review.comment}</div>
          </div>
        ))}
      </div>
      {/* view more and write your rating button */}
      <div className="ml-auto flex items-center gap-10">
        <button className="text-blue-700 hover:text-blue-800">Xem thêm</button>
        <button className="flex items-center justify-center gap-1 text-blue-700 hover:text-blue-800">
          <FaPencilAlt />
          Viết đánh giá
        </button>
      </div>
    </div>
  );
}
