import StickyFilterWrapper from "@/app/_components/StickyFilterWrapper";
import ProductFilter from "@/app/_components/ProductFilter";
import ProductSection from "@/app/_components/ProductSection";
import BreadCrumbNav from "@/app/_components/BreadCrumbNav";
import { getCategoryById } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";

export async function generateMetadata({ params }) {
  const Params = await params;
  const { categoryId } = Params;
  const { category } = await getCategoryById(categoryId);

  return {
    title: `${category?.name}` ?? "Not Found",
  };
}

export default async function Page({ params }) {
  const Params = await params;
  const { group, categoryId } = Params;
  const { category } = await getCategoryById(categoryId);
  if (!category) notFound();

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
        <ProductSection categoryId={categoryId} />
      </Suspense>
    </div>
  );
}
