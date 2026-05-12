import httpClient from "@/lib/http/httpClient";
import { joinApiPath } from "@/lib/constants/api";
import type {
  ResetSystemConfigsResponse,
  SystemConfigItem,
  UpdateSystemConfigDto,
} from "@/types/system-configs";

const SYSTEM_CONFIGS_BASE_PATH = joinApiPath("/system-configs");

export const systemConfigsApi = {
  async list() {
    return httpClient.get<SystemConfigItem[]>(SYSTEM_CONFIGS_BASE_PATH);
  },

  async update(key: string, payload: UpdateSystemConfigDto) {
    return httpClient.patch<SystemConfigItem>(
      `${SYSTEM_CONFIGS_BASE_PATH}/${key}`,
      payload,
    );
  },

  async resetDefaults() {
    return httpClient.patch<ResetSystemConfigsResponse>(
      `${SYSTEM_CONFIGS_BASE_PATH}/reset/defaults`,
    );
  },
};
