import { Suspense } from "react";
import { notFound } from "next/navigation";

import StickyFilterWrapper from "@/common/layout/StickyFilterWrapper";
import BreadCrumbNav from "@/common/navigation/BreadCrumbNav";
import ProductFilter from "@/components/store/products_list/ProductFilter";
import ProductSection from "@/components/store/products_list/ProductSection";
import Spinner from "@/components/ui/Spinner";
import { getCategoryBySlug } from "@/services/store.api";
import type { AppPageProps } from "@/types/page-props";
import type { StoreCategoryPageSearchParams } from "@/types/storepage";

export async function generateMetadata({
  params,
}: AppPageProps<{ group: string; category: string }>) {
  const { category: categorySlug } = await params;
  const { category } = await getCategoryBySlug(categorySlug);

  return {
    title: category?.name ?? "Not Found",
  };
}

export default async function CategoryDetailPage({
  params,
  searchParams,
}: AppPageProps<
  { group: string; category: string },
  StoreCategoryPageSearchParams
>) {
  const { group: groupSlug, category: categorySlug } = await params;
  const { category } = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const query = await searchParams;
  const groupName = category.targetGroup?.name ?? groupSlug;

  return (
    <div className="flex flex-col gap-1 md:gap-4">
      <BreadCrumbNav
        paths={{
          group: { slug: groupSlug, name: groupName },
          category: { slug: category.slug, name: category.name },
        }}
      />

      <StickyFilterWrapper>
        <ProductFilter />
      </StickyFilterWrapper>

      <Suspense
        fallback={
          <Spinner
            color="var(--color-accent-600)"
            className="my-0.5 self-center"
          />
        }
      >
        <ProductSection category={category} searchParams={query} />
      </Suspense>
    </div>
  );
}
