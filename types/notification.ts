export interface Notification {
    id: number;
    title: string;
    content: string;
    type: string;
    read: boolean;
    notificationDate: string;
    startPromotionDate: string | null;
    endPromotionDate: string | null;
    referenceIds: string;
}

export interface NotificationResponse {
    data: Notification[];
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    };
}

export interface UnreadCountResponse {
    statusCode: number;
    data: number;
    message: string;
} 