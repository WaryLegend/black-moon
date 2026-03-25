import VerifyOtpForm from "@/components/auth/VerifyOtpForm";
import { AppPageProps } from "@/types/page-props";

export const metadata = {
  title: "Verify OTP",
};

type VerifyOtpQuery = {
  returnUrl?: string;
};

export default async function VerifyOtpPage({
  searchParams,
}: AppPageProps<{}, VerifyOtpQuery>) {
  const { returnUrl } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <div className="bg-primary-50 max-h-full max-w-lg overflow-y-auto rounded-lg p-8 shadow-lg">
        <VerifyOtpForm returnUrl={returnUrl} />
      </div>
    </div>
  );
}
