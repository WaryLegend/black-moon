import axios from "axios";

const NETWORK_ERROR_MESSAGE =
  "Không thể kết nối máy chủ lúc này. Vui lòng kiểm tra mạng và thử lại.";
const SYSTEM_ERROR_MESSAGE = "Hệ thống đang bận. Vui lòng thử lại sau ít phút.";

type ApiErrorPayload = {
  message?: unknown;
  error?: unknown;
};

export function getServerErrorMessage(error: unknown): string | null {
  if (!axios.isAxiosError(error)) {
    return null;
  }

  const data = error.response?.data as ApiErrorPayload | string | undefined;

  if (typeof data === "string" && data.trim()) {
    return data.trim();
  }

  if (data && typeof data === "object") {
    if (typeof data.message === "string" && data.message.trim()) {
      return data.message.trim();
    }

    if (typeof data.error === "string" && data.error.trim()) {
      return data.error.trim();
    }
  }

  return null;
}

export function getUnexpectedErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return SYSTEM_ERROR_MESSAGE;
  }

  if (!error.response) {
    return NETWORK_ERROR_MESSAGE;
  }

  if (error.response.status >= 500) {
    return SYSTEM_ERROR_MESSAGE;
  }

  return SYSTEM_ERROR_MESSAGE;
}

export function isUnexpectedError(error: unknown): boolean {
  if (!axios.isAxiosError(error)) {
    return true;
  }

  if (!error.response) {
    return true;
  }

  return error.response.status >= 500;
}

export function resolveToastErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  return (
    getServerErrorMessage(error) ||
    getUnexpectedErrorMessage(error) ||
    fallbackMessage
  );
}
