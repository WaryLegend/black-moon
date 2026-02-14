import UserOrderItem from "./UserOrderItem";

function UserOrderList({ orders }) {
  return (
    <>
      {orders?.length === 0 ? (
        <p className="text-primary-600 text-center">Chưa có đơn hàng nào.</p>
      ) : (
        <ul className="flex max-h-200 flex-col gap-4 overflow-auto max-lg:max-h-70">
          {orders.map((order) => (
            <UserOrderItem key={order.id} order={order} />
          ))}
        </ul>
      )}
    </>
  );
}

export default UserOrderList;
