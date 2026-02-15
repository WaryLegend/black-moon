import axios, { AxiosInstance, AxiosResponse } from "axios";
import { removeRefreshTokenCookie } from "@/lib/helpers/rmTokenCookie";

import { tokenManager } from "@/lib/auth/tokenManager";
import { refreshQueue } from "@/lib/auth/refreshQueue";
import { isPublicEndpoint } from "./publicEndpoints";

// Create axios instance
export function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_BACKEND,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const token = tokenManager.getAccessToken();
    const method = config.method || "GET";

    if (token && !isPublicEndpoint(config.url || "", method)) {
      config.headers.Authorization = `Bearer ${token}`;
      //   console.log("🔐 Adding token to:", method.toUpperCase(), config.url);
      // } else {
      //   console.log("🔓 Public endpoint:", method.toUpperCase(), config.url);
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
        const response = await axios.get(
          `${process.env.HOST_BACKBEND}/api/v1/auth/refresh`,
          { withCredentials: true },
        );

        const accessToken = response.data?.data?.access_token;
        tokenManager.setAccessToken(accessToken);
        refreshQueue.process(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (err) {
        refreshQueue.process(err, null);
        tokenManager.clearTokens();
        removeRefreshTokenCookie();
        window.location.href = "/user/login";
        return Promise.reject(err);
      } finally {
        refreshQueue.setRefreshing(false);
      }
    },
  );

  return instance;
}

export const apiClient = createApiClient();
