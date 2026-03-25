"use client";

import { useForm } from "react-hook-form";
import { FiLock, FiMail, FiPhone } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { LuCake } from "react-icons/lu";
import { useRegister } from "./useRegister";
import { RegisterCredentials } from "@/types/auth";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import InputPassword from "@/components/forms/common/Input-password";
import FormField from "../forms/common/FormField";

export default function SignupForm({ returnUrl = "" }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterCredentials>();
  const { mutate: signUp, isPending } = useRegister(returnUrl);

  const onSubmitForm = async (data: RegisterCredentials) => {
    signUp(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      {/* Email field*/}
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

      {/* Password field*/}
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

      {/* LastName & FirstName */}
      <fieldset className="flex gap-4 max-[450px]:flex-col">
        <FormField icon={<FaRegUser />} error={errors.lastName}>
          <input
            type="text"
            placeholder="Họ*"
            disabled={isPending}
            className="border-accent-300 w-full rounded-lg border px-4 py-2 pl-10"
            {...register("lastName", {
              required: "Họ không được để trống",
            })}
          />
        </FormField>

        <FormField icon={<FaRegUser />} error={errors.firstName}>
          <input
            type="text"
            placeholder="Tên*"
            disabled={isPending}
            className="border-accent-300 w-full rounded-lg border px-4 py-2 pl-10"
            {...register("firstName", {
              required: "Tên không được để trống",
            })}
          />
        </FormField>
      </fieldset>

      {/* Phone */}
      <FormField icon={<FiPhone />} error={errors.phoneNumber}>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="Số điện thoại"
          disabled={isPending}
          className="border-accent-300 w-full rounded-lg border px-4 py-2 pl-10"
          {...register("phoneNumber", {
            validate: (value) => {
              if (!value) return true;
              if (/[a-zA-Z]/.test(value)) {
                return "Số điện thoại không được chứa chữ cái";
              }
              if (!/^[0-9]{10,15}$/.test(value)) {
                return "Số điện thoại phải có 10–15 chữ số";
              }
              return true;
            },
          })}
        />
      </FormField>

      {/* Date of Birth & Gender */}
      <fieldset className="flex gap-4 max-[450px]:flex-col">
        <FormField icon={<LuCake />} error={errors.birthDate}>
          <input
            type="date"
            disabled={isPending}
            className="border-accent-300 w-full rounded-lg border px-4 py-2 pl-10"
            {...register("birthDate")}
          />
        </FormField>

        <FormField icon={<FaRegUser />} error={errors.gender}>
          <select
            disabled={isPending}
            className="border-accent-300 bg-primary-0 h-[41.6px] w-full rounded-lg border px-4 py-2 pl-10"
            {...register("gender")}
          >
            <option value="">Chọn giới tính</option>
            <option value="MALE">Nam</option>
            <option value="FEMALE">Nữ</option>
            <option value="OTHER">Khác</option>
          </select>
        </FormField>
      </fieldset>

      <Button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center"
      >
        {isPending ? <Spinner type="mini" size={24} /> : "Đăng ký"}
      </Button>
    </form>
  );
}
