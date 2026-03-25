"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ROLE_OPTIONS, DEFAULT_ROLE } from "./userFormOptions";
import { useUpdateUserRole } from "./useUpdateUserRole";
import type { UserSummary } from "@/types/users";
import Form from "@/components/forms/admin/Form";
import FormRow from "@/components/forms/admin/FormRow";
import Selector from "@/components/forms/admin/Selector";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

type RoleFormValues = {
  roleName: string;
};

function EditUserRole({ user }: { user: UserSummary }) {
  const { mutate: updateRole, isPending } = useUpdateUserRole();

  const initialRole = (user.role?.name ?? DEFAULT_ROLE).toUpperCase();

  const {
    register,
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Phân quyền"
        id="edit-role"
        helper="Thay đổi vai trò sẽ ảnh hưởng đến quyền truy cập!"
      >
        <Selector
          id="edit-role"
          placeholder=""
          className={dirtyFields.roleName ? "border-amber-600" : ""}
          disabled={isPending}
          options={ROLE_OPTIONS}
          {...register("roleName", { required: true })}
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
