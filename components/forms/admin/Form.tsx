import { FormHTMLAttributes } from "react";

type FormType = "regular" | "modal";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  type?: FormType;
  className?: string;
}

export default function Form({
  type = "regular",
  className = "",
  ...props
}: FormProps) {
  const base = "text-sm md:min-w-[700px] bg-inherit";
  const regular =
    "px-12 py-8 bg-primary-50 border border-primary-100 rounded-lg";
  const modal = "md:min-w-[650px] lg:w-[960px]";

  return (
    <form
      {...props}
      className={`${base} ${type === "regular" ? regular : ""} ${
        type === "modal" ? modal : ""
      } ${className}`}
    />
  );
}
