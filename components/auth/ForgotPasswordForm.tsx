"use client";

import { ForgotPasswordCredentials } from "@/types/auth";
import { useForm } from "react-hook-form";
import { FiMail } from "react-icons/fi";
import { useForgotPassword } from "./useForgotPassword";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import FormField from "../forms/common/FormField";

function ForgotPasswordForm({ returnUrl = "" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordCredentials>();

  const { mutate: forgotPassword, isPending } = useForgotPassword(returnUrl);

  const onSubmitForm = async (data: ForgotPasswordCredentials) => {
    forgotPassword(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmitForm)}>
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

      <Button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center"
      >
        {isPending ? <Spinner type="mini" size={24} /> : "Gửi email"}
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;
