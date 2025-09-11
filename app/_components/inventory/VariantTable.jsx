"use client";

import Table from "@/app/_components/Table";
import img from "@/public/bg-men.jpg";
import Menus from "@/app/_components/Menus";
import VariantRow from "./VariantRow";

const fakedata = [
  {
    id: 1,
    name: "Áo sơ mi",
    basePrice: 180000,
    colors: [
      {
        id: 101,
        color: "white",
        image: img.src,
        sizes: [
          { size: "S", quantity: 15, differentPrice: 0 },
          { size: "M", quantity: 12, differentPrice: 0 },
          { size: "L", quantity: 30, differentPrice: 20000 },
        ],
      },
      {
        id: 102,
        color: "blue",
        image: img.src,
        sizes: [
          { size: "S", quantity: 25, differentPrice: 0 },
          { size: "M", quantity: 10, differentPrice: 0 },
          { size: "L", quantity: 6, differentPrice: 20000 },
        ],
      },
      {
        id: 103,
        color: "black",
        image: img.src,
        sizes: [
          { size: "S", quantity: 9, differentPrice: 0 },
          { size: "M", quantity: 7, differentPrice: 0 },
          { size: "L", quantity: 20, differentPrice: 20000 },
        ],
      },
    ],
  },
];

function flattenProducts(products) {
  return products.flatMap((variant) =>
    variant.colors.flatMap((color) =>
      color.sizes.map((size) => ({
        productId: variant.id,
        name: variant.name,
        color: color.color,
        size: size.size,
        quantity: size.quantity,
        price: variant.basePrice + size.differentPrice,
        image: color.image,
      })),
    ),
  );
}

function VariantTable() {
  const flatVariants = flattenProducts(fakedata);

  return (
    <Menus>
      <Table columns="0.8fr 1.5fr 0.8fr 0.5fr 1fr 1.2fr 1fr">
        <Table.Header>
          <th></th>
          <th>Name</th>
          <th>Color</th>
          <th>Size</th>
          <th>Quantity</th>
          <th>Price</th>
          <th></th>
        </Table.Header>
        <Table.Body
          data={flatVariants}
          render={(variant) => (
            <VariantRow
              variant={variant}
              key={`${variant.productId}-${variant.color}-${variant.size}`}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default VariantTable;

// variant( kho): Chọn sản phẩm, color, size, quantity, differentPrice, images

// (BLACK, WHITE, BLUE, GREEN, BROWN, PINK, ORANGE);

// (XS, S, M, L, XL, XXL, XXXL);
