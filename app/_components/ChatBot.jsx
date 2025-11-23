"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";

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
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Fake bot reply
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Đây là màu trắng nè bạn 😄" },
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
        className="bg-accent-800 text-primary-0 hover:bg-accent-600 fixed right-6 bottom-6 z-40 flex h-10 w-10 items-center justify-center rounded-full shadow-xl transition"
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
            className="bg-primary-0 fixed right-6 bottom-24 z-40 w-80 overflow-hidden rounded-xl shadow-md sm:w-96"
          >
            {/* Header */}
            <header className="bg-accent-800 text-primary-0 p-4">
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
                    className={`max-w-[75%] px-3 py-2 text-sm leading-relaxed shadow ${
                      msg.from === "user"
                        ? "bg-accent-700 text-primary-0 rounded-se-lg rounded-l-lg"
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
            <div className="border-primary-200 flex items-center border-t p-3">
              <input
                className="border-primary-300 focus:border-accent-700 flex-1 rounded-md border px-3 py-2 text-sm outline-none"
                placeholder="Nhập tin nhắn..."
                value={input}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="bg-accent-700 text-primary-0 hover:bg-accent-600 ml-2 rounded-md p-2"
              >
                <FiSend size={18} />
              </button>
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
