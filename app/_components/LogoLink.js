"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { useMenuStore } from "@/app/_context/HomeMenuStore";

function LogoLink({ linkTo, className = "" }) {
  const { setActiveLink } = useMenuStore();

  return (
    <Link
      href={linkTo || "/"}
      className={`z-10 flex items-center gap-2 ${className}`}
      onClick={() => !linkTo && setActiveLink("/")}
    >
      <Image
        src={logo}
        height="40"
        width="40"
        quality={100}
        alt="Black & Moon logo"
        className="rounded-full shadow-sm"
      />

      <span className="text-primary-300 text-sm font-bold uppercase text-shadow-sm">
        <span className="text-primary-800 text-xl">Black</span>&
        <span className="text-accent-500 text-xl">Moon</span>
      </span>
    </Link>
  );
}

export default LogoLink;
