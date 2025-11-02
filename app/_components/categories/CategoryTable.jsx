"use client";

import Table from "@/app/_components/Table";
import Menus from "@/app/_components/Menus";
import CategoryRow from "./CagetoryRow";
import Pagination from "@/app/_components/Pagination";

function CategoryTable({ categories, total }) {
  return (
    <Menus>
      <Table columns="0.8fr 2.2fr 1.8fr 1fr">
        <Table.Header>
          <th></th>
          <th>Name</th>
          <th>Group</th>
          <th></th>
        </Table.Header>
        <Table.Body
          data={categories}
          render={(category) => (
            <CategoryRow category={category} key={category.id} />
          )}
        />
        <Table.Footer>
          <Pagination count={total} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CategoryTable;
