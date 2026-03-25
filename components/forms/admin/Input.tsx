export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`border-accent-300 bg-primary-0 disabled:bg-primary-300 hover:border-accent-700 rounded-lg border px-3 py-2 shadow-sm ${className}`}
    />
  );
}
