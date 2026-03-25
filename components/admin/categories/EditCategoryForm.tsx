"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import ImageInput from "@/components/forms/admin/ImageInput";
import Input from "@/components/forms/admin/Input";
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
      slug: categoryToEdit.slug,
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
          slug: values.slug.trim(),
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
      slug: categoryToEdit.slug,
      targetGroupId: categoryToEdit.targetGroup?.id ?? null,
    });
    setSelectedFile(null);
  };

  const dirtyClass = (field: keyof CategoryFormValues) =>
    dirtyFields[field] ? "border-amber-600" : "";

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type="modal"
      className="flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold">Chỉnh sửa thể loại</h2>

      <FormRow label="Tên thể loại*" id="name" error={errors.name?.message}>
        <Input
          id="name"
          disabled={isPending}
          className={dirtyClass("name")}
          {...register("name", {
            required: "Category name is required",
            maxLength: {
              value: 255,
              message: "Category name must be <= 255 chars",
            },
          })}
        />
      </FormRow>

      <FormRow label="Slug*" id="slug" error={errors.slug?.message}>
        <Input
          id="slug"
          disabled={isPending}
          className={dirtyClass("slug")}
          placeholder="kebab-case"
          {...register("slug", {
            required: "Vui lòng nhập slug",
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

      <FormRow label="Group*" helper="Group không thể chỉnh sửa">
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
