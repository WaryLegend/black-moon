"use client";

import { useGetUsers } from "./useGetUsers";
import Spinner from "@/app/_components/Spinner";
import UserTable from "./UserTable";
// import AddUser from "./AddUser";

function UserTableAndBtns({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const { filters, sortBy } = parseQueryParams(searchParams);

  const { isLoading, users, total } = useGetUsers({
    page,
    filters,
    sortBy,
  });

  if (isLoading)
    return (
      <Spinner color="var(--color-accent-600)" className="my-10 self-center" />
    );

  return (
    <div className="flex flex-col gap-4">
      <UserTable users={users} total={total} />
      {/* <AddUser /> */}
    </div>
  );
}

function parseQueryParams(searchParams) {
  const filters = {};
  const sortBy = {};

  // role filter (single-select)
  const role = searchParams.role;
  if (role && role !== "all") filters.role = role;

  // status filter (single-select)
  const status = searchParams.status;
  if (status && status !== "all") filters.status = status;

  // Sort by
  const sort = searchParams.sortBy || "createdAt-desc";
  if (sort) {
    const [field, direction] = sort.split("-");
    sortBy.field = field;
    sortBy.direction = direction;
  }

  return { filters, sortBy };
}

export default UserTableAndBtns;
