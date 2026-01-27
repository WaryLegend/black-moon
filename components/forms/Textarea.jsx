export default function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`border-primary-300 bg-primary-50 h-32 w-full rounded border px-3 py-2 shadow-sm ${className}`}
      {...props}
    />
  );
}
