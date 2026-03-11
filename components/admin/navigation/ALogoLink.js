"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logos/logo.png";

function ALogoLink({ className = "" }) {
  const { isOpen } = useSidebar();

  return (
    <Link href={"/admin"} className={`flex items-center ${className}`}>
      <Image
        src={logo}
        height="40"
        width="40"
        quality={100}
        alt="Black & Moon logo"
        className="rounded-full shadow-sm"
      />

      <span
        className={`text-primary-500 overflow-hidden text-xs font-bold uppercase transition-all text-shadow-sm ${isOpen ? "ml-2 w-35" : "w-0 opacity-0"}`}
      >
        <span className="text-primary-800 text-lg">Black</span>&
        <span className="text-accent-500 text-lg">Moon</span>
      </span>
    </Link>
  );
}

export default ALogoLink;
