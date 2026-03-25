import { AxiosRequestConfig } from "axios";
import { apiClient } from "./apiClient";

type HttpClientConfig = AxiosRequestConfig & {
  // Skip auto-unwrapping and return the raw server payload when true
  rawResponse?: boolean;
};

type ApiEnvelope<T> = {
  data: T;
  statusCode?: number;
  message?: string;
  error?: string | null;
};

type MaybeEnveloped<T> = ApiEnvelope<T> | T;

const splitConfig = (config?: HttpClientConfig) => {
  if (!config) return { axiosConfig: undefined, rawResponse: undefined };
  const { rawResponse, ...axiosConfig } = config;
  return {
    axiosConfig: axiosConfig as AxiosRequestConfig,
    rawResponse,
  };
};

const hasEnvelope = (payload: unknown): payload is ApiEnvelope<unknown> => {
  if (!payload || typeof payload !== "object") return false;
  return (
    "data" in payload &&
    ("statusCode" in payload || "message" in payload || "error" in payload)
  );
};

const resolvePayload = <T>(payload: unknown, rawResponse?: boolean): T => {
  // Most BE endpoints wrap responses as { data: T, ... }; unwrap unless caller asks otherwise
  if (rawResponse) return payload as T;
  if (hasEnvelope(payload)) {
    return payload.data as T;
  }
  return payload as T;
};

export const httpClient = {
  async get<T>(url: string, config?: HttpClientConfig) {
    const { axiosConfig, rawResponse } = splitConfig(config);
    const res = await apiClient.get<MaybeEnveloped<T>>(url, axiosConfig);
    return resolvePayload<T>(res.data, rawResponse);
  },

  async post<T>(url: string, data?: unknown, config?: HttpClientConfig) {
    const { axiosConfig, rawResponse } = splitConfig(config);
    const res = await apiClient.post<MaybeEnveloped<T>>(url, data, axiosConfig);
    return resolvePayload<T>(res.data, rawResponse);
  },

  async put<T>(url: string, data?: unknown, config?: HttpClientConfig) {
    const { axiosConfig, rawResponse } = splitConfig(config);
    const res = await apiClient.put<MaybeEnveloped<T>>(url, data, axiosConfig);
    return resolvePayload<T>(res.data, rawResponse);
  },

  async delete<T>(url: string, config?: HttpClientConfig) {
    const { axiosConfig, rawResponse } = splitConfig(config);
    const res = await apiClient.delete<MaybeEnveloped<T>>(url, axiosConfig);
    return resolvePayload<T>(res.data, rawResponse);
  },

  async patch<T>(url: string, data?: unknown, config?: HttpClientConfig) {
    const { axiosConfig, rawResponse } = splitConfig(config);
    const res = await apiClient.patch<MaybeEnveloped<T>>(
      url,
      data,
      axiosConfig,
    );
    return resolvePayload<T>(res.data, rawResponse);
  },
};

export default httpClient;
