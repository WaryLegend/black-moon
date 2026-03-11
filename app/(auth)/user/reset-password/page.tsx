import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata = {
  title: "Reset password",
};

export default async function ResetPasswordPage() {
  return (
    <div className="flex h-full items-center justify-center p-5">
      <div className="bg-primary-50 max-h-full max-w-lg overflow-y-auto rounded-lg p-8 shadow-lg">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
