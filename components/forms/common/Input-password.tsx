"use client";

import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputPasswordProps = {
  value?: string;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputPassword({
  value,
  disabled,
  placeholder = "",
  ...restProps
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  // reset eye khi input rỗng
  useEffect(() => {
    if (!value) {
      setShowPassword(false);
    }
  }, [value]);

  return (
    <>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        disabled={disabled}
        className="border-accent-300 w-full rounded-lg border px-10 py-2 pr-10"
        {...restProps}
      />

      {/* Eye icon */}
      {value && (
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
    </>
  );
}
