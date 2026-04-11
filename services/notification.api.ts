import httpClient from "@/lib/http/httpClient";
import { NotificationResponse } from "@/types/notification";
import { joinApiPath } from "@/lib/constants/api";

const NOTIFICATIONS_BASE_PATH = joinApiPath("/notifications");

export const getNotifications = async (
  page: number = 0,
  pageSize: number = 10,
): Promise<NotificationResponse> => {
  let url = `${NOTIFICATIONS_BASE_PATH}?page=${page}&size=${pageSize}`;
  url += "&sort=createdAt,desc";
  const res = await httpClient.get<NotificationResponse>(url);
  return res;
};

export const getUnreadCount = async (): Promise<number> => {
  const res = await httpClient.get<number>(
    `${NOTIFICATIONS_BASE_PATH}/unread-count`,
  );
  return res;
};

export const markAsRead = async (notificationId: string): Promise<void> => {
  const res = await httpClient.put<void>(
    `${NOTIFICATIONS_BASE_PATH}/mark-read/${notificationId}`,
  );
  return res;
};

export const markAllAsRead = async (): Promise<void> => {
  const res = await httpClient.post<void>(
    `${NOTIFICATIONS_BASE_PATH}/mark-read-all`,
  );
  return res;
};
