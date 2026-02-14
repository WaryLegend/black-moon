import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authApi } from "@/services/auth.api";
import { useRouter } from "next/navigation";

export function useResetPassword(returnUrl?: string) {
  const router = useRouter();

  type ApiResponse<T> = {
    error?: string | null;
    message?: string;
    data: T;
  };

  return useMutation<
    ApiResponse<null>,
    any,
    {
      email: string;
      resetCode: string;
      newPassword: string;
      confirmPassword: string;
    }
  >({
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
