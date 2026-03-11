"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageCircle,
  FiSend,
  FiX,
  FiTrash2,
  FiRefreshCw,
} from "react-icons/fi";
import useChatbot from "@/hooks/useChatbot";
import Button from "./Button";
import { cn } from "@/utils/cn";
import Spinner from "./Spinner";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const {
    messages,
    isTyping,
    chatContainerRef,
    quickReplies,
    isClearing,
    sendMessage,
    clearChat,
    retryLastMessage,
    sendQuickReply,
    formatPrice,
  } = useChatbot();

  const handleSendMessage = () => {
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Open chat Button */}
      <Button
        icon
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="bg-accent-600 text-primary-0 hover:bg-accent-700 fixed right-6 bottom-24 z-40 h-12 w-12 rounded-full rounded-ee-none shadow-xl lg:bottom-6"
        title={open ? "Đóng chat" : "Mở chat"}
        aria-label="ChatBot assistance"
      >
        {open ? <FiX size={26} /> : <FiMessageCircle size={26} />}
      </Button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="bg-primary-50 fixed right-6 bottom-40 z-40 w-80 overflow-hidden rounded-xl shadow-2xl sm:w-96 lg:bottom-24"
          >
            {/* Header */}
            <header className="from-accent-600 to-accent-700 text-primary-0 flex items-center justify-between bg-gradient-to-tr p-4">
              <div>
                <h3 className="text-lg font-semibold">Trợ lý Black & Moon</h3>
                <p className="text-sm opacity-70">Sẵn sàng hỗ trợ ✨</p>
              </div>
              <Button
                icon
                onClick={clearChat}
                disabled={isClearing}
                className="hover:bg-accent-700 bg-accent-600 rounded-full p-2"
                title="Delete session"
              >
                {isClearing ? (
                  <Spinner type="mini" color="var(--color-primary-900)" />
                ) : (
                  <FiTrash2 size={18} />
                )}
              </Button>
            </header>

            {/* Message List */}
            <div
              ref={chatContainerRef}
              className="max-h-[400px] space-y-3 overflow-y-auto p-4"
            >
              {messages.map((msg, i) => (
                <div key={i}>
                  {/* Message Bubble */}
                  <div
                    className={`flex ${
                      msg.from === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed shadow ${
                        msg.from === "user"
                          ? "bg-accent-600 text-primary-0 rounded-ee-none"
                          : msg.isError
                            ? "rounded-es-none bg-red-100 text-red-700"
                            : "bg-primary-200 text-primary-900 rounded-es-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>

                  {/* Product Cards */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-2 space-y-2 pl-2">
                      {msg.products.slice(0, 3).map((product) => (
                        <a
                          key={product.id}
                          href={`/products/${product.slug}`}
                          className="bg-primary-100 hover:bg-primary-200 flex items-center gap-3 rounded-lg p-2 transition"
                        >
                          {product.images && product.images[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-12 w-12 rounded object-cover"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-primary-900 truncate text-sm font-medium">
                              {product.name}
                            </p>
                            <p className="text-accent-700 text-xs font-semibold">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </a>
                      ))}
                      {msg.products.length > 3 && (
                        <p className="text-primary-500 text-center text-xs">
                          +{msg.products.length - 3} sản phẩm khác
                        </p>
                      )}
                    </div>
                  )}

                  {/* Retry button for error messages */}
                  {msg.isError && (
                    <div className="mt-1">
                      <Button
                        icon
                        onClick={retryLastMessage}
                        className={cn(
                          "text-accent-700 hover:text-accent-800 gap-1",
                        )}
                      >
                        <FiRefreshCw size={12} />
                        <span className="hie text-center text-xs">Thử lại</span>
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-primary-200 flex items-center gap-1 rounded-lg rounded-es-none px-3 py-2 shadow">
                    <span className="typing-dot wave-dot"></span>
                    <span className="typing-dot wave-dot delay-100"></span>
                    <span className="typing-dot wave-dot delay-200"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length <= 3 && (
              <div className="border-primary-200 flex flex-wrap gap-2 border-t px-3 py-2">
                {quickReplies.map((reply, i) => (
                  <Button
                    key={i}
                    onClick={() => sendQuickReply(reply)}
                    disabled={isTyping}
                    className={cn(
                      "bg-primary-100 text-primary-700 hover:text-primary-800 hover:bg-primary-200 rounded-full px-3 py-2 text-xs transition disabled:opacity-50",
                    )}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            )}

            {/* Input Section */}
            <div className="border-primary-200 flex items-center border-t p-3">
              <textarea
                className="bg-primary-50 border-primary-300 placeholder:text-primary-500 scrollbar-hidden field-sizing-content max-h-32 min-h-10 flex-1 resize-none overflow-y-auto rounded-lg border px-3 py-2 text-sm break-words whitespace-pre-wrap outline-none"
                placeholder="Nhập tin nhắn..."
                value={input}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                rows={1}
              />
              <Button
                icon
                onClick={handleSendMessage}
                disabled={isTyping || !input.trim()}
                className={cn(
                  "bg-accent-600 text-primary-50 hover:bg-accent-700 disabled:bg-primary-300 ml-2 rounded-md p-2 disabled:cursor-not-allowed",
                )}
              >
                <FiSend size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
