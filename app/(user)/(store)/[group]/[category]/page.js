import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/data-service";
import StickyFilterWrapper from "@/common/layout/StickyFilterWrapper";
import ProductFilter from "@/components/store/products_list/ProductFilter";
import ProductSection from "@/components/store/products_list/ProductSection";
import BreadCrumbNav from "@/common/navigation/BreadCrumbNav";
import Spinner from "@/components/ui/Spinner";

export async function generateMetadata({ params }) {
  const Params = await params;
  const { categoryId } = Params;
  const { category } = await getCategoryById(categoryId);

  return {
    title: category?.name ?? "Not Found",
  };
}

export default async function Page({ params, searchParams }) {
  const Params = await params;
  const { group, categoryId } = Params;
  const { category } = await getCategoryById(categoryId);
  if (!category) notFound();

  const filterParams = await searchParams;

  return (
    <div className="flex flex-col gap-1 md:gap-4">
      {/* sub-header, title, navigation */}
      <BreadCrumbNav paths={{ group, category: category.name }} />
      {/* filters */}
      <StickyFilterWrapper>
        <ProductFilter />
      </StickyFilterWrapper>

      {/* products section */}
      <Suspense
        fallback={
          <Spinner
            color="var(--color-accent-600)"
            className="my-0.5 self-center"
          />
        }
      >
        <ProductSection category={category} searchParams={filterParams} />
      </Suspense>
    </div>
  );
}
