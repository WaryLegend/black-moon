export default function FileInput({ className = "", ...props }) {
  return (
    <input
      type="file"
      className={`file:text-accent-50 file:bg-accent-600 hover:file:bg-accent-700 rounded-sm text-sm transition-colors file:mr-3 file:cursor-pointer file:rounded-sm file:border-0 file:px-3 file:py-2 file:font-medium ${className}`}
      {...props}
    />
  );
}
