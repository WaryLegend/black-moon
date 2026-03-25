import { cn } from "@/utils/cn";
import { ReactNode } from "react";

type FormRowProps = {
  label?: string;
  id?: string;
  error?: string;
  helper?: string;
  children: ReactNode;
  className?: string;
};

function FormRow({
  label,
  id,
  error,
  helper,
  children,
  className = "",
}: FormRowProps) {
  return (
    <div
      className={cn(
        `border-primary-100 grid items-center gap-3 py-3 text-[1rem] not-last:border-b first:pt-0 last:pb-0 lg:grid-cols-[0.5fr_1fr_0.5fr]`,
        className,
      )}
    >
      {label && (
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-sm text-red-600">{error}</span>}
      {!error && helper && (
        <span className="text-primary-500 text-sm">{helper}</span>
      )}
    </div>
  );
}

export default FormRow;
