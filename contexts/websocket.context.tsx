"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import {
  getNotifications,
  getUnreadCount,
  markAllAsRead,
  markAsRead,
} from "@/services/notification.api";
import { tokenManager } from "@/lib/auth/tokenManager";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

/* -------------------- Types -------------------- */

interface Notification {
  id: number;
  title: string;
  content: string;
  read: boolean;
  createdAt?: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  pages: number;
  total: number;
}

interface WebSocketContextValue {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnected: boolean;
  notifications: Notification[];
  pagination: Pagination;
  unreadCount: number;
  loadMoreNotifications: () => Promise<void>;
  markNotificationAsRead: (id: number) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
}

/* -------------------- Context -------------------- */

const WebSocketContext = createContext<WebSocketContextValue | undefined>(
  undefined,
);

let stompClient: Client | null = null;

const API_URL = process.env.HOST_BACKBEND;

/* -------------------- Provider -------------------- */

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    pageSize: 5,
    pages: 1,
    total: 0,
  });

  /* ---------------- API helpers ---------------- */

  const fetchNotificationsPage = async (page: number) => {
    if (!tokenManager.getAccessToken()) return;

    const response = await getNotifications(page, pagination.pageSize);

    const { data, meta } = response;

    setNotifications((prev) =>
      page === 0
        ? data
        : [...prev, ...data.filter((n) => !prev.some((p) => p.id === n.id))],
    );

    setPagination(meta);
  };

  const fetchUnreadCount = async () => {
    if (!tokenManager.getAccessToken()) return;
    const count = await getUnreadCount();
    setUnreadCount(count);
  };

  const markNotificationAsRead = async (id: number) => {
    if (!tokenManager.getAccessToken()) return;

    await markAsRead(String(id));

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllNotificationsAsRead = async () => {
    if (!tokenManager.getAccessToken()) return;

    await markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const loadMoreNotifications = async () => {
    if (pagination.page < pagination.pages) {
      await fetchNotificationsPage(pagination.page + 1);
    }
  };

  /* ---------------- WebSocket ---------------- */

  const connect = async () => {
    if (!tokenManager.getAccessToken()) return;

    if (stompClient) await stompClient.deactivate();

    const socket = new SockJS(`${API_URL}/ws`);

    stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${tokenManager.getAccessToken()}`,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        setIsConnected(true);

        stompClient?.subscribe(
          "/user/queue/notifications",
          (message: IMessage) => {
            const notif: Notification = JSON.parse(message.body);

            setNotifications((prev) => [notif, ...prev]);
            setUnreadCount((prev) => prev + 1);

            queryClient.invalidateQueries({ queryKey: ["orders"] });

            toast(
              () => (
                <div>
                  <p className="font-semibold">{notif.title}</p>
                  <p className="text-sm">{notif.content}</p>
                </div>
              ),
              { duration: 5000 },
            );
          },
        );

        fetchUnreadCount();
        fetchNotificationsPage(0);
      },
      onDisconnect: () => setIsConnected(false),
    });

    stompClient.activate();
  };

  const disconnect = async () => {
    if (stompClient?.connected) {
      await stompClient.deactivate();
      stompClient = null;
      setIsConnected(false);
    }
  };

  useEffect(() => {
    if (tokenManager.getAccessToken()) connect();
    return () => void disconnect();
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        connect,
        disconnect,
        isConnected,
        notifications,
        pagination,
        unreadCount,
        loadMoreNotifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

/* -------------------- Hook -------------------- */

export function useWebSocket() {
  const ctx = useContext(WebSocketContext);
  if (!ctx)
    throw new Error("useWebSocket must be used within WebSocketProvider");
  return ctx;
}
