import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authApi, type ApiResponse } from "@/services/auth.api";
import { ForgotPasswordCredentials } from "@/types/auth";

export function useForgotPassword(returnUrl?: string) {
  const router = useRouter();

  return useMutation<ApiResponse<void>, any, ForgotPasswordCredentials>({
    mutationFn: authApi.forgotPassword,

    onSuccess: (_, variables) => {
      toast.success(
        "Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.",
      );

      router.push(
        `verify-otp?${new URLSearchParams({
          email: variables.email,
          type: "reset-password",
          ...(returnUrl && { returnUrl }),
        }).toString()}`,
      );
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Lỗi! Không thể gửi yêu cầu đặt lại mật khẩu",
      );
    },
  });
}
