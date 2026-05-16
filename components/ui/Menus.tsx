"use client";

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
  type UseFloatingReturn,
} from "@floating-ui/react";
import { cn } from "@/utils/cn";

// 1. Context quản lý ID nào đang mở (Toàn cục cho cả danh sách)
type MenusContextValue = {
  openId: string | number;
  open: (id: string | number) => void;
  close: () => void;
};
const MenusContext = createContext<MenusContextValue | null>(null);

// 2. Context quản lý Tọa độ (Riêng biệt cho từng cụm Menu)
type FloatingContextValue = {
  refs: UseFloatingReturn<Element>["refs"];
  floatingStyles: React.CSSProperties;
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
};
const FloatingContext = createContext<FloatingContextValue | null>(null);

function useMenusContext() {
  const ctx = useContext(MenusContext);
  if (!ctx) throw new Error("Menus components must be used within <Menus>");
  return ctx;
}

function useFloatingContext() {
  const ctx = useContext(FloatingContext);
  if (!ctx) throw new Error("Menu components must be used within <Menus.Menu>");
  return ctx;
}

// Wrapper ngoài cùng
function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<string | number>("");
  const close = () => setOpenId("");
  const open = (id: string | number) => setOpenId(id);

  return (
    <MenusContext.Provider value={{ openId, open, close }}>
      {children}
    </MenusContext.Provider>
  );
}

// 3. Menu wrapper (Bọc từng dòng/item - NƠI TÍNH TOÁN VỊ TRÍ)
function Menu({ children }: { children: React.ReactNode }) {
  const { openId, close } = useMenusContext();

  // Mỗi Menu (dòng) sẽ có một instance useFloating riêng
  const { refs, floatingStyles, context } = useFloating({
    open: openId !== "", // Floating UI cần biết trạng thái để autoUpdate
    onOpenChange: (isOpen) => {
      if (!isOpen) close();
    },
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <FloatingContext.Provider
      value={{ refs, floatingStyles, getReferenceProps, getFloatingProps }}
    >
      <div className="flex items-center justify-end">{children}</div>
    </FloatingContext.Provider>
  );
}

// 4. Toggle
interface ToggleProps {
  id: string | number;
  children?: React.ReactElement;
}

function Toggle({ id, children }: ToggleProps) {
  const { openId, open, close } = useMenusContext();
  const { refs, getReferenceProps } = useFloatingContext();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (openId === id) {
      close();
      return;
    }
    open(id);
  };

  const commonProps = getReferenceProps({
    ref: refs.setReference,
    onClick: handleClick,
  });

  // For custom toggle
  if (children) {
    return cloneElement(children, commonProps);
  }
  // Default esclipse button
  return (
    <button
      {...commonProps}
      className="hover:bg-primary-100 cursor-pointer rounded-lg p-1.5 transition"
    >
      <HiEllipsisHorizontal className="text-primary-700 h-6 w-6" />
    </button>
  );
}

// 5. List
function List({
  id,
  children,
  className = "",
}: {
  id: string | number;
  children: React.ReactNode;
  className?: string;
}) {
  const { openId } = useMenusContext();
  const { refs, floatingStyles, getFloatingProps } = useFloatingContext();

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
      className={cn(
        "border-primary-200 bg-primary-0 absolute z-[9999] min-w-[12rem] rounded-xl border p-px shadow-md",
        className,
      )}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        if (child.type === "li") return child; // Tránh lồng li trong li
        return <li>{child}</li>;
      })}
    </ul>,
    document.body,
  );
}

// 6. Button (Item bên trong menu)
type MenuButtonProps = {
  title?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

function Button({
  title,
  icon,
  onClick,
  disabled = false,
  className = "",
  children,
}: MenuButtonProps) {
  const { close } = useMenusContext();

  function handleClick() {
    if (disabled) return;
    onClick?.();
    close();
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "text-primary-600 hover:bg-primary-100 flex w-full items-center gap-4 rounded-sm px-6 py-2.5 text-left text-base transition disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {icon && <span className="text-primary-400">{icon}</span>}
      {title && <span>{title}</span>}
      {children && <span>{children}</span>}
    </button>
  );
}

// Gắn components
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.useContext = useMenusContext;

export default Menus;
