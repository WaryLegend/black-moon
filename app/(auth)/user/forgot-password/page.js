import Link from "next/link";
import { FiMail } from "react-icons/fi";

export const metadata = {
  title: "Forgot password",
};

export default async function ForgotPasswordPage({ searchParams }) {
  const { returnUrl } = await searchParams;

  return (
    <div className="flex h-full items-center justify-center p-5">
      <div className="bg-primary-50 max-w-lg rounded-lg p-8 shadow-lg">
        <h2 className="text-primary-900 mb-4 text-center text-3xl font-bold">
          Quên mật khẩu
        </h2>

        <p className="text-primary-700 mb-6 text-center">
          Nhập email của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu.
        </p>

        <form className="space-y-4">
          <div className="relative">
            <input
              type="email"
              required
              placeholder="Email"
              className="focus:ring-accent-600 border-accent-300 w-full rounded-lg border px-4 py-2 pl-10 focus:ring-2 focus:outline-none"
            />
            <FiMail className="text-accent-500 absolute top-2.5 left-3" />
          </div>

          <button
            type="submit"
            className="bg-accent-500 hover:bg-accent-600 hover:text-primary-100 w-full rounded-lg py-2 transition-colors duration-200"
          >
            Gửi email đặt lại mật khẩu
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            href={`/user/login${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""}`}
            className="text-primary-600 hover:underline"
          >
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
