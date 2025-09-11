import AddVariant from "@/app/_components/inventory/AddVariant";
import VariantTable from "@/app/_components/inventory/VariantTable";
import VariantTableOperations from "@/app/_components/inventory/VariantTableOperations";
import SortBy from "@/app/_components/SortBy";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

export const metadata = {
  title: "Inventory",
};

export default function Page() {
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">All product variants</h1>
          <SortBy
            options={[
              { value: "createdDate-desc", label: "Date (recent first)" },
              { value: "createdDate-asc", label: "Date (earlier first)" },
              { value: "name-asc", label: "Name (A-Z)" },
              { value: "name-desc", label: "Name (Z-A)" },
              { value: "quantity-asc", label: "quantity (highest first)" },
              { value: "quantity-desc", label: "quantity (lowest first)" },
              { value: "price-asc", label: "Price (highest first)" },
              { value: "price-desc", label: "Price (lowest first)" },
            ]}
          />
        </div>

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
