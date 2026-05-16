"use client";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { LuCake } from "react-icons/lu";
import type { ProfileDetails } from "@/types/profile";
import { useEditProfile } from "./useEditProfile";
import FormField from "@/components/forms/common/FormField";
import { useFormDirtyStyle } from "@/components/forms/admin/useFormDirtyStyle";
import { cn } from "@/utils/cn";

type EditProfileValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  gender: ProfileDetails["gender"] | "";
};

const mapProfileToFormValues = (
  profile?: ProfileDetails | null,
): EditProfileValues => ({
  firstName: profile?.firstName ?? "",
  lastName: profile?.lastName ?? "",
  phoneNumber: profile?.phoneNumber ?? "",
  birthDate: profile?.birthDate?.slice(0, 10) ?? "",
  gender: profile?.gender ?? "",
});

export default function EditProfileForm({
  profile,
  onCloseModal,
}: {
  profile?: ProfileDetails | null;
  onCloseModal?: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors, dirtyFields },
  } = useForm<EditProfileValues>({
    defaultValues: mapProfileToFormValues(profile),
  });
  const { mutate: editProfile, isPending } = useEditProfile();

  useEffect(() => {
    reset(mapProfileToFormValues(profile));
  }, [profile, reset]);

  const onSubmitForm = (data: EditProfileValues) => {
    const trimOrNull = (value: string) => {
      const normalized = value?.trim();
      return normalized.length > 0 ? normalized : null;
    };

    editProfile(
      {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phoneNumber: trimOrNull(data.phoneNumber),
        birthDate: data.birthDate || null,
        gender: (data.gender as ProfileDetails["gender"]) || null,
      },
      {
        onSuccess: (updatedAccount) => {
          reset(mapProfileToFormValues(updatedAccount.profile));
          onCloseModal?.();
        },
      },
    );
  };

  const { getDirtyClass } = useFormDirtyStyle<EditProfileValues>(dirtyFields);

  return (
    <>
      <header className="mb-6 text-center">
        <h2 className="text-primary-900 text-center text-3xl font-extrabold">
          Cài đặt thông tin
        </h2>
      </header>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        {/* LastName & FirstName */}
        <fieldset className="flex gap-4 max-[450px]:flex-col">
          <FormField
            label="Họ*"
            htmlFor="lastName"
            icon={<FaRegUser />}
            error={errors.lastName}
          >
            <input
              type="text"
              id="lastName"
              placeholder="Họ*"
              disabled={isPending}
              className={cn(
                `border-accent-300 w-full rounded-lg border px-4 py-2 pl-10`,
                getDirtyClass("lastName"),
              )}
              {...register("lastName", {
                required: "Họ không được để trống",
              })}
            />
          </FormField>

          <FormField
            label="Tên*"
            htmlFor="firstName"
            icon={<FaRegUser />}
            error={errors.firstName}
          >
            <input
              type="text"
              id="firstName"
              placeholder="Tên*"
              disabled={isPending}
              className={cn(
                `border-accent-300 w-full rounded-lg border px-4 py-2 pl-10`,
                getDirtyClass("firstName"),
              )}
              {...register("firstName", {
                required: "Tên không được để trống",
              })}
            />
          </FormField>
        </fieldset>

        {/* Phone */}
        <FormField
          label="Số điện thoại"
          htmlFor="phoneNumber"
          icon={<FiPhone />}
          error={errors.phoneNumber}
        >
          <input
            type="tel"
            inputMode="numeric"
            id="phoneNumber"
            placeholder="Số điện thoại"
            disabled={isPending}
            className={cn(
              `border-accent-300 w-full rounded-lg border px-4 py-2 pl-10`,
              getDirtyClass("phoneNumber"),
            )}
            {...register("phoneNumber", {
              validate: (value) => {
                if (!value) return true;
                if (/[a-zA-Z]/.test(value)) {
                  return "Số điện thoại không được chứa chữ cái";
                }
                if (!/^[0-9]{10,15}$/.test(value)) {
                  return "Số điện thoại phải có 10–15 chữ số";
                }
                return true;
              },
            })}
          />
        </FormField>

        {/* Date of Birth & Gender */}
        <fieldset className="flex gap-4 max-[450px]:flex-col">
          <FormField
            label="Ngày sinh"
            htmlFor="birthDate"
            icon={<LuCake />}
            error={errors.birthDate}
          >
            <input
              type="date"
              id="birthDate"
              disabled={isPending}
              className={cn(
                `border-accent-300 w-full rounded-lg border px-4 py-2 pl-10`,
                getDirtyClass("birthDate"),
              )}
              {...register("birthDate")}
            />
          </FormField>

          <FormField
            label="Giới tính"
            htmlFor="gender"
            icon={<FaRegUser />}
            error={errors.gender}
          >
            <select
              disabled={isPending}
              className={cn(
                `border-accent-300 bg-primary-0 h-[41.6px] w-full rounded-lg border px-4 py-2 pl-10`,
                getDirtyClass("gender"),
              )}
              {...register("gender")}
            >
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
              <option value="OTHER">Khác</option>
            </select>
          </FormField>
        </fieldset>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onCloseModal?.()}
          >
            Hủy
          </Button>
          <Button type="submit" disabled={isPending || !isDirty}>
            {isPending ? <Spinner type="mini" size={24} /> : "Xác nhận"}
          </Button>
        </div>
      </form>
    </>
  );
}
