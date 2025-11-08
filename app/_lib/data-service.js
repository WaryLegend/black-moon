import testdata from "@/app/_data/testdata.JSON";
import { groupLabels, PAGE_SIZE } from "@/app/_utils/constants";
import { sortData } from "@/app/_utils/helpers";

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

export async function getCategoryById(id) {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const categories = testdata.categories || [];

    const category = categories.find((c) => c.id === id);
    if (!category) {
      return [];
    }

    return { category };
  } catch (err) {
    console.error("Error loading category:", err);
  }
}

export async function getCategoryByGroup(group) {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const categories = testdata.categories || [];

    const result = categories.filter((c) => c.group === group);
    if (!result) {
      return [];
    }

    return { categories: result };
  } catch (err) {
    console.error("Error loading categories by group:", err);
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

export async function getProductById(id) {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const products = testdata.products || [];

    const product = products.find((p) => p.id === id);
    if (!product) {
      return [];
    }

    return { product };
  } catch (err) {
    console.error("Error loading product:", err);
  }
}

export async function getProductsByCategory(categoryId) {
  try {
    // 1. Simulate network latency
    await new Promise((res) => setTimeout(res, 300));
    const { products } = testdata;

    // 2. Enrich every product that matches the categoryId
    const enriched = products
      .filter((prod) => prod.categoryId === categoryId)
      .map((prod) => {
        return {
          id: prod.id,
          name: prod.name,
          categoryId: prod.categoryId,
          colors: prod.colors,
          sizes: prod.sizes,
          basePrice: prod.basePrice ?? 0,
          image: prod.images?.[0] ?? null,
          reviews: prod.reviews,
        };
      });

    return { products: enriched };
  } catch (err) {
    console.error("Error loading product:", err);
  }
}

// get all product's variants by filters, order by and page
export async function getVariants({ filters, page, sortBy }) {
  try {
    // 1. Simulate network latency
    await new Promise((res) => setTimeout(res, 300));
    const { products, variants, colors, sizes } = testdata;
    // 2. Join with products
    const enriched = variants.map((vari) => {
      const product = products.find((c) => c.id === vari.productId);
      const color = colors.find((cl) => cl.id === vari.color);
      const size = sizes.find((sz) => sz.id === vari.size);
      return {
        id: vari.id,
        name: product.name,
        productId: vari.productId,
        color,
        size,
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

// unique service for searching product by name
export async function searchProducts(query = "") {
  const all = await getAllProducts();
  if (!query) return [];

  const normQuery = normalize(query);
  // Áo --> ao
  function normalize(str) {
    return str
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase();
  }

  const matched = all
    .filter((p) => normalize(p.name).includes(normQuery))
    .sort((a, b) => {
      const aNorm = normalize(a.name);
      const bNorm = normalize(b.name);

      const aStarts = aNorm.startsWith(normQuery);
      const bStarts = bNorm.startsWith(normQuery);

      // If one starts with query, prioritize it
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      // else fallback to alphabetical
      return aNorm.localeCompare(bNorm);
    })
    .slice(0, 100);

  return matched.map((p) => ({
    label: p.name,
    value: p.id,
    basePrice: p.basePrice,
  }));
}
