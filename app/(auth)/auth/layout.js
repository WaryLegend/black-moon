import bg from "@/public/authbg.jpg";

import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import Image from "next/image";
import Logo from "@/app/_components/Logo";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export const metadata = {
  title: {
    template: "%s | Black & Moon",
    default: "Auth | Black & Moon",
  },
};

export default function AdminLoginLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} text-primary-900 bg-primary-100 relative flex min-h-screen flex-col antialiased`}
      >
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

        {/* Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl lg:gap-10">
          <div className="text-primary-50 hidden w-2/3 flex-col items-start justify-center px-8 lg:flex">
            <Logo />
            <h1 className="mt-20 text-4xl font-bold">Xin chào!</h1>
            <p className="mt-4 max-w-md text-xl leading-relaxed">
              Chào mừng bạn đến với{" "}
              <span className="font-bold">Black&Moon.</span>
            </p>
            <p className="mt-4 max-w-md text-lg leading-relaxed">
              Nơi mang đến trải nghiệm mua sắm thời trang hiện đại, tinh tế và
              phù hợp với phong cách riêng của bạn. Khám phá ngay những bộ sưu
              tập mới nhất và nhận ưu đãi đặc biệt dành riêng cho thành viên.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-xl text-pink-500 hover:text-pink-600" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-xl text-blue-600 hover:text-blue-700" />
              </Link>
            </div>
          </div>

          {/* Form */}
          <main className="relative mx-auto w-full max-w-7xl">{children}</main>
        </div>
      </body>
    </html>
  );
}
