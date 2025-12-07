import UserTableAndBtns from "@/app/_components/Ausers/UserTableAndBtns";
import UserTableOperations from "@/app/_components/Ausers/UserTableOperations";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

export const metadata = {
  title: "Users",
};

export default async function Page({ searchParams }) {
  const filterParams = await searchParams;
  return (
    <>
      <header className="flex flex-col items-center justify-between lg:flex-row">
        <h1 className="text-3xl font-semibold">All Users</h1>
        <UserTableOperations />
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
          <UserTableAndBtns searchParams={filterParams} />
        </Suspense>
      </div>
    </>
  );
}
