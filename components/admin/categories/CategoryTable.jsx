"use client";

import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import CategoryRow from "./CagetoryRow";
import Pagination from "@/components/ui/Pagination";

function CategoryTable({ categories, total }) {
  return (
    <Menus>
      <Table columns="0.8fr 2.2fr 1.8fr 1fr">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Group</div>
          <div></div>
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
