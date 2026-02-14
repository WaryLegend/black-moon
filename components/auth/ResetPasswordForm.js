"use client";

import { useResetPassword } from "./useResetPassword";
import { useForm } from "react-hook-form";
import InputPassword from "@/components/forms/Input-password";
import Spinner from "../ui/Spinner";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  const returnUrl = searchParams.get("returnUrl") || undefined;

  const { mutate: resetPassword, isPending } = useResetPassword(returnUrl);

  const onSubmitForm = async (data) => {
    if (!email || !code) {
      return;
    }
    resetPassword({
      email: email,
      resetCode: code,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-primary-900 text-center text-3xl font-extrabold">
          Đặt lại mật khẩu
        </h2>
        <p className="text-primary-600 mt-2 text-center max-lg:text-sm">
          Nhập mật khẩu mới cho tài khoản{" "}
          <span className="font-semibold">{email}</span>
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="space-y-4">
          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="mb-1 block font-medium">
              Mật khẩu mới*
            </label>
            <InputPassword
              id="newPassword"
              name="newPassword"
              disabled={isPending}
              errors={errors}
              watch={watch}
              register={register}
              rules={{
                required: "Vui lòng nhập mật khẩu",
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
                  message:
                    "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt",
                },
              }}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="mb-1 block font-medium">
              Xác nhận mật khẩu*
            </label>
            <InputPassword
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu*"
              disabled={isPending}
              errors={errors}
              watch={watch}
              register={register}
              rules={{
                required: "Vui lòng xác nhận mật khẩu",
                pattern: undefined,
                validate: (value) =>
                  value === watch("newPassword") ||
                  "Mật khẩu xác nhận không khớp",
              }}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isPending}
            className="bg-accent-500 hover:bg-accent-600 hover:text-primary-100 flex w-full items-center justify-center rounded-lg py-2 transition-colors duration-200"
          >
            {isPending ? <Spinner type="mini" size={24} /> : "Đổi mật khẩu"}
          </button>
        </div>
      </form>
    </>
  );
}

export default ResetPasswordForm;
