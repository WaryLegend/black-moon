import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import ImageInput from "@/components/forms/admin/ImageInput";
import Input from "@/components/forms/admin/Input";
import CustomSelectAsync from "@/components/filters/CustomSelectAsync";
import Button from "@/components/ui/Button";

import { useCreateCategory } from "./useCreateCategory";
import { loadTargetGroupIdOptions } from "./useTargetGroupOptions";

type CategoryFormProps = {
  onCloseModal?: () => void;
};

type CategoryFormValues = {
  name: string;
  slug: string;
  targetGroupId: number | null;
};

// const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const normalizeString = (value?: string | null) => {
  const normalized = value?.trim();
  return normalized && normalized.length ? normalized : undefined;
};

const buildCreatePayload = (
  values: CategoryFormValues,
  targetGroupId: number,
) => ({
  name: values.name.trim(),
  slug: normalizeString(values.slug),
  targetGroupId,
});

const getEmptyValues = (): CategoryFormValues => ({
  name: "",
  slug: "",
  targetGroupId: null,
});

function CreateCategoryForm({ onCloseModal }: CategoryFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: getEmptyValues(),
  });

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();

  const handleCancel = () => {
    reset(getEmptyValues());
    setSelectedFile(null);
    onCloseModal?.();
  };

  const onSubmit = (values: CategoryFormValues) => {
    if (!values.targetGroupId) return;

    createCategory(
      {
        payload: buildCreatePayload(values, Number(values.targetGroupId)),
        imageFile: selectedFile,
      },
      {
        onSuccess: () => {
          reset(getEmptyValues());
          setSelectedFile(null);
          onCloseModal?.();
        },
      },
    );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
      className="flex flex-col gap-4"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Thêm danh mục mới</h2>
        <p className="text-primary-500 text-sm">
          Thêm danh mục mới cho catalog.
        </p>
      </div>

      <FormRow label="Tên danh mục*" id="name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
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
          type="text"
          id="slug"
          disabled={isCreating}
          placeholder="VD: ten-danh-muc"
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

      <FormRow label="Nhóm đối tượng*" error={errors.targetGroupId?.message}>
        <Controller
          name="targetGroupId"
          control={control}
          rules={{ required: "Nhóm là bắt buộc" }}
          render={({ field }) => (
            <CustomSelectAsync
              filterField="targetGroupId"
              minWidth={280}
              placeholder="Chọn nhóm"
              defaultOptions
              loadOptions={loadTargetGroupIdOptions}
              isClearable
              value={field.value}
              onChange={(event) => {
                const nextValue = event.target.value;
                field.onChange(
                  nextValue === null || nextValue === ""
                    ? null
                    : Number(nextValue),
                );
              }}
              isDisabled={isCreating}
            />
          )}
        />
      </FormRow>

      <FormRow
        label="Hình ảnh"
        id="category-image"
        helper="PNG/JPG, tối đa 5MB"
      >
        <ImageInput
          id="category-image"
          value={selectedFile}
          onChange={setSelectedFile}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow className="flex justify-end gap-2">
        <Button
          variant="secondary"
          type="button"
          onClick={handleCancel}
          disabled={isCreating}
        >
          Hủy
        </Button>
        <Button type="submit" disabled={isCreating}>
          Tạo danh mục
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCategoryForm;
