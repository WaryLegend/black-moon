import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import SignupForm from "@/app/_components/SignupForm";

export const metadata = {
  title: "Sign up",
};

export default async function UserSignupPage({ searchParams }) {
  const { returnUrl } = await searchParams;

  return (
    <div className="flex h-full items-center justify-center p-5">
      <div className="bg-primary-50 max-h-full max-w-lg overflow-y-auto rounded-lg p-8 shadow-lg">
        {/* Sign up Title */}
        <h2 className="text-primary-900 mb-6 text-center text-3xl font-bold">
          Đăng ký
        </h2>
        <p className="text-primary-700 mb-6 text-center">
          Tạo tài khoản, tiến hành mua sắm và nhận nhiều ưu đãi
        </p>

        {/* Sign up Form */}
        <SignupForm />

        {/* Or Signup With */}
        <div className="my-4 flex items-center">
          <div className="text-primary-500 flex-grow border-t"></div>
          <span className="text-primary-500 mx-3 text-sm">Hoặc</span>
          <div className="text-primary-500 flex-grow border-t"></div>
        </div>

        {/* Google Signup */}
        <button className="border-accent-300 hover:bg-accent-50 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border py-2 transition-colors">
          <FcGoogle className="text-xl" />
          Đăng nhập với Google
        </button>

        {/* Already has an account? */}
        <div className="my-4 flex justify-center gap-1 text-center">
          <span className="text-primary-500">Đã có tài khoản?</span>
          <span>
            <Link
              href={`/user/login${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""}`}
              replace={true}
              className="text-primary-800 hover:underline"
            >
              Đăng nhập
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
