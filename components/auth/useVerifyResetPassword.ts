import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authApi, type ApiResponse } from "@/services/auth.api";

export function useVerifyResetPassword(returnUrl?: string) {
  const router = useRouter();

  return useMutation<
    ApiResponse<void>,
    any,
    { email: string; resetCode: string }
  >({
    mutationFn: authApi.verifyResetPasswordCode,

    onSuccess: (_, variables) => {
      toast.success("Xác thực mã OTP thành công");

      router.replace(
        `reset-password?${new URLSearchParams({
          email: variables.email,
          code: variables.resetCode,
          ...(returnUrl && { returnUrl }),
        }).toString()}`,
      );
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Mã OTP không hợp lệ hoặc đã hết hạn",
      );
    },
  });
}
