"use client";

import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useOutsideClick from "@/app/_hooks/useOutSideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="bg-primary-900/20 fixed inset-0 z-[1000] backdrop-blur-sm transition-all">
      <div
        ref={ref}
        className="bg-primary-0 fixed right-0 bottom-0 left-0 max-h-[95vh] overflow-y-auto rounded-t-3xl rounded-b-none p-8 shadow-2xl transition-all ease-out md:inset-auto md:top-1/2 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl"
      >
        <button
          type="button"
          title="Close"
          onClick={close}
          className="hover:bg-primary-100 absolute top-1 right-1 z-5 rounded-full p-1 transition-all"
        >
          <HiXMark className="h-6 w-6" />
        </button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

// allow to use the context outside the modal (via ReviewSection)
function useModal() {
  return useContext(ModalContext);
}

Modal.Open = Open;
Modal.Window = Window;
Modal.useContext = useModal;

export default Modal;
