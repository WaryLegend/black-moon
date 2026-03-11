import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authApi, type ApiResponse } from "@/services/auth.api";
import type { RegisterCredentials, RegisterResponse } from "@/types/auth";

export function useRegister(returnUrl?: string) {
  const router = useRouter();

  return useMutation<ApiResponse<RegisterResponse>, any, RegisterCredentials>({
    mutationFn: authApi.register,

    onSuccess: (_, variables) => {
      toast.success(
        "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
      );
      // old version
      // router.push(
      //   `verify-otp?email=${encodeURIComponent(variables.email)}${
      //     returnUrl && `&returnUrl=${encodeURIComponent(returnUrl)}`
      //   }`,
      // );
      router.push(
        `verify-otp?${new URLSearchParams({
          email: variables.email,
          ...(returnUrl && { returnUrl }),
        }).toString()}`,
      );
    },

    onError: () => {
      toast.error("Không thể gửi email xác thực. Vui lòng thử lại.");
    },
  });
}
