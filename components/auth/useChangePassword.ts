import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authApi, type ApiResponse } from "@/services/auth.api";
import { ChangePasswordCredentials } from "@/types/auth";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

export function useChangePassword() {
  return useMutation<ApiResponse<void>, any, ChangePasswordCredentials>({
    mutationKey: ["change-password"],
    mutationFn: authApi.changePassword,

    onSuccess: () => {
      toast.success("Mật khẩu đã được đổi thành công");
    },

    onError: (error: any) => {
      toast.error(resolveToastErrorMessage(error, "Không thể đổi mật khẩu"));
    },
  });
}
