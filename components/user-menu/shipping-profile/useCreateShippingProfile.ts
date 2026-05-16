"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { shippingProfilesApi } from "@/services/shipping-profiles.api";
import type {
  CreateShippingProfileDto,
  ShippingProfile,
} from "@/types/shipping-profiles";
import { SHIPPING_PROFILES_QUERY_KEY } from "./useShippingProfiles";

export function useCreateShippingProfile() {
  const queryClient = useQueryClient();

  return useMutation<ShippingProfile, unknown, CreateShippingProfileDto>({
    mutationFn: (payload) => shippingProfilesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHIPPING_PROFILES_QUERY_KEY });
      toast.success("Đã thêm địa chỉ giao hàng");
    },
    onError: () => {
      toast.error("Không thể thêm địa chỉ. Thử lại sau.");
    },
  });
}
