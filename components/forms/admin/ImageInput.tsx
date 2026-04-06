"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { HiPhotograph, HiX, HiLink } from "react-icons/hi";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";

interface ImageInputProps {
  id?: string;
  value?: File | string | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  className?: string;
}

export default function ImageInput({
  id,
  value,
  onChange,
  disabled,
  className = "",
}: ImageInputProps) {
  const generatedId = useId();
  const inputId = id ?? `image-input-${generatedId}`;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isOverDropZone, setIsOverDropzone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }
    if (typeof value === "string") {
      setPreviewUrl(value);
    } else {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value]);

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    onChange(file);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) handleFile(file);
        break;
      }
    }
  };

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {/* 1. KHU VỰC HIỂN THỊ / KÉO THẢ / CHỌN FILE */}
      <div
        className={cn(
          "relative flex h-70 w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-all",
          isOverDropZone
            ? "border-accent-500 bg-accent-50/10"
            : "border-primary-300 bg-primary-50/10",
          disabled && "cursor-not-allowed opacity-60",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsOverDropzone(true);
        }}
        onDragLeave={() => setIsOverDropzone(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsOverDropzone(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
      >
        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              sizes="500px"
              className="object-contain"
            />
            {!disabled && (
              <Button
                icon
                type="button"
                onClick={() => {
                  onChange(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className={cn(
                  "hover:bg-primary-100 text-primary-600 absolute top-2 right-2 z-10 rounded-full hover:text-red-600",
                )}
              >
                <HiX className="h-4 w-4" />
              </Button>
            )}
          </>
        ) : (
          <>
            <HiPhotograph className="text-primary-400 mb-2 h-10 w-10" />
            <p className="text-sm">
              Kéo thả ảnh vào đây hoặc{" "}
              <span
                onClick={() => {
                  if (disabled) return;
                  fileInputRef.current?.click();
                }}
                className={cn(
                  "text-accent-600 hover:underline",
                  disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
                )}
              >
                chọn file ảnh
              </span>
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-primary-300 h-px flex-1"></div>
        <span className="text-primary-600 text-xs font-medium whitespace-nowrap">
          HOẶC
        </span>
        <div className="bg-primary-300 h-px flex-1"></div>
      </div>

      {/* 2. KHU VỰC ĐIỀU KHIỂN (Paste vào đây) */}
      <div className="flex items-center gap-2">
        <div
          className="group relative flex-1"
          onPaste={handlePaste} // Lắng nghe dán ảnh tại ô input
        >
          <div className="absolute inset-y-0 left-3 flex items-center">
            <HiLink className="text-primary-400 h-4 w-4" />
          </div>
          <input
            type="text"
            readOnly
            placeholder="Dán đường liên kết của hình ảnh"
            className="border-accent-300 bg-primary-0 disabled:bg-primary-300 hover:border-accent-700 focus:ring-accent-500/50 w-full rounded-lg border py-2 pr-3 pl-9 text-sm transition-all outline-none focus:ring-2"
            disabled={disabled}
          />
        </div>

        <input
          id={inputId}
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          disabled={disabled}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
