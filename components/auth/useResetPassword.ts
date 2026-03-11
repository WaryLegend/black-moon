import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authApi, type ApiResponse } from "@/services/auth.api";
import { useRouter } from "next/navigation";
import { ResetPasswordCredentials } from "@/types/auth";

export function useResetPassword(returnUrl?: string) {
  const router = useRouter();

  return useMutation<ApiResponse<void>, any, ResetPasswordCredentials>({
    mutationFn: authApi.resetPassword,

    onSuccess: () => {
      toast.success("Mật khẩu đã được đặt lại thành công. Vui lòng đăng nhập.");
      router.push(
        `login?${new URLSearchParams({
          ...(returnUrl && { returnUrl }),
        }).toString()}`,
      );
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Không thể đặt lại mật khẩu",
      );
    },
  });
}
