import { PUBLIC_ENDPOINTS } from "@/lib/constants/endpoint";

export function isPublicEndpoint(url: string, method: string = "GET"): boolean {
  const normalizedUrl = url.replace(
    process.env.NEXT_PUBLIC_API_BACKEND || "",
    "",
  );
  // Categories: Only GET is public
  if (normalizedUrl.startsWith("/api/v1/categories")) {
    return method.toUpperCase() === "GET";
  }
  //  Products: Only GET is public
  if (normalizedUrl.startsWith("/api/v1/products")) {
    return method.toUpperCase() === "GET";
  }
  // Other endpoints check against PUBLIC_ENDPOINTS list
  return PUBLIC_ENDPOINTS.some(
    (endpoint) =>
      normalizedUrl === endpoint || normalizedUrl.startsWith(endpoint + "/"),
  );
}
