const rawApiPrefix = process.env.NEXT_PUBLIC_API_PREFIX || "/api";

const normalizedApiPrefix = rawApiPrefix.startsWith("/")
  ? rawApiPrefix
  : `/${rawApiPrefix}`;

export const API_PREFIX = normalizedApiPrefix.replace(/\/$/, "");

export const joinApiPath = (path: string): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_PREFIX}${normalizedPath}`;
};
