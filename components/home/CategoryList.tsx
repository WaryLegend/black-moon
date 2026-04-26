import type { ReactNode } from "react";
import CategoryItem from "./CategoryItem";
import { getPublicCategoriesByGroupSlug } from "@/services/homepage.api";

type CategoryListProps = {
  groupSlug: string;
  children?: ReactNode;
};

export default async function CategoryList({
  groupSlug,
  children,
}: CategoryListProps) {
  const categories = await getPublicCategoriesByGroupSlug(groupSlug);

  if (!categories.length) {
    return (
      <div className="border-primary-300 border-b-1">
        <p className="text-center">Chưa có danh mục nào...</p>
      </div>
    );
  }

  return (
    <ul className="border-primary-300 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 border-b-1 pb-5 uppercase sm:px-10 lg:px-20">
      {categories.map((cat) => (
        <CategoryItem key={cat.id} category={cat} />
      ))}

      {children}
    </ul>
  );
}
