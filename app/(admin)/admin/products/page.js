import ProductTableAndBtns from "@/components/admin/products/ProductTableAndBtns";
import ProductTableOperations from "@/components/admin/products/ProductTableOperations";
import SortBy from "@/components/filters/SortBy";

export const metadata = {
  title: "Products",
};

export default async function Page({ searchParams }) {
  const filterParams = await searchParams;

  return (
    <>
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">All products</h1>
          <SortBy
            options={[
              { value: "createdAt-desc", label: "Date (recent first)" },
              { value: "createdAt-asc", label: "Date (earlier first)" },
              { value: "name-asc", label: "Name (A-Z)" },
              { value: "name-desc", label: "Name (Z-A)" },
              { value: "category-asc", label: "Category (A-Z)" },
              { value: "category-desc", label: "Category (Z-A)" },
              { value: "basePrice-asc", label: "Price (lowest first)" },
              { value: "basePrice-desc", label: "Price (highest first)" },
            ]}
          />
        </div>

        <ProductTableOperations />
      </header>
      <ProductTableAndBtns searchParams={filterParams} />
    </>
  );
}
