"use client";

import { useResetPassword } from "./useResetPassword";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { ResetPasswordCredentials } from "@/types/auth";
import InputPassword from "@/components/forms/common/Input-password";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import FormField from "../forms/common/FormField";
import { FiLock } from "react-icons/fi";

type ResetPasswordFormValues = Pick<
  ResetPasswordCredentials,
  "newPassword" | "confirmPassword"
>;

function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  const returnUrl = searchParams.get("returnUrl") || undefined;

  const { mutate: resetPassword, isPending } = useResetPassword(returnUrl);

  const onSubmitForm = async (data: ResetPasswordFormValues) => {
    if (!email || !code) {
      return;
    }
    resetPassword({
      email: email,
      resetCode: code,
      ...data,
    });
  };

  return (
    <>
      <header className="mb-6 text-center">
        <h2 className="text-primary-900 text-center text-3xl font-extrabold">
          Đặt lại mật khẩu
        </h2>
        <p className="text-primary-600 mt-2 text-center max-lg:text-sm">
          Nhập mật khẩu mới cho tài khoản{" "}
          <span className="font-semibold">{email}</span>
        </p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="space-y-4">
          {/* New Password */}
          <FormField
            label="Mật khẩu mới*"
            htmlFor="newPassword"
            icon={<FiLock />}
            error={errors.newPassword}
          >
            <InputPassword
              id="newPassword"
              placeholder="Mật khẩu mới"
              disabled={isPending}
              value={watch("newPassword")}
              {...register("newPassword", {
                required: "Vui lòng xác nhận mật khẩu",
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
                  message:
                    "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt",
                },
              })}
            />
          </FormField>

          {/* Confirm Password */}
          <FormField
            htmlFor="confirmPassword"
            icon={<FiLock />}
            error={errors.confirmPassword}
          >
            <InputPassword
              placeholder="Nhập lại mật khẩu mới"
              disabled={isPending}
              value={watch("confirmPassword")}
              {...register("confirmPassword", {
                required: "Vui lòng xác nhận mật khẩu mới",
                validate: (value) =>
                  value === watch("newPassword") || "Mật khẩu mới không khớp",
              })}
            />
          </FormField>
        </div>

        <div>
          <Button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center"
          >
            {isPending ? <Spinner type="mini" size={24} /> : "Đổi mật khẩu"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default ResetPasswordForm;
