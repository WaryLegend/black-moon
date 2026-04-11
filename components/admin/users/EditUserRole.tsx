"use client";

import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { ROLE_OPTIONS, DEFAULT_ROLE } from "./userFormOptions";
import { useUpdateUserRole } from "./useUpdateUserRole";
import type { UserSummary } from "@/types/users";
import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import CustomSelect from "@/components/filters/CustomSelect";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useFormDirtyStyle } from "@/components/forms/admin/useFormDirtyStyle";

type RoleFormValues = {
  roleName: string;
};

function EditUserRole({ user }: { user: UserSummary }) {
  const { mutate: updateRole, isPending } = useUpdateUserRole();

  const initialRole = (user.role?.name ?? DEFAULT_ROLE).toUpperCase();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, dirtyFields },
  } = useForm<RoleFormValues>({
    defaultValues: { roleName: initialRole },
  });

  // Đồng bộ lại khi user data thay đổi từ phía server
  useEffect(() => {
    reset({ roleName: initialRole });
  }, [initialRole, reset]);

  const onSubmit = (values: RoleFormValues) => {
    updateRole(
      {
        userId: user.id,
        payload: { roleName: values.roleName },
      },
      {
        onSuccess: () => {
          reset({ roleName: values.roleName });
        },
      },
    );
  };

  const { getDirtyClass } = useFormDirtyStyle<RoleFormValues>(dirtyFields);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Phân quyền"
        id="edit-role"
        helper="Thay đổi vai trò sẽ ảnh hưởng đến quyền truy cập!"
      >
        <Controller
          name="roleName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomSelect
              inputId="edit-role"
              placeholder=""
              className={getDirtyClass("roleName")}
              isDisabled={isPending}
              options={ROLE_OPTIONS}
              value={field.value}
              onChange={(event) => {
                const next = event.target.value;
                field.onChange(next === null ? "" : String(next));
              }}
            />
          )}
        />
      </FormRow>
      {isDirty && (
        <FormRow>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Spinner type="mini" color="var(--color-accent-800)" />
            ) : (
              "Lưu"
            )}
          </Button>
        </FormRow>
      )}
    </Form>
  );
}

export default EditUserRole;
