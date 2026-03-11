import CategoryTableOperations from "@/components/admin/categories/CategoryTableOperations";
import CategoryTableAndBtns from "@/components/admin/categories/CategoryTableAndBtns";

export const metadata = {
  title: "Categories",
};

export default async function Page({ searchParams }) {
  const filterParams = await searchParams;

  return (
    <>
      <header className="flex flex-col items-center justify-between lg:flex-row">
        <h1 className="text-3xl font-semibold">All Categories</h1>
        <CategoryTableOperations />
      </header>
      <CategoryTableAndBtns searchParams={filterParams} />
    </>
  );
}
