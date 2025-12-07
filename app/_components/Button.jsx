export default function Button({
  size = "medium",
  variant = "primary",
  className = "",
  children,
  icon = false,
  ...props
}) {
  const sizeClasses = {
    small: "text-sm px-2 py-1 uppercase font-semibold text-center",
    medium: "text-[1rem] px-4 py-3 font-medium",
    large: "text-lg px-6 py-4 font-medium",
  };

  const variantClasses = {
    primary:
      "text-primary-50 bg-accent-600 hover:bg-accent-700 hover:text-primary-0 rounded-lg border-none shadow-sm",
    secondary:
      "text-primary-600 bg-primary-100 border border-primary-200 hover:bg-primary-200 hover:text-primary-800 rounded-lg border-none shadow-sm",
    danger:
      "text-red-50 bg-red-600 hover:bg-red-700 rounded-lg border-none shadow-sm",
  };

  const sumClasses = icon
    ? "transition-all flex items-center justify-center p-1 hover:bg-primary-100"
    : `transition-all ${sizeClasses[size]} ${variantClasses[variant]}`;

  return (
    <button className={`${sumClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
