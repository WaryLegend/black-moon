import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/Logo";

export default function AdminLogin() {
  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <div className="bg-primary-50 max-h-full max-w-lg overflow-y-auto rounded-lg p-8 shadow-lg">
        {/* Logo */}
        <div className="p flex justify-center pb-5">
          <Logo />
        </div>

        {/* Login Form */}
        <LoginForm isAdmin={true} />
      </div>
    </div>
  );
}
