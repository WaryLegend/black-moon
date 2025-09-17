import { IoIosArrowBack } from "react-icons/io";
import { notFound } from "next/navigation";
import { capitalizeFirst } from "@/app/_utils/helpers";
import { GROUPS } from "@/app/_utils/constants";
import StickyFilterWrapper from "@/app/_components/StickyFilterWrapper";
import ProductFilter from "@/app/_components/ProductFilter";
import SortBy from "@/app/_components/SortBy";
import Link from "next/link";
import ProductSection from "@/app/_components/ProductSection";

const variants = [
  "ĐỒ MẶC NGOÀI",
  "QUẦN",
  "HEATTECH",
  "ĐỒ BẦU",
  "ÁO THUN, ÁO NI & ÁO GIẢ LÔNG CỪU",
  "AIRism",
  "Đồ mặc nhà",
];

async function Page({ params }) {
  const { group, categoryId } = await params;

  if (!Object.keys(GROUPS).includes(group)) {
    notFound();
  }

  const { label, href } = GROUPS[group];

  return (
    <>
      <div className="flex flex-col gap-1 pb-10 md:gap-4">
        <div className="flex flex-wrap items-center justify-between">
          <h1 className="inline-flex text-2xl font-semibold lg:text-3xl">
            <Link
              href={href}
              className="hover:text-accent-700 flex gap-1 hover:underline"
            >
              <IoIosArrowBack />
              {capitalizeFirst(label)}
            </Link>
            /{categoryId} Áo khoác da
          </h1>
          <SortBy
            label="Sắp xếp theo"
            className="ml-auto"
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
        <StickyFilterWrapper>
          <ProductFilter />
        </StickyFilterWrapper>

        {/* list of productSection need map()*/}
        <ProductSection variants={variants} />
        <ProductSection variants={variants} />
      </div>
    </>
  );
}

export default Page;
