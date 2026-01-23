import testdata from "@/app/_data/testdata.json";
import { groupLabels, PAGE_SIZE } from "@/app/_utils/constants";
import { priceFilter, sortData } from "@/app/_utils/helpers";

// get all categories (no conditions)
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

// get category by id
export async function getCategoryById(id) {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const categories = testdata.categories || [];

    const category = categories.find((c) => c.id === id);

    return { category };
  } catch (err) {
    console.error("Error loading category:", err);
  }
}

// get category by group
export async function getCategoryByGroup(group) {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const categories = testdata.categories || [];

    const result = categories.filter((c) => c.group === group) || [];

    return { categories: result };
  } catch (err) {
    console.error("Error loading categories by group:", err);
  }
}

// get categories by filters, order by and page
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

// get all products (no conditions)
export async function getAllProducts() {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const products = testdata.products || [];

    return products;
  } catch (err) {
    console.error("Error loading all products:", err);
  }
}

// get products by filters, order by and page
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
    // category (multi-select)
    if (filters.category?.length) {
      filteredData = filteredData.filter((p) =>
        filters.category.includes(p.categoryId),
      );
    }
    // price range
    if (filters.basePrice) {
      filteredData = priceFilter(filteredData, filters.basePrice);
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

// get product and its variant by productId
export async function getProductById(productId) {
  try {
    // 1. Simulate network latency
    await new Promise((res) => setTimeout(res, 300));
    const { products, variants } = testdata;
    // 2. Find the base product
    const product = products.find((p) => p.id === productId);

    // 3. Get all variants for this product
    const productVariants = variants
      .filter((vari) => vari.productId === productId)
      .map((v) => ({
        id: v.id,
        color: v.color,
        size: v.size,
        sku: v.sku,
        variantPrice: v.variantPrice,
        image: v.image,
        stock: v.stock || 0,
      }));

    // 4. Build final enriched product
    const enrichedProduct = {
      ...product,
      variants: productVariants,
    };

    return { product: enrichedProduct };
  } catch (err) {
    console.error("Error loading product:", err);
    return { product: null };
  }
}

// get products by category
export async function getProductsByCategoryId({ categoryId, filters, sortBy }) {
  try {
    // 1. Simulate network latency
    await new Promise((res) => setTimeout(res, 300));
    const { products, categories } = testdata;

    // 2. Enrich every product that matches the categoryId
    const enriched = products
      .filter((p) => p.categoryId === categoryId)
      .map((prod) => {
        const category = categories.find((c) => c.id === prod.categoryId);
        const groupDisplay = groupLabels[category.group] ?? category.group;
        return {
          id: prod.id,
          name: prod.name,
          categoryId: prod.categoryId,
          group: groupDisplay,
          colors: prod.colors,
          sizes: prod.sizes,
          basePrice: prod.basePrice ?? 0,
          image: prod.images?.[0] ?? null,
          reviews: prod.reviews,
          previewVariant: prod.previewVariant,
        };
      });
    // 3. ------------------- FILTERING -------------------
    let filteredData = enriched;
    // --- color (multi-select)
    if (filters.color?.length) {
      filteredData = filteredData.filter((p) =>
        p.colors.some((color) => filters.color.includes(color)),
      );
    }
    // --- size (multi-select)
    if (filters.size?.length) {
      filteredData = filteredData.filter((p) =>
        p.sizes.some((size) => filters.size.includes(size)),
      );
    }
    // price range
    if (filters.basePrice) {
      filteredData = priceFilter(filteredData, filters.basePrice);
    }
    // 4. SORT
    if (sortBy.field) {
      filteredData = sortData(filteredData, sortBy.field, sortBy.direction);
    }

    return { products: filteredData };
  } catch (err) {
    console.error("Error loading product:", err);
  }
}

// get product's variants by filters, order by and page
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
        filters.color.includes(p.color.id),
      );
    }
    // --- size (multi-select)
    if (filters.size?.length) {
      filteredData = filteredData.filter((p) =>
        filters.size.includes(p.size.id),
      );
    }
    // price range
    if (filters.variantPrice) {
      filteredData = priceFilter(filteredData, filters.variantPrice);
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

// get users by filters, order by and page
export async function getUsers({ filters, page, sortBy }) {
  try {
    //1. Simulate network latency
    await new Promise((res) => setTimeout(res, 300));
    const users = testdata.users || [];
    //2.------------------- FILTERING -------------------
    let filteredData = users;
    // role (single-select)
    if (filters.role && filters.role !== "all") {
      filteredData = filteredData.filter((c) => c.role === filters.role);
    }
    // status (single-select)
    if (filters.status && filters.status !== "all") {
      filteredData = filteredData.filter((c) => c.status === filters.status);
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
    console.error("Error loading users:", err);
  }
}

// get cart by userId
export async function getCartByUserId(userId) {
  // const res = await fetch(`/api/cart/${userId}`, { cache: "no-store" });
  // return res.ok ? res.json() : [];
  return [];
}

// update/save cart to database
export async function updateCart(userId, items) {
  // await fetch(`/api/cart/${userId}`, {
  //   method: "POST",
  //   body: JSON.stringify(items),
  // });
}

// get all orders
export async function getAllOrders() {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const orders = testdata.orders || [];
    // later change to this
    // const res = await fetch(`${process.env.API_URL}/orders`);
    // const orders = await res.json();
    return orders;
  } catch (err) {
    console.error("Error loading orders:", err);
    return [];
  }
}

// get orders after an ISO date (inclusive) - used by dashboard queries
export async function getOrdersAfterDate(dateISO) {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const all = testdata.orders || [];
    const start = new Date(dateISO);
    const end = new Date();

    const filtered = all.filter((o) => {
      try {
        const d = new Date(o.createdAt);
        return d >= start && d <= end;
      } catch (e) {
        return false;
      }
    });

    return filtered;
  } catch (err) {
    console.error("Error loading orders by date:", err);
    return [];
  }
}

// get most recent N orders (default 5)
export async function getRecentOrders(limit = 5) {
  try {
    await new Promise((res) => setTimeout(res, 300));
    const all = testdata.orders || [];
    const sorted = all
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sorted.slice(0, limit);
  } catch (err) {
    console.error("Error loading recent orders:", err);
    return [];
  }
}

// get all orders by login user
export async function getOrdersByUserId({ userId, filters, page }) {
  try {
    // 1. Simulate network latency
    await new Promise((res) => setTimeout(res, 300));
    const orders = testdata.orders || [];

    // 2. ------------------- FILTERING -------------------
    let filteredData = orders.filter((order) => order.user?.id === userId);
    // status (single-select)
    if (filters.status && filters.status !== "all") {
      filteredData = filteredData.filter(
        (order) => order.status === filters.status,
      );
    }
    // 3. ------------------SORTING (fixed desc) -------------------
    filteredData = filteredData.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    // 4. ------------------- PAGINATION -------------------
    const total = filteredData.length;
    const start = (page - 1) * PAGE_SIZE;
    const pageData = filteredData.slice(start, start + PAGE_SIZE);
    // final
    const data = pageData.map(({ user, items, ...rest }) => ({
      ...rest,
      totalItems: items?.length ?? 0,
    }));

    return { data, total };
  } catch (err) {
    console.error("Error loading orders:", err);
    throw err;
  }
}

// get order by id
export async function getUserOrderById({ orderId, userId }) {
  // 1. Simulate network latency
  await new Promise((res) => setTimeout(res, 300));
  const { orders, variants } = testdata;

  // 2. Find the order
  const order = orders.find((o) => o.id === orderId && o.user?.id === userId);
  if (!order) {
    throw new Error(`Order ${orderId} not found`);
  }

  // 3. Enrich items with image from matching variant
  const enrichedItems = order.items.map((item) => {
    const variant = variants.find((v) => v.id === item.variantId);
    return {
      ...item,
      image: variant?.image ?? "/T-shirt.jpg", // Fallback image if missing
      url: `/products/${item.productId}`, // Assuming product page route
    };
  });

  // 4. Return enriched order
  return { ...order, items: enrichedItems };
}

// get reviews for a product, defaults to 10, expand + 10 per expand
export async function getReviewsByProduct({
  productId,
  offset = 0,
  limit = 10,
}) {
  try {
    await new Promise((res) => setTimeout(res, 300));
    // Get product details
    const product = testdata.products.find((p) => p.id === productId);
    const productInfo = {
      id: product.id,
      name: product.name,
      images: product.images,
    };
    // Filter all reviews for this product
    const allReviews = testdata.reviews
      .filter((r) => r.productId === productId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const total = allReviews.length;

    // Calculate avgRating from all reviews
    const avgRating =
      total > 0
        ? Math.round(
            (allReviews.reduce((sum, r) => sum + r.rating, 0) / total) * 10,
          ) / 10
        : 0;

    // Paginate the sorted reviews
    const paginatedReviews = allReviews.slice(offset, offset + limit);

    // Add userName to each review in the page
    paginatedReviews.forEach((review) => {
      const user = testdata.users.find((u) => u.id === review.userId);
      review.userName = user ? user.userName : "Khách hàng";
    });

    return {
      product: productInfo,
      reviews: {
        total,
        avgRating,
        reviews: paginatedReviews,
      },
    };
  } catch (err) {
    console.error("Error loading reviews for product:", err);
    return {
      product: { id: "", name: "", images: null },
      reviews: { total: 0, avgRating: 0, reviews: [] },
    };
  }
}
