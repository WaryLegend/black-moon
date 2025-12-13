import { getOrderById } from "@/app/_lib/data-service";
import { fDate, formatCurrency } from "@/app/_utils/helpers";
import { ORDER_STATUS } from "@/app/_utils/constants";
import OrderDetailItem from "@/app/_components/CProfilePage/OrderDetailItem";

export default async function OrderDetailsPage({ params }) {
  const _params = await params;
  const order = await getOrderById(_params.orderId);

  if (!order) {
    return (
      <p className="text-primary-600 text-center">Đơn hàng không tồn tại.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        Chi tiết đơn hàng <span className="text-accent-600">{order.id}</span>
      </h2>
      <div className="bg-primary-50 border-primary-300 rounded-lg border-b p-4">
        <p className="text-primary-600 text-sm">
          Ngày đặt: {fDate(order.createdAt)}
        </p>
        <p className="text-primary-600 text-sm">
          Trạng thái:{" "}
          <span
            className={`rounded-full px-2 py-1 font-medium ${ORDER_STATUS[order.status]?.color}`}
          >
            {order.status}
          </span>
        </p>
        <p className="mt-2 text-left text-lg font-bold">
          Tổng cộng: {formatCurrency(order.totalAmount)}
        </p>
      </div>
      <ul className="divide-primary-300 flex flex-col divide-y">
        {order.items.map((item) => (
          <OrderDetailItem key={item.variantId} item={item} />
        ))}
      </ul>
    </div>
  );
}
