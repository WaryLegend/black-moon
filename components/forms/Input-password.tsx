"use client";

import {
  RegisterOptions,
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from "react";

type InputPasswordProps = {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  errors?: FieldErrors<any> | any;
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  id?: string;
  rules?: RegisterOptions;
  // ─────────────────────────────────────────────────────
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

export default function InputPassword({
  register,
  watch,
  errors,
  disabled,
  name = "password",
  placeholder = "Mật khẩu*",
  rules,
  ...restProps
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  const passwordValue = watch(name);

  // Reset eye khi input rỗng (native-like)
  useEffect(() => {
    if (!passwordValue) {
      setShowPassword(false);
    }
  }, [passwordValue]);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        disabled={disabled}
        {...restProps}
        className="border-accent-300 w-full rounded-lg border px-10 py-2"
        {...register(name, rules)}
      />

      {/* Lock icon */}
      <FiLock className="text-accent-500 absolute top-3 left-3" />

      {/* Eye icon – chỉ hiện khi có value */}
      {passwordValue && (
        <button
          type="button"
          aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          onClick={() => setShowPassword((v) => !v)}
          className="text-accent-500 hover:text-accent-700 absolute top-3 right-3"
          tabIndex={-1}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      )}

      {/* Error */}
      {errors?.[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
}
