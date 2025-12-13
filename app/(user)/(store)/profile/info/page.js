"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/app/_components/Button";
import default_user from "@/public/default-user.jpg";
import { fDate } from "@/app/_utils/helpers";
import AvatarMenu from "@/app/_components/CProfilePage/AvatarMenu";

// Mock data (thay bằng auth sau)
const mockUser = {
  id: "6",
  fullName: "Đỗ Quang Minh",
  userName: "doquangminh",
  email: "minh.dq@freelancer.com",
  avatar: null,
  role: "customer",
  mobile: "0923456789",
  status: "active",
  createdAt: "2025-09-12T07:10:00.000Z",
};

const mockReviews = [
  {
    id: 1,
    productName: "Áo thun",
    rating: 4.5,
    comment: "Chất liệu tốt, nhưng size hơi nhỏ.",
    date: "10/11/2025",
  },
  {
    id: 2,
    productName: "Quần jeans",
    rating: 5,
    comment: "Rất thoải mái, giao hàng nhanh.",
    date: "15/10/2025",
  },
  {
    id: 3,
    productName: "Giày sneaker",
    rating: 3,
    comment: "Màu sắc không giống hình, nhưng chất lượng ổn.",
    date: "05/09/2025",
  },
];

export default function InfoPage() {
  const [userAvatar, setUserAvatar] = useState(mockUser.avatar);

  const handleAvatarChange = (file) => {
    // In real app, you would:
    // 1. Upload file to your server
    // 2. Get the URL from response
    // 3. Update the userAvatar state

    console.log("Uploading file:", file);

    // For demo, simulate upload and update
    setTimeout(() => {
      // Create a mock URL for demo
      const mockUrl = URL.createObjectURL(file);
      setUserAvatar(mockUrl);
      alert("Avatar đã được cập nhật thành công!");
    }, 1000);
  };

  return (
    <div className="space-y-12">
      {/* name + avatar và info cơ bản */}
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:gap-8 md:text-left">
        <div className="relative h-32 w-32 shrink-0">
          <div className="bg-primary-200 relative h-full w-full overflow-hidden rounded-full shadow-lg">
            <Image
              src={userAvatar || default_user}
              alt="Avatar"
              fill
              quality={90}
              className="object-cover"
              priority
            />

            {/* Avatar Menu */}
            <AvatarMenu
              avatar={userAvatar}
              onAvatarChange={handleAvatarChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold">{mockUser.fullName}</h2>
          <p className="text-primary-600 text-lg">@{mockUser.userName}</p>
          <p className="text-primary-500 text-sm">
            Tham gia từ {fDate(mockUser.createdAt)}
          </p>
        </div>
      </div>

      {/* Rest of the component remains the same... */}
      <div className="bg-primary-50 rounded-lg p-6 shadow-inner">
        <h3 className="mb-6 text-2xl font-semibold">Thông tin cá nhân</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-primary-500 text-sm">Họ và tên</p>
            <p className="text-lg font-medium">{mockUser.fullName}</p>
          </div>
          <div className="space-y-1">
            <p className="text-primary-500 text-sm">Tên đăng nhập</p>
            <p className="text-lg font-medium">{mockUser.userName}</p>
          </div>
          <div className="space-y-1">
            <p className="text-primary-500 text-sm">Email</p>
            <p className="text-lg font-medium">{mockUser.email}</p>
          </div>
          <div className="space-y-1">
            <p className="text-primary-500 text-sm">Số điện thoại</p>
            <p className="text-lg font-medium">{mockUser.mobile}</p>
          </div>
        </div>
        <Button variant="outline" className="mt-8 w-full md:w-auto">
          Chỉnh sửa thông tin
        </Button>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">Đánh giá của bạn</h3>
        {mockReviews.length === 0 ? (
          <p className="text-primary-600 text-center">
            Bạn chưa có đánh giá nào.
          </p>
        ) : (
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div key={review.id} className="rounded-lg border p-5 shadow-sm">
                <div className="flex justify-between">
                  <h4 className="font-medium">{review.productName}</h4>
                  <span className="text-yellow-500">
                    ★ {review.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-primary-700 mt-2">{review.comment}</p>
                <p className="text-primary-500 mt-1 text-sm">
                  Ngày: {review.date}
                </p>
              </div>
            ))}
          </div>
        )}
        <Button className="w-full md:w-auto">Xem tất cả đánh giá</Button>
      </div>
    </div>
  );
}
