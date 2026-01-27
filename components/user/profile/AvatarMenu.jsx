"use client";

import { useState } from "react";
import { HiCamera, HiEye } from "react-icons/hi2";
import { HiPhotograph } from "react-icons/hi";
import Menus from "@/components/ui/Menus";
import Modal from "@/components/ui/Modal";
import ImgChangeForm from "./ImgChangeForm";

function AvatarMenu({ avatar, onAvatarChange }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSaveImage = (file) => {
    // Here you would typically:
    // 1. Upload to your server
    // 2. Get the URL back
    // 3. Update the user's avatar URL
    console.log("Saving image:", file);
    onAvatarChange?.(file);

    // For demo, create a local URL
    const localUrl = URL.createObjectURL(file);
    setSelectedImage(localUrl);
  };

  const handleViewImage = () => {
    if (avatar) {
      // Navigate to image view page or open in modal
      window.open(avatar, "_blank");
    }
  };

  return (
    <div className="absolute right-2 bottom-2 z-10">
      <Menus>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id="avatar-menu">
              {/* <div className="bg-accent-500 hover:bg-accent-600 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-lg transition-colors">
                <HiCamera className="text-primary-0 h-5 w-5" />
              </div> */}
            </Menus.Toggle>

            <Menus.List id="avatar-menu">
              {/* View Image - only if avatar exists */}
              {avatar && (
                <Menus.Button icon={<HiEye />} onClick={handleViewImage}>
                  Xem ảnh
                </Menus.Button>
              )}
              {/* Change/Add Image */}
              <Modal.Open opens="change-avatar">
                <Menus.Button icon={<HiPhotograph />}>
                  {avatar ? "Thay đổi ảnh" : "Thêm ảnh"}
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            {/* Modal for changing avatar */}
            <Modal.Window name="change-avatar">
              <ImgChangeForm currentAvatar={avatar} onSave={handleSaveImage} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Menus>
    </div>
  );
}

export default AvatarMenu;
