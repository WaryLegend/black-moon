import UserOrderList from "@/app/_components/CProfilePage/UserOrderList";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

export default function OrdersPage() {
  return (
    <div className="sticky top-[calc(var(--header-height)_+_5px)] flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Đơn hàng của tôi</h2>
      <Suspense
        fallback={
          <Spinner
            color="var(--color-accent-600)"
            className="my-0.5 self-center"
          />
        }
      >
        <UserOrderList />
      </Suspense>
    </div>
  );
}
