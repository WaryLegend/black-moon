"use client";

import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import { useState } from "react";
import Button from "./Button";

export default function LoginForm({ noForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here (e.g., API call)
    console.log("Login attempted with:", { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Field */}
      <div className="relative">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email*"
          className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
          required
        />
        <FiMail className="text-accent-500 absolute top-2.5 left-3" />
      </div>

      {/* Password Field */}
      <div className="relative">
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu*"
          className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
          required
        />
        <FiLock className="text-accent-500 absolute top-2.5 left-3" />
      </div>

      {/* Forgot Password */}
      <div className={`text-right ${noForgot ? "hidden" : ""}`}>
        <Link
          tabIndex={-1}
          href="/forgot-password"
          className="text-primary-800 text-sm hover:underline"
        >
          Quên mật khẩu?
        </Link>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="bg-accent-500 hover:bg-accent-800 hover:text-primary-100 w-full rounded-lg py-2 transition-colors"
      >
        Đăng nhập
      </button>
    </form>
  );
}
