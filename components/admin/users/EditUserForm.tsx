"use client";

import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import Input from "@/components/forms/admin/Input";
import CustomSelect from "@/components/filters/CustomSelect";
import Button from "@/components/ui/Button";
import type { UpdateUserProfileDto, UserSummary } from "@/types/users";

import { useUpdateUser } from "./useUpdateUser";
import {
  GENDER_OPTIONS,
  type GenderValue,
  normalizeGenderValue,
} from "./userFormOptions";
import EditUserRole from "./EditUserRole";
import { useFormDirtyStyle } from "@/components/forms/admin/useFormDirtyStyle";

type EditUserFormProps = {
  user: UserSummary;
  onCloseModal?: () => void;
};

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: GenderValue | "";
  birthDate: string;
};

const formatDate = (value?: string | null) => (value ? value.slice(0, 10) : "");

const mapUserToProfileValues = (user: UserSummary): ProfileFormValues => ({
  firstName: user.profile?.firstName ?? "",
  lastName: user.profile?.lastName ?? "",
  phoneNumber: user.profile?.phoneNumber ?? "",
  gender: user.profile?.gender ?? "",
  birthDate: formatDate(user.profile?.birthDate),
});

const normalizeString = (value?: string | null) => {
  const next = value?.trim();
  return next && next.length ? next : undefined;
};

const buildProfilePayload = (
  values: ProfileFormValues,
): UpdateUserProfileDto => ({
  firstName: normalizeString(values.firstName) ?? null,
  lastName: normalizeString(values.lastName) ?? null,
  phoneNumber: normalizeString(values.phoneNumber) ?? null,
  gender: normalizeGenderValue(values.gender),
  birthDate: values.birthDate?.trim() || null,
});

function EditUserForm({ user, onCloseModal }: EditUserFormProps) {
  const defaultValues = useMemo(() => mapUserToProfileValues(user), [user]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isDirty, dirtyFields },
  } = useForm<ProfileFormValues>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const { mutate: updateUser, isPending: isUpdatingProfile } = useUpdateUser();

  const onProfileSubmit = (values: ProfileFormValues) => {
    updateUser(
      {
        userId: user.id,
        payload: buildProfilePayload(values),
      },
      {
        onSuccess: () => {
          reset(values);
        },
      },
    );
  };

  const { getDirtyClass } = useFormDirtyStyle<ProfileFormValues>(dirtyFields);

  return (
    <div className="flex flex-col gap-6 p-1">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Chỉnh sửa người dùng</h2>
        <p className="text-primary-500 text-sm">
          Cập nhật thông tin hồ sơ hoặc quyền hạn.
        </p>
      </div>

      {/* FORM 1: PROFILE */}
      <Form
        onSubmit={handleSubmit(onProfileSubmit)}
        className="flex flex-col gap-4"
      >
        <FormRow label="Họ" id="edit-last-name">
          <Input
            id="edit-last-name"
            className={getDirtyClass("lastName")}
            disabled={isUpdatingProfile}
            {...register("lastName")}
          />
        </FormRow>

        <FormRow label="Tên" id="edit-first-name">
          <Input
            id="edit-first-name"
            className={getDirtyClass("firstName")}
            disabled={isUpdatingProfile}
            {...register("firstName")}
          />
        </FormRow>

        <FormRow label="Số điện thoại" id="edit-phone">
          <Input
            id="edit-phone"
            type="tel"
            className={getDirtyClass("phoneNumber")}
            disabled={isUpdatingProfile}
            {...register("phoneNumber")}
          />
        </FormRow>

        <FormRow label="Giới tính" id="edit-gender">
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <CustomSelect
                inputId="edit-gender"
                placeholder=""
                className={getDirtyClass("gender")}
                options={GENDER_OPTIONS}
                isDisabled={isUpdatingProfile}
                value={field.value}
                onChange={(event) => {
                  const next = event.target.value;
                  field.onChange(
                    next === null ? "" : (next as GenderValue | ""),
                  );
                }}
              />
            )}
          />
        </FormRow>

        <FormRow label="Ngày sinh" id="edit-birth-date">
          <Input
            id="edit-birth-date"
            type="date"
            className={getDirtyClass("birthDate")}
            disabled={isUpdatingProfile}
            {...register("birthDate")}
          />
        </FormRow>

        {isDirty && (
          <FormRow className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              disabled={isUpdatingProfile}
              onClick={() => reset(defaultValues)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isUpdatingProfile}>
              {isUpdatingProfile ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </FormRow>
        )}
      </Form>

      {/* FORM 2: ROLE */}
      <EditUserRole user={user} />

      {/* Nút đóng chung cho Modal*/}
      <div className="flex justify-end">
        <Button type="button" onClick={onCloseModal} variant="secondary">
          Thoát trình chỉnh sửa
        </Button>
      </div>
    </div>
  );
}

export default EditUserForm;
