"use client";

import Table from "@/app/_components/Table";
import img from "@/public/bg-men.jpg";
import Menus from "@/app/_components/Menus";
import CategoryRow from "./CagetoryRow";

const fakedata = [
  {
    id: 1,
    name: "Đồ mặc ngoài",
    group: "women",
    image: img.src,
  },
  {
    id: 2,
    name: "Chân váy và đầm",
    group: "women",
    image: img.src,
  },
  {
    id: 3,
    name: "Đồ mặc ngoài",
    group: "men",
    image: img.src,
  },
  {
    id: 4,
    name: "Quần",
    group: "kids",
    image: img.src,
  },
  {
    id: 5,
    name: "Đồ mặc nhà",
    group: "kids",
    image: img.src,
  },
];

function CategoryTable() {
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
          data={fakedata}
          render={(category) => (
            <CategoryRow category={category} key={category.id} />
          )}
        />
        <Table.Footer>{/* <Pagination count={count} /> */}</Table.Footer>
      </Table>
    </Menus>
  );
}

export default CategoryTable;
