import axios, { AxiosHeaders, AxiosInstance, AxiosResponse } from "axios";

import { tokenManager } from "@/lib/auth/tokenManager";
import { refreshQueue } from "@/lib/auth/refreshQueue";
import { isPublicEndpoint } from "./publicEndpoints";
import { clearAccessTokenCookie } from "@/lib/auth/accessTokenCookie";
import { persistAccessToken } from "@/lib/auth/persistAccessToken";
import { joinApiPath } from "@/lib/constants/api";

const BACKEND_BASE_URL = (process.env.NEXT_PUBLIC_HOST_BACKEND || "").replace(
  /\/$/,
  "",
);
const REFRESH_ENDPOINT = joinApiPath("/auth/refresh");

const withBackendBase = (path: string) =>
  BACKEND_BASE_URL ? `${BACKEND_BASE_URL}${path}` : path;

const isFormDataPayload = (value: unknown) =>
  typeof FormData !== "undefined" && value instanceof FormData;

const hasContentTypeHeader = (headers: unknown) => {
  if (!headers || typeof headers !== "object") return false;

  const maybeAxiosHeaders = headers as {
    get?: (name: string) => string | undefined;
  };
  if (typeof maybeAxiosHeaders.get === "function") {
    return Boolean(
      maybeAxiosHeaders.get("Content-Type") ||
        maybeAxiosHeaders.get("content-type"),
    );
  }

  const plain = headers as Record<string, unknown>;
  return Boolean(plain["Content-Type"] || plain["content-type"]);
};

const removeContentTypeHeader = (headers: unknown) => {
  if (!headers || typeof headers !== "object") return;

  const maybeAxiosHeaders = headers as {
    delete?: (name: string) => boolean;
  };
  if (typeof maybeAxiosHeaders.delete === "function") {
    maybeAxiosHeaders.delete("Content-Type");
    maybeAxiosHeaders.delete("content-type");
    return;
  }

  const plain = headers as Record<string, unknown>;
  delete plain["Content-Type"];
  delete plain["content-type"];
};

const setJsonContentTypeHeader = (headers: unknown) => {
  if (!headers || typeof headers !== "object") return;

  const maybeAxiosHeaders = headers as {
    set?: (name: string, value: string) => void;
  };
  if (typeof maybeAxiosHeaders.set === "function") {
    maybeAxiosHeaders.set("Content-Type", "application/json");
    return;
  }

  const plain = headers as Record<string, unknown>;
  plain["Content-Type"] = "application/json";
};

const resolveLoginRedirectPath = () => {
  if (typeof window === "undefined") {
    return "/user/login";
  }

  const pathname = window.location.pathname || "";
  return pathname.startsWith("/admin") ? "/admin/login" : "/user/login";
};

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
    withCredentials: true,
  });

  instance.interceptors.request.use(async (config) => {
    const isPublic = isPublicEndpoint(config.url || "", config.method || "GET");

    if (!isPublic) {
      await tokenManager.ensureTokenHydrated();
    }

    const token = tokenManager.getAccessToken();

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (isFormDataPayload(config.data)) {
      // Let the browser attach multipart boundary automatically.
      removeContentTypeHeader(config.headers);
    } else if (
      config.data !== undefined &&
      !hasContentTypeHeader(config.headers)
    ) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      setJsonContentTypeHeader(config.headers);
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
          window.location.href = resolveLoginRedirectPath();
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
