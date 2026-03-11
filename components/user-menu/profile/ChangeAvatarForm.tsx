"use client";

import { useState, useRef } from "react";
import type { ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import { HiCloudUpload, HiExclamation, HiPhotograph } from "react-icons/hi";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

import { useChangeAvatar } from "./useChangeAvatar";

interface ChangeAvatarFormProps {
  currentAvatar?: string | null;
  onCloseModal?: () => void;
}

function ChangeAvatarForm({
  currentAvatar,
  onCloseModal,
}: ChangeAvatarFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate, isPending } = useChangeAvatar();

  // Image constraints
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  const RECOMMENDED_DIMENSIONS = "500x500 pixels";

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    validateAndSetImage(file);
  };

  const validateAndSetImage = (file: File) => {
    // Clear previous error
    setError(null);
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError(
        `Kích thước ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
      );
      return;
    }
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Chỉ chấp nhận ảnh định dạng JPG, PNG hoặc WEBP.");
      return;
    }
    // Create file preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      setPreviewUrl(result);
      setSelectedImage(file);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      validateAndSetImage(file);
    }
  };

  const handleSave = () => {
    if (!selectedImage) {
      setError("Vui lòng chọn ảnh trước khi lưu.");
      return;
    }

    setError(null);
    mutate(selectedImage, {
      onSuccess: () => {
        resetSelection();
        onCloseModal?.();
      },
      onError: (mutationError: any) => {
        const message =
          mutationError?.response?.data?.message ??
          mutationError?.message ??
          "Cập nhật ảnh đại diện thất bại";
        setError(message);
      },
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const resetSelection = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4 lg:space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Thay đổi ảnh đại diện</h2>
        <p className="text-primary-600 mt-2">Chọn ảnh từ thiết bị của bạn</p>
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row lg:gap-8">
        {/* Image preview area */}
        <div
          className={`relative h-54 w-54 shrink-0 overflow-hidden rounded-lg border-2 border-dashed lg:h-64 lg:w-64 ${isDragging ? "border-accent-500 bg-accent-50" : "border-primary-300"} transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          {previewUrl ? (
            <>
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
              <div className="bg-primary-900/30 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
                <HiPhotograph className="text-primary-0 h-12 w-12" />
                <span className="text-primary-0">Nhấn để thay đổi</span>
              </div>
            </>
          ) : currentAvatar ? (
            <>
              <Image
                src={currentAvatar}
                alt="Current avatar"
                fill
                className="object-cover"
              />
              <div className="bg-primary-900/30 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
                <HiPhotograph className="text-primary-0 h-12 w-12" />
                <span className="text-primary-0">Nhấn để chọn ảnh mới</span>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <HiCloudUpload className="text-primary-400 h-12 w-12 lg:h-16 lg:w-16" />
              <p className="text-primary-600 mt-4 text-center">
                Kéo thả ảnh vào đây <br />
                hoặc nhấn để chọn ảnh
              </p>
              <p className="text-primary-500 mt-2 text-sm">
                Đề xuất: {RECOMMENDED_DIMENSIONS}
              </p>
            </div>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
          />
        </div>

        {/* File info and error */}
        <div className="flex-1 space-y-3 sm:min-w-80">
          {selectedImage && (
            <div className="bg-primary-100 rounded-lg px-4 py-2">
              <p className="font-medium">Thông tin ảnh:</p>
              <p className="text-primary-600 text-sm">
                Tên: {selectedImage.name}
              </p>
              <p className="text-primary-600 text-sm">
                Kích thước: {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3">
              <HiExclamation className="mt-0.5 h-5 w-5 text-red-600" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Requirements info */}
          <div className="bg-primary-100 rounded-lg px-4 py-2">
            <p className="font-medium">Yêu cầu:</p>
            <ul className="text-primary-600 mt-1 list-disc space-y-1 pl-5 text-sm">
              <li>Định dạng: JPG, PNG, WEBP</li>
              <li>Kích thước tối đa: {MAX_FILE_SIZE / 1024 / 1024}MB</li>
              <li>Đề xuất: ảnh vuông tỷ lệ 1:1</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => {
            resetSelection();
            onCloseModal?.();
          }}
          disabled={isPending}
        >
          Hủy
        </Button>
        <Button
          className="flex flex-1 items-center justify-center"
          onClick={handleSave}
          disabled={!selectedImage || isPending}
        >
          {isPending ? (
            <Spinner type="mini" size={24} />
          ) : currentAvatar ? (
            "Cập nhật ảnh"
          ) : (
            "Thêm ảnh"
          )}
        </Button>
      </div>
    </div>
  );
}

export default ChangeAvatarForm;
