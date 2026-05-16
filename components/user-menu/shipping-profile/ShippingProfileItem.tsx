import { HiPencil, HiTrash } from "react-icons/hi2";

import Modal from "@/components/ui/Modal";
import Menus from "@/components/ui/Menus";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import type { ShippingProfile } from "@/types/shipping-profiles";

import EditShippingProfileForm from "./EditShippingProfileForm.tsx";
import { useDeleteShippingProfile } from "./useDeleteShippingProfile";

type ShippingProfileItemProps = {
  profile: ShippingProfile;
};

function ShippingProfileItem({ profile }: ShippingProfileItemProps) {
  const { mutateAsync: deleteProfile, isPending: isDeleting } =
    useDeleteShippingProfile();
  const fullName = [profile.lastName, profile.firstName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <div className="bg-primary-50 border-primary-200 rounded-lg border p-5 shadow-sm">
      <div className="flex flex-col gap-3">
        {/* Hàng 1: Tên người nhận và SĐT + Badge Mặc định */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-primary-500 text-xs font-medium tracking-wider uppercase">
                Tên người nhận:
              </span>
              <p className="text-accent-600 text-lg font-semibold">
                {fullName || "Khách hàng"}
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-primary-500 text-xs font-medium tracking-wider uppercase">
                SĐT:
              </span>
              <p className="text-primary-800 font-medium">
                {profile.phoneNumber ?? "-"}
              </p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {profile.isDefault && (
              <span className="shrink-0 self-center rounded-full border border-green-200 bg-green-100 px-3 py-0.5 text-xs font-bold text-green-700 sm:text-sm">
                Mặc định
              </span>
            )}
            {/* Menu chỉnh sửa, xóa */}
            <Menus>
              <Modal>
                <Menus.Menu>
                  <Menus.Toggle id={profile.id} />
                  <Menus.List id={profile.id}>
                    <Modal.Open opens="edit">
                      <Menus.Button icon={<HiPencil />}>Chỉnh sửa</Menus.Button>
                    </Modal.Open>
                    <Modal.Open opens="delete">
                      <Menus.Button icon={<HiTrash />}>Xóa</Menus.Button>
                    </Modal.Open>
                  </Menus.List>
                  <Modal.Window name="edit">
                    <EditShippingProfileForm profile={profile} />
                  </Modal.Window>
                  <Modal.Window name="delete">
                    <ConfirmDelete
                      disabled={isDeleting}
                      onConfirm={() => deleteProfile({ profileId: profile.id })}
                    />
                  </Modal.Window>
                </Menus.Menu>
              </Modal>
            </Menus>
          </div>
        </div>

        {/* Hàng 2: Chi tiết địa chỉ tách biệt */}
        <div className="border-primary-200 grid grid-cols-1 gap-x-4 gap-y-2 border-t pt-3 text-sm sm:grid-cols-2">
          <div className="flex flex-col">
            <span className="text-primary-500 text-[10px] font-bold uppercase">
              Số nhà, tên đường
            </span>
            <p className="text-primary-700 leading-relaxed">
              {profile.address || "-"}
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-primary-500 text-[10px] font-bold uppercase">
              Phường / Xã
            </span>
            <p className="text-primary-700">{profile.ward || "-"}</p>
          </div>

          <div className="flex flex-col">
            <span className="text-primary-500 text-[10px] font-bold uppercase">
              Quận / Huyện
            </span>
            <p className="text-primary-700">{profile.district || "-"}</p>
          </div>

          <div className="flex flex-col">
            <span className="text-primary-500 text-[10px] font-bold uppercase">
              Tỉnh / Thành phố
            </span>
            <p className="text-primary-700">{profile.province || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingProfileItem;
