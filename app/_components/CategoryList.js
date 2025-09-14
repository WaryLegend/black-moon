import Link from "next/link";
import CategoryItem from "./CategoryItem";

function CategoryList({ categories = [], group, children }) {
  if (!categories.length)
    return <p className="text-center">Không có dữ liệu để hiển thị...</p>;

  return (
    <ul className="border-accent-300 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 border-b-1 pb-5 uppercase sm:px-10 lg:px-20">
      {categories.map((cat) => (
        <CategoryItem key={cat.id} category={cat} group={group} />
      ))}

      {/* aditional li if has*/}
      {children}

      {/* fixed list-options */}
      <li key="limited">
        <Link
          href={`/${group}/limited`}
          className="hover:bg-primary-200 flex cursor-pointer items-center gap-2 p-2 transition-all hover:shadow"
        >
          <div className="bg-primary-100 flex h-10 w-10 flex-col items-center justify-center border-2 text-[8px] font-semibold text-red-600">
            <span>LIMITED</span>
          </div>
          <span className="text-accent-800 flex-1 text-sm">
            KHUYẾN MÃI CÓ HẠN
          </span>
        </Link>
      </li>
      <li key="new">
        <Link
          href={`${group}/new`}
          className="hover:bg-primary-200 flex cursor-pointer items-center gap-2 p-2 transition-all hover:shadow"
        >
          <div className="bg-primary-100 flex h-10 w-10 items-center justify-center border-2 text-xs font-semibold">
            NEW
          </div>
          <span className="text-accent-800 flex-1 text-sm">HÀNG MỚI VỀ</span>
        </Link>
      </li>
    </ul>
  );
}

export default CategoryList;
