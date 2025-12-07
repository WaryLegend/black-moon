import { Suspense } from "react";
import CategoryTableOperations from "@/app/_components/Acategories/CategoryTableOperations";
import Spinner from "@/app/_components/Spinner";
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
      <div className="flex flex-col gap-4">
        <Suspense
          fallback={
            <Spinner
              color="var(--color-accent-600)"
              className="my-0.5 self-center"
            />
          }
        >
          <CategoryTableAndBtns searchParams={filterParams} />
        </Suspense>
      </div>
    </>
  );
}
