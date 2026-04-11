// Types
export interface ChatMessageReq {
  message: string;
  sessionId?: string;
}

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  slug: string;
  images?: string[];
}

export interface CategoryResponse {
  id: number;
  name: string;
}

export type ChatIntent =
  | "GREETING"
  | "PRODUCT_SEARCH"
  | "PRODUCT_BY_COLOR"
  | "PRODUCT_BY_SIZE"
  | "PRODUCT_BY_CATEGORY"
  | "PRODUCT_BY_PRICE"
  | "ORDER_STATUS"
  | "RETURN_POLICY"
  | "GENERAL_INFO"
  | "UNKNOWN";

export interface ChatMessageRes {
  message: string;
  sessionId: string;
  intent: ChatIntent;
  relatedProducts?: ProductResponse[];
  relatedCategories?: CategoryResponse[];
}

// ✅ Interface cho wrapped response từ backend
interface ApiResponse<T> {
  statusCode: number;
  error: string | null;
  message: string;
  data: T;
}

// Base URL
const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
).replace(/\/$/, "");

// Helper function
const generateSessionId = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// API endpoints
const chatbotApi = {
  /**
   * Send message to chatbot
   */
  async sendMessage(data: ChatMessageReq): Promise<ChatMessageRes> {
    const response = await fetch(`${API_URL}/chatbot/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // ✅ FIX: Lấy data từ wrapped response
    const result: ApiResponse<ChatMessageRes> = await response.json();
    return result.data; // ← Trả về data, không phải toàn bộ response
  },

  /**
   * Clear conversation session
   */
  async clearSession(sessionId: string): Promise<void> {
    const response = await fetch(`${API_URL}/chatbot/session/${sessionId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/chatbot/health`);
      return response.ok;
    } catch {
      return false;
    }
  },

  /**
   * Get or create session ID from localStorage
   */
  getSessionId(): string {
    if (typeof window === "undefined") return generateSessionId();

    let sessionId = localStorage.getItem("chatbot_session_id");
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem("chatbot_session_id", sessionId);
    }
    return sessionId;
  },

  /**
   * Reset session ID
   */
  resetSessionId(): string {
    const newSessionId = generateSessionId();
    if (typeof window !== "undefined") {
      localStorage.setItem("chatbot_session_id", newSessionId);
    }
    return newSessionId;
  },

  /**
   * Format price to VND
   */
  formatPrice(price: number): string {
    if (!price) return "Liên hệ";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  },
};

export default chatbotApi;
