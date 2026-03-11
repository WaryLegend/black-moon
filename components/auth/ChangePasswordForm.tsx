"use client";

import InputPassword from "@/components/forms/common/Input-password";
import Spinner from "@/components/ui/Spinner";
import { useForm } from "react-hook-form";
import { useChangePassword } from "./useChangePassword";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";
import { ChangePasswordCredentials } from "@/types/auth";
import Button from "@/components/ui/Button";
import FormField from "@/components/forms/common/FormField";
import { FiLock } from "react-icons/fi";

function ChangePasswordForm({ onCloseModal }: { onCloseModal?: () => void }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordCredentials>();

  const { mutate: changePassword, isPending } = useChangePassword();
  const { data: user } = useCurrentAccount();

  if (!user) return;
  const { email } = user;

  const onSubmitForm = async (data: ChangePasswordCredentials) => {
    changePassword(data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  };

  return (
    <>
      <header className="mb-6 text-center">
        <h2 className="text-primary-900 text-center text-3xl font-extrabold">
          Đổi mật khẩu
        </h2>
        <p className="text-primary-600 mt-2 text-center max-lg:text-sm">
          Đổi mật khẩu cho tài khoản{" "}
          <span className="font-semibold">{email}</span>
        </p>
      </header>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmitForm)}>
        {/* Current Password */}
        <FormField
          label="Mật khẩu cũ*"
          htmlFor="currentPassword"
          icon={<FiLock />}
          error={errors.currentPassword}
        >
          <InputPassword
            id="currentPassword"
            placeholder="Mật khẩu cũ"
            disabled={isPending}
            value={watch("currentPassword")}
            {...register("currentPassword", {
              required: "Vui lòng nhập mật khẩu cũ",
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
                message:
                  "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt",
              },
            })}
          />
        </FormField>

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

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onCloseModal?.()}
          >
            Hủy
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Spinner type="mini" size={24} /> : "Xác nhận"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default ChangePasswordForm;
