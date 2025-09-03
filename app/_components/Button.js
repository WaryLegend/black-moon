export default function Button({
  size = "medium",
  variant = "primary",
  className = "",
  children,
  custom = false,
  ...props
}) {
  const sizeClasses = {
    small: "text-sm px-2 py-1 uppercase font-semibold text-center",
    medium: "text-md px-4 py-3 font-medium",
    large: "text-lg px-6 py-4 font-medium",
  };

  const variantClasses = {
    primary: "text-accent-50 bg-accent-600 hover:bg-accent-700",
    secondary:
      "text-primary-600 bg-primary-100 border border-primary-200 hover:bg-primary-200",
    danger: "text-red-100 bg-red-700 hover:bg-red-800",
  };

  const sumClasses = `rounded-md border-none shadow-sm transition-all ${sizeClasses[size]} ${variantClasses[variant]}`;

  return (
    <button className={`${className} ${custom ? "" : sumClasses}`} {...props}>
      {children}
    </button>
  );
}
