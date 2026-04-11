"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import ImageInput from "@/components/forms/admin/ImageInput";
import Input from "@/components/forms/admin/Input";
import { useFormDirtyStyle } from "@/components/forms/admin/useFormDirtyStyle";
import CustomSelectAsync from "@/components/filters/CustomSelectAsync";
import Button from "@/components/ui/Button";
import type { CategorySummary } from "@/types/categories";

import { useUpdateCategory } from "./useUpdateCategory";

type EditCategoryFormProps = {
  categoryToEdit: CategorySummary;
  onCloseModal?: () => void;
};

type CategoryFormValues = {
  name: string;
  slug: string;
  targetGroupId: number | null;
};

const normalizeString = (value?: string | null) => {
  const normalized = value?.trim();
  return normalized && normalized.length ? normalized : undefined;
};

export default function EditCategoryForm({
  categoryToEdit,
  onCloseModal,
}: EditCategoryFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate: updateCategory, isPending } = useUpdateCategory();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      name: categoryToEdit.name,
      slug: categoryToEdit.slug ?? "",
      targetGroupId: categoryToEdit.targetGroup?.id ?? null,
    },
  });

  const defaultGroupOption = categoryToEdit.targetGroup
    ? [
        {
          value: categoryToEdit.targetGroup.id,
          label: categoryToEdit.targetGroup.name,
        },
      ]
    : [];

  const loadLockedGroupOptions = async () => defaultGroupOption;

  const onSubmit = (values: CategoryFormValues) => {
    const lockedTargetGroupId =
      categoryToEdit.targetGroup?.id ?? values.targetGroupId;
    if (!lockedTargetGroupId) return;

    updateCategory(
      {
        categoryId: categoryToEdit.id,
        payload: {
          name: values.name.trim(),
          slug: normalizeString(values.slug),
          targetGroupId: Number(lockedTargetGroupId),
        },
        imageFile: selectedFile,
      },
      {
        onSuccess: () => onCloseModal?.(),
      },
    );
  };

  const handleCancel = () => {
    reset({
      name: categoryToEdit.name,
      slug: categoryToEdit.slug ?? "",
      targetGroupId: categoryToEdit.targetGroup?.id ?? null,
    });
    setSelectedFile(null);
    if (!isDirty) onCloseModal?.();
  };
  const { getDirtyClass } = useFormDirtyStyle<CategoryFormValues>(dirtyFields);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type="modal"
      className="flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold">Chỉnh sửa danh mục</h2>

      <FormRow label="Tên danh mục*" id="name" error={errors.name?.message}>
        <Input
          id="name"
          disabled={isPending}
          className={getDirtyClass("name")}
          {...register("name", {
            required: "Tên danh mục là bắt buộc",
            maxLength: {
              value: 255,
              message: "Tên danh mục quá dài",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Slug"
        id="slug"
        error={errors.slug?.message}
        helper="kebab-case, có thể để trống để tự tạo"
      >
        <Input
          id="slug"
          disabled={isPending}
          className={getDirtyClass("slug")}
          placeholder="VD: ten-danh-mục"
          {...register("slug", {
            maxLength: {
              value: 255,
              message: "Slug quá dài",
            },
            pattern: {
              value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
              message: "Slug phải ở dạng kebab-case",
            },
          })}
        />
      </FormRow>

      <FormRow label="Nhóm đối tượng*">
        <Controller
          name="targetGroupId"
          control={control}
          render={({ field }) => (
            <CustomSelectAsync
              filterField="targetGroupId"
              defaultOptions={defaultGroupOption}
              loadOptions={loadLockedGroupOptions}
              value={field.value}
              onChange={(event) => {
                const nextValue = event.target.value;
                field.onChange(
                  nextValue === null || nextValue === ""
                    ? null
                    : Number(nextValue),
                );
              }}
              isDisabled
            />
          )}
        />
      </FormRow>

      <FormRow
        label="Hình ảnh"
        id="category-edit-image"
        helper="PNG/JPG, tối đa 5MB"
      >
        <ImageInput
          id="category-edit-image"
          value={selectedFile || categoryToEdit.imageUrl}
          onChange={setSelectedFile}
          disabled={isPending}
        />
      </FormRow>

      <FormRow className="flex justify-end gap-2">
        <Button
          variant="secondary"
          type="button"
          onClick={handleCancel}
          disabled={isPending}
        >
          Hủy
        </Button>
        <Button
          type="submit"
          disabled={isPending || (!isDirty && selectedFile === null)}
        >
          Lưu thay đổi
        </Button>
      </FormRow>
    </Form>
  );
}
