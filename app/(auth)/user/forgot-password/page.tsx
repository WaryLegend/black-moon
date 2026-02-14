import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { ParamProps } from "@/types/param";
import Link from "next/link";

export const metadata = {
  title: "Forgot password",
};

type ForgotPasswordQuery = {
  returnUrl?: string;
};

export default async function ForgotPasswordPage({
  searchParams,
}: ParamProps<{}, ForgotPasswordQuery>) {
  const { returnUrl } = await searchParams;

  return (
    <div className="flex h-full items-center justify-center p-5">
      <div className="bg-primary-50 max-w-lg rounded-lg p-8 shadow-lg">
        <h2 className="text-primary-900 mb-4 text-center text-3xl font-bold">
          Khôi phục tài khoản
        </h2>

        <p className="text-primary-700 mb-6 text-center">
          Nhập email của bạn, chúng tôi sẽ gửi mã xác thực để khôi phục tài
          khoản.
        </p>

        <ForgotPasswordForm returnUrl={returnUrl} />

        <div className="mt-4 text-center">
          <Link
            href={`/user/login${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""}`}
            className="text-accent-600 text-sm hover:underline"
          >
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
