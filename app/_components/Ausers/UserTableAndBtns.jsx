// import AddUser from "./AddUser";
import { getUsers } from "@/app/_lib/data-service";
import UserTable from "./UserTable";

async function UserTableAndBtns({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const { filters, sortBy } = parseQueryParams(searchParams);

  const { data: users, total } = await getUsers({
    page,
    filters,
    sortBy,
  });

  return (
    <>
      <UserTable users={users} total={total} />
      {/* <AddUser /> */}
    </>
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
  const sort = searchParams.sortBy;
  if (sort) {
    const [field, direction] = sort.split("-");
    sortBy.field = field;
    sortBy.direction = direction;
  }

  return { filters, sortBy };
}

export default UserTableAndBtns;
