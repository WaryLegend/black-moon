import { apiClient } from "@/lib/http/apiClient";
import { joinApiPath } from "@/lib/constants/api";
import type {
  CreateShippingProfileDto,
  GhnDistrict,
  GhnProvince,
  GhnWard,
  ShippingProfile,
  UpdateShippingProfileDto,
} from "@/types/shipping-profiles";

const SHIPPING_BASE_PATH = joinApiPath("/shipping-profiles");

export const shippingProfilesApi = {
  async getByMe() {
    const response = await apiClient.get<ShippingProfile[]>(
      `${SHIPPING_BASE_PATH}/me`,
    );
    return response.data;
  },

  async create(payload: CreateShippingProfileDto) {
    const response = await apiClient.post<ShippingProfile>(
      SHIPPING_BASE_PATH,
      payload,
    );
    return response.data;
  },

  async update(profileId: number, payload: UpdateShippingProfileDto) {
    const response = await apiClient.patch<ShippingProfile>(
      `${SHIPPING_BASE_PATH}/${profileId}`,
      payload,
    );
    return response.data;
  },

  async remove(profileId: number) {
    const response = await apiClient.delete<{ success: boolean }>(
      `${SHIPPING_BASE_PATH}/${profileId}`,
    );
    return response.data;
  },

  async getProvinces() {
    const response = await apiClient.get<GhnProvince[]>(
      `${SHIPPING_BASE_PATH}/locations/provinces`,
    );
    return response.data;
  },

  async getDistricts(provinceId: number) {
    const response = await apiClient.get<GhnDistrict[]>(
      `${SHIPPING_BASE_PATH}/locations/districts`,
      { params: { provinceId } },
    );
    return response.data;
  },

  async getWards(districtId: number) {
    const response = await apiClient.get<GhnWard[]>(
      `${SHIPPING_BASE_PATH}/locations/wards`,
      { params: { districtId } },
    );
    return response.data;
  },
};
