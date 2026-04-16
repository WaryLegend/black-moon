import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/services/auth.api";
import { useWebSocket } from "@/contexts/websocket.context";
import toast from "react-hot-toast";
import { getUnexpectedErrorMessage } from "@/lib/http/errorMessages";

export function useLogout({
  redirect,
  isAdmin = false,
}: {
  redirect?: string;
  isAdmin?: boolean;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { disconnect } = useWebSocket();

  return useMutation<void, any, void, { toastId: string }>({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await authApi.logout();
    },
    onMutate: () => {
      const toastId = toast.loading("Đang đăng xuất...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      toast.success("Đăng xuất thành công", {
        id: context?.toastId,
      });
    },
    onError: (error, _, context) => {
      toast.error(getUnexpectedErrorMessage(error), {
        id: context?.toastId,
      });

      console.warn(
        "Logout API failed, continuing anyway:",
        error instanceof Error ? error.message : String(error),
      );
    },
    onSettled: () => {
      queryClient.setQueryData(["users", "me"], null);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      disconnect();

      if (isAdmin) router.replace("/admin/login");
      else router.replace(redirect || "/");
    },
  });
}
