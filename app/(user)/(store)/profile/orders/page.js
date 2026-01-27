import TabFilter from "@/components/filters/TabFilter";
import UserOrdersWrapper from "@/components/user/profile/UserOrdersWrapper";

export default async function OrdersPage({ searchParams }) {
  const filterParams = await searchParams;

  return (
    <div className="sticky top-[calc(var(--header-height)_+_5px)] flex flex-col gap-4">
      <div className="flex flex-wrap justify-between">
        <h2 className="text-2xl font-bold">Đơn hàng của tôi</h2>
        <TabFilter
          filterField="status"
          options={[
            { value: "all", label: "Tất cả" },
            { value: "pending", label: "Chờ xử lý" },
            { value: "packing", label: "Đang đóng gói" },
            { value: "shipping", label: "Đang giao" },
            { value: "delivered", label: "Đã giao" },
            { value: "cancelled", label: "Đã hủy" },
            { value: "returned", label: "Đã trả" },
          ]}
        />
      </div>

      <UserOrdersWrapper searchParams={filterParams} />
    </div>
  );
}
