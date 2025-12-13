"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import Button from "@/app/_components/Button";

const mockMessages = [
  { from: "bot", text: "Chào bạn 👋, mình là trợ lý Black & Moon." },
  { from: "bot", text: "Bạn muốn xem sản phẩm theo màu hay theo kích cỡ?" },
  { from: "user", text: "Cho mình xem màu trắng với!" },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function sendMessage() {
    if (typing) return;
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Fake bot reply
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Đây là màu trắng nè bạn 🐻‍❄️" },
      ]);
      setTyping(false);
    }, 2000);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setOpen((open) => !open)}
        className="bg-accent-600 text-primary-0 hover:bg-accent-700 fixed right-6 bottom-24 z-40 flex h-10 w-10 items-center justify-center rounded-full shadow-xl transition lg:bottom-6"
        title={open ? "Close chat" : "Open chat"}
        aria-label="ChatBot assistance"
      >
        {open ? <FiX size={26} /> : <FiMessageCircle size={26} />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25 }}
            className="bg-primary-50 border-accent-600 fixed right-6 bottom-38 z-40 w-80 overflow-hidden rounded-xl border-1 shadow-md sm:w-96 lg:bottom-20"
          >
            {/* Header */}
            <header className="from-accent-600 to-accent-400 text-primary-0 bg-gradient-to-tr p-4 shadow-md">
              <h3 className="text-lg font-semibold">Trợ lý Black & Moon</h3>
              <p className="text-sm opacity-70">Sẵn sàng hỗ trợ ✨</p>
            </header>

            {/* Message List */}
            <div
              ref={chatRef}
              className="max-h-[400px] space-y-3 overflow-y-auto p-4"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-3 py-2 text-sm leading-relaxed break-words shadow ${
                      msg.from === "user"
                        ? "bg-accent-600 text-primary-0 rounded-se-lg rounded-l-lg"
                        : "bg-primary-200 text-primary-900 rounded-ss-lg rounded-r-lg"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing animation */}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-primary-200 flex items-center gap-1 rounded-lg px-3 py-2 shadow">
                    <span className="typing-dot wave-dot"></span>
                    <span className="typing-dot wave-dot delay-100"></span>
                    <span className="typing-dot wave-dot delay-200"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input section */}
            <div className="border-primary-200 bg-primary-100 flex items-center border-t p-3">
              <textarea
                className="bg-primary-50 border-primary-300 focus:border-accent-600 placeholder:text-primary-500 scrollbar-hidden field-sizing-content max-h-32 min-h-10 flex-1 resize-none overflow-y-auto rounded-lg border px-3 py-2 text-sm break-words whitespace-pre-wrap outline-none"
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  (e.preventDefault(), sendMessage())
                }
                rows={1}
              />
              <Button
                icon
                disabled={typing}
                onClick={sendMessage}
                className="bg-accent-600 text-primary-50 hover:!bg-accent-700 ml-2 rounded-lg p-2"
              >
                <FiSend size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extra CSS for typing dots */}
      <style jsx>{`
        .typing-dot {
          font-size: 14px;
          opacity: 0.6;
        }
      `}</style>
    </>
  );
}
