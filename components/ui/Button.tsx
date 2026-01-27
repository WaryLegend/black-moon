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
        className={`hover:bg-primary-100 flex items-center justify-center p-1 transition-all ${className}`}
        {...props}
      >
        {children}
      </button>
    );

  const defaultSize = size ?? "medium";
  const defaultVariant = variant ?? "primary";

  const sizeClasses: Record<ButtonSize, string> = {
    small: "text-sm px-2 py-1 uppercase font-semibold text-center",
    medium: "text-[1rem] px-4 py-3 font-medium",
    large: "text-lg px-6 py-4 font-medium",
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "text-primary-50 bg-accent-600 hover:bg-accent-700 hover:text-primary-0 rounded-lg border-none shadow-sm",
    secondary:
      "text-primary-600 bg-primary-100 border border-primary-200 hover:bg-primary-200 hover:text-primary-800 rounded-lg border-none shadow-sm",
    danger:
      "text-red-50 bg-red-600 hover:bg-red-700 rounded-lg border-none shadow-sm",
  };

  // base text button and shape
  return (
    <button
      className={`transition-all ${sizeClasses[defaultSize]} ${variantClasses[defaultVariant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
