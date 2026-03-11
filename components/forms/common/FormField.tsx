import { FieldError } from "react-hook-form";
import { ReactNode } from "react";

type FormFieldProps = {
  label?: string;
  htmlFor?: string;
  error?: FieldError;
  icon?: ReactNode;
  children: ReactNode;
};

export default function FormField({
  label,
  htmlFor,
  error,
  icon,
  children,
}: FormFieldProps) {
  return (
    <div className="flex-1">
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-primary-600 mb-1 block font-medium"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="text-accent-500 absolute top-3 left-3">{icon}</span>
        )}
        {children}
        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      </div>
    </div>
  );
}
