import { cn } from "@/utils/cn";
import { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  suggestions?: string[];
  onSuggestionClick?: (value: string) => void;
};

export default function Textarea({
  className = "",
  maxLength,
  value,
  suggestions = [],
  onSuggestionClick,
  ...props
}: TextareaProps) {
  const currentLength = value ? String(value).length : 0;

  return (
    <div className="relative">
      <textarea
        className={cn(
          `border-primary-300 bg-primary-50 min-h-16 w-full rounded border px-3 py-2 shadow-sm`,
          className,
        )}
        {...props}
      />
      {maxLength && (
        <div className="text-primary-400 pointer-events-none absolute right-4 bottom-2 text-xs">
          {currentLength}/{maxLength}
        </div>
      )}
      {/* Hàng gợi ý nhanh */}
      {!value && suggestions.length > 0 && (
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-0">
          {suggestions.map((text) => (
            <button
              key={text}
              type="button"
              onClick={() => onSuggestionClick?.(text)}
              className="border-primary-300 hover:bg-primary-100 hover:border-primary-400 text-primary-600 bg-primary-0 border px-2 py-0.5 text-[11px] transition-colors"
            >
              + {text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
