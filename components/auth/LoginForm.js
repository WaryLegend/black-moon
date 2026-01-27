"use client";

import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";

export default function LoginForm({ noForgot, returnUrl }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitForm = async (data) => {
    try {
      // await loginAction(data); // server action call
      reset(); // clear form
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      {/* Email Field */}
      <div className="relative">
        <input
          type="email"
          name="email"
          placeholder="Email*"
          className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          required
        />
        <FiMail className="text-accent-500 absolute top-2.5 left-3" />
        {errors?.email && (
          <p className="mt-1 text-sm text-red-500">{errors?.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="relative">
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu*"
          className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        <FiLock className="text-accent-500 absolute top-2.5 left-3" />
        {errors?.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors?.password?.message}
          </p>
        )}
      </div>

      {/* Forgot Password */}
      <div className={`text-right ${noForgot ? "hidden" : ""}`}>
        <Link
          tabIndex={-1}
          href={`/user/forgot-password${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""}`}
          className="text-accent-800 text-sm hover:underline"
        >
          Quên mật khẩu?
        </Link>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="bg-accent-500 hover:bg-accent-600 hover:text-primary-100 w-full rounded-lg py-2 transition-colors duration-200"
      >
        Đăng nhập
      </button>
    </form>
  );
}
