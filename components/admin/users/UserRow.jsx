import { HiLockClosed, HiLockOpen, HiPencil, HiTrash } from "react-icons/hi2";
import { fDateTime } from "@/utils/date";
import { formatMobile } from "@/utils/phone";
import { getRoleStyle } from "@/utils/constants";
import default_user from "@/public/default-user.jpg";
import toast from "react-hot-toast";
import Image from "next/image";
import styled from "styled-components";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import Menus from "@/components/ui/Menus";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import ConfirmChange from "@/components/ui/ConfirmChange";
import TruncatedEmail from "@/components/ui/TruncatedEmail";
import { capitalizeFirst } from "@/utils/capitalize";

const Field = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const AllButtons = styled.div`
  display: flex;
  gap: 5px;
`;

function UserRow({ user }) {
  const {
    id: userId,
    fullName,
    userName,
    email,
    mobile,
    role,
    status,
    createdAt: createdDate,
    avatar,
  } = user;

  return (
    <Table.Row>
      <Image
        src={avatar || default_user}
        alt={`avatar of ${fullName}`}
        width={40}
        height={40}
        className="block aspect-square max-w-[1.8rem] scale-150 rounded-full object-cover shadow-md lg:max-w-[2rem]"
      />
      <Field>{fullName}</Field>
      <Field>
        {userName}
        <br />
        <span className={`rounded-full border px-2 py-1 ${getRoleStyle(role)}`}>
          {capitalizeFirst(role)}
        </span>
      </Field>
      <Field>{email ? <TruncatedEmail email={email} /> : "—"}</Field>
      <Field className="text-primary-500">{formatMobile(mobile) || "—"}</Field>
      <Field className="flex items-center">
        <div
          className={`mr-1 h-3 w-3 rounded-full bg-gradient-to-tr ${status === "active" ? "from-green-600 to-green-200" : "from-red-600 to-red-200"}`}
        ></div>
        {capitalizeFirst(status)}
      </Field>
      <Field className="text-primary-500">{fDateTime(createdDate)}</Field>
      <AllButtons>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={userId} />
            <Menus.List id={userId}>
              {/* edit btn */}
              <Modal.Open opens="edit-status">
                <Menus.Button
                  icon={status === "active" ? <HiLockClosed /> : <HiLockOpen />}
                >
                  {status === "active" ? "Disable" : "Activate"}
                </Menus.Button>
              </Modal.Open>
              {/* edit btn */}
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              {/* remove btn */}
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Remove</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="edit-status">
              <ConfirmChange
                actionName={status === "active" ? "Khóa" : "Kích hoạt"}
                resourceName={userName || `user_${fullName}`}
                // disabled={isDeleting}
                // onConfirm={() => deleteUser(userId)}
                onConfirm={() =>
                  toast.success("Mimic change status thành công")
                }
              />
            </Modal.Window>
            <Modal.Window name="edit">
              {/* <CreateUserForm userToEdit={user} /> */}
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                actionName="Gỡ bỏ tài khoản"
                resourceName={userName}
                // disabled={isDeleting}
                // onConfirm={() => deleteUser(userId)}
                onConfirm={() => toast.success("Mimic xóa thành công")}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </AllButtons>
    </Table.Row>
  );
}

export default UserRow;
