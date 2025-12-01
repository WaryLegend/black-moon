"use client";

import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "@/app/_hooks/useOutSideClick";

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

const StyledList = styled.ul`
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

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

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

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation(); // stop the event flow from coming further
    // special tech: "closest("button")" --> find closest button to where click happened
    // getBoundingClientRect() ---> get the coordinates of "button" on the screen
    const rect = e.target.closest("button").getBoundingClientRect();
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
function List({ id, children }) {
  const { openId, position, close } = useContext(MenuContext);
  // const ref = useOutsideClick(close);
  const ref = useOutsideClick(close, false); // by default true --> capturing mode

  if (openId !== id) return null;

  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}
function Button({ children, icon, onClick, disabled = false }) {
  const { close } = useContext(MenuContext);
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
