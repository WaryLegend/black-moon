"use client";

import Table from "@/app/_components/Table";
import Menus from "@/app/_components/Menus";
import VariantRow from "./VariantRow";
import Pagination from "@/app/_components/Pagination";

function VariantTable({ variants, total }) {
  return (
    <Menus>
      <Table columns="0.8fr 1.5fr 0.8fr 0.5fr 1.2fr 1fr 0.8fr">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Color</div>
          <div>Size</div>
          <div>Price</div>
          <div>Stock</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={variants}
          render={(vari) => <VariantRow variant={vari} key={`${vari.sku}`} />}
        />
        <Table.Footer>
          <Pagination count={total} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default VariantTable;
