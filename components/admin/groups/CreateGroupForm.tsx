"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import Input from "@/components/forms/admin/Input";
import Button from "@/components/ui/Button";
import type {
  CreateTargetGroupDto,
  TargetGroupSummary,
  UpdateTargetGroupDto,
} from "@/types/groups";

import { useCreateGroup } from "./useCreateGroup";
import { useUpdateGroup } from "./useUpdateGroup";

type CreateGroupFormProps = {
  groupToEdit?: TargetGroupSummary;
  onCloseModal?: () => void;
};

type GroupFormValues = {
  name: string;
  slug: string;
};

const getEmptyValues = (): GroupFormValues => ({
  name: "",
  slug: "",
});

const mapGroupToValues = (group?: TargetGroupSummary): GroupFormValues => {
  if (!group) return getEmptyValues();

  return {
    name: group.name ?? "",
    slug: group.slug ?? "",
  };
};

const normalizeString = (value?: string | null) => {
  const normalized = value?.trim();
  return normalized && normalized.length ? normalized : undefined;
};

const buildCreatePayload = (values: GroupFormValues): CreateTargetGroupDto => ({
  name: values.name.trim(),
  slug: normalizeString(values.slug),
});

const buildUpdatePayload = (values: GroupFormValues): UpdateTargetGroupDto => ({
  name: values.name.trim(),
  slug: normalizeString(values.slug),
});

function CreateGroupForm({ groupToEdit, onCloseModal }: CreateGroupFormProps) {
  const isEditMode = Boolean(groupToEdit);
  const initialValues = useMemo(
    () => mapGroupToValues(groupToEdit),
    [groupToEdit],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupFormValues>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const { mutate: createGroup, isPending: isCreating } = useCreateGroup();
  const { mutate: updateGroup, isPending: isUpdating } = useUpdateGroup();
  const isWorking = isCreating || isUpdating;

  const onSubmit = (values: GroupFormValues) => {
    if (isEditMode && groupToEdit) {
      updateGroup(
        {
          groupId: groupToEdit.id,
          payload: buildUpdatePayload(values),
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        },
      );
      return;
    }

    createGroup(buildCreatePayload(values), {
      onSuccess: () => {
        reset(getEmptyValues());
        onCloseModal?.();
      },
    });
  };

  const handleCancel = () => {
    reset(initialValues);
    onCloseModal?.();
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
      className="flex flex-col gap-4"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">
          {isEditMode ? "Chỉnh sửa nhóm" : "Thêm nhóm mới"}
        </h2>
        <p className="text-primary-500 text-sm">
          Nhập tên và slug cho nhóm mới.
        </p>
      </div>

      <FormRow label="Tên nhóm*" id="group-name" error={errors.name?.message}>
        <Input
          id="group-name"
          type="text"
          disabled={isWorking}
          placeholder="Ví dụ: Nữ"
          {...register("name", {
            required: "Tên nhóm là bắt buộc",
            maxLength: {
              value: 100,
              message: "Tên nhóm quá dài",
            },
          })}
        />
      </FormRow>

      <FormRow label="Slug" id="group-slug" error={errors.slug?.message}>
        <Input
          id="group-slug"
          type="text"
          disabled={isWorking}
          placeholder="Ví dụ: women (kebab-case) hoặc để trống để tự tạo"
          {...register("slug", {
            maxLength: {
              value: 100,
              message: "Slug quá dài",
            },
            pattern: {
              value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
              message: "Slug phải ở dạng kebab-case. VD: men-type, women,...",
            },
          })}
        />
      </FormRow>

      <FormRow className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={isWorking}
          onClick={handleCancel}
        >
          Hủy
        </Button>
        <Button type="submit" disabled={isWorking}>
          {isEditMode ? "Lưu thay đổi" : "Tạo nhóm"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGroupForm;
