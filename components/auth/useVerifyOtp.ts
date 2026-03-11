import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authApi, type ApiResponse } from "@/services/auth.api";
import type { AuthResponse } from "@/types/auth";
import { useWebSocket } from "@/contexts/websocket.context";

export function useVerifyOtp(returnUrl?: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { connect } = useWebSocket();

  return useMutation<
    ApiResponse<AuthResponse>,
    any,
    { email: string; activationCode: string }
  >({
    mutationFn: authApi.verifyOtp,

    onSuccess: async () => {
      toast.success("Kích hoạt tài khoản thành công!");

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["user", "me"] }),
        queryClient.invalidateQueries({ queryKey: ["cart"] }),
      ]);

      setTimeout(connect, 100);

      router.replace(returnUrl || "/");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Mã OTP không hợp lệ");
    },
  });
}
