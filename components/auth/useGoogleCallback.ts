import { useQuery } from "@tanstack/react-query";

import { authApi, type ApiResponse } from "@/services/auth.api";
import type { AuthResponse } from "@/types/auth";

export function useGoogleCallback() {
  return useQuery<ApiResponse<AuthResponse>>({
    queryKey: ["user", "google-session"],
    queryFn: () => authApi.refresh(),
    retry: false,
    refetchOnWindowFocus: false,
  });
}
