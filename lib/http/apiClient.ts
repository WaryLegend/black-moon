import axios, { AxiosInstance, AxiosResponse } from "axios";

import { tokenManager } from "@/lib/auth/tokenManager";
import { refreshQueue } from "@/lib/auth/refreshQueue";
import { isPublicEndpoint } from "./publicEndpoints";
import { clearAccessTokenCookie } from "@/lib/auth/accessTokenCookie";
import { persistAccessToken } from "@/lib/auth/persistAccessToken";

const BACKEND_BASE_URL = (process.env.NEXT_PUBLIC_HOST_BACKEND || "").replace(
  /\/$/,
  "",
);
const REFRESH_ENDPOINT = "/api/v1/auth/refresh";

const withBackendBase = (path: string) =>
  BACKEND_BASE_URL ? `${BACKEND_BASE_URL}${path}` : path;

const extractAccessToken = (payload: unknown): string | null => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const container = payload as { data?: unknown; accessToken?: unknown };
  const authPayload =
    container.data && typeof container.data === "object"
      ? (container.data as { accessToken?: unknown })
      : (container as { accessToken?: unknown });
  const token = authPayload.accessToken;

  return typeof token === "string" && token.length > 0 ? token : null;
};

// Create axios instance
export function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: BACKEND_BASE_URL || undefined,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const token = tokenManager.getAccessToken();
    const method = config.method || "GET";

    if (token && !isPublicEndpoint(config.url || "", method)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      if (isPublicEndpoint(originalRequest.url, originalRequest.method)) {
        return Promise.reject(error);
      }

      if (refreshQueue.isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.enqueue({ resolve, reject });
        }).then((token) => {
          if (!token) throw error;
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return instance(originalRequest);
        });
      }

      originalRequest._retry = true;
      refreshQueue.setRefreshing(true);

      try {
        const response = await axios.post(
          withBackendBase(REFRESH_ENDPOINT),
          {},
          { withCredentials: true },
        );

        const accessToken = extractAccessToken(response.data);

        if (!accessToken) {
          throw new Error("Refresh response missing access token");
        }

        await persistAccessToken(accessToken);
        refreshQueue.process(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (err) {
        refreshQueue.process(err, null);
        tokenManager.clearTokens();
        await clearAccessTokenCookie();
        if (typeof window !== "undefined") {
          window.location.href = "/user/login";
        }
        return Promise.reject(err);
      } finally {
        refreshQueue.setRefreshing(false);
      }
    },
  );

  return instance;
}

export const apiClient = createApiClient();
