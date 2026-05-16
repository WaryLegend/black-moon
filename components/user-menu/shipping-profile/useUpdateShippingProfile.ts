"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { shippingProfilesApi } from "@/services/shipping-profiles.api";
import type {
  ShippingProfile,
  UpdateShippingProfileDto,
} from "@/types/shipping-profiles";
import { SHIPPING_PROFILES_QUERY_KEY } from "./useShippingProfiles";

type UpdatePayload = {
  profileId: number;
  payload: UpdateShippingProfileDto;
};

export function useUpdateShippingProfile() {
  const queryClient = useQueryClient();

  return useMutation<ShippingProfile, unknown, UpdatePayload>({
    mutationFn: ({ profileId, payload }) =>
      shippingProfilesApi.update(profileId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHIPPING_PROFILES_QUERY_KEY });
      toast.success("Đã cập nhật địa chỉ giao hàng");
    },
    onError: () => {
      toast.error("Không thể cập nhật địa chỉ. Thử lại sau.");
    },
  });
}
