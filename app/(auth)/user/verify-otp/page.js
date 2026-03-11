import VerifyOtpForm from "@/components/auth/VerifyOtpForm";

export const metadata = {
  title: "Verify OTP",
};

export default async function VerifyOtpPage({ searchParams }) {
  const { returnUrl } = await searchParams;
  return (
    <div className="flex h-full items-center justify-center p-5">
      <div className="bg-primary-50 max-h-full max-w-lg overflow-y-auto rounded-lg p-8 shadow-lg">
        <VerifyOtpForm returnUrl={returnUrl} />
      </div>
    </div>
  );
}
