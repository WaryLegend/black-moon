"use client";

import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import Pagination from "@/components/ui/Pagination";
import UserRow from "./UserRow";

function UserTable({ users, total }) {
  return (
    <Menus>
      <Table columns="0.5fr 2fr 1.8fr 2.2fr 1.2fr 0.8fr 1.2fr 1fr">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Username</div>
          <div>Email address</div>
          <div>Mobile</div>
          <div>Status</div>
          <div>Created</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => <UserRow user={user} key={user.id} />}
        />
        <Table.Footer>
          <Pagination count={total} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default UserTable;
