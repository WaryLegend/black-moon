"use client";

import React, { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/forms/Input-OTP";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { useVerifyOtp } from "@/components/auth/useVerifyOtp";
import { useVerifyResetPassword } from "@/components/auth/useVerifyResetPassword";
import { useSearchParams } from "next/navigation";
import { authApi } from "@/services/auth.api";
import { cn } from "@/lib/utils/cn";
import toast from "react-hot-toast";
import TextButton from "@/components/ui/TextButton";
import Spinner from "@/components/ui/Spinner";

const VerifyOtpForm = ({ returnUrl = "" }) => {
  const [otpValue, setOtpValue] = useState("");
  const { mutate: verifyOtp, isPending: isVerifyingOtp } =
    useVerifyOtp(returnUrl);
  const { mutate: verifyResetPassword, isPending: isVerifyingReset } =
    useVerifyResetPassword(returnUrl);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const type = searchParams.get("type");

  const [isPendingResend, setIsPendingResend] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const isSubmitting = isVerifyingOtp || isVerifyingReset;

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!email) {
      toast.error("Email không hợp lệ. Vui lòng quay lại trang đăng ký.");
      return;
    }
    if (otpValue.length !== 6) {
      toast.error("Mã OTP không hợp lệ. Vui lòng nhập đủ 6 ký tự số.");
      return;
    }

    if (type === "reset-password") {
      verifyResetPassword({ email: email || "", resetCode: otpValue });
    } else {
      verifyOtp({ email: email || "", activationCode: otpValue });
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email không hợp lệ. Vui lòng quay lại trang đăng ký.");
      return;
    }
    try {
      setIsPendingResend(true);
      if (type === "reset-password") {
        await authApi.forgotPassword({ email: email || "" });
      } else {
        await authApi.sendVerificationEmail(email || "");
      }
      toast.success("Đã gửi lại mã OTP. Vui lòng kiểm tra hộp thư của bạn.");
      setCountdown(60);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsPendingResend(false);
    }
  };

  const isResendDisabled = isPendingResend || countdown > 0;

  return (
    <>
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-primary-900 mt-2 text-3xl font-bold">
          Xác thực tài khoản
        </h2>
        <p className="text-primary-600 mt-2 max-lg:text-sm">
          Mã OTP <span className="text-primary-800 font-semibold">6 số</span> đã
          được gửi tới{" "}
          <span className="text-primary-800 font-semibold">
            {email || "email của bạn"}.{" "}
          </span>
          Vui lòng nhập mã để tiếp tục.
        </p>
      </div>

      {/* OTP input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center">
          <InputOTP
            pattern={REGEXP_ONLY_DIGITS}
            maxLength={6}
            value={otpValue}
            onChange={(val) => setOtpValue(val)}
          >
            <InputOTPGroup className="gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="focus-visible:border-accent-500 focus-visible:ring-accent-500 border-primary-300 text-accent-600 bg-primary-0 h-12 w-10 rounded-lg border text-lg font-semibold shadow-sm focus-visible:ring-1"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Resend */}
        <div className="flex items-center justify-center gap-1 text-xs sm:text-sm">
          <p className="text-primary-600">Không nhận được mã?</p>
          <TextButton
            onClick={handleResendCode}
            disabled={isResendDisabled}
            className={cn(
              "text-xs font-medium underline-offset-2 sm:text-sm",
              isResendDisabled
                ? "text-primary-400"
                : "text-accent-600 hover:text-accent-700 hover:underline",
            )}
          >
            {isPendingResend
              ? "Đang gửi mã..."
              : `Gửi lại mã${countdown > 0 ? ` (${countdown}s)` : ""}`}
          </TextButton>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-accent-500 hover:bg-accent-600 hover:text-primary-200 flex w-full items-center justify-center rounded-lg py-2 transition-colors duration-200"
        >
          {isSubmitting ? <Spinner type="mini" size={24} /> : "Xác thực"}
        </button>
      </form>
    </>
  );
};

export default VerifyOtpForm;
