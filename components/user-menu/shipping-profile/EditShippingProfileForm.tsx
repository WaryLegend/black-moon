"use client";

import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import Input from "@/components/forms/admin/Input";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import CustomSelectAsync from "@/components/filters/CustomSelectAsync";
import Button from "@/components/ui/Button";
import type { FilterOption } from "@/types/filter";
import type { ShippingProfile } from "@/types/shipping-profiles";

import { useUpdateShippingProfile } from "./useUpdateShippingProfile";
import { useShippingProfileLocationOptions } from "./useShippingProfileLocationOptions";
import { useFormDirtyStyle } from "@/components/forms/admin/useFormDirtyStyle";

type ShippingProfileFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  provinceId: number | null;
  province: string | null;
  districtId: number | null;
  district: string | null;
  wardId: string | null;
  ward: string | null;
  isDefault: boolean;
};

const normalizeString = (value?: string | null) => {
  const normalized = value?.trim();
  return normalized && normalized.length ? normalized : undefined;
};

const isOptionArray = (
  option: FilterOption | readonly FilterOption[] | null | undefined,
): option is readonly FilterOption[] => Array.isArray(option);

const buildInitialValues = (
  profile: ShippingProfile,
): ShippingProfileFormValues => ({
  firstName: profile.firstName ?? "",
  lastName: profile.lastName ?? "",
  phoneNumber: profile.phoneNumber ?? "",
  address: profile.address ?? "",
  provinceId: profile.provinceId ?? null,
  province: profile.province ?? null,
  districtId: profile.districtId ?? null,
  district: profile.district ?? null,
  wardId: profile.wardId ?? null,
  ward: profile.ward ?? null,
  isDefault: profile.isDefault ?? false,
});

function EditShippingProfileForm({
  profile,
  onCloseModal,
}: {
  profile: ShippingProfile;
  onCloseModal?: () => void;
}) {
  const initialValues = useMemo(() => buildInitialValues(profile), [profile]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<ShippingProfileFormValues>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const { mutate: updateShippingProfile, isPending } =
    useUpdateShippingProfile();

  const provinceId = watch("provinceId");
  const districtId = watch("districtId");

  const {
    districtOptions,
    wardOptions,
    loadProvinceOptions,
    loadDistrictOptions,
    loadWardOptions,
  } = useShippingProfileLocationOptions({ provinceId, districtId });

  const getSingleLabel = (
    option: FilterOption | readonly FilterOption[] | null | undefined,
  ) => {
    if (isOptionArray(option)) return null;
    return option?.label ?? null;
  };

  const provinceDefaultOption = profile.provinceId
    ? [{ value: profile.provinceId, label: profile.province ?? "" }]
    : [];
  const districtDefaultOption = profile.districtId
    ? [{ value: profile.districtId, label: profile.district ?? "" }]
    : [];
  const wardDefaultOption = profile.wardId
    ? [{ value: profile.wardId, label: profile.ward ?? "" }]
    : [];

  const clearDistrict = () => {
    setValue("districtId", null, { shouldDirty: true, shouldValidate: false });
    setValue("district", null, { shouldDirty: true, shouldValidate: false });
    setValue("wardId", null, { shouldDirty: true, shouldValidate: false });
    setValue("ward", null, { shouldDirty: true, shouldValidate: false });
  };

  const clearWard = () => {
    setValue("wardId", null, { shouldDirty: true, shouldValidate: false });
    setValue("ward", null, { shouldDirty: true, shouldValidate: false });
  };

  const onSubmit = (values: ShippingProfileFormValues) => {
    updateShippingProfile(
      {
        profileId: profile.id,
        payload: {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          phoneNumber: values.phoneNumber.trim(),
          address: values.address.trim(),
          provinceId: values.provinceId ?? undefined,
          province: normalizeString(values.province),
          districtId: values.districtId ?? undefined,
          district: normalizeString(values.district),
          wardId: values.wardId ?? undefined,
          ward: normalizeString(values.ward),
          isDefault: values.isDefault || undefined,
        },
      },
      {
        onSuccess: () => {
          reset(values);
          onCloseModal?.();
        },
      },
    );
  };

  const handleCancel = () => {
    reset(initialValues);
    if (!isDirty) onCloseModal?.();
  };

  const { getDirtyClass, getDirtyStyle } =
    useFormDirtyStyle<ShippingProfileFormValues>(dirtyFields);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type="modal"
      className="flex flex-col gap-4"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Chỉnh sửa địa chỉ giao hàng</h2>
        <p className="text-primary-500 text-sm">
          Cập nhật thông tin địa chỉ đang sử dụng.
        </p>
      </div>

      <FormRow
        label="Họ*"
        id="shipping-last-name"
        error={errors.lastName?.message}
      >
        <Input
          id="shipping-last-name"
          type="text"
          disabled={isPending}
          className={getDirtyClass("lastName")}
          placeholder="Họ"
          {...register("lastName", {
            required: "Họ là bắt buộc",
            maxLength: { value: 255, message: "Họ quá dài" },
          })}
        />
      </FormRow>

      <FormRow
        label="Tên*"
        id="shipping-first-name"
        error={errors.firstName?.message}
      >
        <Input
          id="shipping-first-name"
          type="text"
          disabled={isPending}
          className={getDirtyClass("firstName")}
          placeholder="Tên"
          {...register("firstName", {
            required: "Tên là bắt buộc",
            maxLength: { value: 255, message: "Tên quá dài" },
          })}
        />
      </FormRow>

      <FormRow
        label="Số điện thoại*"
        id="shipping-phone"
        error={errors.phoneNumber?.message}
      >
        <Input
          id="shipping-phone"
          type="tel"
          inputMode="numeric"
          disabled={isPending}
          placeholder="VD: 0912345678"
          className={getDirtyClass("phoneNumber")}
          {...register("phoneNumber", {
            required: "Số điện thoại là bắt buộc",
            maxLength: { value: 50, message: "Số điện thoại quá dài" },
            validate: (value) => {
              if (!value) return "Số điện thoại là bắt buộc";
              if (/[a-zA-Z]/.test(value)) {
                return "Số điện thoại không được chứa chữ cái";
              }
              if (!/^[0-9]{8,15}$/.test(value)) {
                return "Số điện thoại phải có 8-15 chữ số";
              }
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Địa chỉ*"
        id="shipping-address"
        error={errors.address?.message}
      >
        <Input
          id="shipping-address"
          type="text"
          disabled={isPending}
          className={getDirtyClass("address")}
          placeholder="Số nhà, tên đường"
          {...register("address", {
            required: "Địa chỉ là bắt buộc",
            maxLength: { value: 500, message: "Địa chỉ quá dài" },
          })}
        />
      </FormRow>

      <FormRow
        label={
          <div id="select-province" className="cursor-default">
            Tỉnh/Thành*
          </div>
        }
        error={errors.provinceId?.message}
      >
        <Controller
          name="provinceId"
          control={control}
          rules={{ required: "Tỉnh/Thành là bắt buộc" }}
          render={({ field }) => (
            <CustomSelectAsync
              inputId="provinceId"
              instanceId="provinceId"
              aria-labelledby="select-province"
              controlStyle={getDirtyStyle("provinceId")}
              minWidth={240}
              placeholder="Chọn tỉnh/thành"
              defaultOptions={provinceDefaultOption}
              cacheOptions
              isClearable
              loadOptions={loadProvinceOptions}
              value={field.value}
              onChange={(event) => {
                const nextValue = event.target.value;
                const nextId =
                  nextValue === null || nextValue === ""
                    ? null
                    : Number(nextValue);
                field.onChange(nextId);
                setValue("province", getSingleLabel(event.option), {
                  shouldDirty: true,
                  shouldValidate: false,
                });
                clearDistrict();
              }}
              isDisabled={isPending}
            />
          )}
        />
      </FormRow>

      <FormRow
        label={
          <div id="select-district" className="cursor-default">
            Quận/Huyện*
          </div>
        }
        error={errors.districtId?.message}
      >
        <Controller
          name="districtId"
          control={control}
          rules={{ required: "Quận/Huyện là bắt buộc" }}
          render={({ field }) => (
            <CustomSelectAsync
              inputId="districtId"
              instanceId="districtId"
              aria-labelledby="select-district"
              controlStyle={getDirtyStyle("districtId")}
              minWidth={240}
              placeholder="Chọn quận/huyện"
              defaultOptions={
                districtOptions.length ? districtOptions : districtDefaultOption
              }
              cacheOptions
              isClearable
              loadOptions={loadDistrictOptions}
              value={field.value}
              onChange={(event) => {
                const nextValue = event.target.value;
                const nextId =
                  nextValue === null || nextValue === ""
                    ? null
                    : Number(nextValue);
                field.onChange(nextId);
                setValue("district", getSingleLabel(event.option), {
                  shouldDirty: true,
                  shouldValidate: false,
                });
                clearWard();
              }}
              isDisabled={isPending || !provinceId}
            />
          )}
        />
      </FormRow>

      <FormRow
        label={
          <div id="select-ward" className="cursor-default">
            Phường/Xã*
          </div>
        }
        error={errors.wardId?.message}
      >
        <Controller
          name="wardId"
          control={control}
          rules={{ required: "Phường/Xã là bắt buộc" }}
          render={({ field }) => (
            <CustomSelectAsync
              inputId="wardId"
              instanceId="wardId"
              aria-labelledby="select-ward"
              controlStyle={getDirtyStyle("wardId")}
              minWidth={240}
              placeholder="Chọn phường/xã"
              defaultOptions={
                wardOptions.length ? wardOptions : wardDefaultOption
              }
              cacheOptions
              isClearable
              loadOptions={loadWardOptions}
              value={field.value}
              onChange={(event) => {
                const nextValue = event.target.value;
                const nextId =
                  nextValue === null || nextValue === ""
                    ? null
                    : String(nextValue);
                field.onChange(nextId);
                setValue("ward", getSingleLabel(event.option), {
                  shouldDirty: true,
                  shouldValidate: false,
                });
              }}
              isDisabled={isPending || !districtId}
            />
          )}
        />
      </FormRow>

      <FormRow label="Đặt làm mặc định">
        <Controller
          name="isDefault"
          control={control}
          render={({ field }) => (
            <ToggleSwitch
              value={field.value}
              onLabel="Mặc định"
              offLabel="Không"
              onChange={field.onChange}
              className={getDirtyClass("isDefault")}
              disabled={isPending}
              ariaLabel="Default shipping profile"
            />
          )}
        />
      </FormRow>

      <FormRow className="sticky bottom-0 flex justify-end gap-2 bg-inherit">
        <Button
          type="button"
          variant="secondary"
          disabled={isPending}
          onClick={handleCancel}
        >
          Hủy
        </Button>
        <Button type="submit" disabled={isPending || !isDirty}>
          Lưu thay đổi
        </Button>
      </FormRow>
    </Form>
  );
}

export default EditShippingProfileForm;
