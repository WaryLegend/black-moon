import { joinApiPath } from "@/lib/constants/api";

export const PUBLIC_AUTH_ENDPOINTS = new Set([
  joinApiPath("/auth/login"),
  joinApiPath("/auth/workspace/login"),
  joinApiPath("/auth/register"),
  joinApiPath("/auth/refresh"),
  joinApiPath("/auth/recover-password-code"),
  joinApiPath("/auth/reset-password-code"),
  joinApiPath("/auth/send-email-activation"),
  joinApiPath("/auth/send-activation-code"),
  joinApiPath("/auth/activate"),
  joinApiPath("/auth/google"),
  joinApiPath("/auth/activate-code"),
  joinApiPath("/auth/verify-reset-code"),
  joinApiPath("/system-configs/public"),
]);
