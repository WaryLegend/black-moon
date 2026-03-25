"use client";

import Image from "next/image";
import default_user from "@/public/default-user.jpg";
import AvatarMenu from "@/components/user-menu/profile/AvatarMenu";
import Menus from "@/components/ui/Menus";
import Modal from "@/components/ui/Modal";
import AvatarToggle from "./AvatarToggle";
import ChangeAvatarForm from "./ChangeAvatarForm";
import ImageViewer from "@/components/ui/ImageViewer";

function Avatar({ img }: { img?: string | null }) {
  return (
    <div className="relative size-24">
      <Image
        src={img || default_user}
        alt="Avatar"
        fill
        quality={90}
        sizes="90px"
        className="rounded-full object-cover shadow-md"
        priority
      />
      <Menus>
        <Modal>
          <div className="absolute right-0 bottom-0">
            <Menus.Menu>
              <Menus.Toggle id="avatar-menu">
                <AvatarToggle />
              </Menus.Toggle>
              <Menus.List id="avatar-menu">
                <AvatarMenu img={img} />
              </Menus.List>
            </Menus.Menu>
            {/* Modal for viewing avatar */}
            {img && (
              <Modal.Window name="view-avatar">
                <ImageViewer src={img} />
              </Modal.Window>
            )}
            {/* Modal for changing avatar */}
            <Modal.Window name="change-avatar">
              <ChangeAvatarForm currentAvatar={img} />
            </Modal.Window>
          </div>
        </Modal>
      </Menus>
    </div>
  );
}

export default Avatar;
