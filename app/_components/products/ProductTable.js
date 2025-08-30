"use client";

import Table from "@/app/_components/Table";
import img from "@/public/bg-men.jpg";
import Menus from "@/app/_components/Menus";
import ProductRow from "./ProductRow";

const fakedata = [
  {
    id: 1,
    name: "Áo sơ",
    description: "Form slimfit, vải cotton thoáng mát",
    price: 180000,
    category: "Shirt",
    image: img.src,
  },
  {
    id: 2,
    name: "Quần tây",
    description: "Chất liệu vải dày dặn, sang trọng",
    price: 250000,
    category: "Pants",
    image: img.src,
  },
  {
    id: 3,
    name: "Áo polo",
    description: "Kiểu dáng trẻ trung, dễ phối đồ",
    price: 160000,
    category: "T-shirt",
    image: img.src,
  },
  {
    id: 4,
    name: "Quần short kaki",
    description: "Phong cách năng động, thoải mái",
    price: 140000,
    category: "Shorts",
    image: img.src,
  },
  {
    id: 5,
    name: "Áo hoodie",
    description: "Chất nỉ mềm mại, giữ ấm tốt",
    price: 220000,
    category: "Hoodie",
    image: img.src,
  },
];

function ProductTable() {
  return (
    <Menus>
      <Table columns="0.8fr 2.2fr 1.8fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Tên sản phẩm</div>
          <div>Giá bán</div>
          <div>Thể loại</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={fakedata}
          render={(product) => (
            <ProductRow product={product} key={product.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default ProductTable;

// form nhập product:  name, description, , price, category , images
// prodyuct variant( kho): Chọn sản phẩm, color, size, quantity, differentPrice, imgaes
