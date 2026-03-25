import { FaInstagram, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import { AppPageProps } from "@/types/page-props";
import GoogleLoginBtn from "@/components/ui/GoogleLoginBtn";

export const metadata = {
  title: "Log in",
};

type UserLoginQuery = {
  returnUrl?: string;
};

export default async function UserLoginPage({
  searchParams,
}: AppPageProps<{}, UserLoginQuery>) {
  const { returnUrl } = await searchParams;

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
        <LoginForm returnUrl={returnUrl} />

        {/* Or Login With */}
        <div className="my-4 flex items-center">
          <div className="text-primary-500 flex-grow border-t"></div>
          <span className="text-primary-500 mx-3 text-sm">Hoặc</span>
          <div className="text-primary-500 flex-grow border-t"></div>
        </div>

        {/* Google Login */}
        <GoogleLoginBtn />

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
