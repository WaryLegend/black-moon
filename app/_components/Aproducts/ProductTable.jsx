"use client";

import Table from "@/app/_components/Table";
import Menus from "@/app/_components/Menus";
import ProductRow from "./ProductRow";
import Pagination from "@/app/_components/Pagination";

function ProductTable({ products, total }) {
  return (
    <Menus>
      <Table columns="0.8fr 2.2fr 1.4fr 1.4fr 1fr">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Price</div>
          <div>Category</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={products}
          render={(product) => (
            <ProductRow product={product} key={product.id} />
          )}
        />
        <Table.Footer>
          <Pagination count={total} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ProductTable;
