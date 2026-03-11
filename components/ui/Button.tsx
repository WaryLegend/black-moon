import { cn } from "@/utils/cn";
import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "primary" | "secondary" | "danger";

type BaseProps = {
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type IconButtonProps = {
  icon: true;
  size?: never;
  variant?: never;
};

type TextButtonProps = {
  icon?: false;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonProps = BaseProps & (IconButtonProps | TextButtonProps);

export default function Button({
  size,
  variant,
  className = "",
  children,
  icon = false,
  ...props
}: ButtonProps) {
  // icon button
  if (icon)
    return (
      <button
        className={cn(
          "hover:not-disabled:bg-primary-100 flex items-center justify-center p-1 transition-all duration-200",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );

  // text button
  const defaultSize = size ?? "medium";
  const defaultVariant = variant ?? "primary";

  const sizeClasses: Record<ButtonSize, string> = {
    small: "text-sm px-2 py-1 font-semibold text-center",
    medium: "text-[1rem] px-4 py-2 font-medium",
    large: "text-lg px-6 py-4 font-medium",
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "text-primary-100 bg-accent-600 hover:not-disabled:bg-accent-700 hover:not-disabled:text-primary-200 rounded-lg border-none shadow-sm",
    secondary:
      "text-accent-600 border border-accent-300 hover:not-disabled:bg-accent-50 hover:not-disabled:text-accent-800 rounded-lg shadow-sm",
    danger:
      "text-red-50 bg-red-600 hover:not-disabled:bg-red-700 rounded-lg border-none shadow-sm",
  };

  // base text button and shape
  return (
    <button
      className={cn(
        `disabled:text-primary-500 disabled:border-primary-300 disabled:bg-primary-200 transition-all duration-200 ${sizeClasses[defaultSize]} ${variantClasses[defaultVariant]}`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
