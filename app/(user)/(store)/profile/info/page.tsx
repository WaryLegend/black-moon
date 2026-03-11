"use client";

import Button from "@/components/ui/Button";
import { fDate, fDateTime } from "@/utils/date";
import Avatar from "@/components/user-menu/profile/Avatar";
import {
  HiCheckCircle,
  HiClock,
  HiExclamationCircle,
  HiKey,
  HiPencil,
} from "react-icons/hi2";
import { FiMail } from "react-icons/fi";
import { cn } from "@/utils/cn";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";
import Spinner from "@/components/ui/Spinner";
import { formatMobile } from "@/utils/phone";
import { getGenderLabel, getRoleStyle } from "@/utils/constants";
import Modal from "@/components/ui/Modal";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import TruncatedEmail from "@/components/ui/TruncatedEmail";
import EditProfileForm from "@/components/user-menu/profile/EditProfileForm";

export default function UserInfoPage() {
  const { data: user, isPending } = useCurrentAccount();

  if (isPending)
    return (
      <div className="flex items-center justify-center">
        <Spinner type="bar" color="var(--color-accent-600)" />
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center text-xl">
        Chưa có thông tin
      </div>
    );

  const { id, email, lastLogin, createdAt, role, profile, activated } = user;

  const security = [
    {
      id: "change-password",
      label: "Change password",
      helper: "Khuyến nghị đổi mật khẩu mỗi 90 ngày.",
      cta: "Thay đổi",
      modal: <ChangePasswordForm />,
      icon: <HiKey className="h-5 w-5" />,
    },
    {
      id: "change-email",
      label: "Cập nhật email",
      helper: "Điều chỉnh email của bạn",
      cta: "Đang phát triển",
      icon: <FiMail className="h-5 w-5" />,
      disabled: true,
    },
  ];

  const personalFields = [
    { label: "Họ", value: profile?.lastName },
    { label: "Tên", value: profile?.firstName },
    { label: "Ngày sinh", value: fDate(profile?.birthDate) },
    { label: "Giới tính", value: getGenderLabel(profile?.gender) },
    { label: "Email", value: <TruncatedEmail email={email} /> },
    { label: "Số điện thoại", value: formatMobile(profile?.phoneNumber) },
    {
      label: "Vai trò",
      value: (
        <span
          className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-sm font-medium ${getRoleStyle(
            role?.name,
          )}`}
        >
          {role?.name}
        </span>
      ),
    },
  ];

  return (
    <Modal>
      <div className="flex flex-col gap-6">
        {/* Profile header */}
        <section className="bg-primary-50 flex flex-col items-center gap-6 rounded-lg p-5 shadow-md sm:flex-row">
          <Avatar img={profile?.avatarUrl} />

          <div className="space-y-1">
            <h2 className="text-accent-600 text-lg font-bold">
              {profile?.fullName}
            </h2>
            <p className="text-primary-600 text-sm">User Id: {id}</p>
            <p className="text-primary-500 text-sm">
              Tham gia từ {fDate(createdAt)}
            </p>
          </div>
        </section>

        {/* Personal info */}
        <section className="bg-primary-50 space-y-2 rounded-lg p-6 shadow-md">
          <header className="border-primary-400 flex justify-between border-b pb-4">
            <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
            <Modal.Open opens="edit-profile">
              <Button size="small" className="flex items-center gap-1">
                Sửa <HiPencil />
              </Button>
            </Modal.Open>
            <Modal.Window name="edit-profile">
              <EditProfileForm profile={profile} />
            </Modal.Window>
          </header>
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {personalFields.map((field) => (
              <div key={field.label} className="space-y-1">
                <p className="text-primary-500 text-sm">{field.label}</p>
                <p className="font-medium">{field.value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          {/* Status */}
          <section className="bg-primary-50 rounded-lg p-6 shadow-md">
            <header className="border-primary-400 mb-4 border-b pb-3">
              <h3 className="text-lg font-semibold">Trạng thái & hoạt động</h3>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-primary-500 text-sm">Trạng thái tài khoản</p>
                <p
                  className={cn(
                    "mt-1 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold",
                    activated
                      ? "bg-green-50 text-green-700"
                      : "bg-orange-100 text-orange-800",
                  )}
                >
                  {activated ? (
                    <HiCheckCircle className="h-4 w-4" />
                  ) : (
                    <HiExclamationCircle className="h-4 w-4" />
                  )}
                  {activated ? "Đang hoạt động" : "Chưa kích hoạt"}
                </p>
              </div>

              <div>
                <p className="text-primary-500 text-sm">
                  Lần đăng nhập gần nhất
                </p>
                <p className="text-primary-900 mt-1 flex items-center gap-2 font-medium">
                  <HiClock className="text-primary-500 h-4 w-4" />
                  {fDateTime(lastLogin) ?? "chưa có dữ liệu"}
                </p>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="bg-primary-50 rounded-lg p-6 shadow-md">
            <header className="border-primary-400 mb-4 border-b pb-3">
              <h3 className="text-lg font-semibold">Bảo mật</h3>
            </header>

            <div className="space-y-4">
              {security.map((s) => (
                <div
                  key={s.id}
                  className="border-primary-100 flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span className="bg-primary-100 text-primary-600 rounded-full p-2">
                      {s.icon}
                    </span>
                    <div>
                      <p className="font-medium">{s.label}</p>
                      <p className="text-primary-500 text-sm">{s.helper}</p>
                    </div>
                  </div>

                  <Modal.Open opens={s.id}>
                    <Button
                      size="small"
                      variant={s.disabled ? "secondary" : undefined}
                      disabled={s.disabled}
                    >
                      {s.cta}
                    </Button>
                  </Modal.Open>
                  {s.modal ? (
                    <Modal.Window name={s.id}>{s.modal}</Modal.Window>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
}
