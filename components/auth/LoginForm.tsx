"use client";

import Link from "next/link";
import { FiLock, FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import { useAdminLogin } from "./useAdminLogin";
import { LoginCredentials } from "@/types/auth";
import Spinner from "@/components/ui/Spinner";
import InputPassword from "@/components/forms/common/Input-password";
import Button from "@/components/ui/Button";
import FormField from "../forms/common/FormField";

export default function LoginForm({ isAdmin = false, returnUrl = "" }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const { mutate: userLogin, isPending: isPendingUser } = useLogin(returnUrl);
  const { mutate: adminLogin, isPending: isPendingAdmin } = useAdminLogin();

  const isPending = isPendingUser || isPendingAdmin;

  const onSubmitForm = async (data: LoginCredentials) => {
    if (isAdmin) {
      adminLogin(data);
    } else {
      userLogin(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      {/* Email Field */}
      <FormField icon={<FiMail />} error={errors.email}>
        <input
          type="email"
          placeholder="Email*"
          disabled={isPending}
          className="border-accent-300 w-full rounded-lg border px-4 py-2 pl-10"
          {...register("email", {
            required: "Vui lòng nhập email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email không hợp lệ",
            },
          })}
        />
      </FormField>

      {/* Password Field */}
      <FormField icon={<FiLock />} error={errors.password}>
        <InputPassword
          placeholder="Mật khẩu*"
          disabled={isPending}
          value={watch("password")}
          {...register("password", {
            required: "Vui lòng nhập mật khẩu",
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
              message:
                "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt",
            },
          })}
        />
      </FormField>

      {/* Forgot Password navigation*/}
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
      <Button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center"
      >
        {isPending ? <Spinner type="mini" size={24} /> : "Đăng nhập"}
      </Button>
    </form>
  );
}
