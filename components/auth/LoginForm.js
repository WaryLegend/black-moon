"use client";

import Link from "next/link";
import { FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import { useAdminLogin } from "./useAdminLogin";
import Spinner from "@/components/ui/Spinner";
import InputPassword from "@/components/forms/Input-password";

export default function LoginForm({ isAdmin = false, returnUrl = "" }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate: userLogin, isPending: isPendingUser } = useLogin(returnUrl);
  const { mutate: adminLogin, isPending: isPendingAdmin } = useAdminLogin();

  const isLoading = isPendingUser || isPendingAdmin;

  const onSubmitForm = async (data) => {
    if (isAdmin) {
      adminLogin(data);
    } else {
      userLogin(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      {/* Email Field */}
      <div className="relative">
        <input
          type="email"
          placeholder="Email*"
          disabled={isLoading}
          className="border-accent-300 w-full rounded-lg border px-4 py-2 pl-10"
          {...register("email", {
            required: "Vui lòng nhập email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email không hợp lệ",
            },
          })}
        />
        <FiMail className="text-accent-500 absolute top-3 left-3" />
        {errors?.email && (
          <p className="mt-1 text-sm text-red-600">{errors?.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <InputPassword
        disabled={isLoading}
        errors={errors}
        watch={watch}
        register={register}
        autoComplete="current-password"
      />

      {/* Forgot Password */}
      <div className={`text-right`}>
        <Link
          tabIndex={-1}
          href={`/${isAdmin ? "admin" : "user"}/forgot-password${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""}`}
          className="text-accent-600 text-sm hover:underline"
        >
          Quên mật khẩu?
        </Link>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-accent-500 hover:bg-accent-600 hover:text-primary-100 flex w-full items-center justify-center rounded-lg py-2 transition-colors duration-200"
      >
        {isLoading ? <Spinner type="mini" size={24} /> : "Đăng nhập"}
      </button>
    </form>
  );
}
