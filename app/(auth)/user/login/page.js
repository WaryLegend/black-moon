import { FcGoogle } from "react-icons/fc";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import LoginForm from "@/app/_components/LoginForm";

export const metadata = {
  title: "Log in",
};

export default async function UserLoginPage({ searchParams }) {
  const search = await searchParams;
  const { returnUrl } = search;

  return (
    <div className="flex h-full items-center justify-center p-5">
      <div className="bg-primary-50 max-h-full max-w-lg overflow-y-auto rounded-lg p-8 shadow-lg">
        {/* Login Title */}
        <h2 className="text-primary-900 mb-6 text-center text-3xl font-bold">
          Đăng nhập
        </h2>
        <p className="text-primary-700 mb-6 text-center">
          Chào mừng quý khách quay trở lại với cửa hàng
        </p>

        {/* Login Form */}
        <LoginForm />

        {/* Or Login With */}
        <div className="my-4 flex items-center">
          <div className="text-primary-500 flex-grow border-t"></div>
          <span className="text-primary-500 mx-3 text-sm">Hoặc</span>
          <div className="text-primary-500 flex-grow border-t"></div>
        </div>

        {/* Google Login */}
        <button className="border-accent-300 hover:bg-accent-50 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border py-2 transition-colors">
          <FcGoogle className="text-xl" />
          Đăng nhập với Google
        </button>

        {/* No account yet? */}
        <div className="my-4 flex justify-center gap-1 text-center">
          <span className="text-primary-500">Chưa có tài khoản?</span>
          <span>
            <Link
              href={`/user/signup${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""}`}
              replace={true}
              className="text-accent-800 hover:underline"
            >
              Đăng ký ngay
            </Link>
          </span>
        </div>

        {/* Social Media Icons */}
        <div className="mt-6 flex justify-center gap-4 lg:hidden">
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
    </div>
  );
}
