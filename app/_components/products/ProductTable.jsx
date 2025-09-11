"use client";

import Table from "@/app/_components/Table";
import img from "@/public/bg-men.jpg";
import Menus from "@/app/_components/Menus";
import ProductRow from "./ProductRow";

const fakedata = [
  {
    id: 1,
    name: "Áo sơ mi",
    description: "Form slimfit, vải cotton thoáng mát",
    basePrice: 180000,
    category: "Shirt",
    image: img.src,
  },
  {
    id: 2,
    name: "Quần tây",
    description: "Chất liệu vải dày dặn, sang trọng",
    basePrice: 250000,
    category: "Pants",
    image: img.src,
  },
  {
    id: 3,
    name: "Áo polo",
    description: "Kiểu dáng trẻ trung, dễ phối đồ",
    basePrice: 160000,
    category: "T-shirt",
    image: img.src,
  },
  {
    id: 4,
    name: "Quần short kaki",
    description: "Phong cách năng động, thoải mái",
    basePrice: 140000,
    category: "Shorts",
    image: img.src,
  },
  {
    id: 5,
    name: "Áo hoodie",
    description: "Chất nỉ mềm mại, giữ ấm tốt",
    basePrice: 220000,
    category: "Hoodie",
    image: img.src,
  },
];

function ProductTable() {
  return (
    <Menus>
      <Table columns="0.8fr 2.2fr 1.4fr 1.4fr 1fr">
        <Table.Header>
          <th></th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th></th>
        </Table.Header>
        <Table.Body
          data={fakedata}
          render={(product) => (
            <ProductRow product={product} key={product.id} />
          )}
        />
        <Table.Footer>{/* <Pagination count={count} /> */}</Table.Footer>
      </Table>
    </Menus>
  );
}

export default ProductTable;
