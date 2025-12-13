"use client";

import { fDate, formatCurrency } from "@/app/_utils/helpers";
import { ORDER_STATUS } from "@/app/_utils/constants";
import { useParams } from "next/navigation";
import Link from "next/link";

function UserOrderItem({ order }) {
  const params = useParams();
  const isActived = order.id === params.orderId;

  return (
    <li
      className={`bg-primary-50 hover:bg-primary-100 border-primary-300 relative rounded-lg border-b transition-all hover:shadow-md`}
    >
      {/* Active indicator strip */}
      {isActived && (
        <span className="from-accent-600 to-accent-400 absolute top-0 left-0 h-full w-1 rounded-l-lg bg-gradient-to-tr" />
      )}

      <Link
        href={`/profile/orders/${order.id}`}
        className="flex flex-col p-5"
        title="Click to see details"
      >
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-lg font-bold">
              Mã đơn: <span className="text-accent-600">{order.id}</span>
            </p>
            <p className="text-primary-600 text-sm">
              Ngày đặt: {fDate(order.createdAt)}
            </p>
            <p className="text-primary-600 text-sm">
              Số sản phẩm:{" "}
              <span className="text-accent-600">{order.totalItems}</span>
            </p>
          </div>

          <div className="flex flex-col justify-between text-right">
            <p className="text-accent-600 text-lg font-bold">
              {formatCurrency(order.totalAmount)}
            </p>
            <div>
              <p
                className={`inline-block rounded-full px-2 py-1 text-sm font-medium ${ORDER_STATUS[order.status]?.color}`}
              >
                {order.status}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default UserOrderItem;
