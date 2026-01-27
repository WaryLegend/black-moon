"use client";

import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiPhone } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { LuCake } from "react-icons/lu";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitForm = async (data) => {
    try {
      // await loginAction(data); // server action call
      reset(); // clear form
      alert("Sign up successful!");
    } catch (err) {
      console.error(err);
      alert("Sign up failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      {/* Email */}
      <div className="relative">
        <input
          type="email"
          name="email"
          placeholder="Email*"
          className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        <FiMail className="text-accent-500 absolute top-2.5 left-3" />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="relative">
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu*"
          className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        <FiLock className="text-accent-500 absolute top-2.5 left-3" />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Name */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            name="lastName"
            placeholder="Họ*"
            className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
            {...register("lastName", { required: "Last name is required" })}
          />
          <FaRegUser className="text-accent-500 absolute top-2.5 left-3" />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="relative flex-1">
          <input
            type="text"
            name="firstName"
            placeholder="Tên*"
            className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="relative">
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
          {...register("phone", {
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Phone number must be 10-15 digits",
            },
          })}
        />
        <FiPhone className="text-accent-500 absolute top-2.5 left-3" />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Date of Birth & Gender */}
      <div className="flex gap-4 max-[450px]:flex-col">
        <div className="flex-1">
          <div className="relative">
            <input
              type="date"
              name="dateOfBirth"
              className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
            />
            <LuCake className="text-accent-500 absolute top-2.5 left-3" />
          </div>
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-500">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div className="flex-1">
          <div className="relative">
            <select
              name="gender"
              className="focus:ring-accent-600 border-accent-300 h-[41.6px] w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            <FaRegUser className="text-accent-500 absolute top-2.5 left-3" />
          </div>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-accent-500 hover:bg-accent-600 hover:text-primary-100 w-full rounded-lg py-2 transition-colors duration-200"
      >
        Đăng ký
      </button>
    </form>
  );
}
