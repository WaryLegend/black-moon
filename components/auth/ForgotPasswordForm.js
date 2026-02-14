"use client";

import { useForm } from "react-hook-form";
import { FiMail } from "react-icons/fi";
import { useForgotPassword } from "./useForgotPassword";
import Spinner from "@/components/ui/Spinner";

function ForgotPasswordForm({ returnUrl }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: forgotPassword, isPending } = useForgotPassword(returnUrl);

  const onSubmitForm = async (email) => {
    forgotPassword(email);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="relative">
        <input
          type="email"
          placeholder="Email*"
          disabled={isPending}
          className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
          {...register("email", {
            required: "Vui lòng nhập email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email không hợp lệ",
            },
          })}
        />
        <FiMail className="text-accent-500 absolute top-2.5 left-3" />
        {errors?.email && (
          <p className="mt-1 text-sm text-red-600">{errors?.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-accent-500 hover:bg-accent-600 hover:text-primary-100 flex w-full items-center justify-center rounded-lg py-2 transition-colors duration-200"
      >
        {isPending ? <Spinner type="mini" size={24} /> : "Gửi email"}
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
