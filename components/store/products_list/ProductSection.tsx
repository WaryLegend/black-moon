import NoProductsFound from "./NoProductsFound";
import ProductList from "./ProductList";
import type { CategorySummary } from "@/types/categories";
import type { ProductSort, ProductSortField } from "@/types/products";
import {
  normalizeSortField,
  parseListSearchParams,
  parsePageParam,
} from "@/utils/searchParams";
import { getPublicProducts } from "@/services/store.api";
import {
  ListPublicProductsFilters,
  PriceRange,
  StoreCategoryPageSearchParams,
} from "@/types/storepage";

const SORT_FIELDS: ProductSortField[] = ["createdAt", "name", "price"];

function parsePriceRangeValue(value: string): PriceRange | undefined {
  const normalized = value.trim();
  if (!normalized || normalized === "all") return undefined;

  if (normalized.startsWith("under-")) {
    const maxPrice = Number(normalized.replace("under-", ""));
    return Number.isFinite(maxPrice) ? { maxPrice } : undefined;
  }

  if (normalized.startsWith("above-")) {
    const minPrice = Number(normalized.replace("above-", ""));
    return Number.isFinite(minPrice) ? { minPrice } : undefined;
  }

  const [minRaw, maxRaw] = normalized.split("-");
  const minPrice = Number(minRaw);
  const maxPrice = Number(maxRaw);

  if (Number.isFinite(minPrice) && Number.isFinite(maxPrice)) {
    return { minPrice, maxPrice };
  }

  return undefined;
}

function parseQueryParams(searchParams: StoreCategoryPageSearchParams): {
  filters: ListPublicProductsFilters;
  sortBy: ProductSort;
} {
  const { filters, sortBy } = parseListSearchParams<ListPublicProductsFilters>(
    searchParams,
    {
      filterConfig: {
        colors: {
          allowMulti: true,
          splitCommaValues: true,
          parseItem: (value) => {
            const normalized = value.trim().toUpperCase();
            return normalized ? normalized : undefined;
          },
        },
        sizes: {
          allowMulti: true,
          splitCommaValues: true,
          parseItem: (value) => {
            const normalized = value.trim().toUpperCase();
            return normalized ? normalized : undefined;
          },
        },
        priceRange: {
          parse: (value) => parsePriceRangeValue(value),
        },
      },
      defaultSort: "createdAt-desc",
    },
  );

  const field = normalizeSortField(sortBy.field, SORT_FIELDS, "createdAt");

  return {
    filters,
    sortBy: {
      field,
      direction: sortBy.direction,
    },
  };
}

function hasActiveFilters(filters: ListPublicProductsFilters): boolean {
  if (filters.colors?.length) return true;
  if (filters.sizes?.length) return true;
  if (filters.priceRange?.minPrice !== undefined) return true;
  if (filters.priceRange?.maxPrice !== undefined) return true;
  return false;
}

type ProductSectionProps = {
  category: CategorySummary;
  searchParams: StoreCategoryPageSearchParams;
};

async function ProductSection({ category, searchParams }: ProductSectionProps) {
  const page = parsePageParam(searchParams.page);
  const { filters, sortBy } = parseQueryParams(searchParams);

  const data = await getPublicProducts({
    page,
    filters: {
      ...filters,
      categories: [category.slug],
    },
    sortBy,
  });

  const products = data?.items ?? [];
  const totalItems = data?.meta?.totalItems ?? 0;

  if (!products.length) {
    return <NoProductsFound hasActiveFilters={hasActiveFilters(filters)} />;
  }

  return (
    <section className="grid">
      <div className="flex flex-wrap items-center justify-between pb-3">
        <h1>{totalItems} Sản phẩm</h1>
      </div>
      <ProductList products={products} category={category} />
    </section>
  );
}

export default ProductSection;
