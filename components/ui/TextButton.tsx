"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonHTMLAttributes, ReactNode } from "react";
import type { LinkProps } from "next/link";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = {
  href: string;
  linkTo?: never;
  onClick?: never;
} & Omit<LinkProps, "href">;

type RelativeLinkButtonProps = {
  linkTo: string;
  href?: never;
  onClick?: never;
} & Omit<LinkProps, "href">;

type ActionButtonProps = {
  onClick?: () => void;
  href?: never;
  linkTo?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type TextButtonProps = BaseProps &
  (LinkButtonProps | RelativeLinkButtonProps | ActionButtonProps);

export default function TextButton(props: TextButtonProps) {
  const pathname = usePathname();
  const { children, className = "", onClick } = props;

  // LINK (absolute)
  if (props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link
        href={href}
        className={`text-blue-700 hover:text-blue-800 ${className}`}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  // LINK (relative)
  if ("linkTo" in props) {
    const { linkTo, ...linkProps } = props;
    return (
      <Link
        href={`${pathname}/${linkTo}`}
        className={`text-blue-700 hover:text-blue-800 ${className}`}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  // BUTTON
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-blue-700 hover:text-blue-800 ${className}`}
    >
      {children}
    </button>
  );
}
