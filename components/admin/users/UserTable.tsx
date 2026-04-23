"use client";

import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import type { UserSummary } from "@/types/users";

import UserRow from "./UserRow";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";

type UserTableProps = {
  users: UserSummary[];
  total: number;
};

function UserTable({ users, total }: UserTableProps) {
  const { data: currentAccount } = useCurrentAccount();

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
        <Pagination count={total} />
      </Table.Footer>
    </Table>
  );
}

export default UserTable;
