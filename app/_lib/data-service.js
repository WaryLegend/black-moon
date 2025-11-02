import testdata from "@/app/_data/testdata.JSON";
import { groupLabels } from "@/app/_utils/constants";
import { PAGE_SIZE } from "@/app/_utils/constants";

// Sorting logic
function sortData(data, field, direction = "asc", locale = "vi") {
  // Defensive – no sort requested → return
  if (!field) return [...data];

  return [...data].sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];
    // special handling per field (add more as needed) ----
    // === 1. NUMERIC FIELDS ===
    if (typeof aVal === "number" && typeof bVal === "number") {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }
    // === 2. DATE FIELDS ===
    else if (field === "createdDate") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    // === 3. STRING FIELDS (locale-aware) ===
    else {
      aVal = String(aVal);
      bVal = String(bVal);
      const collator = new Intl.Collator(locale, {
        sensitivity: "base",
        numeric: true,
      });
      return collator.compare(aVal, bVal) * (direction === "asc" ? 1 : -1);
    }
    // === 4. Final comparison ===
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

export async function getAllCategories() {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const categories = testdata.categories || [];
    // later change to this
    // const res = await fetch(`${process.env.API_URL}/categories`);
    // const categories = await res.json();
    return categories;
  } catch (err) {
    console.error("Error loading all categories:", err);
  }
}

// get all categories by filters, order by and page
export async function getCategories({ filters, page, sortBy }) {
  try {
    //1. Simulate network latency
    await new Promise((res) => setTimeout(res, 300));
    const categories = testdata.categories || [];
    //2.------------------- FILTERING -------------------
    let filteredData = categories;
    // group (single-select)
    if (filters.group && filters.group !== "all") {
      filteredData = filteredData.filter((c) => c.group === filters.group);
    }
    // 3. SORT
    if (sortBy.field) {
      filteredData = sortData(filteredData, sortBy.field, sortBy.direction);
    }
    // 3.------------------- PAGINATION -------------------
    const total = filteredData.length;
    const start = (page - 1) * PAGE_SIZE;
    const pageData = filteredData.slice(start, start + PAGE_SIZE);

    return { data: pageData, total };
  } catch (err) {
    console.error("Error loading categories:", err);
  }
}

export async function getAllProducts() {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const products = testdata.products || [];

    return products;
  } catch (err) {
    console.error("Error loading all products:", err);
  }
}

// get all Products by filters, order by and page
export async function getProducts({ filters, page, sortBy }) {
  try {
    // 1. Simulate network latency
    await new Promise((res) => setTimeout(res, 300));
    const { products, categories } = testdata;
    // 2. Join categories
    const enriched = products.map((prod) => {
      const category = categories.find((c) => c.id === prod.categoryId);
      const groupDisplay = groupLabels[category.group] ?? category.group;
      return {
        id: prod.id,
        name: prod.name,
        categoryId: prod.categoryId,
        category: `${category.name} - (${groupDisplay})`,
        group: category.group,
        description: prod.description ?? "",
        basePrice: prod.basePrice ?? 0,
        image: prod.images?.[0] ?? null,
      };
    });
    // 3. ------------------- FILTERING -------------------
    let filteredData = enriched;
    // group (single-select)
    if (filters.group && filters.group !== "all") {
      filteredData = filteredData.filter((p) => p.group === filters.group);
    }
    // --- category (multi-select)
    if (filters.category?.length) {
      filteredData = filteredData.filter((p) =>
        filters.category.includes(p.categoryId),
      );
    }
    // price range
    if (filters.basePrice && filters.basePrice !== "all") {
      const price = (p) => p.basePrice ?? 0;

      if (filters.basePrice.startsWith("under-")) {
        const max = Number(filters.basePrice.replace("under-", ""));
        filteredData = filteredData.filter((p) => price(p) < max);
      } else if (filters.basePrice.startsWith("above-")) {
        const min = Number(filters.basePrice.replace("above-", ""));
        filteredData = filteredData.filter((p) => price(p) > min);
      } else {
        const [minStr, maxStr] = filters.basePrice.split("-");
        const min = Number(minStr);
        const max = Number(maxStr);
        filteredData = filteredData.filter(
          (p) => price(p) >= min && price(p) <= max,
        );
      }
    }
    // 4. SORT
    if (sortBy.field) {
      filteredData = sortData(filteredData, sortBy.field, sortBy.direction);
    }
    // 5. ------------------- PAGINATION -------------------
    const total = filteredData.length;
    const start = (page - 1) * PAGE_SIZE;
    const pageData = filteredData.slice(start, start + PAGE_SIZE);

    return { data: pageData, total };
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

// get all product's Variants by filters, order by and page
export async function getVariants({ filters, page, sortBy }) {
  try {
    // 1. Simulate network latency
    await new Promise((res) => setTimeout(res, 300));
    const { products, variants } = testdata;
    // 2. Join with products
    const enriched = variants.map((vari) => {
      const product = products.find((c) => c.id === vari.productId);
      return {
        id: vari.id,
        name: product.name,
        productId: vari.productId,
        color: vari.color,
        size: vari.size,
        sku: vari.sku,
        variantPrice: vari.variantPrice ?? 0,
        stock: vari.stock,
        image: vari.image ?? null,
      };
    });
    // 3. ------------------- FILTERING -------------------
    let filteredData = enriched;
    // --- product name (multi-select)
    if (filters.productId?.length) {
      filteredData = filteredData.filter((p) =>
        filters.productId.includes(p.productId),
      );
    }
    // --- color (multi-select)
    if (filters.color?.length) {
      filteredData = filteredData.filter((p) =>
        filters.color.includes(p.color),
      );
    }
    // --- size (multi-select)
    if (filters.size?.length) {
      filteredData = filteredData.filter((p) => filters.size.includes(p.size));
    }
    // price range
    if (filters.variantPrice && filters.variantPrice !== "all") {
      const price = (p) => p.variantPrice ?? 0;

      if (filters.variantPrice.startsWith("under-")) {
        const max = Number(filters.variantPrice.replace("under-", ""));
        filteredData = filteredData.filter((p) => price(p) < max);
      } else if (filters.variantPrice.startsWith("above-")) {
        const min = Number(filters.variantPrice.replace("above-", ""));
        filteredData = filteredData.filter((p) => price(p) > min);
      } else {
        const [minStr, maxStr] = filters.variantPrice.split("-");
        const min = Number(minStr);
        const max = Number(maxStr);
        filteredData = filteredData.filter(
          (p) => price(p) >= min && price(p) <= max,
        );
      }
    }
    // 4. SORT
    if (sortBy.field) {
      filteredData = sortData(filteredData, sortBy.field, sortBy.direction);
    }
    // 5. ------------------- PAGINATION -------------------
    const total = filteredData.length;
    const start = (page - 1) * PAGE_SIZE;
    const pageData = filteredData.slice(start, start + PAGE_SIZE);

    return { data: pageData, total };
  } catch (err) {
    console.error("Error loading variants:", err);
  }
}

// unique service for searching product base on name
export async function searchProducts(query = "") {
  const all = await getAllProducts();

  const result = query
    ? all
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 100) // cap results 100
    : all;

  return result.map((p) => ({ label: p.name, value: p.id }));
}
