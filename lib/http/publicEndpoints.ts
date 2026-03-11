import { ENDPOINTS } from "@/lib/constants/endpoint";

const BACKEND_BASE_URL = (process.env.NEXT_PUBLIC_HOST_BACKEND || "").replace(
  /\/$/,
  "",
);

export function isPublicEndpoint(url: string, method: string = "GET"): boolean {
  const normalizedUrl = url.replace(BACKEND_BASE_URL, "");
  // Categories: Only GET is public
  if (normalizedUrl.startsWith("/api/v1/categories")) {
    return method.toUpperCase() === "GET";
  }
  //  Products: Only GET is public
  if (normalizedUrl.startsWith("/api/v1/products")) {
    return method.toUpperCase() === "GET";
  }
  // Other endpoints check against ENDPOINTS list
  return ENDPOINTS.some(
    (endpoint) =>
      normalizedUrl === endpoint || normalizedUrl.startsWith(endpoint + "/"),
  );
}
