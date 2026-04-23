import CategoryTableOperations from "@/components/admin/categories/CategoryTableOperations";
import CategoryTableAndBtns from "@/components/admin/categories/CategoryTableAndBtns";
import { AppPageProps } from "@/types/page-props";
import type { CategoriesPageSearchParams } from "@/types/categories";

export const metadata = {
  title: "Categories",
};

export default async function CategoriesPage({
  searchParams,
}: AppPageProps<{}, CategoriesPageSearchParams>) {
  const query = await searchParams;

  return (
    <>
      <header className="flex flex-col items-center justify-between gap-3 sm:items-start">
        <h1 className="text-3xl font-semibold">All Categories</h1>
        <CategoryTableOperations />
      </header>
      <CategoryTableAndBtns searchParams={query} />
    </>
  );
}
