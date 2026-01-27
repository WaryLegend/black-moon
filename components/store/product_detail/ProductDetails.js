"use client";

import { useCallback, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Button from "@/components/ui/Button";
// import { useProductStore } from "@/context/ProductStore";

// Fake product details
const productDetails = [
  {
    label: "Điểm nổi bật",
    content: (
      <ul className="text-primary-700 list-disc space-y-1 pl-5 text-sm">
        <li>Phong cách hiện đại, dễ phối đồ.</li>
        <li>Thiết kế thoải mái, phù hợp mặc hàng ngày.</li>
        <li>Sản phẩm thân thiện với môi trường.</li>
      </ul>
    ),
  },
  {
    label: "Chi tiết",
    content: (
      <div className="text-primary-700 space-y-2 text-sm">
        <p>
          - Màu sắc tinh tế với công nghệ giặt tối giản, phù hợp để mặc đi chơi
          hoặc dạo phố.
        </p>
        <p>- Những hình ảnh sản phẩm có thể bao gồm những màu không có sẵn.</p>
        <p>Mã sản phẩm: 480971, 476088, 472485</p>
        <p>
          Xin lưu ý mã số nhận diện của sản phẩm có thể có sự khác biệt, kể cả
          khi đó là cùng một mặt hàng.
        </p>
      </div>
    ),
  },
  {
    label: "Chất liệu / Cách chăm sóc",
    content: (
      <div className="text-primary-700 space-y-2 text-sm">
        <p>Chất liệu: 100% Cotton.</p>
        <p>Hướng dẫn giặt: Giặt máy ở 30°C, không sử dụng thuốc tẩy.</p>
        <p>Là ở nhiệt độ thấp, không sấy khô.</p>
      </div>
    ),
  },
];

export default function ProductDetails() {
  // const details = useProductStore((p) => p.product?.description) || [];
  const [openIndices, setOpenIndices] = useState([]);

  const toggle = useCallback((index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  }, []);

  return (
    <div className="grid gap-3">
      <h1 className="text-2xl font-semibold lg:text-3xl">Mô tả</h1>
      <p className="text-primary-700 text-sm">Mã sản phẩm: 480971</p>

      <div className="divide-primary-300 border-primary-400 flex flex-col divide-y border-t text-lg">
        {productDetails.map((item, index) => (
          <div key={item.label} className="py-4">
            {/* Header */}
            <div className="inline-flex w-full items-center justify-between">
              <p className={openIndices.includes(index) ? "font-semibold" : ""}>
                {item.label}
              </p>
              <Button
                icon
                onClick={() => toggle(index)}
                className="hover:text-accent-700"
              >
                {openIndices.includes(index) ? (
                  <FaMinus className="h-3 w-3 transition-all" />
                ) : (
                  <FaPlus className="h-3 w-3 transition-all" />
                )}
              </Button>
            </div>

            {/* Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndices.includes(index)
                  ? "max-h-100 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-2">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
