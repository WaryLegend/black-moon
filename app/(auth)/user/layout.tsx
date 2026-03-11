import bg from "@/public/bg/bg-auth.jpg";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Header from "@/common/layout/Header";
import LogoLink from "@/common/navigation/LogoLink";

export const metadata = {
  title: {
    template: "%s | Black & Moon",
    default: "Auth | Black & Moon",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header>
        <LogoLink />
      </Header>

      <main className="absolute top-0 left-0 h-full w-full">
        <div className="relative flex flex-col">
          <div className="pointer-events-none absolute top-0 left-0 h-screen w-screen bg-gray-950 select-none">
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
          <div className="relative z-10 mx-auto grid w-full max-w-7xl lg:grid-cols-2">
            <div className="hidden flex-col items-start justify-center px-4 text-gray-50 sm:pl-10 md:pl-20 lg:flex lg:pl-30">
              <h1 className="mt-30 text-5xl font-bold">Xin chào!</h1>
              <p className="mt-4 max-w-md text-xl leading-relaxed">
                Chào mừng bạn đến với{" "}
                <span className="font-bold">Black&Moon</span>.
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
            <div className="relative mx-auto h-screen w-full max-w-7xl pt-10">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
