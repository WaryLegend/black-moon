"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import useOutsideClick from "@/hooks/useOutSideClick";
import { cn } from "@/lib/utils/cn";

type Position = {
  x: number;
  y: number;
};

// Menus context
type MenuContextValue = {
  openId: string | number;
  open: (id: string | number) => void;
  close: () => void;
  position: Position | null;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
};
const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext() {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error("Menus components must be used within <Menus>");
  }
  return ctx;
}

// Menus (context wrapper)
function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<string | number>("");
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenuContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

// Menu wrapper | window
function Menu({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

//Toggle
interface ToggleProps {
  id: string | number;
  children?: React.ReactElement<any>;
}
function Toggle({ id, children }: ToggleProps) {
  const { openId, open, close, setPosition } = useMenuContext();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation(); // stop the event flow from coming further
    // special tech: "closest("button")" --> find closest button to where click happened
    // getBoundingClientRect() ---> get the coordinates of "button" on the screen
    // const rect = e.target.closest("button").getBoundingClientRect();
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }
  // for customize button
  if (children)
    return cloneElement(children, {
      onClick: handleClick,
      "data-menu-id": id,
    });

  // default Ellipsis button '...'
  return (
    <button
      onClick={handleClick}
      data-menu-id={id}
      className="hover:bg-primary-100 translate-x-3 cursor-pointer rounded-lg p-1.5 transition"
    >
      <HiEllipsisHorizontal className="text-primary-700 h-6 w-6" />
    </button>
  );
}

// Menus List
function List({
  id,
  children,
  className = "",
}: {
  id: string | number;
  children: React.ReactNode;
  className?: string;
}) {
  const { openId, position, close, setPosition } = useMenuContext();
  // const ref = useOutsideClick(close); // by default true --> capturing mode
  const ref = useOutsideClick<HTMLUListElement>(close, false);

  // re-position on scroll/resize while open
  useEffect(() => {
    if (openId !== id) return;

    const updatePosition = () => {
      // Find the toggle button that opened this menu
      // One reliable way: add data-id={id} to Toggle's button or wrapper
      const trigger = document.querySelector(`[data-menu-id="${id}"]`);
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [openId, id, setPosition]);

  if (openId !== id || position === null) return null;

  return createPortal(
    <ul
      ref={ref}
      style={{
        right: position.x,
        top: position.y,
      }}
      className={cn(
        "border-primary-200 bg-primary-0 absolute z-50 rounded-xl border p-px shadow-md",
        className,
      )}
    >
      {children}
    </ul>,
    document.body,
  );
}

// Button
type MenuButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};
function Button({
  children,
  icon,
  onClick,
  disabled = false,
  className = "",
}: MenuButtonProps) {
  const { close } = useMenuContext();
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          `text-primary-600 hover:bg-primary-100 flex w-full items-center gap-6 rounded-md px-6 py-2.5 text-left text-base transition disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
      >
        {icon && <span className="text-primary-400">{icon}</span>}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.useContext = useMenuContext;

export default Menus;
