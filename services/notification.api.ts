import httpClient from "@/lib/http/httpClient";
import { NotificationResponse } from "@/types/notification";

export const getNotifications = async (
  page: number = 0,
  pageSize: number = 10,
): Promise<NotificationResponse> => {
  let url = `/api/v1/notifications?page=${page}&size=${pageSize}`;
  url += "&sort=createdAt,desc";
  const res = await httpClient.get<NotificationResponse>(url);
  return res;
};

export const getUnreadCount = async (): Promise<number> => {
  const res = await httpClient.get<number>(
    "/api/v1/notifications/unread-count",
  );
  return res;
};

export const markAsRead = async (notificationId: string): Promise<void> => {
  const res = await httpClient.put<void>(
    `/api/v1/notifications/mark-read/${notificationId}`,
  );
  return res;
};

export const markAllAsRead = async (): Promise<void> => {
  const res = await httpClient.post<void>(
    "/api/v1/notifications/mark-read-all",
  );
  return res;
};
