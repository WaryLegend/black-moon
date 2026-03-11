import Image from "next/image";
import logo from "@/public/logos/logo.png";

function Logo({ className = "" }) {
  return (
    <div className={`z-10 flex items-center${className}`}>
      <Image
        src={logo}
        height="72"
        width="72"
        quality={100}
        alt="Black & Moon logo"
        className="rounded-full shadow-sm"
      />

      <span className="text-primary-500 ml-2 text-3xl font-bold uppercase text-shadow-sm">
        <span className="text-primary-800 text-4xl">Black</span>&
        <span className="text-accent-500 text-4xl">Moon</span>
      </span>
    </div>
  );
}

export default Logo;
