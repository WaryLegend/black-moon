import { HiLockClosed, HiLockOpen, HiPencil } from "react-icons/hi2";
import Image from "next/image";
import styled from "styled-components";

import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import Menus from "@/components/ui/Menus";
import ConfirmChange from "@/components/ui/ConfirmChange";
import TruncatedEmail from "@/components/ui/TruncatedEmail";
import default_user from "@/public/default-user.jpg";
import { fDateTime } from "@/utils/date";
import { formatMobile } from "@/utils/phone";
import type { UserSummary } from "@/types/users";

import EditUserForm from "./EditUserForm";
import { useUpdateUserActivation } from "./useUpdateUserActivation";
import { getRoleStyle } from "@/utils/constants";

type UserRowProps = {
  user: UserSummary;
};

const Field = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const AllButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const StatusDot = styled.span<{ $isActive: boolean }>`
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-image: ${(props) =>
    props.$isActive
      ? "linear-gradient(135deg, #16a34a, #bbf7d0)"
      : "linear-gradient(135deg, #dc2626, #fecaca)"};
`;

function UserRow({ user }: UserRowProps) {
  const { id, email, activated, role, createdAt, profile } = user;

  const firstName = profile?.firstName?.trim() || "—";
  const lastName = profile?.lastName?.trim() || "—";
  const phoneNumber = profile?.phoneNumber?.trim() || "";
  const avatarSrc = profile?.avatarUrl || default_user;
  const createdLabel = createdAt ? fDateTime(createdAt) : "—";
  const resourceName =
    profile?.fullName?.trim() ||
    [profile?.lastName, profile?.firstName]
      .map((value) => value?.trim())
      .filter((value): value is string => Boolean(value))
      .join(" ") ||
    email ||
    `user_${id}`;

  const { mutate: updateActivation, isPending: isUpdatingActivation } =
    useUpdateUserActivation();

  const handleToggleActivation = () => {
    updateActivation({
      userId: id,
      payload: { activated: !activated },
      resourceName,
    });
  };

  return (
    <Table.Row>
      <Image
        src={avatarSrc}
        alt={`avatar of ${resourceName}`}
        width={40}
        height={40}
        className="block aspect-square max-w-[1.8rem] scale-150 rounded-full object-cover shadow-md lg:max-w-[2rem]"
      />
      <Field>{firstName}</Field>
      <Field>{lastName}</Field>
      <Field
        className={`inline-flex w-fit items-center rounded-md border px-2 py-0.5 ${getRoleStyle(role?.name)}`}
      >
        {role?.name}
      </Field>
      <Field>{email ? <TruncatedEmail email={email} /> : "—"}</Field>
      <Field className="text-primary-500">
        {phoneNumber ? formatMobile(phoneNumber) : "—"}
      </Field>
      <Field className="flex items-center">
        <StatusDot $isActive={activated} />
      </Field>
      <Field className="text-primary-500">{createdLabel}</Field>
      <Menus>
        <AllButtons>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Modal.Open opens="activation">
                  <Menus.Button
                    icon={activated ? <HiLockClosed /> : <HiLockOpen />}
                  >
                    {activated ? "Disable" : "Activate"}
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open opens="edit-user">
                  <Menus.Button icon={<HiPencil />}>View or Edit</Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window name="activation">
                <ConfirmChange
                  actionName={activated ? "Khóa" : "Kích hoạt"}
                  resourceName={resourceName}
                  disabled={isUpdatingActivation}
                  onConfirm={handleToggleActivation}
                />
              </Modal.Window>
              <Modal.Window name="edit-user">
                <EditUserForm user={user} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </AllButtons>
      </Menus>
    </Table.Row>
  );
}

export default UserRow;
