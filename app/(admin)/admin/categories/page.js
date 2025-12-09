import CategoryTableOperations from "@/app/_components/Acategories/CategoryTableOperations";
import CategoryTableAndBtns from "@/app/_components/Acategories/CategoryTableAndBtns";

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
