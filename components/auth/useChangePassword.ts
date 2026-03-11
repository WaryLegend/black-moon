import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authApi, type ApiResponse } from "@/services/auth.api";
import { ChangePasswordCredentials } from "@/types/auth";

export function useChangePassword() {
  return useMutation<ApiResponse<void>, any, ChangePasswordCredentials>({
    mutationKey: ["change-password"],
    mutationFn: authApi.changePassword,

    onSuccess: () => {
      toast.success("Mật khẩu đã được đổi thành công");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Không thể đặt lại mật khẩu",
      );
    },
  });
}
