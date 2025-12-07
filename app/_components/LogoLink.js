import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function LogoLink({ className = "" }) {
  return (
    <Link href={"/"} className={`z-10 flex items-center ${className}`}>
      <Image
        src={logo}
        height="40"
        width="40"
        quality={100}
        alt="Black & Moon logo"
        className="rounded-full shadow-sm"
      />

      <span className="text-primary-500 ml-2 text-sm font-bold uppercase text-shadow-sm">
        <span className="text-primary-800 text-xl">Black</span>&
        <span className="text-accent-500 text-xl">Moon</span>
      </span>
    </Link>
  );
}

export default LogoLink;
