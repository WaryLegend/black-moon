"use client";

import Table from "@/app/_components/Table";
import Menus from "@/app/_components/Menus";
import VariantRow from "./VariantRow";
import Pagination from "@/app/_components/Pagination";

function VariantTable({ variants, total }) {
  return (
    <Menus>
      <Table columns="0.8fr 1.5fr 0.8fr 0.5fr 1fr 1.2fr 1fr">
        <Table.Header>
          <th></th>
          <th>Name</th>
          <th>Color</th>
          <th>Size</th>
          <th>Price</th>
          <th>Stock</th>
          <th></th>
        </Table.Header>
        <Table.Body
          data={variants}
          render={(vari) => (
            <VariantRow
              variant={vari}
              key={`${vari.productId}-${vari.color}-${vari.size}`}
            />
          )}
        />
        <Table.Footer>
          <Pagination count={total} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default VariantTable;
