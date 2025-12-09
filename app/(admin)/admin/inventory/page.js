import VariantTableAndBtns from "@/app/_components/Ainventory/VariantTableAndBtns";
import VariantTableOperations from "@/app/_components/Ainventory/VariantTableOperations";
import SortBy from "@/app/_components/SortBy";
import { ColorsAndSizesProvider } from "@/app/_context/ColorsAndSizesContext";
import { getColors, getSizes } from "@/app/_lib/apiSettings";

export const metadata = {
  title: "Inventory",
};

export default async function Page({ searchParams }) {
  const [filterParams, colors, sizes] = await Promise.all([
    searchParams,
    getColors(),
    getSizes(),
  ]);

  return (
    <ColorsAndSizesProvider value={{ colors, sizes }}>
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">All product variants</h1>
          <SortBy
            options={[
              { value: "createdAt-desc", label: "Date (recent first)" },
              { value: "createdAt-asc", label: "Date (earlier first)" },
              { value: "name-asc", label: "Name (A-Z)" },
              { value: "name-desc", label: "Name (Z-A)" },
              { value: "stock-asc", label: "Stock (lowest first)" },
              { value: "stock-desc", label: "Stock (highest first)" },
              { value: "variantPrice-asc", label: "Price (lowest first)" },
              { value: "variantPrice-desc", label: "Price (highest first)" },
            ]}
          />
        </div>

        <VariantTableOperations />
      </header>

      <VariantTableAndBtns searchParams={filterParams} />
    </ColorsAndSizesProvider>
  );
}
