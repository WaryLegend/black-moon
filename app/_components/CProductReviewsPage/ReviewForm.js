"use client";

import { useState } from "react";
import StarRating from "@/app/_components/StarRating";
import Button from "@/app/_components/Button";
import toast from "react-hot-toast";
// import { submitReview } from "@/app/_lib/data-service";

export default function ReviewForm({ productId, onCloseModal }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // gọi hay lấy userId trong userStore (chưa có)

  const handleSubmit = async () => {
    if (rating === 0 || !comment.trim()) {
      toast.error("Vui lòng chọn sao và viết bình luận");
      return;
    }
    try {
      // Gọi API (giả lập)
      //   await submitReview({ productId, userId, rating, comment });
      onCloseModal(); // Đóng modal
      toast.success("Gửi đánh giá thành công");
      // Có thể invalidate query để refresh reviews
    } catch (error) {
      toast.error("Lỗi khi gửi đánh giá");
    }
  };

  return (
    <div className="space-y-5 md:min-w-[400px] lg:min-w-[500px]">
      <h2 className="text-xl font-bold lg:text-2xl">Viết đánh giá</h2>
      {/* Star rating */}
      <StarRating initialRating={rating} onChange={setRating} />

      {/* Textarea comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Bình luận về sản phẩm..."
        rows={6}
        className="focus:border-accent-500 w-full rounded border p-3 focus:outline-none"
      />

      <Button onClick={handleSubmit} className="w-full lg:text-xl">
        Gửi đánh giá
      </Button>
    </div>
  );
}
