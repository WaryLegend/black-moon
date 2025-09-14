import { IoIosArrowBack } from "react-icons/io";
import { notFound } from "next/navigation";
import { capitalizeFirst } from "@/app/_utils/helpers";
import { GROUPS } from "@/app/_utils/constants";
import ProductFilter from "@/app/_components/ProductFilter";
import SortBy from "@/app/_components/SortBy";
import Link from "next/link";

async function Page({ params }) {
  const { group, categoryId } = await params;

  if (!Object.keys(GROUPS).includes(group)) {
    notFound();
  }

  const { label, href } = GROUPS[group];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="inline-flex text-3xl font-semibold">
          <Link
            href={href}
            className="hover:text-accent-700 flex gap-1 hover:underline"
          >
            <IoIosArrowBack />
            {capitalizeFirst(label)}
          </Link>
          /{categoryId}
        </h1>
        <SortBy
          label="Sắp xếp theo"
          options={[
            { value: "createdDate-desc", label: "Ngày (gần đây)" },
            { value: "createdDate-asc", label: "Ngày (trước đây)" },
            { value: "name-asc", label: "Tên sản phẩm (A-Z)" },
            { value: "name-desc", label: "Tên sản phẩm (Z-A)" },
            { value: "price-asc", label: "Giá bán (thấp → cao)" },
            { value: "price-desc", label: "Giá bán (cao → thấp)" },
          ]}
        />
      </div>
      <ProductFilter />
    </div>
  );
}

export default Page;
