import { AxiosRequestConfig } from "axios";
import { apiClient } from "./apiClient";

export const httpClient = {
  async get<T>(url: string, config?: AxiosRequestConfig) {
    const res = await apiClient.get<T>(url, config);
    return res.data;
  },

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const res = await apiClient.post<T>(url, data, config);
    return res.data;
  },

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const res = await apiClient.put<T>(url, data, config);
    return res.data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const res = await apiClient.delete<T>(url, config);
    return res.data;
  },

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const res = await apiClient.patch<T>(url, data, config);
    return res.data;
  },
};

export default httpClient;
