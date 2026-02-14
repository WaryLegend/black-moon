import { useState, useEffect, useCallback, useRef } from "react";
import chatbotApi from "@/services/chatbot.api";

/**
 * Custom hook for chatbot functionality
 */
export default function useChatbot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Chào bạn 👋, mình là trợ lý Black & Moon." },
    {
      from: "bot",
      text: "Bạn muốn tìm sản phẩm gì? Mình có thể giúp bạn tìm theo màu sắc, kích cỡ, loại sản phẩm hoặc giá cả nhé!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isClearing, setIsClearing] = useState(false);

  const [error, setError] = useState(null);

  const chatContainerRef = useRef(null);

  // Initialize session ID on mount
  useEffect(() => {
    const id = chatbotApi.getSessionId();
    setSessionId(id);
  }, []);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  /**
   * Send message to chatbot
   * @param {string} text - Message text
   */
  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || isTyping) return;

      setError(null);

      // Add user message immediately
      const userMessage = { from: "user", text: text.trim() };
      setMessages((prev) => [...prev, userMessage]);

      setIsTyping(true);

      try {
        // ✅ FIX: Gọi với object thay vì 2 tham số riêng
        const response = await chatbotApi.sendMessage({
          message: text.trim(),
          sessionId: sessionId,
        });

        // Add bot response with optional products
        const botMessage = {
          from: "bot",
          text: response.message,
          products: response.relatedProducts || [],
          categories: response.relatedCategories || [],
          intent: response.intent,
        };

        setMessages((prev) => [...prev, botMessage]);

        // Update session ID if returned from server
        if (response.sessionId && response.sessionId !== sessionId) {
          setSessionId(response.sessionId);
          localStorage.setItem("chatbot_session_id", response.sessionId);
        }
      } catch (err) {
        console.error("Send message error:", err);
        setError("Không thể gửi tin nhắn. Vui lòng thử lại!");

        // Add error message
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text: "Xin lỗi, mình gặp sự cố kỹ thuật. Bạn thử lại sau nhé! 😅",
            isError: true,
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [sessionId, isTyping],
  );

  /**
   * Clear chat history and reset session
   */
  const clearChat = useCallback(async () => {
    if (isClearing) return;

    setIsClearing(true);
    try {
      if (sessionId) {
        await chatbotApi.clearSession(sessionId);
      }
    } catch (err) {
      console.error("Clear session error:", err);
    }

    // Reset to initial state
    const newSessionId = chatbotApi.resetSessionId();
    setSessionId(newSessionId);
    setMessages([
      { from: "bot", text: "Chào bạn 👋, mình là trợ lý Black & Moon." },
      { from: "bot", text: "Bạn muốn tìm sản phẩm gì nào?" },
    ]);
    setError(null);
    setIsClearing(false);
  }, [sessionId, isClearing]);

  /**
   * Retry last failed message
   */
  const retryLastMessage = useCallback(() => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((msg) => msg.from === "user");

    if (lastUserMessage) {
      // Remove last error message
      setMessages((prev) => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1]?.isError) {
          newMessages.pop();
        }
        // Remove last user message to resend
        if (newMessages[newMessages.length - 1]?.from === "user") {
          newMessages.pop();
        }
        return newMessages;
      });

      // Resend
      sendMessage(lastUserMessage.text);
    }
  }, [messages, sendMessage]);

  /**
   * Add quick reply (pre-defined messages)
   */
  const quickReplies = [
    "Xem áo mới nhất",
    "Tìm quần size M",
    "Sản phẩm dưới 500k",
    "Chính sách đổi trả",
  ];

  const sendQuickReply = useCallback(
    (text) => {
      sendMessage(text);
    },
    [sendMessage],
  );

  return {
    // State
    messages,
    isTyping,
    sessionId,
    isClearing,
    error,
    chatContainerRef,
    quickReplies,

    // Actions
    sendMessage,
    clearChat,
    retryLastMessage,
    sendQuickReply,

    // Utilities
    formatPrice: chatbotApi.formatPrice,
  };
}
