// app/checkout/success/page.jsx
import Link from "next/link";

export default function SuccessPage() {
  const orderId = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  ).get("order");

  return (
    <div className="bg-primary-50 flex flex-col items-center justify-center">
      <div className="rounded-lg bg-white p-10 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-green-600">
          Đặt hàng thành công!
        </h1>
        <p className="mt-4 text-xl">
          Mã đơn hàng: <strong>{orderId}</strong>
        </p>
        <p className="text-primary-600 mt-2">
          Cảm ơn bạn đã mua sắm tại Black & Moon
        </p>
        <div className="mt-8 space-x-4">
          <Link href="/" className="bg-accent-600 rounded px-6 py-3 text-white">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
