"use client";

import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import type { UsersListMeta, UserSummary } from "@/types/users";

import UserRow from "./UserRow";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";

type UserTableProps = {
  users: UserSummary[];
  meta?: UsersListMeta;
};

function UserTable({ users, meta }: UserTableProps) {
  const { data: currentAccount } = useCurrentAccount();
  const { pageSize, totalItems: total } = meta ?? {};

  return (
    <Table columns="0.5fr 1.2fr 1fr 1fr 1.8fr 1.2fr 0.8fr 1.2fr 1fr">
      <Table.Header>
        <div></div>
        <div>FirstName</div>
        <div>Lastname</div>
        <div>Role</div>
        <div>Email</div>
        <div>Mobile</div>
        <div>Activated</div>
        <div>Created</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={users}
        render={(user) => (
          <UserRow
            user={user}
            isMe={user.id === currentAccount?.id}
            key={user.id}
          />
        )}
      />
      <Table.Footer>
        <Pagination total={total ?? 0} pageSize={pageSize} />
      </Table.Footer>
    </Table>
  );
}

export default UserTable;
