import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Link from "next/link";
import type { ParamProps } from "@/types/param";

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
    <div className="flex min-h-screen items-center justify-center p-5">
      <div className="bg-primary-50 max-w-lg rounded-lg p-8 shadow-lg">
        <h2 className="text-primary-900 mb-4 text-center text-3xl font-bold">
          Khôi phục tài khoản
        </h2>

        <ForgotPasswordForm returnUrl={returnUrl} />

        <div className="mt-4 text-center">
          <Link
            href={`/admin/login${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""}`}
            className="text-accent-600 text-sm hover:underline"
          >
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
