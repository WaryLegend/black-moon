"use client";

import { useRecentOrders } from "./useRecentOrders";
import Table from "@/components/ui/Table";
import RecentOrderRow from "./RecentOrderRow";

function RecentOrderTable() {
  const { isLoading, recentOrders } = useRecentOrders(6);

  return (
    <div className="bg-primary-0 rounded-lg p-4 shadow-md">
      <h2 className="text-primary-600 mb-4 text-lg font-semibold">
        Recent Orders
      </h2>
      <Table columns="1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Order ID</div>
          <div>Owner</div>
          <div>Status</div>
          <div>Revenue</div>
        </Table.Header>
        <Table.Body
          data={recentOrders}
          render={(order) => <RecentOrderRow order={order} key={order.id} />}
          isLoading={isLoading}
          skeletonCount={6}
        />
      </Table>
    </div>
  );
}

export default RecentOrderTable;
