import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authApi } from "@/services/auth.api";
import type { AuthResponse } from "@/types/auth";
import { useUserStore } from "@/contexts/UserStore";
import { useWebSocket } from "@/contexts/websocket.context";
import { tokenManager } from "@/lib/auth/tokenManager";

export function useVerifyOtp(returnUrl?: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { connect } = useWebSocket();
  const setAuthenticated = useUserStore((s) => s.setAuthenticated);

  type ApiResponse<T> = {
    error?: string | null;
    message?: string;
    data: T;
  };

  return useMutation<
    ApiResponse<AuthResponse>,
    any,
    { email: string; activationCode: string }
  >({
    mutationFn: authApi.verifyOtp,

    onSuccess: (response) => {
      const user = response?.data?.user;
      const accessToken = response?.data?.access_token;

      if (!user) {
        toast.error("Không thể kích hoạt tài khoản");
        return;
      }

      if (accessToken && !tokenManager.getAccessToken()) {
        tokenManager.setAccessToken(accessToken);
      }

      setAuthenticated(user);

      toast.success("Kích hoạt tài khoản thành công!");

      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setTimeout(connect, 100);

      router.replace(returnUrl || "/");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Mã OTP không hợp lệ");
    },
  });
}
