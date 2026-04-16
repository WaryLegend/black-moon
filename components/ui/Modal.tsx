"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useOutsideClick from "@/hooks/useOutSideClick";

type ModalContextValue = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Modal components must be used within <Modal>");
  return ctx;
}

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState<string>("");
  const close = useCallback(() => setOpenName(""), []);
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: React.ReactElement<any>;
  opens: string;
}) {
  const { open } = useModalContext();
  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Window({
  children,
  name,
}: {
  children: React.ReactElement<any>;
  name: string;
}) {
  const { openName, close } = useModalContext();

  // 1. Sử dụng hook outside click đã nâng cấp mousedown
  const ref = useOutsideClick<HTMLDivElement>(close);

  // 2. Xử lý phím ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    if (openName === name) {
      document.addEventListener("keydown", handleEsc);
      // Ngăn scroll body khi modal đang mở (UX nâng cao)
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [openName, name, close]);

  if (name !== openName) return null;

  return createPortal(
    <div
      className="bg-primary-900/20 fixed inset-0 z-[900] flex items-center justify-center backdrop-blur-sm transition-all"
      aria-modal="true"
    >
      <div
        ref={ref}
        role="dialog"
        className="bg-primary-0 fixed right-0 bottom-0 left-0 flex max-h-[95vh] rounded-t-2xl rounded-b-none py-6 shadow-2xl transition-all ease-out md:inset-auto md:bottom-auto md:rounded-2xl"
      >
        <button
          type="button"
          title="Close"
          onClick={close}
          className="hover:bg-primary-100 absolute top-3 right-3 z-10 rounded-full p-1 transition-all"
        >
          <HiXMark className="h-6 w-6" />
        </button>

        <div className="flex-1 overflow-y-auto bg-inherit px-6">
          {/* Truyền close modal vào children để các có thể tự đóng modal khi xong */}
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
