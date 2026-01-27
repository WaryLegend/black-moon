"use client";

import UserOrderList from "./UserOrderList";
import Pagination from "@/components/ui/Pagination";
import Spinner from "@/components/ui/Spinner";
import { useOrdersByUser } from "./useOrdersByUser";

function UserOrdersWrapper({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const { filters } = parseQueryParams(searchParams);

  const { isLoading, orders, total } = useOrdersByUser({
    userId: "6", // test userId = 6, must get from login user
    filters,
    page,
  });

  return (
    <>
      {isLoading ? (
        <Spinner
          type="bar"
          className="self-center"
          color="var(--color-accent-600)"
        />
      ) : (
        <>
          <UserOrderList orders={orders} />
          <Pagination count={total} />
        </>
      )}
    </>
  );
}

export default UserOrdersWrapper;

function parseQueryParams(searchParams) {
  const filters = {};

  // order-status filter (single-select)
  const status = searchParams.status;
  if (status && status !== "all") filters.status = status;

  return { filters };
}
