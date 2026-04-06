import { PUBLIC_AUTH_ENDPOINTS } from "@/lib/constants/endpoint";

const BACKEND_BASE_URL = (process.env.NEXT_PUBLIC_HOST_BACKEND || "").replace(
  /\/$/,
  "",
);

export function isPublicEndpoint(url: string, method: string = "GET"): boolean {
  const normalizedUrl = url.replace(BACKEND_BASE_URL, "");
  const [path] = normalizedUrl.split("?");
  const normalizedMethod = method.toUpperCase();

  if (PUBLIC_AUTH_ENDPOINTS.has(path)) {
    return true;
  }

  // Admin listing endpoint GET /api/v1/categories must stay protected.
  if (path.startsWith("/api/v1/categories")) {
    if (normalizedMethod !== "GET") {
      return false;
    }

    if (path === "/api/v1/categories/public") {
      return true;
    }

    if (path.startsWith("/api/v1/categories/target-groups/")) {
      return true;
    }

    const categorySlugPath = /^\/api\/v1\/categories\/[^/]+\/?$/.test(path);
    if (categorySlugPath) {
      return true;
    }

    return false;
  }
  // Products: only explicit public read routes are public.
  if (normalizedMethod === "GET") {
    if (path === "/api/v1/products") {
      return true;
    }

    const productSlugPath = /^\/api\/v1\/products\/[^/]+\/?$/.test(path);
    if (productSlugPath) {
      return true;
    }

    if (path.startsWith("/api/v1/promotions/images")) {
      return true;
    }
  }

  return false;
}
