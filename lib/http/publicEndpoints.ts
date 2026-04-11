import { PUBLIC_AUTH_ENDPOINTS } from "@/lib/constants/endpoint";
import { API_PREFIX, joinApiPath } from "@/lib/constants/api";

const BACKEND_BASE_URL = (process.env.NEXT_PUBLIC_HOST_BACKEND || "").replace(
  /\/$/,
  "",
);

const TARGET_GROUPS_BASE_PATH = joinApiPath("/target-groups");
const CATEGORIES_BASE_PATH = joinApiPath("/categories");
const PRODUCTS_BASE_PATH = joinApiPath("/products");
const PRODUCT_VARIANTS_BASE_PATH = joinApiPath("/product-variants");
const escapedApiPrefix = API_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function isPublicEndpoint(url: string, method: string = "GET"): boolean {
  const normalizedUrl = url.replace(BACKEND_BASE_URL, "");
  const [path] = normalizedUrl.split("?");
  const normalizedMethod = (method || "").toUpperCase();

  if (PUBLIC_AUTH_ENDPOINTS.has(path)) {
    return true;
  }

  // Admin listing endpoint GET /api/categories must stay protected.
  if (path.startsWith(CATEGORIES_BASE_PATH)) {
    if (normalizedMethod !== "GET") {
      return false;
    }

    if (path === `${CATEGORIES_BASE_PATH}/public`) {
      return true;
    }

    if (path.startsWith(`${CATEGORIES_BASE_PATH}/target-groups/`)) {
      return true;
    }

    const categorySlugPath = new RegExp(
      `^${escapedApiPrefix}/categories/[^/]+/?$`,
    ).test(path);
    if (categorySlugPath) {
      return true;
    }

    return false;
  }
  // Products: only explicit public read routes are public.
  if (path.startsWith(PRODUCTS_BASE_PATH)) {
    if (normalizedMethod !== "GET") {
      return false;
    }

    if (path === `${PRODUCTS_BASE_PATH}/public`) {
      return true;
    }
    // product by slug or id
    const productSlugOrIdPath = new RegExp(
      `^${escapedApiPrefix}/products/[^/]+/?$`,
    ).test(path);
    if (productSlugOrIdPath) {
      return true;
    }
    return false;
  }

  // Target groups: public listing and by-slug, etc
  if (path.startsWith(TARGET_GROUPS_BASE_PATH)) {
    if (normalizedMethod !== "GET") {
      return false;
    }

    if (path === `${TARGET_GROUPS_BASE_PATH}/public`) return true;

    const tgSlugPath = new RegExp(
      `^${escapedApiPrefix}/target-groups/[^/]+/?$`,
    ).test(path);
    if (tgSlugPath) return true;

    return false;
  }

  // Product variants: public listing and by id, etc
  if (path.startsWith(PRODUCT_VARIANTS_BASE_PATH)) {
    if (normalizedMethod !== "GET") {
      return false;
    }

    if (path === `${PRODUCT_VARIANTS_BASE_PATH}/public`) return true;

    const variantIdPath = new RegExp(
      `^${escapedApiPrefix}/product-variants/[^/]+/?$`,
    ).test(path);
    if (variantIdPath) return true;
  }

  return false;
}
