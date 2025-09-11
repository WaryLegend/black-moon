import AddCategory from "@/app/_components/categories/AddCategory";
import CategoryTable from "@/app/_components/categories/CategoryTable";
import CategoryTableOperations from "@/app/_components/categories/CategoryTableOperations";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

export const metadata = {
  title: "Categories",
};

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">All Categories</h1>
        <CategoryTableOperations />
      </div>
      <div className="flex flex-col gap-4">
        <Suspense callback={<Spinner color="var(--color-accent-800)" />}>
          <CategoryTable />
          <AddCategory />
        </Suspense>
      </div>
    </>
  );
}
