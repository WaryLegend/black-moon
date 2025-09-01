export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`border-primary-300 bg-primary-50 rounded-md border px-3 py-2 shadow-sm ${className}`}
    />
  );
}
