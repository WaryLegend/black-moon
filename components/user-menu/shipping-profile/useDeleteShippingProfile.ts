"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { shippingProfilesApi } from "@/services/shipping-profiles.api";
import { SHIPPING_PROFILES_QUERY_KEY } from "./useShippingProfiles";

type DeletePayload = {
  profileId: number;
};

export function useDeleteShippingProfile() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, DeletePayload>({
    mutationFn: async ({ profileId }) => {
      await shippingProfilesApi.remove(profileId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHIPPING_PROFILES_QUERY_KEY });
      toast.success("Đã xóa địa chỉ giao hàng");
    },
    onError: () => {
      toast.error("Không thể xóa địa chỉ. Thử lại sau.");
    },
  });
}
