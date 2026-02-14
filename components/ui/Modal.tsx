"use client";

import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useOutsideClick from "@/hooks/useOutSideClick";

// create context
type ModalContextValue = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};
const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("Modal components must be used within <Modal>");
  }
  return ctx;
}

// Modal
function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState<string>("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

//Open
type OpenProps = {
  children: React.ReactElement<{ onClick?: () => void }>; // strictly allow only elements that accept "onClick"
  opens: string;
};
function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useModalContext();
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

// Window
type WindowProps = {
  children: React.ReactElement<{ onCloseModal: () => void }>;
  name: string;
};
function Window({ children, name }: WindowProps) {
  const { openName, close } = useModalContext();
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <div
      className="bg-primary-900/20 fixed inset-0 z-[1000] backdrop-blur-sm transition-all"
      aria-modal="true"
      role="dialog"
    >
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

Modal.Open = Open;
Modal.Window = Window;
Modal.useContext = useModalContext;

export default Modal;
