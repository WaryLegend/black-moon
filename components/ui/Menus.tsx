"use client";

import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "@/hooks/useOutSideClick";

type Position = {
  x: number;
  y: number;
};

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 10px;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-100);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-primary-700);
  }
`;

const StyledList = styled.ul<{ $position: Position }>`
  position: fixed;
  padding: 1px;

  background-color: var(--color-primary-0);
  box-shadow: var(--shadow-md);
  border-radius: 10px;
  border: 1px solid var(--color-primary-200);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-radius: 5px;
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  transition: all 0.2s;
  color: var(--color-primary-600);

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-primary-100);
  }

  & svg {
    width: 1rem;
    height: 1rem;
    color: var(--color-primary-400);
    transition: all 0.3s;
  }
`;

// create context
type MenuContextValue = {
  openId: string;
  open: (id: string) => void;
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

// Menus (main wrapper)
function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<string>("");
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

//Toggle
function Toggle({ id }: { id: string }) {
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

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisHorizontal />
    </StyledToggle>
  );
}

// List
function List({ id, children }: { id: string; children: React.ReactNode }) {
  const { openId, position, close } = useMenuContext();
  // const ref = useOutsideClick(close);
  const ref = useOutsideClick<HTMLUListElement>(close, false); // by default true --> capturing mode

  if (openId !== id || position === null) return null;

  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}

// Button
type MenuButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};
function Button({
  children,
  icon,
  onClick,
  disabled = false,
}: MenuButtonProps) {
  const { close } = useMenuContext();
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
