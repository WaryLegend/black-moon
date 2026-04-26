interface ExtendedFetchOptions extends RequestInit {
  revalidate?: number;
  tags?: string[];
}

/**
 * Hàm bổ trợ để xây dựng URL tuyệt đối
 */
const getFullUrl = (url: string): string => {
  const baseUrl =
    process.env.NEXT_PUBLIC_HOST_BACKEND || "http://localhost:8000";
  if (url.startsWith("http")) return url;

  const normalizedBase = baseUrl.replace(/\/$/, "");
  const normalizedPath = url.startsWith("/") ? url : `/${url}`;
  return `${normalizedBase}${normalizedPath}`;
};

/**
 * (PUBLIC)
 * - Unified API fetch helper for Next.js.
 * - Builds absolute URLs using backend host from environment variables.
 * - Extends Fetch API with Next.js caching options (`revalidate`, `tags`).
 * - Applies JSON headers by default and merges custom headers.
 * - Logs and throws on non‑OK responses for easier debugging.
 */
export async function apiFetch<T>(
  url: string,
  options: ExtendedFetchOptions = {},
): Promise<T> {
  const fullUrl = getFullUrl(url);
  const { revalidate, tags, ...standardOptions } = options;

  const res = await fetch(fullUrl, {
    ...standardOptions,
    headers: {
      "Content-Type": "application/json",
      ...standardOptions.headers,
    },
    next: {
      ...(revalidate !== undefined ? { revalidate } : {}),
      ...(tags ? { tags } : {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error(`[Public API Error] ${res.status} - ${fullUrl}`, errorData);
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
