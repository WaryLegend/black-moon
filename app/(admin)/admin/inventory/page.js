import AddVariant from "@/app/_components/inventory/AddVariant";
import VariantTable from "@/app/_components/inventory/VariantTable";
import VariantTableOperations from "@/app/_components/inventory/VariantTableOperations";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

export const metadata = {
  title: "Inventory",
};

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">All product variants</h1>
        <VariantTableOperations />
      </div>
      <div className="flex flex-col gap-4">
        <Suspense callback={<Spinner color="var(--color-accent-800)" />}>
          <VariantTable />
          <AddVariant />
        </Suspense>
      </div>
    </>
  );
}
