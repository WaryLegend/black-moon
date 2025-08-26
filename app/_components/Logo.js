import Image from "next/image";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <div className="z-10 flex items-center gap-2">
      <Image
        src={logo}
        height="72"
        width="72"
        quality={100}
        alt="Black & Moon logo"
        className="rounded-full shadow-sm"
      />

      <span className="text-primary-300 text-3xl font-bold uppercase text-shadow-sm">
        <span className="text-primary-900 text-4xl">Black</span>&
        <span className="text-accent-500 text-4xl">Moon</span>
      </span>
    </div>
  );
}

export default Logo;
