import bg from "@/public/authbg.jpg";

import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import Image from "next/image";

export const metadata = {
  title: {
    template: "%s | Black & Moon",
    default: "Auth | Black & Moon",
  },
};

export default function LoginLayout({ children }) {
  return (
    <div className="bg-primary-100 relative flex min-h-screen flex-col">
      <div className="bg-primary-600 absolute top-0 left-0 h-screen w-screen">
        <Image
          src={bg}
          fill
          placeholder="blur"
          quality={100}
          alt="Login background Image"
          className="object-cover opacity-75 blur-[1px]"
        />
      </div>

      {/* Form */}
      <main className="relative mx-auto w-full max-w-7xl">{children}</main>
    </div>
  );
}
