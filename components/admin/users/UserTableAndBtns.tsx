"use client";

import { useUsers } from "./useUsers";
import Spinner from "@/components/ui/Spinner";
import UserTable from "./UserTable";
import AddUser from "./AddUser";
import {
  normalizeSortField,
  parseListSearchParams,
  parsePageParam,
} from "@/utils/searchParams";
import type {
  ListUsersFilters,
  ListUsersSort,
  ListUsersSortField,
  UsersPageSearchParams,
} from "@/types/users";

type UserTableAndBtnsProps = {
  searchParams: UsersPageSearchParams;
};

const SORT_FIELDS: ListUsersSortField[] = [
  "createdAt",
  "firstName",
  "lastName",
];

function UserTableAndBtns({ searchParams }: UserTableAndBtnsProps) {
  const page = parsePageParam(searchParams.page);
  const { filters, sortBy } = extractListParams(searchParams);

  const { isPending, users, total } = useUsers({
    page,
    filters,
    sortBy,
  });

  if (isPending)
    return (
      <Spinner color="var(--color-accent-600)" className="my-10 self-center" />
    );

  return (
    <div className="flex flex-col gap-4">
      <UserTable users={users} total={total} />
      <AddUser />
    </div>
  );
}

function extractListParams(searchParams: UsersPageSearchParams): {
  filters: ListUsersFilters;
  sortBy: ListUsersSort;
} {
  const { filters, sortBy } = parseListSearchParams<ListUsersFilters>(
    searchParams,
    {
      filterConfig: {
        role: {
          emptyValues: ["all"],
          parse: (value) => value.toUpperCase(),
        },
        activated: {
          emptyValues: ["all"],
          parse: (value) => parseBoolean(value),
        },
      },
      defaultSort: "createdAt-desc",
    },
  );

  return {
    filters,
    sortBy: normalizeSort(sortBy),
  };
}

function parseBoolean(value: string): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

function normalizeSort(sortBy: {
  field: string;
  direction: "asc" | "desc";
}): ListUsersSort {
  const field = normalizeSortField(sortBy.field, SORT_FIELDS, "createdAt");

  return {
    field,
    direction: sortBy.direction,
  };
}

export default UserTableAndBtns;
