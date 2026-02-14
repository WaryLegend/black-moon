"use client";

import { useForm } from "react-hook-form";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { LuCake } from "react-icons/lu";
import { useRegister } from "./useRegister";
import Spinner from "@/components/ui/Spinner";
import InputPassword from "@/components/forms/Input-password";

export default function SignupForm({ returnUrl = "" }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { mutate: signUp, isPending } = useRegister(returnUrl);

  const onSubmitForm = async (data) => {
    const registerData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone || null,
      birthDate: data.dateOfBirth || null,
      gender: data.gender || null,
    };

    signUp(registerData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      {/* Email */}
      <div className="relative">
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
        <FiMail className="text-accent-500 absolute top-3 left-3" />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <InputPassword
        disabled={isPending}
        errors={errors}
        watch={watch}
        register={register}
        autoComplete="current-password"
      />

      {/* LastName & FirstName */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Họ*"
            disabled={isPending}
            className="border-accent-300 w-full rounded-lg border px-4 py-2 pl-10"
            {...register("lastName", { required: "Họ không được để trống" })}
          />
          <FaRegUser className="text-accent-500 absolute top-3 left-3" />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tên*"
            disabled={isPending}
            className="border-accent-300 w-full rounded-lg border px-4 py-2"
            {...register("firstName", { required: "Tên không được để trống" })}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="relative">
        <input
          type="tel"
          inputMode="numeric"
          placeholder="Số điện thoại"
          disabled={isPending}
          className="border-accent-300 w-full rounded-lg border px-4 py-2 pl-10"
          {...register("phone", {
            validate: (value) => {
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
        <FiPhone className="text-accent-500 absolute top-3 left-3" />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Date of Birth & Gender */}
      <div className="flex gap-4 max-[450px]:flex-col">
        <div className="flex-1">
          <div className="relative">
            <input
              type="date"
              disabled={isPending}
              className="border-accent-300 w-full rounded-lg border px-4 py-2 pl-10"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
            />
            <LuCake className="text-accent-500 absolute top-3 left-3" />
          </div>
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div className="flex-1">
          <div className="relative">
            <select
              disabled={isPending}
              className="border-accent-300 h-[41.6px] w-full rounded-lg border px-4 py-2 pl-10"
              {...register("gender", { required: "Hãy chọn giới tính" })}
            >
              <option value="">Chọn giới tính</option>
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
              <option value="OTHER">Khác</option>
            </select>
            <FaRegUser className="text-accent-500 absolute top-3 left-3" />
          </div>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-accent-500 hover:bg-accent-600 hover:text-primary-100 flex w-full items-center justify-center rounded-lg py-2 transition-colors duration-200"
      >
        {isPending ? <Spinner type="mini" size={24} /> : "Đăng ký"}
      </button>
    </form>
  );
}
