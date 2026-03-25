"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";

import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import Input from "@/components/forms/admin/Input";
import Selector from "@/components/forms/admin/Selector";
import Button from "@/components/ui/Button";
import type { CreateUserDto } from "@/types/users";

import { useCreateUser } from "./useCreateUser";
import {
  GENDER_OPTIONS,
  ROLE_OPTIONS,
  DEFAULT_ROLE,
  type GenderValue,
  normalizeGenderValue,
} from "./userFormOptions";

type CreateUserFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roleName: string;
  activated: boolean;
  gender: GenderValue | "";
  birthDate: string;
};
type CreateUserFormProps = {
  onCloseModal?: () => void;
};

const BASE_VALUES: CreateUserFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  roleName: DEFAULT_ROLE,
  activated: true,
  gender: "",
  birthDate: "",
};

const getDefaultValues = (): CreateUserFormValues => ({ ...BASE_VALUES });

const normalizeString = (value?: string | null) => {
  const next = value?.trim();
  return next && next.length ? next : undefined;
};

const buildPayload = (values: CreateUserFormValues): CreateUserDto => ({
  email: values.email.trim(),
  password: values.password,
  roleName: values.roleName.toUpperCase(),
  activated: values.activated,
  firstName: normalizeString(values.firstName) ?? null,
  lastName: normalizeString(values.lastName) ?? null,
  phoneNumber: normalizeString(values.phoneNumber) ?? null,
  gender: normalizeGenderValue(values.gender),
  birthDate: values.birthDate?.trim() || null,
});

function CreateUserForm({ onCloseModal }: CreateUserFormProps) {
  const defaultValues = useMemo(() => getDefaultValues(), []);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
    defaultValues,
  });

  const passwordValue = watch("password");
  const isActivated = watch("activated");

  const { mutate: createUser, isPending } = useCreateUser();

  const onSubmit = (values: CreateUserFormValues) => {
    createUser(buildPayload(values), {
      onSuccess: () => {
        reset(getDefaultValues());
        onCloseModal?.();
      },
    });
  };

  const handleCancel = () => {
    reset(getDefaultValues());
    onCloseModal?.();
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type="modal"
      className="flex flex-col gap-4"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Thêm người dùng</h2>
        <p className="text-primary-500 text-sm">
          Điền đầy đủ thông tin bắt buộc khi tạo người dùng mới.
        </p>
      </div>

      <FormRow label="Email*" id="create-email" error={errors.email?.message}>
        <Input
          id="create-email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isPending}
          {...register("email", {
            required: "Email là bắt buộc",
          })}
        />
      </FormRow>

      <FormRow
        label="Mật khẩu*"
        id="create-password"
        error={errors.password?.message}
      >
        <Input
          id="create-password"
          type="password"
          autoComplete="new-password"
          disabled={isPending}
          {...register("password", {
            required: "Mật khẩu là bắt buộc",
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
              message:
                "Mật khẩu phải có ít nhất 8 ký tự gồm chữ, số và ký tự đặc biệt",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Xác nhận mật khẩu*"
        id="create-confirm-password"
        error={errors.confirmPassword?.message}
      >
        <Input
          id="create-confirm-password"
          type="password"
          autoComplete="new-password"
          disabled={isPending}
          {...register("confirmPassword", {
            required: "Vui lòng xác nhận mật khẩu",
            validate: (value) =>
              value === passwordValue || "Mật khẩu xác nhận không khớp",
          })}
        />
      </FormRow>

      <FormRow label="Họ" id="create-last-name">
        <Input
          id="create-last-name"
          type="text"
          autoComplete="family-name"
          placeholder="Nguyễn"
          disabled={isPending}
          {...register("lastName")}
        />
      </FormRow>

      <FormRow label="Tên" id="create-first-name">
        <Input
          id="create-first-name"
          type="text"
          autoComplete="given-name"
          placeholder="An"
          disabled={isPending}
          {...register("firstName")}
        />
      </FormRow>

      <FormRow label="Số điện thoại" id="create-phone">
        <Input
          id="create-phone"
          type="tel"
          autoComplete="tel"
          placeholder="0901234567"
          disabled={isPending}
          {...register("phoneNumber")}
        />
      </FormRow>

      <FormRow label="Giới tính" id="create-gender">
        <Selector
          id="create-gender"
          placeholder="Chọn giới tính"
          disabled={isPending}
          options={GENDER_OPTIONS}
          {...register("gender")}
        />
      </FormRow>

      <FormRow label="Ngày sinh" id="create-birth-date">
        <Input
          id="create-birth-date"
          type="date"
          disabled={isPending}
          {...register("birthDate")}
        />
      </FormRow>

      <FormRow
        label="Phân quyền*"
        id="create-role"
        error={errors.roleName?.message}
      >
        <Selector
          id="create-role"
          placeholder="Chọn vai trò"
          disabled={isPending}
          options={ROLE_OPTIONS}
          {...register("roleName", { required: "Vui lòng chọn vai trò" })}
        />
      </FormRow>

      <FormRow label="Trạng thái" helper="Bỏ chọn để tạm khóa người dùng">
        <label
          htmlFor="create-activated"
          className="flex items-center gap-3 text-sm font-medium"
        >
          <input
            id="create-activated"
            type="checkbox"
            className="accent-accent-600 border-primary-400 h-4 w-4 cursor-pointer rounded border disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending}
            {...register("activated")}
          />
          {isActivated ? "Đã kích hoạt" : "Đang bị khóa"}
        </label>
      </FormRow>

      <FormRow className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={isPending}
          onClick={handleCancel}
        >
          Hủy
        </Button>
        <Button type="submit" disabled={isPending}>
          Tạo người dùng
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateUserForm;
